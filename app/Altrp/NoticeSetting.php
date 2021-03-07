<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;

class NoticeSetting extends Model
{
    protected $table = 'altrp_notice_settings';

    protected $fillable = [
        'name',
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
        return $this->belongsToMany(Source::class, 'altrp_notice_setting_source', 'notice_setting_id', 'source_id');
    }

    public function getParsedSettingsAttribute()
    {
        return $this->notice_settings;
    }

    public function getConditionsAttribute()
    {
        return $this->parsed_settings->conditions;
    }

    public function setNoticeSettingsAttribute($item)
    {
        $this->attributes['notice_settings'] = json_encode($item);
    }

    public function getNoticeSettingsAttribute($item)
    {
        return json_decode($item);
    }
}
