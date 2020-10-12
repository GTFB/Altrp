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

    public function getApiFile()
    {
        return base_path('routes/AltrpApiRoutes.php');
    }

    public function getCustomRouteFile()
    {
        return base_path('routes/AltrpCustomRoutes.php');
    }

    public function createFile()
    {
        if(!file_exists($this->getFile())) {
            return file_put_contents($this->getFile(), "<?php\n/*Web routes*/");
        }

        return false;
    }

    public function createApiFile()
    {
        if(!file_exists($this->getApiFile())) {
            return file_put_contents($this->getApiFile(), "<?php\n/*Api routes*/");
        }

        return false;
    }

    public function createCustomRouteFile()
    {
        if(!file_exists($this->getCustomRouteFile())) {
            return file_put_contents($this->getCustomRouteFile(), "<?php\n/*Custom routes*/");
        }

        return false;
    }
}
