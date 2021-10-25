<?php

namespace App\Altrp;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;
use App\Altrp\Model as AltrpModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class Customizer extends Model
{
  use Timestamp, SoftDeletes;
  protected $table = 'altrp_customizers';

  public $fillable = [
    "name",
    "title",
    "type",
    "model_id",
    "data",
  ];

  protected $casts = [
    'data' => 'array',
  ];

  public function altrp_model()
  {
    return $this->hasOne( 'App\Altrp\Model', 'id', 'model_id' );
  }


}
