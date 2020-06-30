<?php

namespace App\Http\Controllers\Frontend;


use App\Altrp\Model;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ModelsController extends Controller
{

  public function models( $model_name, Request $request ){
    $res = [];

    if(! $request->get( 'page' ) ){
      return response()->json( DB::table( $model_name )->get()->toArray(  ) );
    }

    $res[$model_name] = DB::table( $model_name )->offset( ( $request->get( 'page' ) - 1 ) * $request->get( 'pageSize' ) )
      ->limit( $request->get( 'pageSize' ) )
      ->get()->toArray(  );
    $res['hasMore'] = DB::table( $model_name )->getCountForPagination() >  $request->get( 'page' ) * $request->get( 'pageSize' );

    return response()->json( $res );
  }

  /**
   * @param string $model_name
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function create( $model_name, Request $request ){

    $res = [];

    DB::table( $model_name )->insert($request->toArray());
    $res[$model_name] = $request->toArray();
    $res['success'] = true;
    return response()->json( $res );
  }
}