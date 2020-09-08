<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class Accessor extends Model
{
    protected $table = 'altrp_accessors';

    protected $fillable = [
        'name',
        'title',
        'calculation',
        'calculation_logic',
        'model_id',
        'description',
        'user_id',
        'status'
    ];

    public function model()
    {
        return $this->belongsTo(\App\Altrp\Model::class);
    }
}
