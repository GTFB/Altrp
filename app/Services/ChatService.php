<?php


namespace App\Services;


use Ixudra\Curl\Facades\Curl;
use Nwidart\Modules\Facades\Module;

class ChatService
{
    public static function authInChat($login)
    {
        if (Module::has('Chat') && Module::isEnabled('Chat')) {
            $authUrl = config('chat.auth_url');
            $login = str_replace('@', '_', $login);
            $response = Curl::to($authUrl)
                ->withData([
                    'action' => 'loginuser',
                    'token' => '7e3rfcr53grh4tgdwcwdqe76tgdvcb==',
                    'username' => $login
                ])
                ->withHeaders([])
                //->asJson()
                //->asJsonResponse()
                ->get();
            return $response;
        }
        return false;
    }

    public static function registerInChat($table, $attributes)
    {
        if (Module::has('Chat') && Module::isEnabled('Chat') && $table == 'users') {
            $regUrl = config('chat.reg_url');
            $login = str_replace('@', '_', $attributes['email']);
            $password = $attributes['password'];
            $response = Curl::to($regUrl)
                ->withData([
                    'action' => 'registeruser',
                    'token' => '7e3rfcr53grh4tgdwcwdqe76tgdvcb==',
                    'username' => $login,
                    'password' => $password
                ])
                ->withHeaders([])
                //->asJson(true)
                //->asJsonResponse()
                //->returnResponseObject()
                ->allowRedirect()
                //->enableDebug(base_path('curl.log'))
                ->get();
            return $response;
        }
        return false;
    }
}
