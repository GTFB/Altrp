<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Services\AltrpUpdateService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateController extends Controller
{
  /**
   * Обработка запроса проверки нужно ли обнолвение
   * @param AltrpUpdateService $updateService
   * @return \Illuminate\Http\JsonResponse
   */
  public function check_update( AltrpUpdateService $updateService ){
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
   */
  public function update_altrp( AltrpUpdateService $updateService ){
    try {
      $result = $updateService->update();
    }catch ( \HttpException $e ) {
      return response()->json( ['message' => $e->getMessage()], 500 );
    }
    return response()->json( ['result' => $result] );
  }
}