<?php


namespace App\Altrp\Builders;


use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Generators\Controller\ControllerFileWriter;
use App\Altrp\Generators\Repository\RepositoryFile;
use App\Altrp\Generators\Repository\RepositoryFileWriter;
use App\Altrp\Generators\Repository\RepositoryInterfaceFile;
use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Generators\Route\RouteFileWriter;
use App\Altrp\Query;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Exceptions\Repository\RepositoryFileException;
use Illuminate\Support\Str;

class QueryBuilder
{
    /**
     * Запрос
     *
     * @var array
     */
    protected $query = [];

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
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Построить запрос
     *
     * @return bool
     * @throws RepositoryFileException
     * @throws \App\Exceptions\Controller\ControllerFileException
     */
    public function build()
    {
        foreach ($this->data as $item => $value) {
            switch ($item) {
                case 'columns':
                    $this->query[] = $this->getColumns($value);
                    break;
                case 'aggregates':
                    $this->query[] = $this->getAggregates($value);
                    break;
                case 'conditions':
                    $this->query[] = $this->getConditions($value);
                    break;
                case 'relations':
                    $this->query[] = $this->getRelations($value);
                    break;
                case 'order_by':
                    $this->query[] = $this->getOrders($value);
                    break;
                case 'group_by':
                    $this->query[] = $this->getGroupTypes($value);
                    break;
                case 'offset':
                    $this->query[] = $this->getOffset($value);
                    break;
                case 'limit':
                    $this->query[] = $this->getLimit($value);
                    break;
                case 'distinct':
                    $this->query[] = $this->getDistinct($value);
                    break;
            }
        }

        if (! $this->existsNotGetableData()) $this->query[] = "->get();\n";

        $methodBody = $this->getMethodBody();

        $source = $this->writeSource($this->getMethodName());

        $this->saveQuery($source);

        if (isset($this->data['access'])) {
            $this->writeSourceRoles($source);
            $this->writeSourcePermissions($source);
        }

        $this->writeMethodToController();

        $this->writeMethodToRepo($methodBody);

        $this->writeRoute();

        return true;
    }

    /**
     * Получить сформированный метод с SQL запросом
     *
     * @return string
     */
    protected function getMethodBody()
    {
        $methodBody = "\n\n{$this->tabIndent}public function " . $this->getMethodName() . "()\n{$this->tabIndent}{\n"
            . "{$this->tabIndent}{$this->tabIndent}return \$this->model()\n"
            . implode("{$this->threeTabs}",$this->query) . $this->tabIndent . "}{$this->tabIndent}";
        return $methodBody;
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
     */
    protected function writeRoute()
    {
        $routeFile = new RouteFile($this->data['model']);
        $controllerFile = new ControllerFile($this->data['model']);
        $fileWriter = new RouteFileWriter($routeFile, $controllerFile);
        $fileWriter->addRoute($this->getMethodName());
    }

    /**
     * Записать метод в файл репозитория
     *
     * @param $method
     * @throws \App\Exceptions\Repository\RepositoryFileException
     */
    protected function writeMethodToRepo($method)
    {
        $repoInterfaceFile = new RepositoryInterfaceFile($this->data['model']);
        $repoFile = new RepositoryFile($this->data['model']);
        $fileWriter = new RepositoryFileWriter(
            $repoFile,
            $repoInterfaceFile
        );
        $fileWriter->addMethod($this->getMethodName(), $method);
    }

    /**
     * Записать метод в файл контроллера
     *
     * @throws \App\Exceptions\Controller\ControllerFileException
     */
    protected function writeMethodToController()
    {
        $controllerFile = new ControllerFile($this->data['model']);
        $repoFile = new RepositoryFile($this->data['model']);
        $repoInterfaceFile = new RepositoryInterfaceFile($this->data['model']);
        $fileWriter = new ControllerFileWriter(
            $controllerFile,
            $repoFile,
            $repoInterfaceFile
        );
        $fileWriter->addMethod($this->getMethodName());
    }

    /**
     * Записать ресурс
     *
     * @param string $method
     * @return mixed
     */
    protected function writeSource($method)
    {
        $method = Str::kebab($method);
        $modelId = $this->data['model']->id;
        $controllerId = $this->data['model']->table->controllers()->first()->id;
        $source = Source::where([
            ['model_id', $modelId],
            ['controller_id', $controllerId],
            ['type', $method]
        ])->first();
        if (! $source) {
            $source =  new Source();
            $source->model_id = $modelId;
            $source->controller_id = $controllerId;
            $source->url = '/ajax/models/' . $this->data['model']->table->name . '/' . $method;
            $source->api_url = '/api/ajax/models/' . $this->data['model']->table->name . '/' . $method;
            $source->type = $method;
            $source->name = ucwords(str_replace('-', ' ', $method));
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
    protected function writeSourceRoles($source)
    {
        $rolesIds = [];
        $rolesList = [];
        foreach ($this->data['access'] as $type => $roles) {
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
        SourceRole::whereIn('role_id', $rolesIds)->whereIn('source_id', [$source->id])->delete();
        SourceRole::insert($rolesList);
    }

    /**
     * Записать права доступа ресурса
     *
     * @param Source $source
     * @return bool
     */
    protected function writeSourcePermissions($source)
    {
        $permissionIds = [];
        $permissionsList = [];
        foreach ($this->data['access'] as $type => $permissions) {
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
        SourcePermission::whereIn('permission_id', $permissionIds)->whereIn('source_id', [$source->id])->delete();
        SourcePermission::insert($permissionsList);
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
    protected function getMethodName()
    {
        return $this->data['name'];
    }

    /**
     * Получить своойство, удаляющее дублткаты
     *
     * @param $distinct
     * @return string
     */
    protected function getDistinct($distinct)
    {
        return '->distinct()' . "\n";
    }

    /**
     * Сформировать и получить агрегатную выборку
     *
     * @param array $aggregates
     * @return string
     */
    protected function getAggregates($aggregates)
    {
        $aggregatesList = [];
        foreach ($aggregates as $aggregate) {
            $aggregatesList[] = $aggregate['type'] . "({$aggregate['column']}) as {$aggregate['alias']}";
        }
        return '->selectRaw(\'' . implode(', ', $aggregatesList) . '\')' . "\n";
    }

    /**
     * Получить выбираемые колонки
     *
     * @param $columns
     * @return string
     */
    protected function getColumns($columns)
    {
        if (! $columns) return 'select(\'*\')';
        return "{$this->threeTabs}->select(['" . implode("','", $columns) . "'])\n";
    }

    /**
     * Сформировать список всех условий
     *
     * @param $conditions
     * @return string
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
        return implode("{$this->threeTabs}",$conditionsList);
    }

    /**
     * Получить связи с другими таблицами
     *
     * @param $relations
     * @return string
     */
    protected function getRelations($relations)
    {
        $eol = (count($relations) > 1) ? "\n" : null;
        $tab = (count($relations) > 1) ? "{$this->tabIndent}" : null;
        return "->with([$eol$tab$tab$tab$tab'"
            . implode("',$eol$tab$tab$tab$tab'", $relations) . "'$eol$tab$tab$tab])\n";
    }

    /**
     * Получить список условий
     *
     * @param $conditions
     * @return string
     */
    protected function getWhereConditions($conditions)
    {
        $condition = 'where([';
        $loop = 1;
        foreach ($conditions as $cond) {
            $value = $cond['value'] != 'CURRENT_USER' ? "'{$cond['value']}'" : 'auth()->user()->id';
            if (count($conditions) > 1 && $loop == 1) $condition .= "\n{$this->threeTabs}{$this->tabIndent}";
            $condition .= "['{$cond['column']}'," . "'{$cond['operator']}'," . $value . "], ";
            if (count($conditions) > 1 && count($conditions) != $loop)
                $condition .= "\n{$this->threeTabs}{$this->tabIndent}";
            $loop++;
        }
        $condition = trim($condition, ', ');
        $condition .= (count($conditions) > 1) ? "\n{$this->threeTabs}])" : "])";
        return '->' . $condition . "\n";
    }

    /**
     * Получить список условий с пометкой ИЛИ
     *
     * @param $conditions
     * @return string
     */
    protected function getOrWhereConditions($conditions)
    {

        $conditionList = [];
        //        if (count($conditions) < 2)
        //            return 'orWhere(' . "'{$conditions[0]['column']}'," . "'{$conditions[0]['operator']}'," . "'{$conditions[0]['value']}')";

        $loop = 1;
        foreach ($conditions as $cond) {
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

            $value = $cond['value'] != 'CURRENT_USER' ? "'{$cond['value']}'" : 'auth()->user()->id';
            if (isset($cond['or_where'])) {
                $condition = 'orWhere(function ($query) {' . "\n";
                if (count($conditions) > 1 && $loop == 1) $condition .= "{$this->threeTabs}\$query";
                $condition .= "->orWhere('{$cond['column']}'," . "'{$cond['operator']}'," . $value . ")";
                if (count($conditions) > 1 && count($conditions) != $loop) $condition .= "\n{$this->threeTabs}";
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

        return "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
    }

    /**
     * Получить условия сравнения значения колонки с диапазоном двух значений
     * Поддержка условия - OR, а также отрицания - NOT
     *
     * @param $conditions
     * @return string
     */
    protected function getWhereBetweenConditions($conditions)
    {
        $conditionList = [];
        foreach ($conditions as $cond) {
            $prefix = $cond['or'] ? 'orW' : 'w';
            $isNot = $cond['not'] ? 'Not' : null;
            $values = array_map(function ($item) {
                if(is_string($item)) return "'$item'";
                return $item;
            }, $cond['values']);
            $values = implode(',', $values);
            $conditionList[] = "{$prefix}here{$isNot}Between('{$cond['column']}'," . "[{$values}])";
        }
        return "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
    }

    /**
     * Получить условия сравнения значения колонки со списком значений
     * Поддержка условия - OR, а также отрицания - NOT
     *
     * @param $conditions
     * @return string
     */
    protected function getWhereInConditions($conditions)
    {
        $conditionList = [];
        foreach ($conditions as $cond) {
            $isNot = $cond['not'] ? 'Not' : null;
            $prefix = $cond['or'] ? 'orW' : 'w';
            $values = array_map(function ($item) {
                if(is_string($item)) return "'$item'";
                return $item;
            }, $cond['values']);
            $values = implode(',', $values);
            $conditionList[] = "{$prefix}here{$isNot}In('{$cond['column']}'," . "[{$values}])";
        }
        return "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
    }

    /**
     * Получить условия по различным типам даты и времени
     * Типы: Date / Month / Day / Year / Time
     *
     * @param $conditions
     * @return string
     */
    protected function getWhereDateConditions($conditions)
    {
        $conditionList = [];
        foreach ($conditions as $cond) {
            $whereType = 'where' . ucfirst($cond['type']);
            $conditionList[] = "{$whereType}('{$cond['column']}'," . "'{$cond['operator']}'," . "'{$cond['value']}')";
        }
        return "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
    }

    /**
     * Получить условия сравнения колонок между собой
     *
     * @param $conditions
     * @return string
     */
    protected function getWhereColumnConditions($conditions)
    {
        $conditionList = [];
        $condition = '';
        $loop = 1;
        foreach ($conditions as $cond) {
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
        return "->" . implode("\n{$this->threeTabs}->",$conditionList) . "\n";
    }

    /**
     * Получить сортировки по полям
     *
     * @param $orders
     * @return string
     */
    protected function getOrders($orders)
    {
        $ordersList = [];
        foreach ($orders as $order) {
            $ordersList[] = "orderBy('{$order['column']}', '{$order['type']}')";
        }
        return '->' . implode("\n{$this->threeTabs}->", $ordersList) . "\n";
    }

    /**
     * Получить группировку по полям
     *
     * @param $types
     * @return string
     */
    protected function getGroupTypes($types)
    {
        $groupsList = "->groupBy('" . implode("','", $types) ."')\n";
        return $groupsList;
    }

    /**
     * Получить смещение выборки
     *
     * @param $offset
     * @return string
     */
    protected function getOffset($offset)
    {
        return "->offset($offset)\n";
    }

    /**
     * Получить лимит выборки
     *
     * @param $limit
     * @return string
     */
    protected function getLimit($limit)
    {
        return "->limit($limit)\n";
    }
}
