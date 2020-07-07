<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Media;
use App\Page;
use App\PagesTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PagesController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //

    $_pages = Page::all();
    $pages = [];
//    echo '<pre style="padding-left: 200px;">';
//    var_dump( $_pages );
//    echo '</pre>';

    foreach ( $_pages as $page ) {
//      echo '<pre style="padding-left: 200px;">';
//      var_dump( $page );
//      echo '</pre>';

      $content_template = $page->get_content_template();
      $pages[] = [
        'user' => $page->user,
        'title' => $page->title,
        'id' => $page->id,
        'author' => $page->user->name,
        'template_content' => $content_template,
        'template_content_title' => $content_template ? $content_template->title : '',
        'url' => \url( $page->path ),
        'editUrl' => '/admin/pages/edit/' . $page->id,
        'path' => $page->path,
      ];
    }
    return response()->json( $pages );
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
    $res = [ 'success' => false, ];
    $page = new Page( $request->toArray() );
    $page->author = auth()->user()->id;
    $page->content = '';
    if ( $page->save() ) {
      if ( $request->template_id ) {
        $pages_templates = new PagesTemplate( [
          'page_id' => $page->id,
          'template_id' => $request->template_id,
          'template_type' => 'content',
        ] );
        $pages_templates->save();
        $res['pages_templates'] = $pages_templates->toArray();
      }
      $res['success'] = true;
      $res['page'] = $page->toArray();
      return response()->json( $res );
    }
    $res['message'] = 'Page not saved';
    return response()->json( $res, 500 );
  }

  /**
   * Display the specified resource.
   *
   * @param string $id
   * @return \Illuminate\Http\Response
   */
  public function show( $id )
  {
    //
    $page = Page::find( $id );
    if ( $page ) {
      $page->template_id = $page->get_content_template()->id;
    }
    return response()->json( $page->toArray() );

  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int $id
   * @param Request $request
   * @return \Illuminate\Http\Response
   */
  public function edit( $id, $request )
  {

  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function update( Request $request, $id )
  {

    $res = [
      'success' => false
    ];
    $page = Page::find( $id );
    $page->path = $request->path;
    $page->title = $request->title;
    $res['page'] = $page->toArray();

    $pages_template = PagesTemplate::where( 'page_id', $id )->where( 'template_type', 'content' )->first();
    if ( $request->template_id && $pages_template ) {
      $pages_template->template_id = $request->template_id;
      $pages_template->save();
      $res['pages_template'] = $pages_template->toArray();
    }
    if ( ( ! $request->template_id ) && $pages_template ) {
      $pages_template->delete();
    }
    if ( $request->template_id && ! $pages_template ) {
      $pages_template = new PagesTemplate( [
        'page_id' => $id,
        'template_id' => $request->template_id,
        'template_type' => 'content',
      ] );
      $pages_template->save();
      $res['pages_template'] = $pages_template->toArray();
    }

    if ( $page->save() ) {
      $res['success'] = true;
    }

    return response()->json( $res );
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param Media $media
   * @param string $id
   * @return \Illuminate\Http\Response
   * @throws \Exception
   */
  public function destroy( Media $media, $id )
  {
    //
  }

  /**
   * Обработка запроса на получение списка страниц
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function pages_options( Request $request )
  {
    $pages = Page::where( 'title', 'like', '%' . $request->get( 's' ) . '%' )
      ->orWhere( 'path', 'like', '%' . $request->get( 's' ) . '%' )->get();

    $pages_options = [];
    foreach ( $pages as $page ) {
      $pages_options[] = [
        'value' => $page->id,
        'label' => $page->title,
      ];
    }
    return response()->json( $pages_options );
  }

  /**
   * Обработка запроса на получение списка страниц
   * @param string $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function show_pages_options( $page_id )
  {
    $page = Page::find( $page_id );

    $pages_options = [
      'value' => $page->id,
      'label' => $page->title,
    ];

    return response()->json( $pages_options );
  }
}
