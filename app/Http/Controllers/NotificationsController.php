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
        if (!$user) redirect()->back();

        $notifications = $user->notifications;
        $notifications = $this->upgradeArray($notifications);

        return response()->json($notifications, 200, [], 256);
    }

    /**
     * Получить одно уведомление
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNotification($notification_id)
    {
        /**
         * @var $user User
         */
        $user = auth()->user();
        if (!$user) redirect()->back();

        $notification = $user->notifications()->where('id', $notification_id)->first();

        if (!isset($notification)) return response()->json($notification, 200, [], 256);

        $notification->delete_url = "/notifications/delete/{$notification_id}";
        $notification->make_as_read_url = "/unread_notifications/{$notification_id}/mark_as_read";

        return response()->json($notification, 200, [], 256);
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
        if (!$user) redirect()->back();

        $result = $user->notifications()->delete();

        return response()->json(['success' => $result], 200, [], 256);
    }

    /**
     * Удалить уведомление
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteNotification($notification_id)
    {
        /**
         * @var $user User
         */
        $user = auth()->user();
        if (!$user) redirect()->back();
        
        try {
            $notification = $user->notifications()
                            ->where('id', $notification_id)
                            ->first()
                            ->delete();
        } catch ( \Exception $e ){
            return response()->json(
                ['success' => false,
                'error' => $e->getMessage(),
                'stack' => $e->getTrace(),
                ],
                500,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
        return response()->json(['success' => $notification], 200, [], 256);
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
        if (!$user) redirect()->back();

        $notifications = $user->unreadNotifications;
        $notifications = $this->upgradeArray($notifications);

        return response()->json($notifications, 200, [], 256);
    }

    /**
     * Отметить как прочитанное
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead($notification_id)
    {
        /**
         * @var $user User
         */
        $user = auth()->user();
        if (!$user) redirect()->back();

        $notification = $user->unreadNotifications()->where('id', $notification_id)->first();

        if (!isset($notification)) return response()->json($notification, 200, [], 256);

        $notification->markAsRead();

        return response()->json(['success' => true], 200, [], 256);
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
        if (!$user) redirect()->back();

        $notifications = $user->unreadNotifications;
        $notifications->markAsRead();

        return response()->json(['success' => true], 200, [], 256);
    }

    
    public function upgradeArray($items)
    {
        $new_array = [];
        foreach ($items as $item) {
            $item->delete_url = "/notifications/delete/{$item->id}";
            $item->make_as_read_url = "/unread_notifications/{$item->id}/mark_as_read";
            $new_array[] = $item;
        }
        return $new_array;
    }
}
