<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class ValidationField extends Model
{
    protected $table = 'altrp_validation_fields';

    protected $fillable = [
        'name',
        'source_id',
        'model_id',
        'column_id',
        'column_name',
        'is_created',
        'is_updated'
    ];

    public function column()
    {
        return $this->belongsTo(Column::class);
    }

    public function model()
    {
        return $this->belongsTo(\App\Altrp\Model::class);
    }

    public function rules()
    {
        return $this->hasMany(ValidationRule::class);
    }
}
