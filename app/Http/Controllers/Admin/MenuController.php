<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\Menu;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\CategoryObject;

class MenuController extends Controller
{

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function index( Request $request )
  {
    //
    $search = $request->get('s');
    $categories = $request->get('categories');

    $menus = Menu::with('categories.category')
      ->when($search, function ($query, $search) {
              $query->where( 'name', 'like', '%' . $search . '%' );
      })
      ->when($categories, function ($query, $categories) {
          if (is_string($categories)) {
              $categories = explode(",", $categories);
              $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'menus.guid')
                    ->whereIn('altrp_category_objects.category_guid', $categories);
          }
      })
      ->get()->sortByDesc( 'menus.name' )->values()->toArray();

    // if( $request->get( 's' ) ){
    //   $menus = Menu::where( 'name', 'like', '%' . $request->get( 's' ) . '%' )->get();
    //   $menus = $menus->sortByDesc( 'id' )->values()->toArray();
    //   return response()->json( $menus, 200, [], JSON_UNESCAPED_UNICODE);
    // }
    // return response()->json( Menu::all()->sortByDesc( 'id' )->values()->toArray(), 200, [], JSON_UNESCAPED_UNICODE);

    return response()->json( $menus, 200, [], JSON_UNESCAPED_UNICODE);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
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
    //
    $menu = new Menu( $request->all() );
    $menu->guid = Str::uuid();

    if( ! $menu->save() ){
      return response()->json( ['success' => false, ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    $categories = $request->get( '_categories' );
    if( is_array($categories) && count($categories) > 0  && $menu->guid){
      $insert = [];
      foreach($categories as $key => $category){
        $insert[$key] = [
          "category_guid" => $category['value'],
          "object_guid" => $menu->guid,
          "object_type" => "Menu"
        ];
      }
      CategoryObject::insert($insert);
    }

    return response()->json( ['success' => true, 'data' => $menu->toArray()], 200, [], JSON_UNESCAPED_UNICODE);

  }

  /**
   * Display the specified resource.
   *
   * @param $id
   * @param Menu $menu
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function show( $id, Request $request )
  {
    //

    if( $id === 'options' ){
      $menus = Menu::all();

      $menus = $menus->map( function( $menu ) use ( $request ){
        $result = [];
        if( $request->value && data_get( $menu, $request->value ) ){
          $result['value'] = data_get( $menu, $request->value );
          $result['label'] = data_get( $menu, 'name' );
        } else {

          $result['value'] = data_get( $menu, 'id' );
          $result['label'] = data_get( $menu, 'name' );
        }
        return $result;
      } );
      return response()->json( $menus->toArray(), 200, [], JSON_UNESCAPED_UNICODE);

    }
    $menu = Menu::find( $id );
    $menu->categories = $menu->categoryOptions();
    return response()->json( $menu->toArray(), 200, [], JSON_UNESCAPED_UNICODE);

  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int $id
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function edit( $id, Request $request )
  {
    //
    $menu = Menu::find( $id );

    if( ! $menu ){
      return response()->json( ['success' => false,'message'=>'Menu Not Found'], 404, [], JSON_UNESCAPED_UNICODE);
    }
    $menu->fill( $request->all() );
    $menu->save();
    return response()->json( ['success' => true,], 200, [], JSON_UNESCAPED_UNICODE);
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
    //
    $menu = Menu::find( $id );

    if( ! $menu ){
      return response()->json( ['success' => false,'message'=>'Menu Not Found'], 404, [], JSON_UNESCAPED_UNICODE);
    }
    $menu->fill( $request->all() );
    $menu->save();

    CategoryObject::where("object_guid", $menu->guid)->delete();
    $categories = $request->get( '_categories' );
    if( is_array($categories) && count($categories) > 0 && $menu->guid){
      $insert = [];
      foreach($categories as $key => $category){
        $insert[$key] = [
          "category_guid" => $category['value'],
          "object_guid" => $menu->guid,
          "object_type" => "Menu"
        ];
      }
      CategoryObject::insert($insert);
    }
    
    return response()->json( ['success' => true,], 200, [], JSON_UNESCAPED_UNICODE);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param Menu $menu
   * @param string $id
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function destroy( $id )
  {
    //
    $menu = Menu::find($id);

    if( ! $menu ){
      return response()->json( ['success' => false,'message'=>'Menu Not Found'], 404, [], JSON_UNESCAPED_UNICODE);
    }

    if( $menu->delete() ){
      CategoryObject::where("object_guid", $menu->guid)->delete();
      return response()->json( ['success' => true] );
    }
    return response()->json( ['success' => false, 'message'=> 'Error deleting file' ], 500 );
  }

  /**
   * Получить меню
   * @param \Illuminate\Http\UploadedFile $file
   */
  public static function getByGuid( $guid )
  {
   $menu = Menu::where( 'guid', $guid )->first();
   if( ! $menu ){
     return response()->json( ['success' => false,'message'=>'Menu Not Found'], 404, [], JSON_UNESCAPED_UNICODE);
   }
    return response()->json( $menu->toArray(), 200, [], JSON_UNESCAPED_UNICODE);
  }
}
