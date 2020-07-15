<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    protected $table = 'altrp_sources';

    protected $fillable = [
        'model_id',
        'controller_id',
        'url',
        'api_url',
        'type',
        'name',
    ];

    public function source_roles()
    {
        return $this->hasMany(SourceRole::class);
    }

    public function source_permissions()
    {
        return $this->hasMany(SourcePermission::class);
    }
}
