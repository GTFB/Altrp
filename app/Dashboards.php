<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dashboards extends Model
{
    //protected $primaryKey = 'id';
    //protected $keyType = 'string';
    //public $incrementing = false;
    protected $fillable = [ 'title', 'type', 'source', 'options', 'filter', 'widget_id', 'user_id'];
    public $timestamps = false;
}