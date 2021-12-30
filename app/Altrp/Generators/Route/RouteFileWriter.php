<?php


namespace App\Altrp\Generators\Route;


use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Source;
use App\Exceptions\Repository\RepositoryFileException;
use App\Exceptions\Route\RouteFileException;
use App\Role;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RouteFileWriter
{
    /**
     * @var RouteFile
     */
    protected $route;

    protected $routeFile;

    protected $routeFileContent;

    /**
     * @var ControllerFile
     */
    protected $controller;

    /**
     * RouteFileWriter constructor.
     * @param RouteFile $routeFile
     * @param ControllerFile $controllerFile
     */
    public function __construct(RouteFile $routeFile, ControllerFile $controllerFile)
    {
        $this->route = $routeFile;
        $this->routeFile = $this->route->getFile();
        $this->routeFileContent = file($this->routeFile, 2);
        $this->controller = $controllerFile;
    }

    /**
     * Добавить новый маршрут
     *
     * @param $methodName
     * @return bool
     * @throws RouteFileException
     */
    public function addRoute($methodName)
    {
        $routeFile = $this->route->getFile();
        if (! file_exists($routeFile)) {
            throw new RouteFileException('Route file not found', 500);
        }
        $routeContent = file($routeFile, 2);
        if (! $this->routeExists($routeContent,$methodName)) {
            $result = $this->writeRoute($routeContent, $this->getRoute($methodName), $routeFile);
            if (! $result) throw new RouteFileException('Failed to write route to the routes file', 500);
        }
        return true;
    }

    /**
     * Добавить маршрут для источника данных
     *
     * @param $source
     * @param string $type
     * @return bool
     * @throws RouteFileException
     */
    public function addSourceRoute($source, $type = 'data_sources')
    {
        $routeFile = $this->route->getFile();

        if (! file_exists($routeFile))
            throw new RouteFileException('Route file not found', 404);
        $routeContent = file($routeFile, 2);
        $sourceName = $type == 'data_sources' ? $source->name : $source->url;
        if (! $this->routeExists($routeContent, $sourceName, $type, $source->request_type)) {
            $result = $this->writeRoute(
                $routeContent,
                $this->getSourceRoute($source),
                $this->route->getFile()
            );
            if (! $result)
                throw new RouteFileException('Failed to write route to the routes file', 500);
        }

        return true;
    }

    /**
     * Удалить маршрут
     *
     * @param $methodName
     * @param string $type
     * @param string $requestType
     * @return bool|int
     * @throws RouteFileException
     */
    public function removeRoute($methodName, $type = 'Route::', $requestType = 'get')
    {
        $routeFile = $this->route->getFile();
        if (! file_exists($routeFile)) {
            throw new RouteFileException('Route file not found', 404);
        }
        $routeContent = file($routeFile, 2);
        if ($line = $this->routeExists($routeContent, $methodName, $type, $requestType)) {
            unset($routeContent[$line]);
        }

        return \File::put($routeFile, implode(PHP_EOL, $routeContent));
    }

    /**
     * Обновить маршрут SQL editor
     *
     * @param $oldMethodName
     * @param $methodName
     * @return bool
     * @throws RouteFileException
     */
    public function updateSqlRoute($oldMethodName, $methodName)
    {
        $routeContent = file($this->route->getFile(), 2);
        $this->removeSqlRoute($routeContent,$oldMethodName, $this->routeFile);
        $this->writeRoute($routeContent, $this->getRoute($methodName), $this->route->getFile());
        return true;
    }

    /**
     * Обновить маршрут удаленного источника данных
     *
     * @param $source
     * @param string $type
     * @return bool
     * @throws RouteFileException
     */
    public function updateSourceRoute($source, $type = 'data_sources')
    {
        $route = $type == 'data_sources' ? $source->getOriginal('name') : $source->getOriginal('url');
        $type = $type == 'data_sources' ? $type : $this->getTrueType($source->getOriginal('type'));
        $this->removeRoute($route, $type, $source->getOriginal('request_type'));
        $this->addSourceRoute($source, $type);
        return true;
    }

    /**
     * Удалить маршрут SQL editor
     *
     * @param $methodName
     * @return bool
     */
    public function deleteSqlRoute($methodName)
    {
        $routeContent = file($this->route->getFile(), 2);
        return $this->removeSqlRoute($routeContent,$methodName,$this->routeFile);
    }

    /**
     * Очистить маршрут SQL editor
     *
     * @param $routeContent
     * @param $methodName
     * @param $file
     * @return bool
     */
    protected function removeSqlRoute(&$routeContent, $methodName, $file)
    {
        if ($line = $this->routeExists($routeContent, $methodName, 'queries')) {
            unset($routeContent[$line]);
            if (\File::put($file, implode(PHP_EOL, $routeContent)) === false) {
                return false;
            }
        }
        return true;
    }

    /**
     * Проверить, существует ли уже такой маршрут в файле маршрутов
     *
     * @param $routeContent
     * @param $methodName
     * @param string $type
     * @param string $requestType
     * @return bool
     */
    public function routeExists($routeContent, $methodName, $type = 'Route::', $requestType = 'get')
    {
        foreach ($routeContent as $line => $content) {
            if (Str::contains($content, $methodName . '\'')
                && Str::contains($content, $this->route->getModelName())
                && Str::contains($content, $type)
                && Str::contains($content, 'Route::'.$requestType)
            ) {
                return $line;
            }
        }
        return false;
    }

    /**
     * Проверить, существует ли маршрут удаленного источника данных
     *
     * @param $source
     * @return bool|int|string
     */
    public function routeSourceExist($source)
    {
        $routeContent = file($this->route->getFile(), 2);
        return $this->routeExists($routeContent, $source->name, 'data_sources', $source->request_name);
    }

    /**
     * Записать новый маршрут в файл маршрутов
     *
     * @param $routeContent
     * @param $route
     * @param $file
     * @return bool
     * @throws RouteFileException
     */
    protected function writeRoute(&$routeContent, $route, $file)
    {
        if (! file_exists($file)) {
            throw new RouteFileException('Route file not found', 500);
        }
        $resourceName = Str::snake(Str::plural($this->route->getModelName()), '_');
        foreach ($routeContent as $line => $content) {
            if (Str::contains($content, 'Routes for the ' . $resourceName . ' resource')) {
                array_splice($routeContent, $line + 1, 0, $route);
                break;
            }
        }
        return file_put_contents(
                $file,
            implode(PHP_EOL, $routeContent)
            ) !== false;
    }

    /**
     * Сформировать и получить тело нового маршрута для записи в файл
     *
     * @param $methodName
     * @return string
     */
    protected function getRoute($methodName)
    {
        $middleware = $this->getMiddleware($methodName);

        $route = 'Route::get(\'/queries/' . strtolower(Str::plural($this->route->getModelName())) . '/'
            . Str::snake($methodName) . '\', [';
        if ($middleware)
            $route .= "'middleware' => ['" . implode("','", $middleware) . "'], ";
        $route .= "'uses' => '"
            . str_replace('App\Http\Controllers\\', '',$this->controller->getNamespace())
            . "Controller@" . $methodName ."']);";
        return $route;
    }

    /**
     * Сформировать и получить маршрут удаленного источника данных
     *
     * @param $source
     * @return string
     */
    protected function getSourceRoute($source)
    {
        $actions = ['get', 'options', 'show', 'add', 'update', 'delete', 'update_column', 'filters'];
        if ($source->type == 'remote')
            $middleware = $this->getMiddleware($source->name, 'name');
        else
            $middleware = $this->getMiddleware($source->type, 'type');

        if ($source->type == 'remote') {
            $requestType = $source->request_type ? $source->request_type : 'get';
            $route = 'Route::' . $requestType . '(\'/data_sources/' . strtolower(Str::plural($this->route->getModelName())) . '/'
                . Str::snake($source->name) . '\', [';
        } elseif (in_array($source->type, $actions)) {
            $route = 'Route::' . $source->request_type . '(\'' . $source->url . '\', [';
        } else {
            $route = 'Route::' . $source->request_type . '(\'/queries' . $source->url . '\', [';
        }

        if ($source->type == 'remote') {
            $action = $source->name;
        } else {
            if ($source->type == 'get') $action = 'index';
            elseif ($source->type == 'filters') $action = 'getIndexedColumnsValueWithCount';
            elseif ($source->type == 'add') $action = 'store';
            elseif ($source->type == 'update_column') $action = 'updateColumn';
            elseif ($source->type == 'delete') $action = 'destroy';
            else $action = $source->type;
        }

        if ($middleware)
            $route .= "'middleware' => ['" . implode("','", $middleware) . "'], ";
        $route .= "'uses' => '"
            . str_replace('App\Http\Controllers\\', '',$this->controller->getNamespace())
            . "Controller@" . $action ."']);";
        return $route;
    }

    /**
     * Получить и сформировать посредников доступа к маршруту
     *
     * @param $methodName
     * @param string $condField
     * @param bool $isApi
     * @return array
     */
    protected function getMiddleware($methodName, $condField = 'type', $isApi = false)
    {
        if ($condField == 'type') {
            $source = $this->route->getModel()->altrp_sources->where($condField, Str::snake($methodName))->first();
        } else {
            $source = Source::where($condField, Str::snake($methodName))->first();
        }

        if(!$source) return null;

        $sourceRoles = $source->source_roles;
        $accessSource = [];
        $accessRoles = [];
        $accessPermissions = [];
        $sourcePermissions = $source->source_permissions;
        foreach ($sourcePermissions as $sourcePermission) {
            $accessPermissions[] = $sourcePermission->permission->name;
        }

        foreach ($sourceRoles as $sourceRole) {
            $accessRoles[] = $sourceRole->role->name;
        }

        $roles_glue = $source->need_all_roles ? "," : "|";
        if ($accessRoles)
            //$accessSource[] = implode('|', $accessRoles);
            $accessSource[] = implode($roles_glue, $accessRoles);

        if ($accessPermissions)
            $accessSource[] = implode('|', $accessPermissions);

        $middleware = [];
        if ($source->auth) {
            $middleware[] = $this->route->isApi() ? 'auth:api' : 'auth';
        }
        if ($accessRoles && $accessPermissions) {
            $middleware[] = "ability:" . implode(',', $accessSource);
        } elseif ($accessRoles) {
            //$middleware[] = "role:" . implode(',', $accessRoles);
            $middleware[] = "role:" . implode($roles_glue, $accessRoles);
        } elseif ($accessPermissions) {
            $middleware[] = "permission:" . implode('|', $accessPermissions);
        }

        return $middleware;
    }

    protected function getTrueType($type)
    {
        switch ($type) {
            case 'get':
                return 'index';
            case 'filters':
                return 'getIndexedColumnsValueWithCount';
            case 'add':
                return 'store';
            case 'update_column':
                return 'updateColumn';
            case 'delete':
                return 'destroy';
            default:
                return $type;
        }
    }
}
