<?php

namespace App\Http\Controllers\Admin;

use App\AltrpMeta;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AltrpMetaController extends Controller
{
  /**
   * Сохранить мета-настройку по имени
   * @param Request $request
   * @param string $meta_name
   * @return \Illuminate\Http\JsonResponse
   */
  public function getMetaByName( Request $request, $meta_name ){
    if( ! $meta_name ){
      return response()->json( ['success' => false, 'message' => 'Need meta name'], 400, [], JSON_UNESCAPED_UNICODE );
    }
    $altrp_meta = AltrpMeta::find( $meta_name );
    if( ! $altrp_meta ){
      return response()->json( ['success' => false, 'message' => 'Meta not found'], 404, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( ['success' => true, 'data' => $altrp_meta->toArray()], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Получить мета-настройку по имени
   * @param Request $request
   * @param string $meta_name
   * @return \Illuminate\Http\JsonResponse
   */
  public function saveMeta( Request $request, $meta_name ){
    if( ! $meta_name ){
      return response()->json( ['success' => false, 'message' => 'Need meta name'], 400, [], JSON_UNESCAPED_UNICODE );
    }
    $meta_data = $request->all();
    $meta_data['meta_name'] = $meta_name;
    $altrp_meta = AltrpMeta::find( $meta_name );
    if( ! $altrp_meta ) {
      $altrp_meta = new AltrpMeta( $meta_data );
    } else {
      $altrp_meta->fill( $meta_data );
    }
    $result = $altrp_meta->save();
    if( ! $result ){
      return response()->json( ['success' => false, 'message' => 'Error Saving Meta'], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( ['success' => true,], 200, [], JSON_UNESCAPED_UNICODE );
  }
}
