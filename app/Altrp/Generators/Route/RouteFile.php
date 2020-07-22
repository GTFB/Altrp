<?php


namespace App\Altrp\Generators\Route;


use Illuminate\Database\Eloquent\Model;

class RouteFile
{
    protected $name;

    protected $namespace;

    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function getModel()
    {
        return $this->model;
    }

    public function getModelName()
    {
        return $this->model->name;
    }

    public function getFile()
    {
        return base_path('routes/AltrpRoutes.php');
    }
}
