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

    public function validationRules()
    {
        return $this->hasMany(ValidationRule::class);
    }
}
