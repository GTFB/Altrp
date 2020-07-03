<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Model extends EloquentModel
{
    protected $table = 'altrp_models';

    protected $fillable = [
       'description',
       'soft_deletes',
       'time_stamps',
       'fillable_cols',
       'path',
       'name',
       'table_id',
    ];

    protected $hidden = [
        'relationships',
        'pk'
    ];

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    public function setFillableColsAttribute($value)
    {
        $this->attributes['fillable_cols'] = isset($value)
            ? implode(',', (array) $value)
            : null;
    }
}
