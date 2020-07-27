<?php

namespace App\Altrp\Generators;

use App\Altrp\Controller;
use App\Altrp\Generators\Request\RequestFile;
use App\Altrp\Generators\Request\RequestFileWriter;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Exceptions\CommandFailedException;
use App\Exceptions\ControllerNotWrittenException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\RouteGenerateFailedException;
use Artisan;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ControllerGenerator extends AppGenerator
{
    /**
     * @var Controller
     */
    protected $controllerModel;

    /**
     * Данные, необходимые для генерации контроллера
     *
     * @var object
     */
    protected $data;

    /**
     * Пространство имен контроллера
     *
     * @var string
     */
    private $namespace = '';

    /**
     * Префикс для группы маршрутов
     *
     * @var string|null
     */
    private $prefix = null;

    /**
     * Имя файла контроллера
     *
     * @var string
     */
    private $controllerFilename;

    /**
     * Файл контроллера
     *
     * @var string
     */
    private $controllerFile;

    /**
     * ControllerGenerator constructor.
     * @param $data
     */
    public function __construct($data)
    {
        $this->controllerModel = new Controller();
        parent::__construct($data);
    }

    /**
     * Изменить текущий контроллер
     *
     * @param Controller $controller
     */
    public function setController(Controller $controller)
    {
        $this->controllerModel = $controller;
    }

    /**
     * Сгенерировать новый контроллер
     *
     * @return bool
     *
     * @throws CommandFailedException
     * @throws ControllerNotWrittenException
     * @throws RouteGenerateFailedException
     * @throws ModelNotWrittenException
     */
    public function generate()
    {
        // Получить контроллер из базы
        $controllerModel = $this->getControllerFromDb($this->data->table_id);

        if ($controllerModel) {
            $this->setController($controllerModel);
            $this->controllerFilename = $this->getFormedFileName($controllerModel);
            $this->controllerFile = app_path($this->controllerFilename);

            // Обновить контроллер в базе
            if (! $this->writeControllerToDb()) {
                throw new ControllerNotWrittenException('Failed to write controller to the database', 500);
            }
            if (! $this->generateRequests()) {
                throw new ControllerNotWrittenException('Failed to generate requests', 500);
            }
            // Обновить файл контроллера
            if (! $this->updateControllerFile()) {
                throw new CommandFailedException('Failed to update controller file', 500);
            }
        } else {
            // Записать конроллер в базу
            if (! $this->writeControllerToDb()) {
                throw new ControllerNotWrittenException('Failed to write controller to the database', 500);
            }
            if (! $this->generateRequests()) {
                throw new ControllerNotWrittenException('Failed to generate requests', 500);
            }
            // Создать новый файл контроллера
            if (! $this->createControllerFile()) {
                throw new CommandFailedException('Failed to create controller file', 500);
            }
        }

        if ($this->getSourceActions()->isEmpty()) {
            // Записать основные действия над ресурсом в базу
            if (! $this->writeSourceActions()) {
                throw new ModelNotWrittenException('Failed to write source action to the database', 500);
            }
        }

        // Записать роли для действий над ресурсами в базу
        if (! $this->writeSourceRoles()) {
            throw new ModelNotWrittenException('Failed to write source roles to the database', 500);
        }

        // Записать права доступа к ресурсам в базу
        if (! $this->writeSourcePermissions()) {
            throw new ModelNotWrittenException('Failed to write source permissions to the database', 500);
        }

        // Сгенерировать маршруты для ресурса
        if (! $this->generateRoutes()) {
            throw new RouteGenerateFailedException('Failed to generate routes', 500);
        }

        return true;
    }

    /**
     * Сохранить контроллер в базе данных
     *
     * @return bool
     */
    protected function writeControllerToDb()
    {
        $attributes = json_decode(json_encode($this->data), true);

        $this->controllerModel->fill($attributes);

        try {
            $this->controllerModel->save();
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    /**
     * Получить контроллер из БД по id таблицы
     *
     * @param $tableId
     * @return mixed
     */
    protected function getControllerFromDb($tableId)
    {
        $controller = Controller::where('table_id', $tableId)->first();
        return $controller;
    }

    /**
     * Записать в таблицу действий над ресурсами основные действия
     *
     * @return bool
     */
    protected function writeSourceActions()
    {
        $actions = ['get', 'show', 'add', 'update', 'delete'];
        $sources = [];
        $tableName = $this->getTableName();
        $singleResource = Str::singular($tableName);
        $nowTime = Carbon::now();
        foreach ($actions as $action) {
            if ($action == 'get') {
                $url = $tableName;
                $name = ucfirst($action) . ' ' . Str::studly($tableName);
            } else {
                $url = $tableName . "/{{$singleResource}}";
                $name = ucfirst($action) . ' ' . Str::studly($singleResource);
            }
            $sources[] = [
                "model_id" => $this->getModelId(),
                "controller_id" => $this->controllerModel->id,
                "url" => '/ajax/models/' . $url,
                "api_url" => '/api/ajax/models/' . $url,
                "type" => $action,
                "name" => $name,
                "created_at" => $nowTime,
                "updated_at" => $nowTime
            ];
        }

        try {
            Source::insert($sources);
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }

    /**
     * Записать в БД роли пользователей принадлежащих ресурсу
     *
     * @return bool
     */
    protected function writeSourceRoles()
    {
        $sourceRoles = $this->getAccessRoles();

        $roleIds = Arr::pluck($sourceRoles, 'role_id');
        $sourceIds = Arr::pluck($sourceRoles, 'source_id');

        if ($sourceRoles) {
            try {
                SourceRole::whereIn('role_id', $roleIds)->whereIn('source_id', $sourceIds)->delete();
                SourceRole::insert($sourceRoles);
            } catch (\Exception $e) {
                return false;
            }
        }
        return true;
    }

    /**
     * Записать в БД права доступа принадлежащие ресурсу
     *
     * @return bool
     */
    protected function writeSourcePermissions()
    {
        $sourcePermissions = $this->getAccessPermissions();

        $permissionIds = Arr::pluck($sourcePermissions, 'permission_id');
        $sourceIds = Arr::pluck($sourcePermissions, 'source_id');

        if ($sourcePermissions) {
            try {
                SourcePermission::whereIn('permission_id', $permissionIds)->whereIn('source_id', $sourceIds)->delete();
                SourcePermission::insert($sourcePermissions);
            } catch (\Exception $e) {
                return false;
            }
        }
        return true;
    }

    /**
     * Получить коллекцию действий ресурса
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    protected function getSourceActions()
    {
        return $this->controllerModel->sources()->get();
    }

    /**
     * Запустить artisan команду для генерации контроллера
     *
     * @return boolean
     */
    public function createControllerFile()
    {
        $modelName = $this->getModelName();
        $modelPath = $this->getModelPath();
        $prefix = $this->getRoutePrefix();
        $modelNamespace = 'AltrpModels\\' . $modelPath;
        $validations = $this->validationsToString($this->getValidationRules());
        $crudName = $this->toSnakeCase($this->getTableName());
        $namespace = $this->getNamespace($this->controllerModel);
        $relations = $this->getRelations();
        $customCode = $this->getCustomCode($this->controllerFile);

        try {
            Artisan::call('crud:controller', [
                'name' => $modelName.'Controller',
                '--crud-name' => $crudName,
                '--model-name' => $modelName,
                '--model-namespace' => $modelNamespace,
                '--controller-namespace' => $namespace,
                '--route-group' => $prefix,
                '--validations' => $validations,
                '--relations' => $relations,
                '--custom-namespaces' => $this->getCustomCodeBlock($customCode,'custom_namespaces'),
                '--custom-traits' => $this->getCustomCodeBlock($customCode,'custom_traits'),
                '--custom-properties' => $this->getCustomCodeBlock($customCode,'custom_properties'),
                '--custom-methods' => $this->getCustomCodeBlock($customCode,'custom_methods')
            ]);
        } catch (\Exception $e) {
            if(file_exists($this->controllerFile . '.bak'))
                rename($this->controllerFile . '.bak', $this->controllerFile);
            return false;
        }

        if(file_exists($this->controllerFile . '.bak'))
            unlink($this->controllerFile . '.bak');
        return true;
    }

    /**
     * Сформировать список ролей доступа
     *
     * @return array
     */
    protected function getAccessRoles()
    {
        $roles = [];
        $nowTime = Carbon::now();
        if (isset($this->data->access) && !empty($this->data->access)) {
            $sourceActions = $this->getSourceActions();
            foreach ($this->data->access as $access) {
                if ($access->type == 'role') {
                    $sourceId = null;
                    foreach ($sourceActions as $action) {
                        if ($action->type == $access->action) {
                            $sourceId = $action->id;
                        }
                    }
                    $roles[] = [
                        'source_id' => $sourceId,
                        'role_id' => $access->id,
                        'type' => null,
                        'created_at' => $nowTime,
                        'updated_at' => $nowTime
                    ];
                }
            }
        }
        return $roles;
    }

    /**
     * Сформировать список прав доступа
     *
     * @return array
     */
    protected function getAccessPermissions()
    {
        $permissions = [];
        $nowTime = Carbon::now();
        if (isset($this->data->access) && !empty($this->data->access)) {
            $sourceActions = $this->getSourceActions();
            foreach ($this->data->access as $access) {
                if ($access->type == 'permission') {
                    $sourceId = null;
                    foreach ($sourceActions as $action) {
                        if ($action->type == $access->action) {
                            $sourceId = $action->id;
                        }
                    }
                    $permissions[] = [
                        'source_id' => $sourceId,
                        'permission_id' => $access->id,
                        'type' => null,
                        'created_at' => $nowTime,
                        'updated_at' => $nowTime
                    ];
                }
            }
        }
        return $permissions;
    }

    /**
     * Обновить файл контроллера
     *
     * @return bool
     */
    protected function updateControllerFile()
    {
        return $this->createControllerFile();
    }

    /**
     * Получить валидационные правила
     *
     * @return array
     */
    protected function getValidationRules()
    {
        return $this->data->validations ?? [];
    }

    /**
     * Получить имя модели, которую использует контроллер
     *
     * @return mixed
     */
    protected function getModelName()
    {
        return $this->controllerModel->model()->name;
    }

    /**
     * Получить ID модели, которую использует контроллер
     *
     * @return mixed
     */
    protected function getModelId()
    {
        return $this->controllerModel->model()->id;
    }

    /**
     * Получить имя таблицы, которая принадлежит контроллеру
     *
     * @return mixed
     */
    protected function getTableName()
    {
        return $this->controllerModel->table()->first()->name;
    }

    /**
     * Получить путь к файлу модели
     *
     * @return string
     */
    protected function getModelPath()
    {
        return $this->controllerModel->model()->path
            ? $this->controllerModel->model()->path . '\\'
            : '';
    }

    /**
     * Получить связи для контроллера
     *
     * @return string
     */
    protected function getRelations()
    {
        return $this->data->relations ?? '';
    }

    /**
     * Получить префикс
     *
     * @return string|null
     */
    protected function getRoutePrefix()
    {
        return $this->data->prefix ?? null;
    }

    /**
     * Сгенерировать маршруты
     *
     * @return bool
     */
    protected function generateRoutes()
    {
        $routeGenerator = new RouteGenerator();
        $tableName = $this->controllerModel->table()->first()->name;
        $resourceId = Str::singular($tableName);
        $userColumns = trim($this->controllerModel->model()->user_cols, ' ');
        $middleware = ($userColumns) ? "'middleware' => [" . $this->getAuthMiddleware() . '], ' : null;
        $controllerName = $this->getFormedControllerName($this->controllerModel);
        $controller = trim($controllerName,"\\");
        $prefix = $this->getRoutePrefix() ? '/' . trim($this->getRoutePrefix(), '/') : null;
        $access = $this->getAccessMiddleware($userColumns);
        $routeGenerator->addDynamicVariable('routePrefix', $prefix);
        $routeGenerator->addDynamicVariable('middleware', $middleware);
        $routeGenerator->addDynamicVariable('indexMiddleware', $access['get']);
        $routeGenerator->addDynamicVariable('showMiddleware', $access['show']);
        $routeGenerator->addDynamicVariable('storeMiddleware', $access['add']);
        $routeGenerator->addDynamicVariable('updateMiddleware', $access['update']);
        $routeGenerator->addDynamicVariable('destroyMiddleware', $access['delete']);
        $routeGenerator->addDynamicVariable('tableName', $tableName);
        $routeGenerator->addDynamicVariable('resourceId', $resourceId);
        $routeGenerator->addDynamicVariable('id', \Str::singular($tableName));
        $routeGenerator->addDynamicVariable('column', 'column');
        $routeGenerator->addDynamicVariable('controllerName', $controller);
        return $routeGenerator->generate($tableName, $controller);
    }

    /**
     * Сформировать и получить миддлвары доступа
     *
     * @return array
     */
    protected function getAccessMiddleware($userColumns)
    {
        $sources = $this->controllerModel->sources()->get();
        $ability = [];
        foreach ($sources as $source) {
            $ability[$source->type] = [];
            foreach ($source->source_roles->all() as $sourceRole) {
                $ability[$source->type]['roles'][] = $sourceRole->role()->first()->name;
            }

            if (isset($ability[$source->type]['roles'])) {
                $ability[$source->type]['roles'] = implode('|',$ability[$source->type]['roles']);;
            }

            foreach ($source->source_permissions->all() as $sourcePermission) {
                $ability[$source->type]['permissions'][] = $sourcePermission->permission()->first()->name;
            }

            if (isset($ability[$source->type]['permissions'])) {
                $ability[$source->type]['permissions'] = implode('|',$ability[$source->type]['permissions']);;
            }
        }

        $middleware = [];
        $authMiddleware = $userColumns ? $this->getAuthMiddleware() . ',' : null;
        foreach ($ability as $action => $access) {
            $middleware[$action] = implode(',', $access);

            if ($middleware[$action]) $middleware[$action] = "'middleware' => ["
                . $authMiddleware . "'ability:" . $middleware[$action] . "'], ";
            else {
                if ($userColumns) {
                    $middleware[$action] = "'middleware' => [" . $authMiddleware . '], ';
                } else {
                    $middleware[$action] = null;
                }
            }
        }
        return $middleware;
    }

    /**
     * Получить middleware
     *
     * @return string|null
     */
    protected function getAuthMiddleware()
    {
        $middlewares = ['auth:api', 'auth'];
        if (! $middlewares) return null;
        return '\'' . implode("','", $middlewares) . '\'';
    }

    /**
     * Получить сформированное имя файла
     *
     * @param Controller $controller контроллер
     * @return string
     */
    protected function getFormedFileName(Controller $controller)
    {
        $namespace = $this->getNamespace($controller);

        $controllerFilename = trim(str_replace('\\', '/', $namespace)
            . '/' . $controller->model()->name, '/')
            . 'Controller.php';

        return $controllerFilename;
    }

    /**
     * Получить сформированный путь к файлу контроллера
     *
     * @param Controller $controller контроллер
     * @return string
     */
    protected function getFormedControllerName(Controller $controller)
    {
        $namespace = $controller->namespace ? $controller->namespace . '\\' : '';

        $controllerName = trim('AltrpControllers\\' . $namespace
                . $controller->model()->name, '\\')
                . 'Controller';

        return $controllerName;
    }

    /**
     * Получить пространство имен контроллера
     *
     * @param Controller $controller контроллер
     * @return string
     */
    protected function getNamespace(Controller $controller)
    {
        return $controller->namespace
            ? 'Http\Controllers\AltrpControllers\\' . $controller->namespace
            : 'Http\Controllers\AltrpControllers';
    }

    /**
     * Сформировать строку с валидационными правилами для artisan команды
     *
     * @param $validationRules
     * @return string
     */
    protected function validationsToString($validationRules)
    {
        if ((array) $validationRules) {
            $validationArr = [];
            foreach ($validationRules as $name => $rules) {
                $rules = (array) $rules;
                if (! empty($rules)) {
                    $validationArr[] = $name . '#' . implode('|', $rules);
                }
            }
            return implode(';', $validationArr);
        }
        return '';
    }

    /**
     * Сформировать валидационные правила для файла запроса
     *
     * @return string
     */
    protected function getValidations()
    {
        $validations = [];
        $validationRules = $this->getValidationRules();
        foreach ($validationRules as $name => $rules) {
            $validations[] = "'{$name}' => '" . implode('|', (array)$rules) . "',";
        }
        return implode(PHP_EOL . "\t\t\t", $validations);
    }

    /**
     * Сгенерировать файл запроса
     *
     * @return bool
     */
    protected function generateRequests()
    {
        $requests = ['Store', 'Update'];
        $validations = $this->getValidations();
        foreach ($requests as $name) {
            $request = new RequestFile(
                $this->controllerModel->model(),
                $name,
                $validations
            );
            $requestWriter = new RequestFileWriter();
            $requestWriter->write($request);
        }
        return true;
    }
}
