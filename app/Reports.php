<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Schema;
use Mockery\Exception;

class Reports extends Model
{
  protected $fillable = [
    'name',
    'description',
    'html',
    'json',
    'user_id',
  ];

  function user()
  {
    return $this->belongsTo( User::class, 'user_id' );
  }
}