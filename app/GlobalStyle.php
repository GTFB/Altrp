<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GlobalStyle extends Model
{
    //
  protected $fillable = [
    'data',
    'title',
  ];
  protected $casts = [
    'data' => 'array',
  ];
}
