<?php


namespace App\Traits;


trait Paginate
{
    public static function getCount()
    {
        return self::toBase()->count();
    }

    public static function getCountWithSearch($search, $column = 'title')
    {
        return self::where($column, 'like', "%{$search}%")
            ->orWhere('id', $search)
            ->toBase()
            ->count();
    }

    public static function getBySearchWithPaginate($search, $offset, $limit, $fieldName = 'name', $orderColumn = 'id', $orderType = 'Desc', $with = [])
    {
        $sortType = 'sortBy';
        $descending = $orderType == 'Asc' ? true : false;
        return self::with($with)
            ->where($fieldName,'like', "%{$search}%")
            ->orWhere('id', $search)
            ->skip($offset)
            ->take($limit)
            ->get()
            ->$sortType($orderColumn,SORT_REGULAR,$descending)
            ->values();
    }

    public static function getWithPaginate($offset, $limit, $orderColumn = 'id', $orderType = 'Desc', $with = [])
    {
        $sortType = 'sortBy';
        $descending = $orderType == 'Asc' ? true : false;
        return self::with($with)
            ->skip($offset)
            ->take($limit)
            ->get()
            ->$sortType($orderColumn,SORT_REGULAR,$descending)
            ->values();
    }
}
