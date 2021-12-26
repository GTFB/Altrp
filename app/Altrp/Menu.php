<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\CategoryObject;

class Menu extends Model
{
    //
  protected $fillable = [
    'name',
    'children',
    'settings',
  ];
  use SoftDeletes;
  protected $appends = [
    'editUrl'
  ];

  public function getEditUrlAttribute(){
    return '/admin/menus/' . $this->id;
  }

  public function categories()
  {
      return $this->hasMany(CategoryObject::class, 'object_guid', 'guid');
  }

  public function categoryOptions()
  {
      return CategoryObject::select('altrp_categories.guid as value', 'altrp_categories.title as label')->leftJoin('altrp_categories', 'altrp_categories.guid', '=', 'altrp_category_objects.category_guid')
          ->where('altrp_category_objects.object_guid', $this->guid)->get();
  }
}
