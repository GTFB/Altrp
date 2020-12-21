<?php


namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    /**
     * Получить все уведомления
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllNotifications()
    {
        /**
         * @var $user User
         */
        $user = auth()->user();
        if (!$user)
            redirect()->back();
        $notifications = $user->notifications;
        return response()->json($notifications, 200, [], 256);
    }

    /**
     * Удалить все уведомления
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteAllNotifications()
    {
        /**
         * @var $user User
         */
        $user = auth()->user();
        if (!$user)
            redirect()->back();
        $result = $user->notifications()->delete();;
        return response()->json(['success' => $result], 200, [], 256);
    }

    /**
     * Получить все непрочитанные уведомления
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllUnreadNotifications()
    {
        /**
         * @var $user User
         */
        $user = auth()->user();
        if (!$user)
            redirect()->back();
        $notifications = $user->unreadNotifications;
        return response()->json($notifications, 200, [], 256);
    }

    /**
     * Отметить как прочитанное
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead(Request $request)
    {
        /**
         * @var $user User
         */
        $user = auth()->user();
        if (!$user)
            redirect()->back();
        $notificationId = $request->notification_id;
        $notifications = $user->unreadNotifications;
        $result = false;
        foreach ($notifications as $notification) {
            if ($notification->id == $notificationId) {
                $notification->markAsRead();
                $result = true;
                break;
            }
        }
        return response()->json(['success' => $result], 200, [], 256);
    }

    /**
     * Отметить как прочитанное
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsReadAll()
    {
        /**
         * @var $user User
         */
        $user = auth()->user();
        if (!$user)
            redirect()->back();
        $notifications = $user->unreadNotifications;
        $notifications->markAsRead();
        return response()->json(['success' => true], 200, [], 256);
    }
}
