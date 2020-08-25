<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Query extends EloquentModel
{
    protected $table = 'altrp_queries';

    protected $fillable = [
        'name',
        'joins',
        'columns',
        'aggregates',
        'conditions',
        'relations',
        'order_by',
        'group_by',
        'access',
        'offset',
        'limit',
        'user_id',
        'source_id'
    ];

    public function altrp_source()
    {
        return $this->morphOne(Source::class, 'sourceable');
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function model()
    {
        return $this->belongsTo(Model::class);
    }

    public function setJoinsAttribute($value)
    {
        $this->attributes['joins'] = json_encode($value);
    }

    public function setColumnsAttribute($value)
    {
        $this->attributes['columns'] = json_encode($value);
    }

    public function setAggregatesAttribute($value)
    {
        $this->attributes['aggregates'] = json_encode($value);
    }

    public function setConditionsAttribute($value)
    {
        $this->attributes['conditions'] = json_encode($value);
    }

    public function setRelationsAttribute($value)
    {
        $this->attributes['relations'] = json_encode($value);
    }

    public function setOrderByAttribute($value)
    {
        $this->attributes['order_by'] = json_encode($value);
    }

    public function setGroupByAttribute($value)
    {
        $this->attributes['group_by'] = json_encode($value);
    }

    public function setAccessAttribute($value)
    {
        $this->attributes['access'] = json_encode($value);
    }

    public function getJoinsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getColumnsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getAggregatesAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getConditionsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getRelationsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getOrderByAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getGroupByAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getAccessAttribute($value)
    {
        return json_decode($value, true);
    }

}
