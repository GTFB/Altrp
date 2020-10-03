<?php

namespace App\Http\Controllers\Admin;

use App\GlobalStyle;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GlobalStyleController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return response()->json( ['data' => GlobalStyle::all()->toArray()], 200, [], JSON_UNESCAPED_UNICODE);
  }

  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   * @return \Illuminate\Http\Response
   */
  public function options( Request $request )
  {
    if( $request->get( 's' ) ){
      $globalStyles = GlobalStyle::where( 'title', 'LIKE', '%' . $request->get( 's' ) . '%' )->get();
    } else{
      $globalStyles = GlobalStyle::all();
    }
    $globalStyles = $globalStyles->map( function( GlobalStyle $globalStyle ){
      return [
        'label' => $globalStyle->title,
        'value' => $globalStyle->id,
      ];
    } );
    return response()->json( ['data' => $globalStyles->toArray()], 200, [], JSON_UNESCAPED_UNICODE);
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
   * @return \Illuminate\Http\Response
   */
  public function store( Request $request )
  {
    //
    if( $globalStyle = GlobalStyle::where( 'title', $request->get( 'title' ) )->first() ){
      $globalStyle->fill( $request->all() );
      $globalStyle->user_id = auth()->user()->id;
    } else {
      $globalStyle = new GlobalStyle( $request->all() );
      $globalStyle->user_id = auth()->user()->id;
    }
    if( ! $globalStyle->save() ){
      return response()->json( ['message' => 'Global Style not Saved', 'success' => false,], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( ['data'=>$globalStyle->toArray(), 'success' => true,], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\GlobalStyle $globalStyle
   * @return \Illuminate\Http\Response
   */
  public function show( GlobalStyle $globalStyle )
  {
    //
    return response()->json( ['data' => $globalStyle->toArray()], 200, [], JSON_UNESCAPED_UNICODE );

  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\GlobalStyle $globalStyle
   * @return \Illuminate\Http\Response
   */
  public function edit( GlobalStyle $globalStyle )
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \App\GlobalStyle $globalStyle
   * @return \Illuminate\Http\Response
   */
  public function update( Request $request, GlobalStyle $globalStyle )
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\GlobalStyle $globalStyle
   * @return \Illuminate\Http\Response
   * @throws \Exception
   */
  public function destroy( GlobalStyle $globalStyle )
  {
    //
    try {
      if ( ! $globalStyle->delete() ) {
        return response()->json( [ 'message' => 'Global Style not Saved' ], 500, [], JSON_UNESCAPED_UNICODE );
      }
    } catch (\Exception $e){
      response()->json( [ 'message' => $e->getMessage() ], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( $globalStyle->toArray(), 200, [], JSON_UNESCAPED_UNICODE );
  }
}
