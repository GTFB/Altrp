<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SQLEditor extends Model
{
    //
  protected $fillable = [
    'name',
    'sql',
    'title',
    'model_id',
    'description',
  ];

  /* public function model()
  {
    return $this->hasOne('App\Model', 'id', 'model_id');
  } */

}