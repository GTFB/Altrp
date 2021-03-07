<?php

namespace App\Constructor;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Robot extends Model
{
    protected $table = 'robots';

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
