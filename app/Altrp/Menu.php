<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    //
  protected $fillable = [
    'name',
    'children',
    'settings',
  ];
  use SoftDeletes;
}
