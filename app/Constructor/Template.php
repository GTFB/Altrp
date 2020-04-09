<?php

namespace App\Constructor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Template extends Model
{
  use SoftDeletes;
  protected $fillable =
    [ 'name', 'title', 'data', 'type', 'user_id' ];


}
