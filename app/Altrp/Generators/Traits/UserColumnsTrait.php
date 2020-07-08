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
     * Установить колонкам значение id текущего пользователя
     *
     * @param $model
     */
    public static function setAuthId($model)
    {
        if ($columns = self::columnsExists($model)) {
            foreach ($columns as $column) {
                $model->$column = auth()->user()->id;
            }
        }
    }

    /**
     * Проверить, существует ли такие колонки в модели
     * и является ли они заполняемыми, вернуть их, если они
     * присутствуют в списке пользовательских колонок
     *
     * @param $model
     * @return array|bool
     */
    public static function columnsExists($model)
    {
        if (! isset(self::$userColumns) || empty(self::$userColumns)) return false;
        $columns = [];
        foreach (self::$userColumns as $column) {
            if (in_array($column, $model->getFillable())) $columns[] = $column;
        }
        return $columns;
    }
}
