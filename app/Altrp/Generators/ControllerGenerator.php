<?php

namespace App\Altrp\Generators;

use App\Altrp\Controller;
use App\Exceptions\CommandFailedException;
use App\Exceptions\ControllerNotWrittenException;
use App\Exceptions\RouteGenerateFailedException;
use Artisan;

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
     */
    public function generate()
    {
        $controllerModel = $this->getControllerFromDb($this->data->table_id);

        if ($controllerModel) {
            $this->setController($controllerModel);
            $this->controllerFilename = $this->getFormedFileName($controllerModel);
            $this->controllerFile = app_path($this->controllerFilename);

            if (! $this->writeControllerToDb()) {
                throw new ControllerNotWrittenException('Failed to write controller to the database', 500);
            }
            if (! $this->updateControllerFile()) {
                throw new CommandFailedException('Failed to update controller file', 500);
            }
            if (! $this->generateRoutes()) {
                throw new RouteGenerateFailedException('Failed to generate routes', 500);
            }
        } else {
            if (! $this->writeControllerToDb()) {
                throw new ControllerNotWrittenException('Failed to write controller to the database', 500);
            }
            if (! $this->createControllerFile()) {
                throw new CommandFailedException('Failed to create controller file', 500);
            }
            if (! $this->generateRoutes()) {
                throw new RouteGenerateFailedException('Failed to generate routes', 500);
            }
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
        return $this->controllerModel->table()->first()->models()->first()->name;
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
        return $this->controllerModel->table()->first()->models()->first()->path
            ? $this->controllerModel->table()->first()->models()->first()->path . '\\'
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
        $controllerName = $this->getFormedControllerName($this->controllerModel);
        $controller = trim($controllerName,"\\");
        $prefix = $this->getRoutePrefix() ? trim($this->getRoutePrefix(), '/') . '/' : null;
        $routeGenerator->addDynamicVariable('routePrefix', $prefix);
        $routeGenerator->addDynamicVariable('tableName', $tableName);
        $routeGenerator->addDynamicVariable('controllerName', $controller);
        return $routeGenerator->generate();
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
            . '/' . $controller->table()->first()->models()->first()->name, '/')
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
                . $controller->table()->first()->models()->first()->name, '\\')
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
}
