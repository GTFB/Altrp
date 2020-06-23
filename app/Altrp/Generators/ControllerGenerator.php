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
        
        
        $this->controllerModel->table_id = $this->data->controller->table_id;
        $this->controllerModel->description = $this->data->controller->description ?? '';
        
        $controller = Controller::where('table_id', $this->controllerModel->table()->first()->id)->first();

        $this->prefix = $this->data->controller->prefix ?? $this->prefix;
        $this->validationRules = $this->data->controller->validations ?? $this->validationRules;
        $this->path = $this->data->controller->path;

        if ($controller) {
            $controller->delete();
            $this->setController($controller);
        }

        if (isset($this->data->controller->namespace)) {
            $this->namespace = $this->screenBacklashes($this->data->controller->namespace);
        }
        
        $this->controllerName = $this->namespace
            . '\\' . $this->controllerModel->table()->first()->models()->first()->name
            . 'Controller';

        $this->controllerFilename = 'app/Http/Controllers/AltrpControllers/'
            . trim($this->path . '/' . $this->controllerModel->table()->first()->models()->first()->name, '/')
            . 'Controller.php';

        
        if (file_exists(base_path($this->controllerFilename))) {
            unlink(base_path($this->controllerFilename));
        }
        
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

        $validations = $this->validationsToString();

        $crudName = $this->toSnakeCase($modelName);
        
        
        
        if(isset($this->namespace) && !empty($this->namespace)) {
            $this->namespace = 'Http\\Controllers\\'.$this->namespace;
            
        }
        
        try {
            Artisan::call('crud:controller', [
                'name' => $modelName.'Controller',
                '--crud-name' => $crudName,
                '--model-name' => $modelName,
                '--controller-namespace' => $this->namespace,
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
