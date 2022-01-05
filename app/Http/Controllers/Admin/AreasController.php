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
use App\Http\Requests\ApiRequest;

class AreasController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function index(ApiRequest $request)
  {
    
    $search = $request->get('s');
    $categories = $request->get('categories');
    $page = $request->get('page', 1);
    $orderColumn = $request->get('order_by') ?? 'title';
    $orderColumn = 'areas.' . $orderColumn;
    $limit = $request->get('pageSize', 10);
    $offset = $limit * ($page - 1);
    $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
    $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);

    $_areas = Area::select('areas.*')->with('categories.category')
      ->when($categories, function ($query, $categories) {
          if (is_string($categories)) {
              $categories = explode(",", $categories);
              $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'areas.guid')
                    ->whereIn('altrp_category_objects.category_guid', $categories);
          }
      })
      ->when($search, function ($query, $search) {
          $query->where(function ($query) use ($search) {
              $query->where('areas.title','like', '%'.$search.'%')
                    ->orWhere('areas.id','like', '%'.$search.'%');
          });
      })
      ->when(($offset == 0 || $offset > 0) && $limit, function ($query) use ($offset, $limit) {
          $query->skip($offset)->take($limit);
      })
      ->$sortType($orderColumn)
      ->get();

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
      return response()->json( ['message' => 'Area not Saved'], 500, [], JSON_UNESCAPED_UNICODE );
    }

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

    CategoryObject::where("object_guid", $area->guid)->delete();
    
    return response()->json( ['success' => true], 200, [], JSON_UNESCAPED_UNICODE );
  }
}
