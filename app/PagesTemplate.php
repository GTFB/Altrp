<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PagesTemplate extends Model
{
    //
  use SoftDeletes;
  protected $fillable = [
    'page_id',
    'template_id',
  ];
}
