<?php

namespace App\Altrp\Generators;

use App\Altrp\Controller;
use App\Altrp\Customizer;
use App\Altrp\Robot;
use App\Altrp\Source;
use App\Role;
use Illuminate\Support\Str;

class RouteGenerator
{
    /**
     * Путь к файлу маршрутов
     *
     * @var string
     */
    private $path;

    /**
     * Путь к файлу маршрутов API
     *
     * @var string
     */
    private $apiPath;

    /**
     * Содержимое файла маршрутов
     *
     * @var string
     */
    private $routeContents;

    /**
     * Содержимое файла маршрутов API
     *
     * @var string
     */
    private $apiRouteContents;

    /**
     * Содежимое stub файла
     *
     * @var string
     */
    private $routeStubContents;

    /**
     * Содержимое файла шаблона для генерации маршрутов
     *
     * @var string|array
     */
    private $routeStub;

    /**
     * Динамические переменные для stub файла
     *
     * @var array
     */
    private $dynamicVariables = [];

    /**
     * @var Controller
     */
    private $controllerModel;


    /**
     * RouteGenerator constructor.
     * @param Controller $controller
     * @param string $routeFilename
     */
    public function __construct(Controller $controller, $routeFilename = 'AltrpRoutes')
    {
        $this->controllerModel = $controller;
        $this->path = base_path("routes/{$routeFilename}.php");
        $this->routeContents = file($this->path, 2);
        $this->routeStubContents = $this->getStubContents();
    }

    /**
     * Сгенерировать новые маршруты
     *
     * @param $oldModelName
     * @param $modelName
     * @param $controller
     * @return boolean
     */
    public function generate($oldModelName, $modelName, $controller, $isApi = false)
    {
        $sourceRoutes = $this->getRoutesFromSources($modelName, $controller, $isApi);
        $routes = $this->fillStub();
        $comment = array_shift($routes);
        $allRoutes = [];
        $allRoutes[] = $comment;
        $allRoutes = array_merge($allRoutes,$sourceRoutes,$routes);
        $this->routeStub = $allRoutes;
        if ($items = $this->routeExists($oldModelName, $controller)) {
            $this->routeRewrite($items);
        } else {
            $this->routeWrite();
        }
        $result = file_put_contents($this->path, implode(PHP_EOL, $this->routeContents));

        return $result;
    }

    /**
     * Сформировать и получить маршруты из источников данных
     *
     * @param $tableName
     * @param $controller
     * @return array
     */
    protected function getRoutesFromSources($tableName, $controller, $isApi)
    {
        $routes = [];
        $actions = ['get', 'options', 'show', 'add', 'update', 'delete', 'update_column', 'filters'];
        $sources = Source::where([
            ['controller_id', $this->controllerModel->id],
            ['model_id', $this->controllerModel->model->id],
        ])->get();
        if (! $sources) return [];
        foreach ($sources as $source) {
            $middleware = $this->getMiddleware($source, $isApi);
            if(!in_array($source->type, $actions)){
              switch($source->type){
                case 'customizer':{
                  /**
                   * @var $customizer Customizer
                   */
                  $customizer = Customizer::find( $source->sourceable_id );
                  if( ! $customizer ){
                    break;
                  }

                  try{
                    $middleware = array_merge( $middleware, $customizer->getMiddlewares() );
                  } catch ( \Exception $e){

                  }
                  $middleware = $middleware ? "'middleware' => ['" . implode("','", $middleware) . "'], " : '';
                  $routes[] = 'Route::' . $source->request_type . '(\'/' . $tableName .'/customizers/'
                    . \Str::snake($source->name) . '\', [' . $middleware .'\'uses\' =>\'' . $controller . '@'
                    . \Str::snake($source->name) . '\']);';
                } break;
                case 'robot':{
                  /**
                   * @var $robot Robot
                   */
                  $robot = Robot::find( $source->sourceable_id );
                  if( ! $robot ){
                    break;
                  }
                  $middleware = $middleware ? "'middleware' => ['" . implode("','", $middleware) . "'], " : '';
                  $routes[] = 'Route::' . $source->request_type . '(\'/' . $tableName .'/robots/'
                    . \Str::snake($source->name) . '\', [' . $middleware .'\'uses\' =>\'' . $controller . '@'
                    . \Str::snake($source->name) . '\']);';
                } break;
                case 'remote':{
                  $middleware = $middleware ? "'middleware' => ['" . implode("','", $middleware) . "'], " : '';
                  $routes[] = 'Route::' . $source->request_type . '(\'/data_sources/' . $tableName .'/'
                    . \Str::snake($source->name) . '\', [' . $middleware .'\'uses\' =>\'' . $controller . '@'
                    . \Str::snake($source->name) . '\']);';
                } break;
                default:{
                  $middleware = $middleware ? "'middleware' => ['" . implode("','", $middleware) . "'], " : '';
                  $routes[] = 'Route::get(\'/queries/' . $tableName .'/'
                    . $source->type . '\', [' . $middleware .'\'uses\' =>\'' . $controller . '@'
                    . lcfirst($source->type) . '\']);';
                }
              }
            }
            if (!in_array($source->type, $actions) && $source->type != 'remote') {

            } elseif (!in_array($source->type, $actions) && $source->type == 'remote') {

            }
        }
        return $routes;
    }

    /**
     * Проверить, существует ли уже такой маршрут в файле
     * и получить индекс строки, если совпадение найдено
     *
     * @param $tableName
     * @param $controller
     * @return array|bool
     */
    protected function routeExists($tableName, $controller)
    {
        $indexes = [];
        for ($i = 0; $i < count($this->routeContents); $i++) {
            if (Str::contains($this->routeContents[$i], ' '.$tableName . ' resource')
                || Str::contains($this->routeContents[$i], '/'.$tableName)
                || Str::contains($this->routeContents[$i], '/queries/'.$tableName)
                || Str::contains($this->routeContents[$i], '/filters/'.$tableName)
                || Str::contains($this->routeContents[$i], '/data_sources/'.$tableName)
                || Str::contains($this->routeContents[$i], '/'.Str::singular($tableName).'_options')
                || Str::contains($this->routeContents[$i], $controller)) {
                $indexes[] = $i;
            }
        }
        if ($indexes) return $indexes;
        return false;
    }

    /**
     * Перезаписать существующий маршрут
     *
     * @param $itemIndexes
     * @return bool
     */
    protected function routeRewrite($itemIndexes)
    {
        $newIndexes = 0;
        $countRouteStub = count($this->routeStub);
        for ($i = 0; $i < count($itemIndexes); $i++) {

            if ($i < $countRouteStub) {
                $this->routeContents[$itemIndexes[$i]] = $this->routeStub[$i];
            } else {
                unset($this->routeContents[$itemIndexes[$i]]);
            }

            $newIndexes = $itemIndexes[$i];
            unset($this->routeStub[$i]);
        }
        if ($this->routeStub && $newIndexes) {
            $newIndexes++;
            $arr = array_values($this->routeStub);
            for ($i = 0; $i < count($arr); $i++) {
                array_splice($this->routeContents, $newIndexes,0, $arr[$i]);
            }
        }
        return true;
    }

    /**
     * Записать новый маршрут в файл
     *
     * @return bool
     */
    protected function routeWrite()
    {
        for ($i = 0; $i < count($this->routeStub); $i++) {
            $this->routeContents[] = $this->routeStub[$i];
        }
        return true;
    }

    /**
     * Удалить маршруты из пользовательского файла маршрутов
     *
     * @param Controller $controller
     * @return false|int
     */
    public function deleteRoutes($controller)
    {
        $contents = $this->routeContents;
        if (! $contents) return true;
        foreach ($contents as $line => $content) {
            if (Str::contains($content, ' ' . Str::plural($controller->model->name) . ' resource')
                || Str::contains($content, '/'.Str::plural($controller->model->name))
                || Str::contains($content, '\\'.$controller->model->name.'Controller')) {
                unset($contents[$line]);
            }
        }
        return file_put_contents($this->path, implode(PHP_EOL, $contents));
    }

    /**
     * Добавить динамическю переменую
     *
     * @param string $name
     * @param mixed $val
     *
     * @return void
     */
    public function addDynamicVariable($name, $val)
    {
        $name = '{{' . $name . '}}';
        $this->dynamicVariables[$name] = $val;
    }

    /**
     * Заполнить stub файл динамическими переменными
     *
     * @return array
     */
    public function fillStub()
    {
        foreach ($this->dynamicVariables as $name => $val) {
            $this->routeStubContents = str_replace($name, $val, $this->routeStubContents);
        }

        return $this->routeStubContents;
    }

    /**
     * Получить содержимое stub файла
     *
     * @return string
     */
    protected function getStubContents()
    {
        $stub = config('crudgenerator.custom_template')
            ? config('crudgenerator.path') . 'routes/create_route.stub'
            : __DIR__ . '/../stubs/routes/create_route.stub';

        return file($stub, 2);
    }

    /**
     * Получить миддлвары
     *
     * @param $source
     * @param bool $isApi
     * @return array|null
     */
    public function getMiddleware($source, $isApi = false)
    {
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
            $middleware[] = $isApi ? 'auth:api' : 'auth';
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
