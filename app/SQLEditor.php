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
  ];
}
