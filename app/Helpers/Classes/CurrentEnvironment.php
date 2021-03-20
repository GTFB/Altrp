<?php


namespace App\Helpers\Classes;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class CurrentEnvironment
{
    private static $instance;
    private $data = [];

    private function __construct()
    {
        $this->setProperty('altrpuser', Auth::user());
        $this->setProperty('altrprequest', new Request());
        dump($this->data);
    }

    /**
     * Пустой ли массив данных
     * @return boolean
     */
    public function isEmpty(): bool
    {
        return empty($this->data);
    }

    /**
     * Возваращает массив данных
     * @return array
     */
    public function getData(): array
    {
        return $this->data;
    }

    /**
     * @param array $data
     */
    public function setData(array $data): void
    {
        $this->data = $data;
    }

    /**
     * Запись значения по пути в массив данных
     * @param  string|array  $path
     * @param  mixed  $value
     * @param  bool  $overwrite
     */
    public function setProperty( $path, $value, $overwrite = true): void
    {
        data_set( $this->data, $path, $value, $overwrite );
    }

    /**
     * Получение значения по пути в массиве даных
     * @param  string|array  $path
     * @param  mixed  $default
     * @return mixed
     */
    public function getProperty( $path, $default = null)
    {
        return data_get( $this->data, $path, $default );
    }

    /**
     * Возвращает созданный объект класса, если такого нет, то создаёт его и возвращает
     * @return  mixed $instance
     */
    public static function getInstance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof self ) ) self::$instance = new self;

        return self::$instance;
    }
}
