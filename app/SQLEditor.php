<?php

namespace App;

use App\Altrp\Source;
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


  public function altrp_source()
  {
      return $this->hasOne(Source::class);
  }
}
