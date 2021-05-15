<?php

namespace App\Altrp\Generators;

abstract class AppGenerator
{
    /**
     * AppGenerator constructor.
     * @param $data
     */
    public function __construct($data)
    {
        if (is_array($data)) {
            $obj = new \stdClass;
            $this->data = $this->convertToObject($data, $obj);

        } else {
            $this->data = json_decode($data);
        }
    }

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
        return preg_replace('/(\\\)+/', '\\\\', $str);
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

    /**
     * Получить пользовательский код из файла
     *
     * @param string $file
     * @return array|null
     */
    protected function getCustomCode($file)
    {
        if (! file_exists($file)) return null;

        $fileContent = file($file, 2);

        $commentBlocks = [
            'CUSTOM_NAMESPACES',
            'CUSTOM_TRAITS',
            'CUSTOM_PROPERTIES',
            'CUSTOM_METHODS',
            'SQL_EDITORS',
            'ACCESSORS'
        ];

        $customContent = [];

        for ($i = 0; $i < count($commentBlocks); $i++) {
            for ($j = 0; $j < count($fileContent); $j++) {
                if (strpos($fileContent[$j], $commentBlocks[$i]) !== false) {
                    $key = strtolower($commentBlocks[$i]);
                    for ($k = $j + 1; $k < count($fileContent); $k++) {
                        if ($k == $j + 1) $fileContent[$k] = trim($fileContent[$k], ' ');
                        if (strpos($fileContent[$k], $commentBlocks[$i]) !== false) break;
                        $customContent[$key][] = $fileContent[$k];
                    }
                    $customContent[$key] = implode(PHP_EOL, $customContent[$key]);
                    break;
                }
            }
        }

        copy($file, $file . '.bak');

        unlink($file);

        return $customContent;
    }

    /**
     * Получить пользовательский код из нужного блока комментариев
     *
     * @param $customCode
     * @param $blockName
     * @return mixed|string
     */
    protected function getCustomCodeBlock($customCode, $blockName)
    {
        return $customCode[$blockName] ?? '';
    }
}
