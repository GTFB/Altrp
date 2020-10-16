<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DatasourceDashboard extends Model
{
    protected $primaryKey = 'guid';
    protected $keyType = 'string';
    protected $table = 'datasource_dashboard';
    
    public $incrementing = false;

    protected $fillable = [
        'guid',
        'settings',
        'dashboard_id',
        'user_id',
    ];

    public $timestamps = false;
}
