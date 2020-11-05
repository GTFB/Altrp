<?php


namespace App\Altrp\Builders;


use App\Altrp\Builders\Traits\DynamicVariables;
use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Generators\Controller\ControllerFileWriter;
use App\Altrp\Generators\Repository\RepositoryFile;
use App\Altrp\Generators\Repository\RepositoryFileWriter;
use App\Altrp\Generators\Repository\RepositoryInterfaceFile;
use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Generators\Route\RouteFileWriter;
use App\Altrp\Model;
use App\Altrp\Query;
use App\Altrp\Relationship;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Altrp\Table;
use App\Exceptions\Controller\ControllerFileException;
use App\Exceptions\Repository\RepositoryFileException;
use App\Permission;
use App\Role;
use Carbon\Carbon;
use Highlight\Mode;
use Illuminate\Support\Str;

class QueryBuilder
{
    use DynamicVariables;
    /**
     * Запрос
     *
     * @var Query
     */
    protected $query;

    /**
     * @var object
     */
    protected $queryBody;

    /**
     * @var Model
     */
    protected $model;

    /**
     * @var string
     */
    protected $table;

    /**
     * Данные
     *
     * @var mixed
     */
    protected $data;

    /**
     * @var string
     */
    private $tabIndent = '    ';

    /**
     * @var string
     */
    private $twoTabs = '        ';

    /**
     * @var string
     */
    private $threeTabs = '            ';

    /**
     * QueryBuilder constructor.
     * @param Query $query
     */
    public function __construct(Query $query)
    {
        $this->query = $query;
        $this->model = Model::find($query->model_id);
        $this->table = $this->model->table;
    }

    protected function reset()
    {
        $this->queryBody = new \stdClass();
    }

    /**
     * Сформировать тело метода
     *
     * @return string|string[]
     */
    public function getMethodBody()
    {
        $query = $this->getRelations($this->query->relations)
                    ->getJoins($this->query->joins)
                    ->getColumns($this->query->columns)
                    ->getAggregates($this->query->aggregates)
                    ->getFiltration()
                    ->getConditions($this->query->conditions)

                    ->getOrders($this->query->order_by)
                    ->getGroupTypes($this->query->group_by)
                    ->getOffset($this->query->offset)
                    ->getLimit($this->query->limit)
                    ->getQueryBody();

        return $query;
    }

    /**
     * Получить тело запроса
     *
     * @return string|string[]
     */
    public function getQueryBody()
    {
        $queryBody = [];
        foreach ((array)$this->queryBody as $item) {
            if (is_array($item)) $queryBody[] = implode($this->threeTabs, $item);
            else $queryBody[] = $item;
        }
        $queryBody[] = "\$model = \$model->get();\n{$this->twoTabs}return \$model;\n";
        $methodBody = "\n\n{$this->tabIndent}public function " . $this->getMethodName() . "()\n{$this->tabIndent}{\n"
        . "{$this->tabIndent}{$this->tabIndent}\$model = \$this->model();\n"
        . implode("{$this->twoTabs}",$queryBody) . $this->tabIndent . "}";

        return $this->replaceDynamicVars($methodBody,0);
    }

    /**
     * Проверить, существует ли запрос
     *
     * @return bool
     */
    public function checkQueryExist()
    {
        $query = Query::where([['name',$this->query->name],['model_id',$this->model->id]])->first();
        if ($query) return true;
        return false;
    }

    /**
     * Удалить метод из контроллера
     *
     * @return bool
     * @throws \App\Exceptions\Controller\ControllerFileException
     */
    public function removeMethodFromController()
    {
        $controllerFile = new ControllerFile($this->model);
        $repoFile = new RepositoryFile($this->model);
        $repoInterfaceFile = new RepositoryInterfaceFile($this->model);
        $fileWriter = new ControllerFileWriter(
            $controllerFile,
            $repoFile,
            $repoInterfaceFile
        );
        if ($fileWriter->removeMethod($this->getMethodName())) {
            return true;
        }
        return false;
    }

    /**
     * Проверить, нужен ли метод get для получения записей
     *
     * @return bool
     */
    protected function existsNotGetableData()
    {
        $excepts = ['count', 'sum', 'min', 'max', 'avg'];
        foreach ($excepts as $except) {
            if (isset($this->data[$except])) {
                return true;
            }
        }
        return false;
    }

  /**
   * Записать маршрут в файл маршрутов
   * @throws \App\Exceptions\Route\RouteFileException
   */
    public function writeRoute()
    {
        $routeFile = new RouteFile($this->model);
        $controllerFile = new ControllerFile($this->model);
        $fileWriter = new RouteFileWriter($routeFile, $controllerFile);
        $apiRouteFile = new RouteFile($this->model, 'routes/AltrpApiRoutes.php', true);
        $apiFileWriter = new RouteFileWriter($apiRouteFile, $controllerFile);
        $methodName = $this->getMethodName();
        if ($fileWriter->addRoute($methodName) && $apiFileWriter->addRoute($methodName)) {
            return true;
        }
        return false;
    }

    /**
     * Записать метод в файл репозитория
     *
     * @param $method
     * @return bool
     * @throws \App\Exceptions\Repository\RepositoryFileException
     */
    public function writeMethodToRepo($method)
    {
        $repoInterfaceFile = new RepositoryInterfaceFile($this->model);
        $repoFile = new RepositoryFile($this->model);
        $fileWriter = new RepositoryFileWriter(
            $repoFile,
            $repoInterfaceFile
        );
        if ($fileWriter->addMethod($this->getMethodName(), $method)) {
            return true;
        }
        return false;
    }

    /**
     * Обновить метод в файле репозитория
     *
     * @param $method
     * @return bool
     * @throws \App\Exceptions\Repository\RepositoryFileException
     */
    public function updateRepoMethod($method)
    {
        $repoInterfaceFile = new RepositoryInterfaceFile($this->model);
        $repoFile = new RepositoryFile($this->model);
        $fileWriter = new RepositoryFileWriter(
            $repoFile,
            $repoInterfaceFile
        );
        $oldMethodName = $this->getOldMethodName();
        if (! $fileWriter->removeMethodFromRepository($oldMethodName)) {
            return false;
        }
        if (! $fileWriter->removeMethodFromRepoInterface($oldMethodName)) {
            return false;
        }
        if (! $fileWriter->addMethod($this->getMethodName(), $method)) {
            return false;
        }
        return true;
    }

    /**
     * Обновить файл маршрутов
     *
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function updateRoute()
    {
        if (! $this->removeRoute()) {
            return false;
        }
        if (! $this->writeRoute()) {
            return false;
        }
        return true;
    }

    /**
     * Удалить метод из файла репозитория
     *
     * @param $method
     * @return bool
     * @throws \App\Exceptions\Repository\RepositoryFileException
     */
    public function removeMethodFromRepo()
    {
        $repoInterfaceFile = new RepositoryInterfaceFile($this->model);
        $repoFile = new RepositoryFile($this->model);
        $fileWriter = new RepositoryFileWriter(
            $repoFile,
            $repoInterfaceFile
        );
        if (! $fileWriter->removeMethodFromRepository($this->getMethodName())) {
            return false;
        }
        if (! $fileWriter->removeMethodFromRepoInterface($this->getMethodName())) {
            return false;
        }
        return true;
    }

    /**
     * Удалить маршрут
     *
     * @return bool
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function removeRoute()
    {
        $routeFile = new RouteFile($this->model);
        $controllerFile = new ControllerFile($this->model);
        $fileWriter = new RouteFileWriter($routeFile, $controllerFile);
        $apiRouteFile = new RouteFile($this->model, 'routes/AltrpApiRoutes.php', true);
        $apiFileWriter = new RouteFileWriter($apiRouteFile, $controllerFile);
        $oldMethodName = $this->getOldMethodName();
        if ($fileWriter->removeRoute($oldMethodName) && $apiFileWriter->removeRoute($oldMethodName)) {
            return true;
        }
        return false;
    }

    /**
     * Записать метод в файл контроллера
     *
     * @throws \App\Exceptions\Controller\ControllerFileException
     */
    public function writeMethodToController()
    {
        $controllerFile = new ControllerFile($this->model);
        $repoFile = new RepositoryFile($this->model);
        $repoInterfaceFile = new RepositoryInterfaceFile($this->model);
        $fileWriter = new ControllerFileWriter(
            $controllerFile,
            $repoFile,
            $repoInterfaceFile
        );
        if ($fileWriter->checkMethodExists($this->getMethodName())) {
            throw new ControllerFileException('Query ' . $this->getOldMethodName() . ' already exists', 500);
        }
        if ($fileWriter->addMethod($this->getMethodName())) {
            return true;
        }
        return false;
    }

  /**
   * Записать ресурс
   *
   * @param string $method
   * @return mixed
   * @throws RepositoryFileException
   */
    public function writeSource($method)
    {
        $method = Str::kebab($method);
        $modelId = $this->model->id;
        $controllerId = $this->model->altrp_controller->id;
        $source = Source::where([
            ['model_id', $modelId],
            ['controller_id', $controllerId],
            ['type', $method],
            ['sourceable_type', 'App\Altrp\Query']
        ])->first();
        if (! $source) {
            $source =  new Source();
            $source->model_id = $modelId;
            $source->controller_id = $controllerId;
            $source->url = '/' . $this->model->table->name . '/' . $method;
            $source->api_url = '/' .$this->model->table->name . '/' . $method;
            $source->type = $method;
            $source->request_type = 'get';
            $source->name = $method;
            $source->title = ucwords(str_replace('_', ' ', $method));
            $source->sourceable_type = 'App\Altrp\Query';
            if (! $source->save()) {
                throw new RepositoryFileException('Failed to write source', 500);
            }
            $query = $this->query;
            Source::withoutEvents(function () use ($source, $query) {
                $source->update(['sourceable_id' => $query->id]);
            });
        }

        return $source;
    }

    /**
     * Записать роли доступа к ресурсу
     *
     * @param Source $source
     * @return bool
     */
    public function writeSourceRoles($source)
    {
        if (!$this->query->access) return true;
        try {
            foreach ($this->query->access as $type => $roles) {
                if ($type == 'roles') {
                    foreach ($roles as $role) {
                        $roleObj = Role::find($role);
                        if (! $roleObj) continue;
                        $roleData = [
                            'source_id' => $source->id,
                            'role_id' => $role,
                        ];
                        $oldSourceRole = SourceRole::where([
                            ['source_id', $source->id],
                            ['role_id', $role]
                        ]);
                        if ($oldSourceRole->first()) {
                            $sourceRole = $oldSourceRole;
                            $roleData['updated_at'] = Carbon::now();
                            $sourceRole->update($roleData);
                        } else {
                            $sourceRole = new SourceRole($roleData);
                            $sourceRole->save();
                        }
                    }
                    $oldSourceRoles = SourceRole::where([
                        ['source_id', $source->id]
                    ])->get();
                    $deleteRoles = [];
                    foreach ($oldSourceRoles as $oldSourceRole) {
                        if (!in_array($oldSourceRole->role_id, $roles)) {
                            $deleteRoles[] = $oldSourceRole->id;
                        }
                    }
                    SourceRole::destroy($deleteRoles);
                }
            }
        } catch (\Exception $e) {
            echo $e;
            return false;
        }
        return true;
    }

    /**
     * Записать права доступа ресурса
     *
     * @param Source $source
     * @return bool
     */
    public function writeSourcePermissions($source)
    {
        if (!$this->query->access) return true;
        try {
            foreach ($this->query->access as $type => $permissions) {
                if ($type == 'permissions') {
                    foreach ($permissions as $permission) {
                        $permObj = Permission::find($permission);
                        if (! $permObj) continue;
                        $action = explode('-',$permObj->name)[0] ?? null;
                        $permissionData = [
                            'source_id' => $source->id,
                            'permission_id' => $permission,
                            'type' => $action . '-' . $source->type
                        ];
                        $oldSourcePermission = SourcePermission::where([
                            ['source_id', $source->id],
                            ['permission_id',$permission]
                        ]);
                        if ($oldSourcePermission->first()) {
                            $sourcePermission = $oldSourcePermission;
                            $permissionData['updated_at'] = Carbon::now();
                            $sourcePermission->update($permissionData);
                        } else {
                            $sourcePermission = new SourcePermission($permissionData);
                            $sourcePermission->save();
                        }
                    }
                    $oldSourcePermissions = SourcePermission::where([
                        ['source_id', $source->id]
                    ])->get();
                    $deletePermissions = [];
                    foreach ($oldSourcePermissions as $oldSourcePermission) {
                        if (!in_array($oldSourcePermission->permission_id, $permissions)) {
                            $deletePermissions[] = $oldSourcePermission->id;
                        }
                    }
                    SourcePermission::destroy($deletePermissions);
                }
            }
        } catch (\Exception $e) {
            echo $e;
            return false;
        }
        return true;
    }

    /**
     * Обновить роли источника данных
     *
     * @param $source
     * @return bool
     */
    public function updateSourceRoles($source)
    {
        return $this->writeSourceRoles($source);
    }

    /**
     * Обновить права доступа источника данных
     *
     * @param $source
     * @return bool
     */
    public function updateSourcePermissions($source)
    {
        return $this->writeSourcePermissions($source);
    }

    /**
     * Обновить метод в контроллере
     *
     * @return bool
     * @throws \App\Exceptions\Controller\ControllerFileException
     */
    public function updateControllerMethod()
    {
        $controllerFile = new ControllerFile($this->model);
        $repoFile = new RepositoryFile($this->model);
        $repoInterfaceFile = new RepositoryInterfaceFile($this->model);
        $fileWriter = new ControllerFileWriter(
            $controllerFile,
            $repoFile,
            $repoInterfaceFile
        );
        if ($this->getOldMethodName() != $this->getMethodName()
            && $fileWriter->checkMethodExists($this->getMethodName())) {
            throw new ControllerFileException('Query ' . $this->getMethodName() . ' already exists', 500);
        }
        if ($fileWriter->updateMethod(
            $this->getOldMethodName(),
            $this->getMethodName())
        ) return true;
        return false;
    }

    /**
     * Сохранить запрос в БД
     *
     * @param $source
     * @return bool
     */
    protected function saveQuery($source)
    {
        $attributes = [];
        foreach ($this->data as $item => $value) {
            $attributes[$item] = trim(json_encode($value), "\"");
        }
        $query = Query::where('source_id', $source->id)->first();
        if (! $query)  {
            $query = new Query();
            $attributes['user_id'] = auth()->user()->id;
            $attributes['source_id'] = $source->id;
        }
        $query->fill($attributes);

        return $query->save();
    }

    /**
     * Получить имя добавляемого метода
     *
     * @return mixed
     */
    public function getMethodName()
    {
        return $this->query->name;
    }

    /**
     * Получить старое имя метода
     *
     * @return array|mixed
     */
    public function getOldMethodName()
    {
        return $this->query->getOriginal('name') ?? $this->query->name;
    }

    /**
     * Получить своойство, удаляющее дублткаты
     *
     * @param $distinct
     * @return string
     */
    protected function getDistinct($distinct)
    {
        $this->queryBody->distinct = '->distinct()' . "\n";
        return $this;
    }

    /**
     * Сформировать и получить агрегатную выборку
     *
     * @param array $aggregates
     * @return $this
     */
    public function getAggregates($aggregates)
    {
        if (! $aggregates) return $this;
        $aggregatesList = [];
        if (is_array($aggregates)) {
            foreach ($aggregates as $aggregate) {
                if (!Str::contains($aggregate['column'], '.')) {
                    $aggregate['column'] = $this->model->table->name . '.' . $aggregate['column'];
                    $aggregatesList[] = $aggregate['type'] . "(" . config('database.connections.mysql.prefix')
                        . "{$aggregate['column']}) as {$aggregate['alias']}";
                } elseif (Str::contains($aggregate['column'], '.') && $this->query->joins) {
                    $aggregatesList[] = $aggregate['type'] . "(" . config('database.connections.mysql.prefix')
                        . "{$aggregate['column']}) as {$aggregate['alias']}";
                }
            }
        } else {
            $aggregatesList[] = $aggregates;
        }

        $this->queryBody->aggregates = '$model = $model->selectRaw(\''
            . implode(', ', $aggregatesList) . '\');' . "\n";
        return $this;
    }

    /**
     * Получить выбираемые колонки
     *
     * @param $columns
     * @return $this
     */
    public function getColumns($columns)
    {
        $threeTabs = null;
        if (!$this->query->joins && !$this->query->relations) {
            $this->reset();
            $threeTabs = $this->twoTabs;
        }
        $columnsList = [];
        foreach ($columns as $column) {
            if (!Str::contains($column, '.')) {
                $column = $this->model->table->name . '.' . $column;
                $columnsList[] = $column;
            } elseif (Str::contains($column, '.') && $this->query->joins) {
                $columnsList[] = $column;
            }
        }
        $this->queryBody->columns = $columns
            ? "{$threeTabs}\$model = \$model->select(['" . implode("','", $columnsList) . "']);\n"
            : "{$threeTabs}\$model = \$model->select('*');\n";
        return $this;
    }

    /**
     * Сформировать список всех условий
     *
     * @param $conditions
     * @return $this
     */
    protected function getConditions($conditions)
    {
        if (! $conditions) return $this;
        foreach ($conditions as $condition) {
            switch ($condition['condition_type']) {
                case 'where':
                    $this->getWhereConditions($condition);
                    break;
                case 'or_where':
                    $this->getOrWhereConditions($condition);
                    break;
                case 'where_between':
                    $this->getWhereBetweenConditions($condition);
                    break;
                case 'where_in':
                    $this->getWhereInConditions($condition);
                    break;
                case 'where_date':
                    $this->getWhereDateConditions($condition);
                    break;
                case 'where_column':
                    $this->getWhereColumnConditions($condition);
                    break;
                case 'where_null':
                    $this->getWhereNullConditions($condition);
                    break;
            }
        }
        $this->queryBody->conditions = '$model = $model'
            . rtrim(implode("{$this->twoTabs}",$this->queryBody->conditions), "\n") . ";\n";
        return $this;
    }

    /**
     * Получить связи с другими таблицами
     *
     * @param $relations
     * @return $this
     */
    public function getRelations($relations)
    {
        $this->reset();
        if (! $relations) return $this;
        $eol = (count($relations) > 1) ? "\n" : null;
        $tab = (count($relations) > 1) ? "{$this->tabIndent}" : null;
        $relationsList = [];
        foreach ($relations as $rel) {
            $relationsList[$rel] = [];
        }
        if ($this->query->order_by) {
            $orders = $this->query->order_by;
            foreach ($orders as $order) {
                if (Str::contains($order['column'], '.')) {
                    $parts = explode('.', $order['column']);
                    $table = $parts[0];
                    $column = $parts[1];
                    foreach ($relationsList as $relation => $args) {
                        $rel = Relationship::where('name',$relation)->with('altrp_target_model.table')->first();
                        if ($rel->altrp_target_model->table->name == $table) {
                            $relationsList[$relation][] = '$q->orderBy(\'' . $column . '\', \'' . $order['type'] . '\')';
                        }
                    }
                }
            }
        }
        $str = "{$this->twoTabs}\$model = \$model->with([";
        foreach ($relationsList as $name => $args) {
            $str .= "$eol$tab$tab$tab$tab'$name'" . ($args ? ' => function ($q) {' . implode(';',$args) . ';}' : '') . ',';
        }
        $str = rtrim($str, ',') . "$eol$tab$tab$tab]);\n";
        $this->queryBody->relations = $str;
        return $this;
    }

    /**
     * Сформировать и получить значение колонки при выборке по условию
     *
     * @param $value
     * @return string
     */
    protected function getColumnValue($value)
    {
        if (Str::contains($value, 'CURRENT_USER')) {
            $parts = explode(':', $value);
            $relations = str_replace('.', '->', $parts[1]);
            return 'auth()->user()->' . $relations;
        }
        return "'{$value}'";
    }

    /**
     * Получить список условий
     *
     * @param $cond
     * @return $this
     */
    public function getWhereConditions($cond)
    {
        if (! $cond) return $this;
        $condition = 'where([';
        $value = $this->parseValue($cond['value']);
        $condition .= "['{$this->model->table->name}.{$cond['column']}'," . "'{$cond['operator']}'," . $value . "]";
        $condition .= "])";
        $this->queryBody->conditions[] = '->' . $condition . "\n";
        return $this;
    }

    /**
     * Получить список условий с пометкой ИЛИ
     *
     * @param $cond
     * @return $this
     */
    public function getOrWhereConditions($cond)
    {
        if (! $cond) return $this;
        $conditionList = [];
        $value = $this->parseValue($cond['value']);
        $condition = 'orWhere(';
        $condition .= "'{$this->model->table->name}.{$cond['column']}'," . "'{$cond['operator']}'," . $value . ")";
        $conditionList[] = $condition;
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить условия сравнения значения колонки с диапазоном двух значений
     * Поддержка условия - OR, а также отрицания - NOT
     *
     * @param $conditions
     * @return $this
     */
    public function getWhereBetweenConditions($cond)
    {
        if (! $cond) return $this;
        $conditionList = [];
        $prefix = isset($cond['or']) ? 'orW' : 'w';
        $isNot = isset($cond['not']) ? 'Not' : null;
        $values = array_map(function ($item) {
            if(is_string($item)) return "'$item'";
            return $item;
        }, $cond['values']);
        $values = implode(',', $values);
        $conditionList[] = "{$prefix}here{$isNot}Between('{$this->model->table->name}.{$cond['column']}'," . "[{$values}])";
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить условия сравнения значения колонки со списком значений
     * Поддержка условия - OR, а также отрицания - NOT
     *
     * @param $cond
     * @return $this
     */
    public function getWhereInConditions($cond)
    {
        if (! $cond) return $this;
        $conditionList = [];
        $isNot = isset($cond['not']) ? 'Not' : null;
        $prefix = isset($cond['or']) ? 'orW' : 'w';
        $values = array_map(function ($item) {
            if(is_string($item)) return "'$item'";
            return $item;
        }, $cond['values']);
        $values = implode(',', $values);
        $conditionList[] = "{$prefix}here{$isNot}In('{$this->model->table->name}.{$cond['column']}'," . "[{$values}])";
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить условия по различным типам даты и времени
     * Типы: Date / Month / Day / Year / Time / Datetime
     *
     * @param $cond
     * @return $this
     */
    public function getWhereDateConditions($cond)
    {
        if (! $cond) return $this;
        $conditionList = [];
        $operator = $cond['operator'] ?? '=';
        $whereType = $cond['type'] != 'datetime' ? ucfirst($cond['type']) : null;
        $conditionList[] = "where{$whereType}(\"{$this->model->table->name}.{$cond['column']}\"," . "\"{$operator}\"," . "\"{$cond['value']}\")";
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить условия сравнения колонок между собой
     *
     * @param $cond
     * @return $this
     */
    public function getWhereColumnConditions($cond)
    {
        if (! $cond) return $this;
        $conditionList = [];
        $condition = '';
        $prefix = $cond['or'] ? 'orW': 'w';
        $condition .= "{$prefix}hereColumn([";
        $condition .= "['{$this->model->table->name}.{$cond['first_column']}',"
            . "'{$cond['operator']}'," . "'{$this->model->table->name}.{$cond['second_column']}']";
        $condition .=  "])";
        $conditionList[] = $condition;
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить нулевые условия
     *
     * @param $cond
     * @return $this
     */
    public function getWhereNullConditions($cond)
    {
        if (! $cond) return $this;
        $isNot = $cond['not'] ? 'Not' : null;
        $prefix = $cond['or'] ? 'orW' : 'w';
        $condition = "{$prefix}here{$isNot}Null(\"{$this->model->table->name}.{$cond['column']}\")";
        $this->queryBody->conditions[] = "->" . $condition . "\n";
        return $this;
    }

    /**
     * Получить сортировки по полям
     *
     * @param $orders
     * @return $this
     */
    public function getOrders($orders)
    {
        if (! $orders) return $this;
        $ordersList = [];
        $columnsListArr = [];
        foreach ($orders as $order) {
            if (!$order['column'] || !isset($order['column'])) $order['column'] = 'id';
            $order['column'] = strtolower($order['column']);
            if (!Str::contains($order['column'], '.')) {
                $order['column'] = $this->model->table->name . '.' . $order['column'];
                $columnsListArr[] = ['column' => $order['column'],'type' => $order['type']];
            } elseif (Str::contains($order['column'], '.') && $this->query->joins) {
                $columnsListArr[] = ['column' => $order['column'],'type' => $order['type']];
            }
        }
        if (! $columnsListArr) return $this;
        foreach ($columnsListArr as $order) {
            $ordersList[] = "orderBy('{$order['column']}', '{$order['type']}')";
        }
        $this->queryBody->orders = "\$model = \$model" . '->' . implode("\n{$this->threeTabs}->", $ordersList) . ";\n";
        return $this;
    }

    /**
     * Получить группировку по полям
     *
     * @param $types
     * @return $this
     */
    public function getGroupTypes($types)
    {
        if (! $types) return $this;
        $groups = $this->getColumnsWithFullName($types);
        $groupsList = "\$model = \$model" . "->groupBy('" . implode("','", $groups) ."');\n";
        $this->queryBody->group_by = $groupsList;
        return $this;
    }

    /**
     * Получить смещение выборки
     *
     * @param $offset
     * @return $this
     */
    public function getOffset($offset)
    {
        if (! $offset) return $this;
//        $offset = filter_var($offset, FILTER_VALIDATE_INT) ? $offset : '"' . $offset . '"';
        $this->queryBody->offset = "\$model = \$model" . "->offset($offset);\n";
        return $this;
    }

    /**
     * Получить лимит выборки
     *
     * @param $limit
     * @return $this
     */
    public function getLimit($limit)
    {
        if (! $limit) return $this;
//        $limit = filter_var($limit, FILTER_VALIDATE_INT) ? $limit : '"' . $limit . '"';
        $this->queryBody->limit = "\$model = \$model" . "->limit($limit);\n";
        return $this;
    }

    /**
     * Получить соединения с другими таблицами (джоины)
     *
     * @param $joins
     * @return $this
     */
    public function getJoins($joins)
    {
        if (! $joins) return $this;
        if (!$this->query->relations) {
            $this->reset();
        }
        $joinList = [];
        foreach ($joins as $item => $join) {
            $targetTable = Table::find($join['target_table']);

            $type = $join['type'];
            $targetTableName = $targetTable->name;
            $targetColumn = $targetTable->columns->firstWhere('id',$join['target_column'])->name;
            $sourceTableName = $this->model->altrp_table->name;
            $sourceColumn = $join['source_column'];
            $operator = $join['operator'];

            if ($type == 'inner_join') {
                $joinList[] = "join('{$targetTableName}','{$sourceTableName}.{$sourceColumn}',"
                    . "'{$operator}','{$targetTableName}.{$targetColumn}')";
            } elseif ($type == 'left_join') {
                $joinList[] = "leftJoin('{$targetTableName}','{$sourceTableName}.{$sourceColumn}',"
                    . "'{$operator}','{$targetTableName}.{$targetColumn}')";
            } elseif ($type == 'right_join') {
                $joinList[] = "rightJoin('{$targetTableName}','{$sourceTableName}.{$sourceColumn}',"
                    . "'{$operator}','{$targetTableName}.{$targetColumn}')";
            }
        }
        $this->queryBody->joins = "{$this->twoTabs}\$model = \$model->" . implode("\n{$this->threeTabs}->",$joinList) . ";\n";

        return $this;
    }

    /**
     * Сформировать фильтрацию
     *
     * @return $this
     */
    public function getFiltration()
    {
        $filtration = '$filters = [];' . "\n";
        $filtration .= $this->twoTabs . 'if (request()->filters) {' . "\n";
        $filtration .= $this->threeTabs . '$_filters = json_decode(request()->filters, true);' . "\n";
        $filtration .= $this->threeTabs . 'foreach ($_filters as $key => $value) {' . "\n";
        $filtration .= $this->threeTabs . $this->tabIndent . '$filters[$key] = $value;' . "\n";
        $filtration .= $this->threeTabs . '}' . "\n";
        $filtration .= $this->twoTabs . '}' . "\n";
        $filtration .= $this->twoTabs . 'if (count($filters)) $model = $model->whereLikeMany($filters);' . "\n";
        $this->queryBody->zfiltration = $filtration;
        return $this;
    }

    /**
     * Проверить, существуют ли в значении динамические переменные
     *
     * @param $value
     * @return string
     */
    protected function parseValue($value)
    {
        if (Str::contains($value, 'REQUEST')
            || Str::contains($value, 'CURRENT_USER')
            || Str::contains($value, 'CURRENT_')) {
            return $value;
        }
        return '"' . $value . '"';
    }

    /**
     * Получить колонки с полным именем (имя_таблицы.имя_колонки)
     *
     * @param $columns
     * @return array
     */
    protected function getColumnsWithFullName($columns)
    {
        if (! $columns) return [];
        $columnsList = [];
        foreach ($columns as $column) {
            if (!Str::contains($column, '.')) {
                $column = $this->model->table->name . '.' . $column;
                $columnsList[] = $column;
            } elseif (Str::contains($column, '.') && $this->query->joins) {
                $columnsList[] = $column;
            }
        }
        return $columnsList;
    }
}
