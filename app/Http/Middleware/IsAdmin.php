<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
  public function handle($request, Closure $next)
  {
      $user = Auth::user();
      if( ! $user ){
        return redirect('/');
      }
      if( ! $user->isAdmin() ) {
          return redirect('/');
      }

      return $next($request);
  }
}
