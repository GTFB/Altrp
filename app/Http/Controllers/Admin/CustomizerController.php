<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\Customizer;
use App\Altrp\Model;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class CustomizerController extends Controller
{
  /**
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function store( Request $request ): \Illuminate\Http\JsonResponse
  {

    $customizer = new Customizer( $request->all() );
    $customizer->guid = Str::uuid();
    try {

      if($customizer->model_id && Model::find($customizer->model_id)){
        $customizer->model_guid = Model::find($customizer->model_id)->guid;
      }
      if(! $customizer->settings ){
        $customizer->settings = [];
      }
      $customizer->save();
    } catch ( \Throwable $th ) {
      return response()->json( [
        'success' => false,
        'message' => "Customizer don't saved",
        'throw message' => $th->getMessage(),
        'trace' => $th->getTrace(),
      ], 503, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( [
      'success' => true,
      'data' => $customizer->toArray(),
      'redirect_route' => url( "/admin/customizers-editor?customizer_id=$customizer->id" )
    ], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * @param $id
   * @return \Illuminate\Http\JsonResponse
   */
  public function show( $id ): \Illuminate\Http\JsonResponse
  {

    if ( Uuid::isValid( $id ) ) {
      $customizer = Customizer::where( 'guid', $id )->first();
    } else {
      $customizer = Customizer::find( $id );
    }
    if ( ! $customizer ) {
      return response()->json( [ 'success' => false, 'message' => 'Customizer not found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }
    /**
     * @var $customizer Customizer
     */
    $customizer->with('altrp_model');
    return response()->json( [ 'success' => true, 'data' => $customizer->toArray() ], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * @param $id
   * @return \Illuminate\Http\JsonResponse
   */
  public function update( $id, Request $request ): \Illuminate\Http\JsonResponse
  {
    $customizer = Customizer::find( $id );
    if ( ! $customizer ) {
      return response()->json( [ 'success' => false, 'message' => 'Customizer not found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }
    $customizer->fill( $request->toArray() );
    try {
      if($customizer->model_id && Model::find($customizer->model_id)){
        $customizer->model_guid = Model::find($customizer->model_id)->guid;
      }
      $customizer->save();
    } catch ( \Throwable $th ) {
      return response()->json( [
        'success' => false,
        'message' => 'Customizer could not be saved',
        'throw message' => $th->getMessage(),
        'trace' => $th->getTrace(),
      ], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( [ 'success' => true, 'data' => $customizer->toArray() ], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function index(Request $request): \Illuminate\Http\JsonResponse
  {

    $search = $request->get('s');
    $categories = $request->get('categories');
    $page = $request->get('page', 1);
    $orderColumn = $request->get('order_by') ?? 'title';
    $orderColumn = 'altrp_customizers.' . $orderColumn;
    $limit = $request->get('pageSize');
    $offset = $limit * ($page - 1);
    $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
    $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);

    $customizers = Customizer::select('altrp_customizers.*')->with('categories.category')
      ->when($categories, function ($query, $categories) {
          if (is_string($categories)) {
              $categories = explode(",", $categories);
              $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_customizers.guid')
                    ->whereIn('altrp_category_objects.category_guid', $categories);
          }
      })
      ->when($search, function ($query, $search) {
          $query->where(function ($query) use ($search) {
              $query->where('altrp_customizers.title','like', '%'.$search.'%')
                    ->orWhere('altrp_customizers.id','like', '%'.$search.'%');
          });
      })
      ->when(($offset == 0 || $offset > 0) && $limit, function ($query) use ($offset, $limit) {
          $query->skip($offset)->take($limit);
      })
      ->$sortType($orderColumn)
      ->get()->toArray();

    return response()->json( [
      'success' => true,
      'data' => $customizers,
    ] );
  }

  public function destroy( $id, Request $request )
  {

    if ( Uuid::isValid( $id ) ) {
      $customizer = Customizer::where( 'guid', $id )->first();
    } else {
      $customizer = Customizer::find( $id );
    }
    if ( ! $customizer ) {
      return response()->json( [ 'success' => false, 'message' => 'Customizer not found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }
    try {
      $customizer->delete();
    } catch ( \Throwable $th ) {
      return response()->json( [
        'success' => false,
        'throw message' => $th->getMessage(),
        'trace' => $th->getTrace(),
        'message' => 'Customizer could not be deleted' ], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( [ 'success' => true, ], 200, [], JSON_UNESCAPED_UNICODE );

  }

  /**
   * @param string $id
   * @return Json
   */
  public function exportCustomizer( string $id )
  {

    if( Uuid::isValid( $id ) ){
      $customizer = Customizer::where( 'guid', $id )->first();
    } else {
      $customizer = Customizer::find( $id );
    }
    /**
     * @var $template Template
     */
    if( ! $customizer ){
      return response()
        ->json(
          ['success' => false, 'message' => 'Customizer not Found'],
          404,
          [],
          JSON_UNESCAPED_UNICODE );
    }

    return response()->json( $customizer->toArray(), 200, [], JSON_UNESCAPED_UNICODE );
  }
}
