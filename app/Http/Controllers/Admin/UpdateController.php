<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Services\AltrpUpdateService;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateController extends Controller
{
  /**
   * Обработка запроса проверки нужно ли обнолвение
   * @param AltrpUpdateService $updateService
   * @return \Illuminate\Http\JsonResponse
   */
  public function check_update( AltrpUpdateService $updateService ){
    Artisan::call( 'config:clear');
    try {
      $new_version = $updateService->get_version();
    } catch ( NotFoundHttpException $e ){
      return response()->json( ['message' => $e->getMessage()], 404 );
    }
    $res = ['result' => false];
    if( version_compare( $new_version, getLatestVersion()) > 0){
      $res = [
        'result' => true,
        'version' => $new_version,
      ];
    }
    return response()->json( $res );
  }

  /**
   * Обработка запроса проверки нужно ли обнолвение
   * @param AltrpUpdateService $updateService
   * @return \Illuminate\Http\JsonResponse
   * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
   */
  public function update_altrp( AltrpUpdateService $updateService ){
    try {
      Artisan::call( 'down' );
      $result = $updateService->update();
    }catch ( \HttpException $e ) {
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