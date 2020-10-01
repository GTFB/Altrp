<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DashboardsSettings extends Model
{
    protected $primaryKey = 'guid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'guid',
        'settings',
        'dashboard_id',
        'user_id',
    ];

    public $timestamps = false;
}