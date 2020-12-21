<?php

namespace App\Http\Middleware;

use App\Page;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Support\Facades\Auth;

class ResponseIfAuthenticated
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Closure $next
   * @param  string|null $guard
   * @return mixed
   */
  public function handle( $request, Closure $next, $guard = null )
  {

    if ( Auth::guard( $guard )->check() ) {
//      if( Page::where( 'path', '/login' )->first() ){
//        return response()->json( [
//          'success' => false,
//          'message' => 'Are Already Logged',
//        ] );
//      } else {
        return redirect( '/' );
//      }
    }

    return $next( $request );
  }
}
