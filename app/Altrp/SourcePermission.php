<?php

namespace App\Altrp;

use App\Permission;
use Illuminate\Database\Eloquent\Model;

class SourcePermission extends Model
{
    protected $table = 'altrp_sources_permissions';

    protected $fillable = [
        'source_id',
        'permission_id',
        'type',
        'updated_at'
    ];

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }
}
