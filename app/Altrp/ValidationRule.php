<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class ValidationRule extends Model
{
    protected $table = 'altrp_validation_rules';

    protected $fillable = [
        'rule',
        'validation_field_id'
    ];

    public function validationField()
    {
        return $this->belongsTo(ValidationField::class, 'validation_field_id');
    }
}
