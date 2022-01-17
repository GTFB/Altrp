<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    
    public $timestamps = false;

    protected $table = 'altrp_categories';

    //protected $primaryKey = 'guid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'guid',
        'name',
        'title',
        'description',
    ];

    public function categoryObjects()
    {
        return $this->hasMany(CategoryObject::class, 'category_guid', 'guid');
    }

}
