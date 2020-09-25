<?php

namespace App\Http\Middleware;

use Closure;

class TransformApiHeaders 
{
  public function handle($request, Closure $next)
  {
    $cookie_name = 'XSRF-TOKEN';
    $token_cookie = $request->cookie($cookie_name);
    if ($token_cookie !== null) {
      $request->headers->add(["X-$cookie_name" => $token_cookie]);
    }
    return $next($request);
  }
}