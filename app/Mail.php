<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mail extends Model
{
    protected $table = 'altrp_feedback_mails';

    protected $fillable = [
        'name',
        'email',
        'subject',
        'user_message',
        'html',
        'status',
        'attachments',
    ];
}
