<?php


namespace App\Altrp;


use Illuminate\Notifications\DatabaseNotification;

class Notification extends DatabaseNotification
{
    protected $table = 'altrp_notifications';
}
