<?php

namespace App\Http\Controllers\Admin;

use App\Area;
use App\Http\Controllers\Controller;
use App\Media;
use App\Page;
use App\PagesTemplate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AreasController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function index()
  {
    $_areas = Area::all();
    return response()->json( $_areas->toArray() );
  }

  /**
   * Show the form for creating a new resource.
   *
   * @param Request $request
   * @return \Illuminate\Http\Response
   */
  public function create( Request $request )
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function store( Request $request )
  {

    $area = new Area(
      $request->toArray()
    );

    if( ! $area->save() ){
      return response()->json( ['message' => 'Area not Saved'], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( $area->toArray(), 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Display the specified resource.
   *
   * @param string $id
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function show(  $id )
  {
    //

    $area = Area::find( $id );

    if( ! $area ){
      return response()->json( ['message' => 'Area not Found'], 404, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( $area->toArray(), 200, [], JSON_UNESCAPED_UNICODE );

  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int $id
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function edit( $id, Request $request )
  {

  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  int $id
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function update( Request $request, $id )
  {


    $area = Area::find( $id );

    if( ! $area ){
      return response()->json( ['message' => 'Area not Found'], 404, [], JSON_UNESCAPED_UNICODE );
    }

    $area->fill( $request->all() );

    if( ! $area->save() ){
      return response()->json( ['message' => 'Area not Saved'], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( $area->toArray(), 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param Area $area
   * @param string $id
   * @return \Illuminate\Http\JsonResponse
   */
  public function destroy(  $id )
  {
    $area = Area::find( $id );
    if( ! $area ){
      return response()->json( ['message' => 'Area not Found'], 404, [], JSON_UNESCAPED_UNICODE );
    }

    if( ! $area->delete() ){
      return response()->json( ['message' => 'Area not Deleted'], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( ['success' => true], 200, [], JSON_UNESCAPED_UNICODE );
  }
}
