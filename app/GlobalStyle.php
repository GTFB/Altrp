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
  protected $table = 'altrp_global_styles';
}
