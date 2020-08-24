<?php


namespace App\Altrp\Generators\Repository;


use Illuminate\Database\Eloquent\Model;

class RepositoryInterfaceFile
{
    protected $name;

    protected $namespace;

    protected $path;

    protected $model;

    protected $methods = [];

    /**
     * RepositoryInterfaceFile constructor.
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
        $this->name = $model . 'RepositoryInterface';
    }

    /**
     * Добавить методы в репозиторий
     *
     * @param $methods
     */
    public function addMethods($methods)
    {
        $this->methods[] = $methods;
    }

    /**
     * Получить методы из репозитория
     *
     * @return string
     */
    public function getMethods()
    {
        return trim(implode(PHP_EOL . '    ', $this->methods), "    \n\r");
    }

    /**
     * Получить имя модели
     *
     * @return mixed
     */
    public function getModelName()
    {
        return $this->model->name;
    }

    /**
     * Получить путь модели
     *
     * @return mixed
     */
    public function getModelPath()
    {
        return $this->model->path;
    }

    /**
     * Получить пространство имен модели
     *
     * @return string
     */
    protected function getModelNamespace()
    {
        return trim($this->model->path . '\\' . $this->model->name, '\\');
    }

    /**
     * Получить пространство имен репозитория
     *
     * @return string
     */
    public function getNamespace()
    {
        $namespace = str_replace('\\\\', '\\', 'App\Repositories\AltrpRepositories\Interfaces'
            . '\\' . $this->getModelPath());
        return rtrim($namespace, '\\');
    }

    /**
     * Получить файл репозитория
     *
     * @return string
     */
    public function getFile()
    {
        return app_path('Repositories/AltrpRepositories/Interfaces/'
            . str_replace('\\', '/', $this->getModelNamespace()) . 'RepositoryInterface.php');
    }
}
