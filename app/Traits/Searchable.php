<?php


namespace App\Traits;


trait Searchable
{
    public static function getBySearch($search)
    {
        return self::where('title','like', "%{$search}%")
            ->orWhere('id', 'like', "%{$search}%")
            ->orderByDesc('id')
            ->get();
    }
}
