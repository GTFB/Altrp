<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class Robot extends Model
{
    protected $table = 'altrp_robots';

    protected $fillable = [
        'name',
        'start_condition',
        'enabled',
        'chart'
    ];

    public function altrp_model()
    {
        return $this->belongsTo(\App\Altrp\Model::class, 'model_id');
    }
}
