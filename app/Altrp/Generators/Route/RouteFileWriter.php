<?php


namespace App\Altrp\Generators\Route;


use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Source;
use App\Exceptions\Repository\RepositoryFileException;
use App\Exceptions\Route\RouteFileException;
use Illuminate\Support\Str;

class RouteFileWriter
{
    /**
     * @var RouteFile
     */
    protected $route;

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
            $result = $this->writeRoute($routeContent, $this->getRoute($methodName));
            if (! $result) throw new RouteFileException('Failed to write route to the routes file', 500);
        }
        return true;
    }

    /**
     * Удалить маршрут
     *
     * @param $methodName
     * @return bool|int
     * @throws RouteFileException
     */
    public function removeRoute($methodName)
    {
        $routeFile = $this->route->getFile();
        if (! file_exists($routeFile)) {
            throw new RouteFileException('Route file not found', 500);
        }
        $routeContent = file($routeFile, 2);
        if ($line = $this->routeExists($routeContent,$methodName)) {
            unset($routeContent[$line]);
        }
        return \File::put($routeFile, implode(PHP_EOL, $routeContent));
    }

    /**
     * Проверить, существует ли уже такой маршрут в файле маршрутов
     *
     * @param $routeContent
     * @param $methodName
     * @return bool
     */
    protected function routeExists($routeContent, $methodName)
    {
        foreach ($routeContent as $line => $content) {
            if (Str::contains($content, $methodName . '\'')
                && Str::contains($content, $this->route->getModelName())
                && Str::contains($content, 'Route::get')
            ) {
                return $line;
            }
        }
        return false;
    }

    /**
     * Записать новый маршрут в файл маршрутов
     *
     * @param $routeContent
     * @param $route
     * @return bool
     * @throws RouteFileException
     */
    protected function writeRoute(&$routeContent, $route)
    {
        $file = $this->route->getFile();
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
        $middleware = $this->route->getModel()->user_cols ? ['auth:api','auth'] : [];
        $accessMiddleware = $this->getAccessMiddleware($methodName);
        if ($accessMiddleware) $middleware[] = $accessMiddleware;

        $route = 'Route::get(\'/queries/' . strtolower(Str::plural($this->route->getModelName())) . '/'
            . Str::snake($methodName) . '\', [';
        if ($middleware) $route .= "'middleware' => ['" . implode("','", $middleware) . "'], ";
        $route .= "'uses' => '"
            . str_replace('App\Http\Controllers\\', '',$this->controller->getNamespace())
            . "Controller@" . $methodName ."']);";
        return $route;
    }

    /**
     * Получить и сформировать посредников доступа к маршруту
     *
     * @param $methodName
     * @return string|null
     */
    protected function getAccessMiddleware($methodName)
    {
        $source = Source::where('type', Str::snake($methodName))->first();

        if(!$source) return null;

        $roles = $source->source_roles;
        $accessSource = [];
        $accessRoles = [];
        $accessPermissions = [];
        foreach ($roles as $role) {
            $accessRoles[] = $role->role->name;
        }
        $permissions = $source->source_permissions;
        foreach ($permissions as $permission) {
            $accessPermissions[] = $permission->permission->name;
        }
        if ($accessRoles) $accessSource[] = implode('|', $accessRoles);
        if ($accessPermissions) $accessSource[] = implode('|', $accessPermissions);

        if ($accessSource)
            return "ability:" . implode(',', $accessSource);
        return null;
    }
}
