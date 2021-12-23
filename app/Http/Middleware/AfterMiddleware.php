<?php


namespace App\Http\Middleware;


use Illuminate\Http\Response;
use Illuminate\Support\Facades\Redirect;

class AfterMiddleware
{

  /**
   * @param $request
   * @param \Closure $next
   * @return Response|mixed
   * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
   */
  public function handle( $request, \Closure $next)
  {
    /**
     * @var $response Response
     */
    global $altrp_need_cache;
    if (substr($request->header('host'), 0, 4) === 'www.') {
      $request->headers->set('host', env('APP_URL'));
      return Redirect::to($request->path());
    }
    $response = $next($request);

    global $altrp_route_id;

    if( $altrp_need_cache && $altrp_route_id ){

      saveCache( $response->getContent(), $altrp_route_id );

    }
    // Выполнение действия

    return $response;
  }
}
