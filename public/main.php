<?php

//Render cached files
$cachePath = '../storage/framework/cache/pages/';

$env = file('../.env');
$encryption_key = "";
foreach ( $env as $setting ) {
  if ( strpos($setting,'APP_KEY', 0) !== false ) {
    $encryption_key = str_replace("APP_KEY=", "", $setting);
  }
}

if (is_dir($cachePath) && file_exists($cachePath . 'relations.json')) {

  //Current URL
  $url = $_SERVER['REQUEST_URI'];
  $url = explode('?', $url);
  $url = $url[0];

  $cachedFiles = [];
  $json = file_get_contents($cachePath . 'relations.json');

  if( $json ){
    $cachedFiles = json_decode($json, true);

    $hash_to_delete = '';

    if (!empty($cachedFiles)) {

      $users = [];
      $usersJson = file_exists($cachePath . 'users.json') ? file_get_contents($cachePath . 'users.json') : '';
      if ($usersJson) {
        $users = json_decode($usersJson, true);
      }

      $userRoles = [];
      if (isset($_COOKIE['uid'])) {
        $key = array_search($_COOKIE['uid'], array_column($users, 'cipher_user_id'));

        if (gettype($key) === "integer" && array_key_exists($key, $users)) {
          $userRoles = $users[$key]["roles"];
        }

      }

      foreach ($cachedFiles as $key => $cachedFile) {

        $userPageRoles = array_intersect($userRoles, $cachedFile['roles']);

        if (
          ( $cachedFile['url'] === $url && isset($_COOKIE['uid']) && !empty($userPageRoles) && $userPageRoles == $cachedFile['roles'] )
          ||
          ( $cachedFile['url'] === $url && isset($_COOKIE['uid']) && empty($userPageRoles) && empty($cachedFile['roles']) )
          ||
          ( $cachedFile['url'] === $url && !isset($_COOKIE['uid']) && in_array('guest', $cachedFile['roles']) )
          ||
          ( $cachedFile['url'] === $url && !isset($_COOKIE['uid']) && empty($cachedFile['roles']) )
        ) { 

          if( file_exists($cachePath . $cachedFile['hash']) ){
            $file = file_get_contents($cachePath . $cachedFile['hash']);
            echo $file;
            die();
          } else {
            $hash_to_delete = $cachedFile['hash'];
          }
        }

      }

    }

    if( $hash_to_delete ){
      $cachedFiles = array_filter( $cachedFiles, function ( $file ) use ( $hash_to_delete ){
        return $file['hash'] !== $hash_to_delete;
      } );
      $json = json_encode( $cachedFiles );
      file_put_contents( $cachePath . 'relations.json', $json );
    }
  }
}


/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

define('LARAVEL_START', microtime(true));
global $altrp_need_cache;
$altrp_need_cache = false;
global $altrp_route_id;
$altrp_route_id = false;
/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our application. We just need to utilize it! We'll simply require it
| into the script here so that we don't have to worry about manual
| loading any of our classes later on. It feels great to relax.
|
*/

require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We need to illuminate PHP development, so let us turn on the lights.
| This bootstraps the framework and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
   $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
