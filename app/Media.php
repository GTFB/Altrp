<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Media extends Model
{

  protected $fillable = [
    'author',
    'filename',
    'media_type',
  ];
}
