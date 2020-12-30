<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\NoticeSetting;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NoticeSettingController extends Controller
{
    public function index($user)
    {
        $notifications = NoticeSetting::where([['noticed_id', $user], ['noticed_type', 'App\User']])->get();
        return response()->json($notifications, 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function getNotice($user, $notice)
    {
        $notifications = NoticeSetting::where([['noticed_id', $user], ['noticed_type', 'App\User'],['id', $notice]])->with('sources')->get();
        return response()->json($notifications, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param $user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($user, Request $request)
    {
        $data = $request->all();
        $data['noticed_id'] = $user;
        $data['noticed_type'] = 'App\User';
        $notification = new NoticeSetting($data);
        $res = $notification->save();
        $notification->sources()->attach($data['sources']);
        return response()->json(['success' => $res], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param $user
     * @param $notification
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($user, $notification, Request $request)
    {
        $data = $request->all();
        $data['noticed_id'] = $user;
        $data['noticed_type'] = 'App\User';
        $notification = NoticeSetting::find($notification);
        $notification->sources()->detach($notification->sources);
        $res = $notification->update($data);
        $notification->sources()->attach($data['sources']);
        return response()->json(['success' => $res], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param $user
     * @param $notification
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($user, $notification)
    {
        $notification = NoticeSetting::find($notification);
        $notification->sources()->detach($notification->sources);
        $res = $notification->delete();
        return response()->json(['success' => $res], 200, [], JSON_UNESCAPED_UNICODE);
    }
}
