<?php

namespace App\Constructor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GlobalElement extends Model
{
    use SoftDeletes;
}
