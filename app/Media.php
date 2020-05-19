<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    //
  use SoftDeletes;
  protected $fillable = [
    'author',
    'filename',
    'media_type',
  ];
}
