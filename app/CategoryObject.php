<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryObject extends Model
{
    public $timestamps = false;

    protected $table = 'altrp_category_objects';

    protected $fillable = [
        'category_guid',
        'object_guid',
        'object_type'
    ];

    public function category()
    {
        return $this->hasOne(Category::class, 'guid', 'category_guid');
    }

}
