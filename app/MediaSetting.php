<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MediaSetting extends Model
{
    
    protected $table = 'altrp_media';

    public $timestamps = false;

    protected $fillable = [
      'width',
      'height',
      'name',
    ];

}
