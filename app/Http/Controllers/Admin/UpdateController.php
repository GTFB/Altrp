<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Services\AltrpUpdateService;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateController extends Controller
{

  public function changelog(  ){
    $changelog = File::get( base_path('README.md') );

    return response()->json([
      'success' => true,
      'data' => $changelog,
    ], 200, [], JSON_UNESCAPED_UNICODE);
  }
  /**
   * Обработка запроса проверки нужно ли обнолвение
   * @param AltrpUpdateService $updateService
   * @return \Illuminate\Http\JsonResponse
   */
  public function check_update( AltrpUpdateService $updateService ){
    Artisan::call( 'config:clear' );
    try {
      \Log::error(date('d.m.Y H:i:s') . " | User Id: " . \Auth::user()->id . " | User Ip: " . $_SERVER['REMOTE_ADDR'] . " | Method:" . __METHOD__);
      $new_version = $updateService->get_version();
    } catch ( NotFoundHttpException $e ){
      return response()->json( ['message' => $e->getMessage()], 404 );
    }
    $res = ['result' => false];

    if( env( 'APP_ENV', 'local' ) === 'local'){
      return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE );
    }
    if( version_compare( $new_version, env( 'APP_VERSION'  ) ) > 0){
      $res = [
        'result' => true,
        'version' => $new_version,
      ];
    }
    return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Установка тестовой версии Altrp
   * @param AltrpUpdateService $updateService
   * @return \Illuminate\Http\JsonResponse
   * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
   */
  public function install_test_altrp( AltrpUpdateService $updateService ){

    if( env( 'APP_ENV', 'local' ) === 'local'){
      return response()->json( ['result' => false] );
    }
    try {
      \Log::info(date('d.m.Y H:i:s') . " | User Id: " . \Auth::user()->id . " | User Ip: " . $_SERVER['REMOTE_ADDR'] . " | Method:" . __METHOD__);
      Artisan::call( 'down' );
      $result = $updateService->update( true );
    }catch ( \HttpException $e ) {
      Artisan::call( 'up' );
      return response()->json( ['message' => $e->getMessage(), 'result' => false], 500 );
    }catch (\Exception $e) {
      Artisan::call( 'up' );
      return response()->json( ['message' => $e->getMessage(), 'result' => false], 500 );
    }
    Artisan::call( 'up' );
    return response()->json( ['result' => $result], 200, [
      'Clear-Site-Data' => 'cache',
    ], JSON_UNESCAPED_UNICODE);
  }
  /**
   * Обновление Altrp
   * @param AltrpUpdateService $updateService
   * @return \Illuminate\Http\JsonResponse
   * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
   */
  public function update_altrp( AltrpUpdateService $updateService ){
    if( env( 'APP_ENV', 'local' ) === 'local'){
      return response()->json( ['result' => false] );
    }
    try {
      \Log::info(date('d.m.Y H:i:s') . " | User Id: " . \Auth::user()->id . " | User Ip: " . $_SERVER['REMOTE_ADDR'] . " | Method:" . __METHOD__);
      Artisan::call( 'down' );
      $result = $updateService->update();
    }catch ( \HttpException $e ) {
      Artisan::call( 'up' );
      return response()->json( ['message' => $e->getMessage()], 500 );
    } catch (\Exception $e) {
      Artisan::call( 'up' );
      return response()->json( ['message' => $e->getMessage()], 500 );
    }
    Artisan::call( 'up' );
    return response()->json( ['result' => $result] );
  }

  /**
   * Запрос на обновление всех пользовательских контроллеров
   * @param AltrpUpdateService $updateService
   * @return \Illuminate\Http\JsonResponse
   * @throws \App\Exceptions\CommandFailedException
   */
  public function updateAllControllers( AltrpUpdateService $updateService ){
    return response()->json( ['success' => $updateService->updateAllControllers()], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Запрос на обновление всех пользовательских ресурсов через обновление данных Models в БД
   * @param AltrpUpdateService $updateService
   * @return \Illuminate\Http\JsonResponse
   */
  public function upgradeAllResources( AltrpUpdateService $updateService ){
    return response()->json( ['success' => $updateService->upgradeAllResources()], 200, [], JSON_UNESCAPED_UNICODE );
  }
}
