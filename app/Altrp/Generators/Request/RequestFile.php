<?php


namespace App\Altrp\Generators\Request;


class RequestFile
{
    private $name;

    private $validations;

    private $model;

    public function __construct($model, $name, $validations)
    {
        $this->name = $name;
        $this->validations = $validations;
        $this->model = $model;
    }

    public function getName()
    {
        return $this->getModelName() . $this->name;
    }

    public function getValidations()
    {
        return $this->validations;
    }

    public function getModelName()
    {
        return $this->model->name;
    }

    public function getModelPath()
    {
        return $this->model->path;
    }

    public function getModelNamespace()
    {
        return trim($this->model->path . '\\' . $this->model->name, '\\');
    }

    public function getFile()
    {
        return app_path('Http/Requests/AltrpRequests/'
            . str_replace('\\', '/', $this->getModelNamespace()) . $this->name . 'Request.php');
    }
}
