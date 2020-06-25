<?php

namespace App\Altrp\Generators;

use App\Altrp\Controller;
use Artisan;

class ControllerGenerator extends AppGenerator
{
    /**
     * @var Controller
     */
    private $controllerModel;

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
     * Данные, необходимые для генерации контроллера
     *
     * @var object
     */
    private $data;

    /**
     * Валидационные правила
     *
     * @var $array
     */
    private $validationRules;

    public function __construct(Controller $controller, $data)
    {
        $this->controllerModel = $controller;

        if (is_array($data)) {
            $obj = new \stdClass;
            $this->data = $this->convertToObject($data, $obj);
        } else {
            $this->data = json_decode($data);
        }
    }

    /**
     * Сгенерировать новый контроллер
     *
     * @return boolean
     */
    public function generate()
    {
        // Записать контроллер в таблицу
        if(! $this->writeController()) return false;

        // Сгенерировать новый контроллер
        if (! $this->runCreateCommand()) return false;

        // Сгенерировать маршрут
        if (! $this->generateRoutes()) return false;

        return true;
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
     * Добавить контроллер в таблицу контроллеров
     *
     * @return boolean
     */
    private function writeController()
    {
        $controller = Controller::where('table_id', $this->data->controller->table_id)->first();

        if ($controller) {

            $controllerFile = $this->getFormedFileName($controller);

            if (file_exists(app_path($controllerFile))) {
                unlink(app_path($controllerFile));
            }

            $controller->delete();

            $this->setController($controller);
        }

        $this->controllerModel->table_id = $this->data->controller->table_id;
        $this->controllerModel->description = $this->data->controller->description ?? '';
        $this->controllerModel->namespace = $this->data->controller->namespace ?? '';
        $this->prefix = $this->data->controller->prefix ?? $this->prefix;
        $this->validationRules = $this->data->controller->validations ?? $this->validationRules;

        $this->controllerName = $this->getFormedControllerName($this->controllerModel);

        return $this->controllerModel->save();
    }


    /**
     * Запустить artisan команду для генерации контроллера
     *
     * @return boolean
     */
    public function runCreateCommand()
    {
        $modelName = $this->controllerModel->table()->first()->models()->first()->name;

        $modelPath = $this->controllerModel->table()->first()->models()->first()->path
            ? $this->controllerModel->table()->first()->models()->first()->path . '\\' : '';

        $modelNamespace = 'AltrpModels\\' . $modelPath;

        $validations = $this->validationsToString();

        $crudName = $this->toSnakeCase($modelName);

        $namespace = $this->getNamespace($this->controllerModel);

        try {
            Artisan::call('crud:controller', [
                'name' => $modelName.'Controller',
                '--crud-name' => $crudName,
                '--model-name' => $modelName,
                '--model-namespace' => $modelNamespace,
                '--controller-namespace' => $namespace,
                '--route-group' => $this->prefix,
                '--validations' => $validations
            ]);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Сгенерировать маршрут
     *
     * @return bool
     */
    protected function generateRoutes()
    {
        $routeGenerator = new RouteGenerator();
        $tableName = $this->controllerModel->table()->first()->name;
        $controller = trim($this->controllerName,"\\");
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
     * @return string
     */
    private function validationsToString()
    {
        if ((array) $this->validationRules) {
            $validationArr = [];

            foreach ($this->validationRules as $name => $rules) {
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
