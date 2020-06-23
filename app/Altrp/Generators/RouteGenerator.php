<?php

namespace App\Altrp\Generators;

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


    public function __construct()
    {
        $this->path = base_path('routes/AltrpRoutes.php');

        $this->routeContents = file_get_contents($this->path);

        $this->routeStubContents = $this->getStubContents();
    }

    /**
     * Сгенерировать новые маршруты
     *
     * @return boolean
     */
    public function generate()
    {
        $this->routeStub = $this->fillStub();

        $this->routeContents .= "\n\n".$this->routeStub;

        $existingRouteContents = file_get_contents($this->path);
        if (Str::contains($existingRouteContents, substr($this->routeStub, 1, strpos($this->routeStub, ',')))) {
            return false;
        }

        file_put_contents($this->path, $this->routeContents);
        return true;
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
     * @return string
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
            : __DIR__ . '/../stubs/routes/create_route.stu';

        return file_get_contents($stub);
    }
}
