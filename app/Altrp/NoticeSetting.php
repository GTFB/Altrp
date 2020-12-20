<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class NoticeSetting extends Model
{
    protected $table = 'altrp_notice_settings';

    protected $fillable = [
        'notice_name',
        'noticed_id',
        'noticed_type',
        'notice_settings'
    ];

    public function noticed()
    {
        return $this->morphTo(__FUNCTION__, 'noticed_type', 'noticed_id');
    }

    public function sources()
    {
        return $this->belongsToMany(Source::class, 'altrp_notice_setting_source', 'source_id', 'notice_setting_id');
    }

    public function getParsedSettingsAttribute()
    {
        $setting = json_decode($this->notice_settings);
        return $setting;
    }

    public function getConditionsAttribute()
    {
        return $this->parsed_settings->conditions;
    }
}
