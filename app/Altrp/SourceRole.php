<?php

namespace App\Altrp;

use App\Role;
use Illuminate\Database\Eloquent\Model;

class SourceRole extends Model
{
    protected $table = 'altrp_sources_roles';

    protected $fillable = [
        'source_id',
        'role_id',
        'type',
        'updated_at'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }
}
