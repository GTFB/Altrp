<?php


namespace App\Altrp\Generators\Route;


use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Source;
use App\Exceptions\Repository\RepositoryFileException;
use App\Exceptions\Route\RouteFileException;
use App\Role;
use Illuminate\Support\Str;

class RouteFileWriter
{
    /**
     * @var RouteFile
     */
    protected $route;

    protected $routeFile;

    protected $apiRouteFile;

    protected $routeFileContent;

    protected $apiRouteFileContent;

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
        $this->apiRouteFile = $this->route->getApiFile();
        $this->routeFileContent = file($this->routeFile, 2);
        $this->apiRouteFileContent = file($this->apiRouteFile, 2);
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

        $apiRouteFile = $this->route->getApiFile();
        if (! file_exists($apiRouteFile)) {
            throw new RouteFileException('API Route file not found', 500);
        }
        $apiRouteContent = file($apiRouteFile, 2);
        if (! $this->routeExists($apiRouteContent,$methodName)) {
            $result = $this->writeRoute($apiRouteContent, $this->getRoute($methodName),$apiRouteFile);
            if (! $result) throw new RouteFileException('Failed to write route to the api routes file', 500);
        }

        return true;
    }

    /**
     * Добавить маршрут для источника данных
     *
     * @param $source
     * @return bool
     * @throws RouteFileException
     */
    public function addSourceRoute($source)
    {
        $routeFile = $this->route->getFile();

        if (! file_exists($routeFile))
            throw new RouteFileException('Route file not found', 404);
        $routeContent = file($routeFile, 2);
        if (! $this->routeExists($routeContent, $source->name, 'data_sources', $source->request_type)) {
            $result = $this->writeRoute(
                $routeContent,
                $this->getSourceRoute($source->name, $source->request_type),
                $this->route->getFile()
            );
            if (! $result)
                throw new RouteFileException('Failed to write route to the routes file', 500);
        }

        $apiRouteFile = $this->route->getApiFile();
        if (! file_exists($apiRouteFile))
            throw new RouteFileException('API route file not found', 404);
        $apiRouteContent = file($apiRouteFile, 2);
        if (! $this->routeExists($apiRouteContent, $source->name, 'data_sources', $source->request_type)) {
            $result = $this->writeRoute(
                $apiRouteContent,
                $this->getSourceRoute($source->name, $source->request_type),
                $this->route->getApiFile()
            );
            if (! $result)
                throw new RouteFileException('Failed to write api route to the routes file', 500);
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

        $apiRouteFile = $this->route->getApiFile();
        if (! file_exists($apiRouteFile)) {
            throw new RouteFileException('API route file not found!', 404);
        }
        $apiRouteContent = file($apiRouteFile, 2);
        if ($line = $this->routeExists($apiRouteContent, $methodName, $type, $requestType)) {
            unset($apiRouteContent[$line]);
        }

        return \File::put($routeFile, implode(PHP_EOL, $routeContent))
            && \File::put($apiRouteFile, implode(PHP_EOL, $apiRouteContent));
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
        $this->removeSqlRoute($routeContent,$oldMethodName);
        $this->writeRoute($routeContent, $this->getRoute($methodName), $this->route->getFile());

        $routeContent = file($this->route->getApiFile(), 2);
        $this->removeSqlRoute($routeContent,$oldMethodName);
        $this->writeRoute($routeContent, $this->getRoute($methodName),$this->route->getApiFile());
        return true;
    }

    /**
     * Обновить маршрут удаленного источника данных
     *
     * @param $source
     * @return bool
     * @throws RouteFileException
     */
    public function updateSourceRoute($source)
    {
        $this->removeRoute($source->getOriginal('name'), 'data_sources', $source->request_type);
        $this->addSourceRoute($source);
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
        $routeResult = $this->removeSqlRoute($routeContent,$methodName);
        $routeContent = file($this->route->getApiFile(), 2);
        $apiRouteResult = $this->removeSqlRoute($routeContent,$methodName);
        return $routeResult && $apiRouteResult;
    }

    /**
     * Очистить маршрут SQL editor
     *
     * @param $routeContent
     * @param $methodName
     * @return bool
     */
    protected function removeSqlRoute(&$routeContent,$methodName)
    {
        if ($line = $this->routeExists($routeContent, $methodName, 'queries')) {
            unset($routeContent[$line]);
            if (\File::put($this->route->getFile(), implode(PHP_EOL,$routeContent)) === false) {
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
    protected function routeExists($routeContent, $methodName, $type = 'Route::', $requestType = 'get')
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
        $routeResult = $this->routeExists($routeContent, $source->name, 'data_sources', $source->request_name);
        $routeContent = file($this->route->getApiFile(), 2);
        $apiRouteResult = $this->routeExists($routeContent, $source->name, 'data_sources', $source->request_name);
        return $routeResult && $apiRouteResult;
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
     * @param $name
     * @param $requestType
     * @return string
     */
    protected function getSourceRoute($name, $requestType)
    {
        $middleware = $this->getMiddleware($name, 'name');
        $route = 'Route::' . $requestType . '(\'/data_sources/' . strtolower(Str::plural($this->route->getModelName())) . '/'
            . Str::snake($name) . '\', [';
        if ($middleware)
            $route .= "'middleware' => ['" . implode("','", $middleware) . "'], ";
        $route .= "'uses' => '"
            . str_replace('App\Http\Controllers\\', '',$this->controller->getNamespace())
            . "Controller@" . $name ."']);";
        return $route;
    }

    /**
     * Получить и сформировать посредников доступа к маршруту
     *
     * @param $methodName
     * @param string $condField
     * @return array
     */
    protected function getMiddleware($methodName, $condField = 'type')
    {
        $source = Source::where($condField, Str::snake($methodName))->first();

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

        if ($accessRoles)
            $accessSource[] = implode('|', $accessRoles);

        if ($accessPermissions)
            $accessSource[] = implode('|', $accessPermissions);

        $middleware = [];
        if ($source->auth) {
//            $middleware[] = 'auth:api';
            $middleware[] = 'auth';
        }
        if ($accessRoles && $accessPermissions)
            $middleware[] = "ability:" . implode(',', $accessSource);
        elseif ($accessRoles)
            $middleware[] = "role:" . implode(',', $accessRoles);
        elseif ($accessPermissions)
            $middleware[] = "permission:" . implode('|', $accessPermissions);

        return $middleware;
    }
}
