<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\Customizer;
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
  public function index(): \Illuminate\Http\JsonResponse
  {
    $customizers = Customizer::all()->toArray();

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
}
