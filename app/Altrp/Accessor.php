<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class Accessor extends Model
{
    protected $table = 'altrp_accessors';

    protected $fillable = [
        'name',
        'formula',
        'model_id',
        'user_id',
        'status'
    ];
}
