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
use Illuminate\Support\Str;
use App\CategoryObject;

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
    $area->guid = (string)Str::uuid();

    if( ! $area->save() ){

      $categories = $request->get( '_categories' );
      if( is_array($categories) && count($categories) > 0 && $area->guid){
        $insert = [];
        foreach($categories as $key => $category){
          $insert[$key] = [
            "category_guid" => $category['value'],
            "object_guid" => $area->guid,
            "object_type" => "Area"
          ];
        }
        CategoryObject::insert($insert);
      }

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
    $area->categories = $area->categoryOptions();
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

    CategoryObject::where("object_guid", $area->guid)->delete();
    $categories = $request->get( '_categories' );
    if( is_array($categories) && count($categories) > 0 && $area->guid){
      $insert = [];
      foreach($categories as $key => $category){
        $insert[$key] = [
          "category_guid" => $category['value'],
          "object_guid" => $area->guid,
          "object_type" => "Area"
        ];
      }
      CategoryObject::insert($insert);
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
