<?php


namespace App\Altrp;

/**
 * Класс пространсво имён класса сущности
 * Class RemoteDataType
 * @package App\Altrp
 */
class RemoteDataType
{
    public const MODEL = 'App\Altrp\Model';
    public const SQL_EDITOR = 'App\SQLEditor';
    public const QUERY = 'App\Altrp\Query';

    /**
     * Получить пространсво имён класса сущности
     * @param $type
     * @return bool|string
     */
    public static function getRemotableTypeClass($type)
    {
        $class = false;
        switch ($type) {
            case 'model':
                $class = self::MODEL;
                break;
            case 'sql_editor':
                $class = self::SQL_EDITOR;
                break;
            case 'query':
                $class = self::QUERY;
                break;
            default:
                $class = false;
        }
        return $class;
    }
}
