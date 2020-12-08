<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class NoticeSetting extends Model
{
    protected $table = 'altrp_notice_settings';

    protected $fillable = [
        'notice_name',
        'source_id',
        'noticed_id',
        'noticed_type',
        'notice_settings'
    ];

    public function noticed()
    {
        return $this->morphTo(__FUNCTION__, 'noticed_type', 'noticed_id');
    }
}
