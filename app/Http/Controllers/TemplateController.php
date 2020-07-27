<?php

namespace App\Http\Controllers;

use App\Constructor\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class TemplateController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function index( Request $request )
  {
    $page_count = 1;
    if( ! $request->get( 'page' ) ){
      $_templates = Template::where( 'type', '!=', 'review' )->get()->sortByDesc( 'id' )->values();
    } else {
      $page_size = $request->get( 'pageSize', 10 );
      $area_name = $request->get( 'area', 'content' );
      $_templates = Template::where( 'type', '!=', 'review' )
        ->join( 'areas', 'areas.id', '=', 'templates.area' )
        ->where( 'areas.name', $area_name )->skip( $page_size * ( $request->get( 'page' ) - 1 ) )
        ->take( $page_size );
      $page_count = $_templates->toBase()->getCountForPagination();
      $_templates = $_templates->get('templates.*')->sortByDesc( 'id' )->values();

      $page_count = ceil( $page_count / $page_size );
    }
    $templates = [];
    foreach ( $_templates as $template ) {
      /**
       * @var Template $template
      */
      $templates[] = [
        'user' => $template->user,
        'name' => $template->name,
        'title' => $template->title,
        'id' => $template->id,
        'author' => $template->user->name,
        'url' => '/admin/editor?template_id=' . $template->id,
        'area' => $template->area()->name,

      ];

    }

    return \response()->json( [
        'templates' => $templates,
        'pageCount' => $page_count,
      ]);
  }

  /**
   * Send array for frontend <option> tags ({
   *     value,
   *    label
   * }).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function options(){
    $_templates = Template::where( 'type', '!=', 'review' )->get();
    $options = [];

    foreach ( $_templates as $template ) {
      $options[] = [
        'value' => $template->id,
        'label' => $template->title,
      ];
    }
    return \response()->json( $options );
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
   * Display the specified resource.
   *
   * @param string $template_id
   * @return \Illuminate\Http\Response
   */
  public function show_frontend( string $template_id )
  {
    $template = Template::find( $template_id );

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
      ->get([
        'parent_template',
        'id',
        'title',
        'created_at',
        'updated_at',
      ])->toArray();
    return \response()->json( $reviews );
  }
}
