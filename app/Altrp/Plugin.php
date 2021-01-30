<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class Plugin extends Model
{
    protected $table = 'altrp_plugins';

    protected $fillable = [
        'name',
        'enabled'
    ];
}
