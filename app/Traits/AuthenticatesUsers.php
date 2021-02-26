<?php


namespace App\Traits;

use Illuminate\Foundation\Auth\AuthenticatesUsers as BaseAuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Ixudra\Curl\Facades\Curl;


trait AuthenticatesUsers
{
    use BaseAuthenticatesUsers;

    /**
     * The user has been authenticated.
     *
     * @param  Request  $request
     * @param  mixed  $user
     */
    protected function authenticated(Request $request, $user)
    {
        $emailParts = explode('@', $user->email);
        $login = $emailParts[0] ?? $user->email;
        $userFullName = $user->name;
        $userFullName .= $user->last_name ? ' ' . $user->last_name : '';

        $data = json_decode('{"identifier": {
            "type": "m.id.user",
            "user": "' . $login . '"
          },
          "initial_device_display_name": "' . $userFullName . '",
          "password": "12345678",
          "type": "m.login.password"}');

        $response = Curl::to('https://event.regagro.net/_matrix/client/r0/login')
            ->withData($data)
            ->asJson()
            ->post();

        if (isset($response->error)) {
            Log::debug($response->error);
        }
    }
}
