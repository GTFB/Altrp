<?php

namespace App\Http\Controllers;

use App\Constructor\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TemplateController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function index( Request $request )
  {
    $_templates = Template::where( 'type', '!=', 'review' )->get();
    $templates = [];
    foreach ( $_templates as $template ) {
      $templates[] = [
        'user' => $template->user,
        'name' => $template->name,
        'title' => $template->title,
        'id' => $template->id,
        'author' => $template->user->name,
      ];
    }

    return \response()->json( $templates );
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
   * @return \Illuminate\Http\JsonResponse
   */
  public function store( Request $request )
  {
    //
    $template_data = $request->toArray();
    $template_data['data'] = json_encode( $template_data['data'] );
    $template = new Template( $template_data );
    $template->user_id  = Auth::user()->id;
    $template->type  = 'template';
    if( $template->save() ){

      return \response()->json(
        [
          'message' => 'Success',
          'redirect' => true,
          'url' =>  url( '/admin/editor?template_id=' . $template->id )
        ]
      );
    }
    return \response()->json( ['message'=>'Error Save'], 500);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Constructor\Template $template
   * @return \Illuminate\Http\Response
   */
  public function show( Template $template )
  {
    return response()->json( $template->toArray() );

  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Constructor\Template $template
   * @return \Illuminate\Http\Response
   */
  public function edit( Template $template )
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \App\Constructor\Template $template
   * @return \Illuminate\Http\Response
   */
  public function update( Request $request, Template $template )
  {
    $old_template = $template;

    if ( ! $old_template ) {
      return response()->json( trans( "responses.not_found.template" ), 404, [], JSON_UNESCAPED_UNICODE );
    }

    $review = new Template( $old_template->toArray() );
    $review->parent_template = $old_template->id;
    $review->type = 'review';
    if ( ! $review->save() ) {
      return response()->json( trans( "responses.dberror" ), 400, [], JSON_UNESCAPED_UNICODE );
    }
    $old_template->name = $request->name;
    $old_template->title = $request->title;
    $old_template->data = json_encode( $request->data );
    $old_template->type = 'template'; //1
    $old_template->user_id = auth()->user()->id;

    if ( $old_template->save() ) {
      return response()->json( $old_template, 200, [], JSON_UNESCAPED_UNICODE );
    }

    return response()->json( trans( "responses.dberror" ), 400, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Constructor\Template $template
   * @return \Illuminate\Http\JsonResponse
   * @throws \Exception
   */
  public function destroy( Template $template )
  {
    //
    if( $template->delete() ){
      return \response()->json( ['message'=>'Success'] );
    }
    return \response()->json( ['message'=>'Error Delete'], 500 );
  }

  /**
   * @param string $template_id
   * @return \Illuminate\Http\JsonResponse
   */
  public function reviews( $template_id ){
    $reviews = Template::where( 'parent_template', $template_id )
      ->where( 'type', 'review' )
      ->get()->toArray();
    return \response()->json( $reviews );
  }
}
