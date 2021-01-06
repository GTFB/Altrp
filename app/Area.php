<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    //
  protected $fillable = [
    'name',
    'settings',
    'title',
  ];

  const NOT_CONTENT_AREAS = [
    'card',
    'popup',
    'reports',
    'mails',
  ];

  protected $casts = [
    'settings' => 'array',
  ];

  static function get_areas_names(){
    return static::all()->map( function ( $area ) {
      return $area->name;
    } )->toArray();
  }

  static function get_areas_options(){
    return static::all()->map( function ( $area ) {
      return [$area->id => $area->name];
    } )->toArray();
  }
}
