<?php


namespace App\Altrp;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Robot extends Model
{
    protected $table = 'altrp_robots';

    protected $fillable = [
        'name',
        'model_id',
        'user_id',
        'start_condition',
        'enabled',
        'chart'
    ];

    public function altrp_model()
    {
        return $this->belongsTo(\App\Altrp\Model::class, 'model_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
