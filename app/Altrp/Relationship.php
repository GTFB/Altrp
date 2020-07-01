<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model{

    protected $table = 'altrp_relationships';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'type',
        'model_class',
        'foreign_key',
        'local_key',
        'table_id'
    ];

}
