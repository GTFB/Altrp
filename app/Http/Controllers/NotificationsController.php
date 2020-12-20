<?php


namespace App\Http\Controllers;


use App\Altrp\Notification;

class NotificationsController extends Controller
{
    public function getAll()
    {
        $notifications = Notification::all();

        return response()->json($notifications, 200, [], 256);
    }
}
