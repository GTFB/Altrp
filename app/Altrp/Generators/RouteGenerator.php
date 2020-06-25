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

        $this->routeContents = file($this->path, FILE_IGNORE_NEW_LINES);

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

        if ($item = $this->routeExists()) {
            $this->routeRewrite($item);
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
     * @return bool|int
     */
    protected function routeExists()
    {
        $subStr = substr($this->routeStub, 0, strpos($this->routeStub, ','));

        for ($i = 0; $i < count($this->routeContents); $i++) {
            if (Str::contains($this->routeContents[$i], $subStr)) {
                return $i;
            }
        }
        return false;
    }

    /**
     * Перезаписать существующий маршрут
     *
     * @param int $itemIndex Индекс строки
     */
    protected function routeRewrite(int $itemIndex)
    {
        $this->routeContents[$itemIndex] = $this->routeStub;
    }

    /**
     * Записать новый маршрут в файл
     */
    protected function routeWrite()
    {
        $this->routeContents[] = $this->routeStub;
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
