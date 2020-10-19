<?php


namespace App\Traits;


trait Searchable
{
    public static function getBySearch($search, $field = 'title', $relations = [])
    {
        return self::with($relations)
            ->where($field,'like', "%{$search}%")
            ->orWhere('id', 'like', "%{$search}%")
            ->orderByDesc('id')
            ->get();
    }

    public static function getBySearchWhere(array $where, $search, $field = 'title', $relations = [])
    {
        return self::with($relations)
            ->where($where)
            ->where($field,'like', "%{$search}%")
            ->orWhere('id', 'like', "%{$search}%")
            ->orderByDesc('id')
            ->get();
    }

    public static function getBySearchAsObject($search, $table, $field = 'title')
    {
        return self::where($table . '.' . $field, 'like', "%{$search}%")
            ->orWhere($table . '.' . 'id', 'like', "%{$search}%");
    }
}
