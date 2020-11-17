<?php

namespace App\Http\Controllers\Admin;

use App\Constructor\Template;
use App\Http\Controllers\Controller;
use App\Page;
use App\PagesTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
  public function index(Request $request)
  {
    $search = $request->get('s');
    $orderColumn = $request->get('order_by') ?? 'id';
    $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
    $sortType = 'sortBy' . ($orderType == 'Asc' ? '' : $orderType);
    $_pages = $search
        ? Page::where('type',null)->getBySearch($search, 'title', [], $orderColumn, $orderType)
        : Page::where('type',null)->get()->$sortType( $orderColumn )->values();
    $pages = [];
    foreach ( $_pages as $page ) {

//      $content_template = $page->get_content_template();
      $pages[] = [
        'user' => $page->user,
        'title' => $page->title,
        'id' => $page->id,
        'parent_page_id' => $page->parent_page_id,
        'author' => $page->user->name,
//        'template_content' => $content_template,
//        'template_content_title' => $content_template ? $content_template->title : '',
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
    $page->guid = (string)Str::uuid();
    if ( $page->save() ) {
      if ( $request->template_id ) {
        $template = Template::find( $request->template_id );
        $pages_templates = new PagesTemplate( [
          'page_id' => $page->id,
          'page_guid' => $page->guid,
          'template_id' => $request->template_id,
          'template_guid' => $template->guid,
          'template_type' => 'content',
        ] );
        $pages_templates->save();
        $res['pages_templates'] = $pages_templates->toArray();
      }
      $res['success'] = true;
      $res['page'] = $page->toArray();
      $page->parseRoles( (array)$request->get( 'roles' ) );
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
      $page->template_id = $page->get_content_template() ? $page->get_content_template()->id : null;
      $page->roles = $page->getRoles();
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
    $page->model_id = $request->model_id;
    $page->redirect = $request->redirect;
    $page->parent_page_id = $request->parent_page_id;
    $res['page'] = $page->toArray();

    $pages_template = PagesTemplate::where( 'page_id', $id )->where( 'template_type', 'content' )->first();
    if ( $request->template_id && $pages_template ) {
      $template = Template::find( $request->template_id );
      $pages_template->template_id = $request->template_id;
      $pages_template->template_guid = $template->guid;
      $pages_template->save();
      $res['pages_template'] = $pages_template->toArray();
    }
    if ( ( ! $request->template_id ) && $pages_template ) {
      $pages_template->delete();
    }
    if ( $request->template_id && ! $pages_template ) {
      $template = Template::find( $request->template_id );
      $pages_template = new PagesTemplate( [
        'page_id' => $id,
        'page_guid' => $page->guid,
        'template_id' => $request->template_id,
        'template_guid' => $template->guid,
        'template_type' => 'content',
      ] );
      $pages_template->save();
      $res['pages_template'] = $pages_template->toArray();
    }
    $page->parseRoles( (array)$request->get( 'roles' ) );
    if ( $page->save() ) {
      $res['success'] = true;
    }

    return response()->json( $res );
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param Page $page
   * @param string $id
   * @return \Illuminate\Http\Response
   * @throws \Exception
   */
  public function destroy( $id )
  {
    //
    $page = new Page();
    $page = $page->find( $id );
    if( $page->delete() ){
      return response()->json( ['success' => true,], 200, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( ['success' => false, 'message' => 'Could not deleting'], 500, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Обработка запроса на получение списка страниц
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function pages_options( Request $request )
  {
    $pages = Page::where( 'title', 'like', '%' . $request->get( 's' ) . '%' )
      ->orWhere( 'path', 'like', '%' . $request->get( 's' ) . '%' )
      ->orWhere( 'id', 'like', '%' . $request->get( 's' ) . '%' )->get()->where('type',null);
      
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
   * Обработка запроса на получение списка отчетов
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function reports_options( Request $request )
  {
    $reports = Page::where( 'title', 'like', '%' . $request->get( 's' ) . '%' )
      ->orWhere( 'path', 'like', '%' . $request->get( 's' ) . '%' )
      ->orWhere( 'id', 'like', '%' . $request->get( 's' ) . '%' )->get()->where('type','report');

    $reports_options = [];
    foreach ( $reports as $report ) {
      $reports_options[] = [
        'value' => $report->id,
        'label' => $report->title,
      ];
    }
    return response()->json( $reports_options );
  }

  /**
   * Обработка запроса на получение списка страниц (аналогично для репортсов)
   * @param string $page_id
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
