<?php


namespace App\Altrp\Generators\Route;


use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Source;
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
     * @throws RouteFileException
     */
    public function addRoute($methodName)
    {
        $routeContent = file($this->route->getFile(), 2);
        if (! $this->routeExists($routeContent,$methodName)) {
            $result = $this->writeRoute($routeContent, $this->getRoute($methodName));
            if (! $result) throw new RouteFileException('Failed to write route to the routes file', 500);
        }
    }

    public function updateSqlRoute($oldMethodName, $methodName)
    {
        $routeContent = file($this->route->getFile(), 2);
        $this->removeSqlRoute($routeContent,$oldMethodName);
        $this->writeRoute($routeContent, $this->getRoute($methodName));
        return true;
    }

    public function deleteSqlRoute($methodName)
    {
        $routeContent = file($this->route->getFile(), 2);
        return $this->removeSqlRoute($routeContent,$methodName);
    }

    protected function removeSqlRoute(&$routeContent,$methodName)
    {
        if ($line = $this->routeExists($routeContent, $methodName)) {
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
     */
    protected function writeRoute(&$routeContent, $route)
    {
        $resourceName = Str::snake(Str::plural($this->route->getModelName()));
        foreach ($routeContent as $line => $content) {
            if (Str::contains($content, 'Routes for the ' . $resourceName . ' resource')) {
                array_splice($routeContent, $line + 1, 0, $route);
                break;
            }
        }
        return file_put_contents(
            $this->route->getFile(),
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
//        $accessMiddleware = $this->getAccessMiddleware($methodName);
//        if ($accessMiddleware) $middleware[] = $accessMiddleware;
        $middleware = [];

        $route = 'Route::get(\'/' . strtolower(Str::plural($this->route->getModelName())) . '/'
            . Str::kebab($methodName) . '\', [';
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
        $source = Source::where('type', Str::kebab($methodName))->first();

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
