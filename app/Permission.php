<?php

namespace App;

use App\Traits\Paginate;
use App\Traits\Searchable;
use Laratrust\Models\LaratrustPermission;

class Permission extends LaratrustPermission
{
    use Searchable, Paginate;

    protected $fillable = [
        'name',
        'display_name',
        'description'
    ];
}
