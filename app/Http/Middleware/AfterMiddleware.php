<?php


namespace App\Http\Middleware;


use Illuminate\Http\Response;

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
    $response = $next($request);

    global $altrp_route_id;

    if( $altrp_need_cache && $altrp_route_id ){

      saveCache( $response->getContent(), $altrp_route_id );

    }
    // Выполнение действия

    return $response;
  }
}