<?php


namespace App\Altrp\Generators\Observer;


use Illuminate\Database\Eloquent\Model;

class ObserverFile
{
    protected $name;

    protected $namespace;

    protected $path;

    protected $model;

    public function __construct(Model $model, $path = null)
    {
        $this->model = $model;
        if (! $path) {
            $this->path = config('altrp.admin.observers_path');
        }
        $this->name = $model->name . 'Observer';
        $this->namespace = 'App\\Observers\\AltrpObservers\\' . $this->name;
    }

    public function getModel()
    {
        return $this->model;
    }

    public function getNamespace()
    {
        return $this->namespace;
    }

    public function getFile()
    {
        return base_path($this->path . '/' . $this->name . '.php');
    }
}
