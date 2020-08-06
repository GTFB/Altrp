<?php


namespace App\Altrp\Builders;


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
use App\Exceptions\Repository\RepositoryFileException;
use Illuminate\Support\Str;

class QueryBuilder2
{
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
        $query = $this->getColumns($this->query->columns)
                    ->getAggregates($this->query->aggregates)
                    ->getWhereConditions($this->query->conditions)
                    ->getOrWhereConditions($this->query->conditions)
                    ->getWhereBetweenConditions($this->query->conditions)
                    ->getWhereInConditions($this->query->conditions)
                    ->getWhereDateConditions($this->query->conditions)
                    ->getWhereColumnConditions($this->query->conditions)
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
    protected function getQueryBody()
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
        return $this->replaceConstants($methodBody);
    }

    /**
     * Заменить пользовательские константы в методе
     *
     * @param $methodBody
     * @return string|string[]
     */
    protected function replaceConstants($methodBody)
    {
        $pattern = "'?(CURRENT_[A-Z_]+|REQUEST)(:[a-z0-9_.]+)?'?";
        $methodBody = preg_replace_callback(
            "#$pattern#",
            function($matches) {
                $param = $matches[0] ? explode(':',trim($matches[0], '\'')) : null;
                if ($param && $param[0] == 'REQUEST') {
                    if ( request()->has($param[1])) {
                        return 'request()->' . $param[1];
                    } else {
                        return $param[1] == 'skip' || $param[1] == 'take' ? 10 : "''";
                    }
                }
                if ($param && $param[0] == 'CURRENT_USER') {
                    $relations = str_replace('.', '->', $param[1]);
                    return 'auth()->user()->' . $relations;
                }
                if ($param && $param[0] == 'CURRENT_DATE') {
                    return 'Carbon::now()->format(\'Y-m-d\')';
                }
                if ($param && $param[0] == 'CURRENT_DAY') {
                    return 'Carbon::now()->format(\'d\')';
                }
                if ($param && $param[0] == 'CURRENT_MONTH') {
                    return 'Carbon::now()->format(\'m\')';
                }
                if ($param && $param[0] == 'CURRENT_YEAR') {
                    return 'Carbon::now()->format(\'Y\')';
                }
                if ($param && $param[0] == 'CURRENT_HOUR') {
                    return 'Carbon::now()->format(\'H\')';
                }
                if ($param && $param[0] == 'CURRENT_MINUTE') {
                    return 'Carbon::now()->format(\'i\')';
                }
                if ($param && $param[0] == 'CURRENT_SECOND') {
                    return 'Carbon::now()->format(\'s\')';
                }
                if ($param && $param[0] == 'CURRENT_TIME') {
                    return 'Carbon::now()->format(\'H:i:s\')';
                }
                if ($param && $param[0] == 'CURRENT_DATETIME') {
                    return 'Carbon::now()->format(\'Y-m-d H:i:s\')';
                }
                if ($param && $param[0] == 'CURRENT_DAY_OF_WEEK') {
                    return 'Carbon::now()->format(\'l\')';
                }
                return "''";
            },
            $methodBody
        );
        return $methodBody;
    }

    public function deleteMethod()
    {
        return ;
    }

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
            $source->url = '/ajax/models/' . $this->model->table->name . '/' . $method;
            $source->api_url = '/api/ajax/models/' .$this->model->table->name . '/' . $method;
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
        $rolesIds = [];
        $rolesList = [];
        if (! $this->query->access) return true;
        foreach ($this->query->access as $type => $roles) {
            if ($type == 'roles') {
                foreach ($roles as $role) {
                    $rolesIds[] = $role;
                    $rolesList[] = [
                        'source_id' => $source->id,
                        'role_id' => $role
                    ];
                }
            }
        }
        try {
            SourceRole::whereIn('role_id', $rolesIds)->whereIn('source_id', [$source->id])->delete();
            SourceRole::insert($rolesList);
        } catch (\Exception $e) {
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
        $permissionIds = [];
        $permissionsList = [];
        if (! $this->query->access) return true;
        foreach ($this->query->access as $type => $permissions) {
            if ($type == 'permissions') {
                foreach ($permissions as $permission) {
                    $permissionIds[] = $permission;
                    $permissionsList[] = [
                        'source_id' => $source->id,
                        'permission_id' => $permission
                    ];
                }
            }
        }
        try {
            SourcePermission::whereIn('permission_id', $permissionIds)->whereIn('source_id', [$source->id])->delete();
            SourcePermission::insert($permissionsList);
        } catch (\Exception $e) {
            return false;
        }
        return true;
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
    protected function getAggregates($aggregates)
    {
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
    protected function getColumns($columns)
    {
        $this->reset();
        $this->queryBody->columns = $columns
            ? "{$this->threeTabs}->select(['" . implode("','", $columns) . "'])\n"
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
        $conditionsList = [];
        foreach ($conditions as $condition => $data) {
            switch ($condition) {
                case 'where':
                    $conditionsList[] = $this->getWhereConditions($data);
                    break;
                case 'or_where':
                    $conditionsList[] = $this->getOrWhereConditions($data);
                    break;
                case 'where_between':
                    $conditionsList[] = $this->getWhereBetweenConditions($data);
                    break;
                case 'where_in':
                    $conditionsList[] = $this->getWhereInConditions($data);
                    break;
                case 'where_date':
                    $conditionsList[] = $this->getWhereDateConditions($data);
                    break;
                case 'where_column':
                    $conditionsList[] = $this->getWhereColumnConditions($data);
                    break;
            }
        }
        $this->queryBody->conditions = implode("{$this->threeTabs}",$conditionsList);
        return $this;
    }

    /**
     * Получить связи с другими таблицами
     *
     * @param $relations
     * @return $this
     */
    protected function getRelations($relations)
    {
        $eol = (count($relations) > 1) ? "\n" : null;
        $tab = (count($relations) > 1) ? "{$this->tabIndent}" : null;
        $this->queryBody->relations = "->with([$eol$tab$tab$tab$tab'"
            . implode("',$eol$tab$tab$tab$tab'", $relations) . "'$eol$tab$tab$tab])\n";
        return $this;
    }

    /**
     * Получить список условий
     *
     * @param $conditions
     * @return $this
     */
    protected function getWhereConditions($conditions)
    {
        if (! $conditions['where']) return $this;
        $condition = 'where([';
        $loop = 1;
        foreach ($conditions['where'] as $cond) {
            $value = $cond['value'];
            if (count($conditions['where']) > 1 && $loop == 1) $condition .= "\n{$this->threeTabs}{$this->tabIndent}";
            $condition .= "['{$cond['column']}'," . "'{$cond['operator']}'," . $value . "], ";
            if (count($conditions['where']) > 1 && count($conditions['where']) != $loop)
                $condition .= "\n{$this->threeTabs}{$this->tabIndent}";
            $loop++;
        }
        $condition = trim($condition, ', ');
        $condition .= (count($conditions['where']) > 1) ? "\n{$this->threeTabs}])" : "])";
        $this->queryBody->conditions[] = '->' . $condition . "\n";
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
     * Получить список условий с пометкой ИЛИ
     *
     * @param $conditions
     * @return $this
     */
    protected function getOrWhereConditions($conditions)
    {
        if (! $conditions['or_where']) return $this;
        $conditionList = [];
        //        if (count($conditions) < 2)
        //            return 'orWhere(' . "'{$conditions[0]['column']}'," . "'{$conditions[0]['operator']}'," . "'{$conditions[0]['value']}')";

        $loop = 1;
        foreach ($conditions['or_where'] as $cond) {
//            $condition = 'orWhere(function ($query) {' . "\n";
//            if (count($conditions) > 1 && $loop == 1) $condition .= "    \$query";
//            $condition .= "->where('{$cond['column']}'," . "'{$cond['operator']}'," . "'{$cond['value']}')";
//            if (count($conditions) > 1 && count($conditions) != $loop) $condition .= "\n        ";
//            $loop++;
//            $condition = 'orWhere(';
//            if (count($conditions) > 1 && $loop == 1) $condition .= "    \$query";
//            $condition .= "'{$cond['column']}'," . "'{$cond['operator']}'," . "'{$cond['value']}')";

//            $conditionList[] = $condition;
//            if (count($conditions) > 1 && count($conditions) != $loop) $condition .= "\n        ";
//            $loop++;
            if (isset($cond['conditions'])) {
                $conditionList = $this->getConditions($cond['conditions']);
            }

            $value = '\'' . $cond['value'] . '\'';
            if (isset($cond['or_where'])) {
                $condition = 'orWhere(function ($query) {' . "\n";
                if (count($conditions['or_where']) > 1 && $loop == 1) $condition .= "{$this->threeTabs}\$query";
                $condition .= "->orWhere('{$cond['column']}'," . "'{$cond['operator']}'," . $value . ")";
                if (count($conditions) > 1 && count($conditions['or_where']) != $loop) $condition .= "\n{$this->threeTabs}";
//                $conditionList = $this->getOrWhereConditions($cond['or_where']);
            } else {
                $condition = 'orWhere(';
                $condition .= "'{$cond['column']}'," . "'{$cond['operator']}'," . $value . ")";
            }
            $conditionList[] = $condition;
            $loop++;
        }
//        $condition = trim($condition, ', ');
//        if (count($conditions) > 1) $condition .= "\n";
//        $condition .= '])';

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
    protected function getWhereBetweenConditions($conditions)
    {
        if (! $conditions['where_between']) return $this;
        $conditionList = [];
        foreach ($conditions['where_between'] as $cond) {
            $prefix = $cond['or'] ? 'orW' : 'w';
            $isNot = $cond['not'] ? 'Not' : null;
            $values = array_map(function ($item) {
                if(is_string($item)) return "'$item'";
                return $item;
            }, $cond['values']);
            $values = implode(',', $values);
            $conditionList[] = "{$prefix}here{$isNot}Between('{$cond['column']}'," . "[{$values}])";
        }
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить условия сравнения значения колонки со списком значений
     * Поддержка условия - OR, а также отрицания - NOT
     *
     * @param $conditions
     * @return $this
     */
    protected function getWhereInConditions($conditions)
    {
        if (! $conditions['where_in']) return $this;
        $conditionList = [];
        foreach ($conditions['where_in'] as $cond) {
            $isNot = $cond['not'] ? 'Not' : null;
            $prefix = $cond['or'] ? 'orW' : 'w';
            $values = array_map(function ($item) {
                if(is_string($item)) return "'$item'";
                return $item;
            }, $cond['values']);
            $values = implode(',', $values);
            $conditionList[] = "{$prefix}here{$isNot}In('{$cond['column']}'," . "[{$values}])";
        }
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
    protected function getWhereDateConditions($conditions)
    {
        if (! $conditions['where_date']) return $this;
        $conditionList = [];
        foreach ($conditions['where_date'] as $cond) {
            $whereType = $cond['type'] != 'datetime' ? ucfirst($cond['type']) : null;
            $conditionList[] = "where{$whereType}('{$cond['column']}'," . "'{$cond['operator']}'," . "'{$cond['value']}')";
        }
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить условия сравнения колонок между собой
     *
     * @param $conditions
     * @return $this
     */
    protected function getWhereColumnConditions($conditions)
    {
        if (! $conditions['where_column']) return $this;
        $conditionList = [];
        $condition = '';
        $loop = 1;
        foreach ($conditions['where_column'] as $cond) {
            $prefix = $cond['or'] ? 'orW': 'w';
            if ($loop == 1) $condition .= "{$prefix}hereColumn([";
            if (count($cond['data']) > 1 && $loop == 1) $condition .= "\n{$this->threeTabs}{$this->tabIndent}";
            foreach ($cond['data'] as $data) {
                $condition .= "['{$data['first_column']}',"
                    . "'{$data['operator']}'," . "'{$data['second_column']}'],";
                if (count($cond['data']) > 1 && count($cond['data']) != $loop)
                    $condition .= "\n{$this->threeTabs}{$this->tabIndent}";
                $loop++;
            }
            $condition = trim($condition, ', ');
            $condition .= (count($cond['data']) > 1) ? "\n{$this->threeTabs}])" : "])";
            $conditionList[] = $condition;
            $condition  = '';
            $loop = 1;
        }
        $this->queryBody->conditions[] = "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
        return $this;
    }

    /**
     * Получить сортировки по полям
     *
     * @param $orders
     * @return $this
     */
    protected function getOrders($orders)
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
    protected function getGroupTypes($types)
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
    protected function getOffset($offset)
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
    protected function getLimit($limit)
    {
        if (! $limit) return $this;
        $this->queryBody->limit = "->limit($limit)\n";
        return $this;
    }
}
