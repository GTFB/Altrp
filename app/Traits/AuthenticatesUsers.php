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

    }
}
