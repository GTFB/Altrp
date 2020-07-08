<?php


namespace App\Altrp\Generators\Traits;


trait UserColumnsTrait
{
    /**
     * Boot method
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            self::setAuthId($model);
        });

        static::updating(function($model) {
            self::setAuthId($model);
        });
    }

    /**
     * Установить колонке значение id текущего пользователя
     *
     * @param $model
     */
    public static function setAuthId($model)
    {
        if ($column = self::columnExists($model)) {
            $model->$column = auth()->user()->id;
        }
    }

    /**
     * Проверить, существует ли такая колонка в модели
     * и является ли она заполняемой, вернуть её, если она
     * присутствует в списке пользовательских колонок
     *
     * @param $model
     * @return bool
     */
    public static function columnExists($model)
    {
        if (! isset(self::$userColumns) || empty(self::$userColumns)) return false;
        foreach (self::$userColumns as $column) {
            if (in_array($column, $model->getFillable())) return $column;
        }
        return false;
    }
}
