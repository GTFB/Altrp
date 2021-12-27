<?php


namespace App\Traits;


trait Searchable
{
    public static function getBySearch($search, $field = 'title', $relations = [], $orderColumn = 'id', $orderType = 'Desc')
    {
        $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);
        return self::with($relations)
            ->where($field,'like', "%{$search}%")
            ->orWhere('id', 'like', "%{$search}%")
            ->$sortType($orderColumn)
            ->get();
    }

    public static function getBySearchWhere(array $where, $search, $field = 'title', $relations = [], $orderColumn = 'id', $orderType = 'Desc')
    {
        $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);
        return self::with($relations)
            ->where($where)
            ->where($field,'like', "%{$search}%")
            ->orWhere('id', 'like', "%{$search}%")
            ->$sortType($orderColumn)
            ->get();
    }

    public static function getBySearchAsObject($search, $table, $field = 'title', $relations = [])
    {
        return self::with($relations)->where($table . '.' . $field, 'like', "%{$search}%");
    }
}
