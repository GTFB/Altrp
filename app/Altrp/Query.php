<?php


namespace App\Altrp;


class Query extends \Illuminate\Database\Eloquent\Model
{
    protected $table = 'altrp_queries';

    protected $fillable = [
        'name',
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

    public function source()
    {
        return $this->belongsTo(Source::class);
    }
}
