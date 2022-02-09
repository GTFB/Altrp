<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    protected $table = 'altrp_chats';

    public $timestamps = false;

    protected $fillable = [
      'chat_id',
      'robot_id',
      'user_id',
      'node_id'
    ];
}
