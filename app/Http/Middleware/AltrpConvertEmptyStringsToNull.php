<?php


namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\TransformsRequest;
use Illuminate\Support\Facades\Route;

class AltrpConvertEmptyStringsToNull extends TransformsRequest
{


  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next)
  {

    if( $request->isMethod('PUT') && strpos($request->getRequestUri(), '/admin/ajax/templates/') !== false ){
      return $next($request);
    }
    $this->clean($request);

    return $next($request);
  }

  /**
   * Transform the given value.
   *
   * @param  string  $key
   * @param  mixed  $value
   * @return mixed
   */
  protected function transform($key, $value)
  {
    return is_string($value) && $value === '' ? null : $value;
  }
}
