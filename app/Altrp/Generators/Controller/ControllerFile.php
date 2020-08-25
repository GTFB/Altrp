<?php


namespace App\Altrp\Generators\Controller;


use Illuminate\Database\Eloquent\Model;

class ControllerFile
{
    protected $name;

    protected $namespace;

    protected $model;

    protected $path;

    protected $methods = '';

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function addMethods($methods)
    {
        $this->methods .= $methods;
    }

    public function getMethods()
    {
        return $this->methods;
    }

    public function getModelName()
    {
        return $this->model->name;
    }

    public function getTableName()
    {
        return $this->model->altrp_table->name;
    }

    public function getModelPath()
    {
        return $this->model->path;
    }

    public function getModelNamespace()
    {
        return trim($this->model->path . '\\' . $this->model->name, '\\');
    }

    public function getNamespace()
    {
        $namespace = str_replace('\\\\', '\\',
            'App\Http\Controllers\AltrpControllers\\' . $this->getModelNamespace() . '\\');
        return rtrim($namespace, '\\');
    }

    public function getFile()
    {
        return app_path('Http/Controllers/AltrpControllers/'
            . str_replace('\\', '/', $this->getModelNamespace()) . 'Controller.php');
    }
}
