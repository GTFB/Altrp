<?php


namespace App\Altrp;

use App\User;
use App\CategoryObject;
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
        'chart',
        'guid',
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

    public function categories()
    {
        return $this->hasMany(CategoryObject::class, 'object_guid', 'guid');
    }
  
    public function categoryOptions()
    {
        return CategoryObject::select('altrp_categories.guid as value', 'altrp_categories.title as label')->leftJoin('altrp_categories', 'altrp_categories.guid', '=', 'altrp_category_objects.category_guid')
            ->where('altrp_category_objects.object_guid', $this->guid)->get();
    }
}
