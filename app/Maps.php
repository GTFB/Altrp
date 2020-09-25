<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Maps extends Model
{
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    protected $fillable = [ 'id', 'data'];
    public $incrementing = false;
    public $timestamps = false;
}