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
   * @param string $model_id
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function show( $model_name, $model_id, Request $request ){


    $class_name = Model::get_model_class_by_name( $model_name );

    return response()->json( $class_name::with( Model::get_relations_by_name( $model_name ) )->find( $model_id )->toArray() );
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

  /**
   * Обраблотка запроса на удлаение модели по id
   * @param string $model_name
   * @param string $model_id
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function delete( $model_name, $model_id, Request $request ){
    $res[] = $model_name;
    $res[] = $model_id;
    $res['success'] = true;
    DB::table( $model_name )->delete( $model_id );
    return response()->json( $res );
  }
  /**
   * Обраблотка запроса на редактирование модели по id
   * @param string $model_name
   * @param string $model_id
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function edit( $model_name, $model_id, Request $request ){


    $class_name = Model::get_model_class_by_name( $model_name );

    $columns = $request->toArray();
    $related_columns = [];
    foreach ( $columns as $key => $column ) {
      if(strpos(  $key, '.' ) > 0){
        unset( $columns[$key] );
        $related_columns[$key] = $column;
      }
    }

    $model_instance = $class_name::find( $model_id )->fill( $columns );
    $model_instance->save();
    foreach ( $related_columns as $key => $item ) {
      $related_model_name = explode( '.', $key )[0];
      $related_filed_name = explode( '.', $key )[1];

      if( $model_instance->$related_model_name ){
        $model_instance->$related_model_name->fill( [
          $related_filed_name =>  $item
        ] )->save();
      }
    }

    $res[$model_name] = $class_name::with( Model::get_relations_by_name( $model_name ) )
      ->where( 'id', $model_id )->first()->toArray();
    $res['success'] = true;
    return response()->json( $res );
  }
}