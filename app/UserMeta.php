<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserMeta extends Model
{
    protected $table = 'user_metas';

    protected $fillable = [
        'first_name',
        'last_name',
        'patronymic',
        'user_id',
        'company_id',
        'district_id'
    ];

    public $timestamps = false;
}
