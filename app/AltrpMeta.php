<?php

namespace App;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AltrpMeta extends Model
{

  use Timestamp, SoftDeletes;

  protected $table = 'altrp_meta';

  protected $primaryKey = 'meta_name';

  protected $fillable = [
    'meta_name',
    'meta_value',
  ];

}
