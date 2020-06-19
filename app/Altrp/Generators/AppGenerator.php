<?php

namespace App\Altrp\Generators;

abstract class AppGenerator
{
    /**
     * Преобразовать массив в объект
     *
     * @param array $array
     * @param object $obj
     *
     * @return object
     */
    public function convertToObject($array, &$obj)
    {
        foreach ($array as $key => $value) {

            if (is_array($value)) {
                $obj->$key = new \stdClass();
                $this->convertToObject($value, $obj->$key);
            } else {
                $obj->$key = $value;
            }
        }

        return $obj;
    }


    /**
     * Проверить, является ли объект JSON объектом
     *
     * @param mixed $data
     *
     * @return boolean
     */
    public function isJson($data)
    {
        return is_object(json_decode($data));
    }


    /**
     * Экранировать обратные слеши
     *
     * @param string $str
     * @return string
     */
    protected function screenBacklashes($str)
    {
        return preg_replace('/\\\/', '\\\\\\', $str);
    }


    /**
     * Ковертировтаь строку из CamelCase в snake_case
     *
     * @param string $str
     * @return string
     */
    protected function toSnakeCase($str)
    {
        return ltrim(preg_replace_callback('/[A-Z]/', function ($matches) {
            return '_' . strtolower($matches[0]);
        }, $str), '_');
    }
}
