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
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Exceptions\Controller\ControllerFileException;
use App\Exceptions\Repository\RepositoryFileException;
use App\Permission;
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
    private $threeTabs = '            ';

    /**
     * QueryBuilder constructor.
     * @param Query $query
     */
    public function __construct(Query $query)
    {
        $this->query = $query;
        $this->model = Model::find($query->model_id);
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
        $query = $this->getJoins($this->query->joins)
                    ->getColumns($this->query->columns)
                    ->getAggregates($this->query->aggregates)
                    ->getConditions($this->query->conditions)
//                    ->getWhereConditions($this->query->conditions)
//                    ->getOrWhereConditions($this->query->conditions)
//                    ->getWhereBetweenConditions($this->query->conditions)
//                    ->getWhereInConditions($this->query->conditions)
//                    ->getWhereDateConditions($this->query->conditions)
//                    ->getWhereColumnConditions($this->query->conditions)
                    ->getRelations($this->query->relations)
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
        $queryBody[] = "->get();\n";
        $methodBody = "\n\n{$this->tabIndent}public function " . $this->getMethodName() . "()\n{$this->tabIndent}{\n"
        . "{$this->tabIndent}{$this->tabIndent}return \$this->model()\n"
        . implode("{$this->threeTabs}",$queryBody) . $this->tabIndent . "}{$this->tabIndent}";
        return $this->replaceDynamicVars($methodBody);
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
        if ($fileWriter->addRoute($this->getMethodName())) {
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
        if ($fileWriter->removeRoute($this->getOldMethodName())) {
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
            ['type', $method]
        ])->first();
        if (! $source) {
            $source =  new Source();
            $source->model_id = $modelId;
            $source->controller_id = $controllerId;
            $source->url = '/' . $this->model->table->name . '/' . $method;
            $source->api_url = '/' .$this->model->table->name . '/' . $method;
            $source->type = $method;
            $source->name = ucwords(str_replace('_', ' ', $method));
            if (! $source->save()) {
                throw new RepositoryFileException('Failed to write source', 500);
            }
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
//        $rolesIds = [];
//        $rolesList = [];
//        if (! $this->query->access) return true;
//        foreach ($this->query->access as $type => $roles) {
//            if ($type == 'roles') {
//                foreach ($roles as $role) {
//                    $rolesIds[] = $role;
//                    $rolesList[] = [
//                        'source_id' => $source->id,
//                        'role_id' => $role
//                    ];
//                }
//            }
//        }
//        try {
//            SourceRole::where('source_id', $source->id)->delete();
//            SourceRole::insert($rolesList);
//        } catch (\Exception $e) {
//            return false;
//        }
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
        if (! $this->query->access) return true;
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
                            $sourcePermission->update($permissionData);
                        } else {
                            $sourcePermission = new SourcePermission($permissionData);
                            $sourcePermission->save();
                        }
                    }
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
        foreach ($aggregates as $aggregate) {
            $aggregatesList[] = $aggregate['type'] . "({$aggregate['column']}) as {$aggregate['alias']}";
        }
        $this->queryBody->aggregates = '->selectRaw(\'' . implode(', ', $aggregatesList) . '\')' . "\n";
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
        if (! $this->query->joins) {
            $this->reset();
            $threeTabs = $this->threeTabs;
        }
        $this->queryBody->columns = $columns
            ? "{$threeTabs}->select(['" . implode("','", $columns) . "'])\n"
            : 'select(\'*\')';
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
        $this->queryBody->conditions = implode("{$this->threeTabs}",$this->queryBody->conditions);
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
        if (! $relations) return $this;
        $eol = (count($relations) > 1) ? "\n" : null;
        $tab = (count($relations) > 1) ? "{$this->tabIndent}" : null;
        $this->queryBody->relations = "->with([$eol$tab$tab$tab$tab'"
            . implode("',$eol$tab$tab$tab$tab'", $relations) . "'$eol$tab$tab$tab])\n";
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
        $value = '\'' . $cond['value'] . '\'';
        $condition .= "['{$cond['column']}'," . "'{$cond['operator']}'," . $value . "]";
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
        $value = '\'' . $cond['value'] . '\'';
        $condition = 'orWhere(';
        $condition .= "'{$cond['column']}'," . "'{$cond['operator']}'," . $value . ")";
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
        $conditionList[] = "{$prefix}here{$isNot}Between('{$cond['column']}'," . "[{$values}])";
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
        $conditionList[] = "{$prefix}here{$isNot}In('{$cond['column']}'," . "[{$values}])";
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить условия по различным типам даты и времени
     * Типы: Date / Month / Day / Year / Time / Datetime
     *
     * @param $conditions
     * @return $this
     */
    public function getWhereDateConditions($cond)
    {
        if (! $cond) return $this;
        $conditionList = [];
        $whereType = $cond['type'] != 'datetime' ? ucfirst($cond['type']) : null;
        $conditionList[] = "where{$whereType}('{$cond['column']}'," . "'{$cond['operator']}'," . "'{$cond['value']}')";
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
        $prefix = isset($cond['or']) ? 'orW': 'w';
        $condition .= "{$prefix}hereColumn([";
        $condition .= "['{$cond['first_column']}',"
            . "'{$cond['operator']}'," . "'{$cond['second_column']}']";
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
        $isNot = isset($cond['not']) ? 'Not' : null;
        $prefix = isset($cond['or']) ? 'orW' : 'w';
        $condition = "{$prefix}here{$isNot}Null('{$cond['column']}')";
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
        foreach ($orders as $order) {
            $ordersList[] = "orderBy('{$order['column']}', '{$order['type']}')";
        }
        $this->queryBody->orders = '->' . implode("\n{$this->threeTabs}->", $ordersList) . "\n";
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
        $groupsList = "->groupBy('" . implode("','", $types) ."')\n";
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
        $this->queryBody->offset = "->offset($offset)\n";
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
        $this->queryBody->limit = "->limit($limit)\n";
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
        $this->reset();
        $joinList = [];
        foreach ($joins as $item => $join) {
            if ($join['type'] == 'inner_join') {
                $joinList[] = "join('{$join['target_table']}','{$join['source_table']}.{$join['source_column']}',"
                    . "'{$join['operator']}','{$join['target_table']}.{$join['target_column']}'";
            } elseif ($join['type'] == 'left_join') {
                $joinList[] = "leftJoin('{$join['target_table']}','{$join['source_table']}.{$join['source_column']}',"
                    . "'{$join['operator']}','{$join['target_table']}.{$join['target_column']}'";
            } elseif ($join['type'] == 'right_join') {
                $joinList[] = "rightJoin('{$join['target_table']}','{$join['source_table']}.{$join['source_column']}',"
                    . "'{$join['operator']}','{$join['target_table']}.{$join['target_column']}'";
            }
        }
        $this->queryBody->joins = "{$this->threeTabs}->" . implode("\n{$this->threeTabs}->",$joinList) . "\n";

        return $this;
    }
}
