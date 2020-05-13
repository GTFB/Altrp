<?php

namespace App\Constructor;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Template extends Model
{
  use SoftDeletes;
  protected $fillable =
    [ 'name', 'title', 'data', 'type', 'user_id' ];


  function user(){
    return $this->belongsTo( User::class, 'user_id' );
  }
}
