<?php

namespace App\Http\Controllers\Admin;

use App\Constructor\Template;
use App\Http\Controllers\Controller;
use App\Page;
use App\PagesTemplate;
use App\CategoryObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
    $categories = $request->get('categories');
    $table_name = "pages";
    $orderColumn = $request->get('order_by') ?? 'title';
    $orderColumn = 'pages.'.$orderColumn;
    $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
    $sortType = 'sortBy' . ($orderType == 'Asc' ? '' : $orderType);
    $_pages = $search
        //? Page::getBySearch($search, 'title', [], $orderColumn, $orderType)
        ? Page::search($search, 'pages.title', ['categories.category'], $orderColumn, $orderType, $categories)
        : Page::select('pages.*')->with('categories.category')
            ->when($categories, function ($query, $categories) {
                if (is_string($categories)) {
                    $categories = explode(",", $categories);
                    $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'pages.guid')
                          ->whereIn('altrp_category_objects.category_guid', $categories);
                }
            })
            ->where('type',null)->get()->$sortType( $orderColumn )
            ->values();
    $pages = [];
    foreach ( $_pages as $page ) {

//      $content_template = $page->get_content_template();
      $user = $page->user;
      $pages[] = [
        'user' => $user,
        'title' => $page->title,
        'id' => $page->id,
        'parent_page_id' => $page->parent_page_id,
        'author' => data_get( $user, 'name' ),
//        'template_content' => $content_template,
//        'template_content_title' => $content_template ? $content_template->title : '',
        'url' => \url( $page->path ),
        'editUrl' => '/admin/pages/edit/' . $page->id,
        'path' => $page->path,
        'categories' => $page->categories,
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
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   */
  public function store( Request $request )
  {
    $res = [ 'success' => false, ];
    $page = new Page( $request->toArray() );

    $page->author = auth()->user()->id;
    $page->content = '';
    $page->guid = (string)Str::uuid();
    $page->is_cached = $request->is_cached;
    $page->sections_count = $request->sections_count;
    if ( $page->save() ) {

      $categories = $request->get( '_categories' );
      if( is_array($categories) && count($categories) > 0 && $page->guid){
        $insert = [];
        foreach($categories as $key => $category){
          $insert[$key] = [
            "category_guid" => $category['value'],
            "object_guid" => $page->guid,
            "object_type" => "Page"
          ];
        }
        CategoryObject::insert($insert);
      }

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
    $res['message'] = 'Page not Saved';
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
      $page->categories = $page->categoryOptions();
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
    $page->param_name = $request->param_name;
    $page->model_column = $request->model_column;
    $page->redirect = $request->redirect;
    $page->parent_page_id = $request->parent_page_id;
    $page->seo_description = $request->seo_description;
    $page->seo_keywords = $request->seo_keywords;
    $page->seo_title = $request->seo_title;
    $page->is_cached = $request->is_cached;
    $page->not_found = $request->not_found;
    $page->icon = $request->icon;
    $page->sections_count = $request->sections_count;
    $res['page'] = $page->toArray();

    $pages_template = PagesTemplate::where( 'page_id', $id )->where( 'template_type', 'content' )->first();
    if ( $request->template_id && $pages_template ) {
      $template = Template::find( $request->template_id );
      $pages_template->template_id = $request->template_id;
      $pages_template->template_guid = $template->guid;
      $pages_template->save();
      $res['pages_template'] = $pages_template->toArray();
    }
//    if ( ( ! $request->template_id ) && $pages_template ) {
//      $pages_template->delete();
//    }
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

      CategoryObject::where("object_guid", $page->guid)->delete();
      $categories = $request->get( '_categories' );
      if( is_array($categories) && count($categories) > 0 && $page->guid){
        $insert = [];
        foreach($categories as $key => $category){
          $insert[$key] = [
            "category_guid" => $category['value'],
            "object_guid" => $page->guid,
            "object_type" => "Page"
          ];
        }
        CategoryObject::insert($insert);
      }

      $res['success'] = true;
    }

    clearPageCache( $page->id );

    return response()->json( $res );
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param Page $page
   * @param string $id
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   * @throws \Exception
   */
  public function destroy( $id )
  {
    //
    $page = new Page();
    $page = $page->find( $id );
    if( $page->delete() ){
      try{
        Page::where( 'parent_page_id', $page->id )->update( ['parent_page_id'=> null] );
        CategoryObject::where("object_guid", $page->guid)->delete();
      }catch( \Exception $e){
        logger()->error( $e->getMessage());
      }
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

  /**
   * @param string $page_id
   * @return boolean
   */
  public function clearCache( $page_id = null ){

    $cachePath = storage_path() . '/framework/cache/pages';
    $cacheTemplatePath = storage_path() . '/framework/cache/templates';
    File::ensureDirectoryExists( $cachePath, 0775);
    File::ensureDirectoryExists( $cacheTemplatePath, 0775);

    if (! File::exists( $cachePath ) ) {
      File::put( $cachePath . '/relations.json', '{}' );
      return true;
    }
    if (! File::exists( $cacheTemplatePath ) ) {
      File::put( $cacheTemplatePath . '/relations.json', '{}' );
      return true;
    }

    if ( ! $page_id ) {
      $files = File::allFiles( $cachePath );
      File::delete( $files );
      $files = File::allFiles( $cacheTemplatePath );
      File::delete( $files );
      File::put( $cachePath . '/relations.json', '[]' );
      File::put( $cacheTemplatePath . '/relations.json', '[]' );
      File::put( $cachePath . '/users.json', '[]' );
      return response()->json( ['success' => true], 200, [], JSON_UNESCAPED_UNICODE );
    }

    Page::clearAllCacheById( $page_id );
    return response()->json( ['success' => true], 200, [], JSON_UNESCAPED_UNICODE );
  }

}
