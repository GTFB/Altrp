<?php

namespace App\Altrp\Generators;

use App\Altrp\Controller;
use Illuminate\Support\Str;

class RouteGenerator
{
    /**
     * Путь к файлу маршрутов
     *
     * @var string
     */
    private $path;

    /** @var string */
    private $routeContents;

    /**
     * Содежимое stub файла
     *
     * @var string
     */
    private $routeStubContents;

    /** @var string */
    private $routeStub;

    /**
     * Динамические переменные для stub файла
     *
     * @var array
     */
    private $dynamicVariables = [];


    /**
     * RouteGenerator constructor.
     */
    public function __construct()
    {
        $this->path = base_path('routes/AltrpRoutes.php');

        $this->routeContents = file($this->path, 2);

        $this->routeStubContents = $this->getStubContents();
    }

    /**
     * Сгенерировать новые маршруты
     *
     * @param $tableName
     * @param $controller
     * @return boolean
     */
    public function generate($tableName, $controller)
    {
        $this->routeStub = $this->fillStub();



        if ($items = $this->routeExists($tableName, $controller)) {
            $this->routeRewrite($items);
        } else {
            $this->routeWrite();
        }

        $result = file_put_contents($this->path, implode(PHP_EOL, $this->routeContents));

        return $result;
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
                || Str::contains($this->routeContents[$i], '\\'.$controller)) {
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
     */
    protected function routeRewrite($itemIndexes)
    {
        for ($i = 0; $i < count($itemIndexes); $i++) {
            $this->routeContents[$itemIndexes[$i]] = $this->routeStub[$i];
        }
    }

    /**
     * Записать новый маршрут в файл
     */
    protected function routeWrite()
    {
        for ($i = 0; $i < count($this->routeStub); $i++) {
            $this->routeContents[] = $this->routeStub[$i];
        }
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
        foreach ($contents as $line => $content) {
            if (Str::contains($content, ' '.$controller->model->table->name . ' resource')
                || Str::contains($content, '/'.$controller->model->table->name)
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
}
