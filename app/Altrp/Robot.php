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
        'start_config',
        'enabled',
        'chart'
    ];

    protected $with = ['sources'];

    public function altrp_model()
    {
        return $this->belongsTo(\App\Altrp\Model::class, 'model_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sources()
    {
        return $this->belongsToMany(Source::class, 'altrp_robot_source')->withPivot(['parameters']);
    }
}
