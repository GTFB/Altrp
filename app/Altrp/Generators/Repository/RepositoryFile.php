<?php


namespace App\Altrp\Generators\Repository;


use Illuminate\Database\Eloquent\Model;

class RepositoryFile
{
    protected $name;

    protected $namespace;

    protected $path;

    protected $model;

    protected $methods = '';

    const REPO_ORM = 'Eloquent';

    public function __construct(Model $model)
    {
        $this->model = $model;
        $this->name = $model . 'Repository';
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
            'App\Repositories\AltrpRepositories\\' . self::REPO_ORM . '\\' . $this->getModelPath() . '\\');
        return rtrim($namespace, '\\');
    }

    public function getFile()
    {
        return app_path('Repositories/AltrpRepositories/' . self::REPO_ORM . '/'
            . str_replace('\\', '/', $this->getModelNamespace()) . 'Repository.php');
    }
}
