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
    'updated_at',
    'is_object',
  ];

    public function altrp_source()
    {
        return $this->morphOne(Source::class, 'sourceable');
    }

    public function model()
    {
        return $this->belongsTo(\App\Altrp\Model::class);
    }
}
