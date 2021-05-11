<?php


namespace App\Altrp\Generators\Route;


use App\Page;
use App\Services\PageService;
use Illuminate\Database\Eloquent\Model;

class RouteFile
{
    protected $name;

    protected $namespace;

    protected $model;

    protected $api;

    protected $file;

    public function __construct(Model $model, $file = 'routes/AltrpRoutes.php', $isApi = false)
    {
        $this->model = $model;
        $this->file = $file;
        $this->api = $isApi;
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
        return base_path($this->file);
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

    public function createRouteFile($path, $description = 'Routes')
    {
        if(!file_exists($path)) {
            $pageService = app(PageService::class);
            file_put_contents($path, "<?php\n/*{$description}*/");
            $page = Page::all()->first();
            return $pageService->updatePageRoutes($page);
        }
        return false;
    }

    public function isApi()
    {
        return $this->api;
    }
}
