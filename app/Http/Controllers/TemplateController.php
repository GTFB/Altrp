<?php

namespace App\Http\Controllers;

use App\AltrpMeta;
use App\Constructor\Template;
use App\Constructor\TemplateSetting;
use App\GlobalTemplateStyle;
use App\Page;
use App\PagesTemplate;
use App\User;
use App\CategoryObject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\File;

class TemplateController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   * @return \Illumiate\Http\JsonResponse
   */
  public function index( Request $request )
  {
    $page_count = 1;
    $search = $request->get( 's' );
    $categories = $request->get( 'categories' );
    //$area_name = $request->get( 'area', 'content' );
    $area_name = $request->get( 'area' );

    $orderColumn = $request->get( 'order_by' ) ?? 'title';
    $orderColumn = 'templates.'.$orderColumn;
    $orderType = $request->get( 'order' ) ? ucfirst( strtolower( $request->get( 'order' ) ) ) : 'Desc';
    $sortType = 'sortBy' . ( $orderType == 'Asc' ? '' : $orderType );
    if ( ! $request->get( 'page' ) ) {

      // $_templates = $search
      //   ? Template::getBySearchWhere( [ [ 'type', '!=', 'review' ] ], $search, $orderColumn, $orderType )
      //   : Template::with('categories.category')->where( 'type', '!=', 'review' );

      $_templates = Template::with('categories.category')->where( 'type', '!=', 'review' );
      $_templates = $_templates->join( 'areas', 'areas.id', '=', 'templates.area' )
        ->when($search, function ($query, $search) {
          return $query->where(function ($query) use ($search) {
            return $query->where('templates.title','like', "%{$search}%")
                         ->orWhere('templates.id', 'like', "%{$search}%");
          });
        })
        ->when($categories, function ($query, $categories) {
          if (is_string($categories)) {
            $categories = explode(",", $categories);
            $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'templates.guid')
                  ->whereIn('altrp_category_objects.category_guid', $categories);
          }
        })
        ->when($area_name, function ($query, $area_name) {
          return $query->where( 'areas.name', $area_name );
        })
        ;
      $page_count = $_templates->toBase()->getCountForPagination();
      $_templates = $_templates->get( 'templates.*' )->$sortType( $orderColumn )->values();


    } else {
      $page_size = $request->get( 'pageSize', 10 );

      $_templates = $search
        ? Template::getBySearchAsObject( $search, 'templates', 'title', ['categories.category'] )->where( 'type', '!=', 'review' )
        : Template::with('categories.category')->where( 'type', '!=', 'review' );

      $_templates = $_templates->join( 'areas', 'areas.id', '=', 'templates.area' )
        ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'templates.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
        ->when($area_name, function ($query, $area_name) {
            return $query->where( 'areas.name', $area_name );
        })
        ->offset( $page_size * ( $request->get( 'page' ) - 1 ) )
        ->limit( $page_size );
      $page_count = $_templates->toBase()->getCountForPagination();
      $_templates = $_templates->get( 'templates.*' )->$sortType( $orderColumn )->values();

      $page_count = ceil( $page_count / $page_size );
    }

    $templates = [];
    foreach ( $_templates as $template ) {
      /**
       * @var Template $template
       */
      $user = $template->user;
      $templates[] = [
        'user' => $user,
        'name' => $template->name,
        'title' => $template->title,
        'id' => $template->id,
        'author' => data_get( $user, 'name' ),
        'url' => '/admin/editor?template_id=' . $template->id,
        'area' => data_get( $template->area(), 'name', 'content' ),
        'categories' => $template->categories,
      ];

    }
    return \response()->json( [
      'templates' => $templates,
      'pageCount' => $page_count,
    ] );
  }

  /**
   * Send array for frontend <option> tags ({
   *     value,
   *    label
   * }).
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function options( Request $request )
  {
    $searchRequest = $request->s;
    if ( $searchRequest ) {
      $templates = Template::where( 'type', '!=', 'review' )
        ->where( function ( $query ) use ( $searchRequest ) {
          $query->where( 'title', 'like', "%{$searchRequest}%" )
            ->orWhere( 'name', 'like', "%{$searchRequest}%" )
            ->orWhere( 'id', $searchRequest );
        } )->get();
    } else {
      $templates = Template::where( 'type', '!=', 'review' )->get();
    }

    $options = [];

    if ( $request->get( 'template_type' ) ) {
      $templates = $templates->filter( function ( Template $template ) use ( $request ) {
        return $template->template_type === $request->get( 'template_type' );
      } );
    }
    $value_field = $request->get( 'value', 'id' );
    foreach ( $templates as $template ) {
      $options[] = [
        'value' => data_get( $template, $value_field, $template->id ),
        'label' => $template->title,
      ];
    }
    return \response()->json( $options );
  }

  /**
   * Send array for frontend <option> tags ({
   *     value,
   *    label
   * }). Только для popup
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function popupsOptions( Request $request )
  {
    $searchRequest = $request->s;
    if ( $searchRequest ) {
      $templates = Template::where( 'type', '!=', 'review' )
        ->join( 'areas', 'areas.id', '=', 'templates.area' )
        ->where( 'areas.name', '=', 'popup' )
        ->where( function ( $query ) use ( $searchRequest ) {
          $query->where( 'title', 'like', "%{$searchRequest}%" )
            ->orWhere( 'name', 'like', "%{$searchRequest}%" )
            ->orWhere( 'id', $searchRequest );
        } )->get( 'templates.*' );
    } else {
      $templates = Template::where( 'type', '!=', 'review' )
        ->join( 'areas', 'areas.id', '=', 'templates.area' )
        ->where( 'areas.name', '=', 'popup' )
        ->get( 'templates.*' );
    }

    $options = [];

    foreach ( $templates as $template ) {
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
   * @param \Illuminate\Http\Request $request
   * @return JsonResponse
   */
  public function store( Request $request )
  {
    //
    $template_data = $request->toArray();
    $template_data['data'] = json_encode( Template::sanitizeSettings( $request->data ) );
    $template = new Template( $template_data );
    $template->user_id = Auth::user()->id;
    $template->type = 'template';
    $template->guid = (string)Str::uuid();
    if( $request->get( 'isImported' ) ){
      $exported_metas = $request->get( '__exported_metas__' );
      if( data_get( $exported_metas, 'styles_presets' ) ){
        AltrpMeta::importStylesPresets( data_get( $exported_metas, 'styles_presets' ) );
      }
      if( data_get( $exported_metas, 'global_styles' ) ){
        GlobalTemplateStyle::importGlobalStyles( data_get( $exported_metas, 'global_styles' ) );
      }
      $template->data = Template::prepareAfterImport( $template_data['data'] );
    }
    if ( $template->save() ) {

      $categories = $request->get( '_categories' );
      if( is_array($categories) && count($categories) > 0 && $template->guid){
        $insert = [];
        foreach($categories as $key => $category){
          $insert[$key] = [
            "category_guid" => $category['value'],
            "object_guid" => $template->guid,
            "object_type" => "Template"
          ];
        }
        CategoryObject::insert($insert);
      }

      return \response()->json(
        [
          'message' => 'Success',
          'redirect' => true,
          'data' => json_decode( $template->data, true ),
          'url' => url( '/admin/editor?template_id=' . $template->id )
        ]
      );
    }
    return \response()->json( [ 'message' => 'Error Save' ], 500 );
  }

  /**
   * Display the specified resource.
   *
   * @param \App\Constructor\Template $template
   * @return JsonResponse|\Illuminate\Http\Response
   */
  public function show( $id )
  {
    if( Uuid::isValid( $id ) ){
      $template = Template::where( 'guid', $id )->first();
    } else {
      $template = Template::find( $id );
    }

    if( ! $template ){
      return  response()->json( [ 'message' => 'Template not Found', 'success' => false], 404, [], JSON_UNESCAPED_UNICODE);
    }

    $template->categories = $template->categoryOptions();
    $res = $template->toArray();
    $res['template_type'] = $template->template_type;
    return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE);
  }

  /**
   * Display the specified resource.
   *
   * @param string $template_id
   * @return \Illuminate\Http\Response
   */
  public function show_frontend( string $template_id )
  {

    // if (self::loadCachedTemplate( $template_id )) {
    //    return self::loadCachedTemplate( $template_id );
    // }

    if ( Uuid::isValid( $template_id ) ) {
      $template = Template::where( 'guid', $template_id )->first();
    } else {
      $template = Template::find( $template_id );
    }
    if ( ! $template ) {
      return response()->json( [ 'success' => false, 'message' => 'Template not found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }
    $template->check_elements_conditions();
    //saveTemplateCache( json_encode($template->toArray()), $template_id);
    return response()->json( $template->toArray() );
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param \App\Constructor\Template $template
   * @return \Illuminate\Http\Response
   */
  public function edit( Template $template )
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param \App\Constructor\Template $template
   * @return JsonResponse|\Illuminate\Http\Response
   */
  public function update( Request $request, $id )
  {

    if( Uuid::isValid( $id ) ){
      $template = Template::where( 'guid', $id )->first();
    } else {
      $template = Template::find( $id );
    }
    $old_template = $template;

    if ( ! $old_template ) {
      return response()->json( ['success' => false, 'message'=>trans( "responses.not_found.template" )], 404, [], JSON_UNESCAPED_UNICODE );
    }

    $review = new Template( $old_template->toArray() );
    $review->parent_template = $old_template->id;
    $review->type = 'review';
    $review->guid = null;
    $review->html_content = null;
    $review->styles = null;
    if ( ! User::find( $old_template->user_id ) ) {
      $review->user_id = auth()->user()->id;
    }
    if ( ! $review->save() ) {
      return response()->json( trans( "responses.dberror" ), 400, [], JSON_UNESCAPED_UNICODE );
    }
    $old_template->name = $request->name;
    $old_template->title = $request->title;
    $old_template->html_content = $request->html_content;
    $old_template->styles = $request->styles ? json_encode( $request->styles ) : null;
    $old_template->data = json_encode( Template::sanitizeSettings( $request->data ) );
    $old_template->type = 'template'; //1
    $old_template->user_id = auth()->user()->id;

    if ( $old_template->save() ) {

      if ($old_template->all_site) {
        clearAllCache();
      } else {
        $pages = Page::getPagesByTemplateId( $old_template->id );

        if ($pages) {
          foreach ($pages as $page) {
            clearPageCache( $page->page_id );
          }
        }
      }

      CategoryObject::where("object_guid", $old_template->guid)->delete();
      $categories = $request->get( '_categories' );
      if( is_array($categories) && count($categories) > 0 && $old_template->guid){
        $insert = [];
        foreach($categories as $key => $category){
          $insert[$key] = [
            "category_guid" => $category['value'],
            "object_guid" => $old_template->guid,
            "object_type" => "Template"
          ];
        }
        CategoryObject::insert($insert);
      }

      generateSitemap();

      return response()->json( $old_template, 200, [], JSON_UNESCAPED_UNICODE );

    }

    return response()->json( trans( "responses.dberror" ), 400, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param \App\Constructor\Template $template
   * @return JsonResponse
   * @throws \Exception
   */
  public function destroy( Template $template )
  {
    //

    if ( $template->delete() ) {
      CategoryObject::where("object_guid", $template->guid)->delete();
      return \response()->json( [ 'success' => true ] );
    }
    return \response()->json( [ 'success' => false ], 500 );
  }

  /**
   * @param string $template_id
   * @return JsonResponse
   */
  public function reviews( $template_id )
  {
    $reviews = Template::where( 'parent_template', $template_id )
      ->where( 'type', 'review' )
      ->get( [
        'parent_template',
        'id',
        'title',
        'created_at',
        'updated_at',
        'user_id',
      ] )
      ->map( function ( Template $review ) {
        $review->author = $review->author;
        return $review;
      } )->toArray();

    return \response()->json( $reviews );
  }

  /**
   * Удалить шаблоны по родителю с типом review
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function deleteReviews( Request $request )
  {
    $result = Template::where( [
      [ 'parent_template', $request->template_id ],
      [ 'type', 'review' ]
    ] );
    if ( ! $result->count() ) {
      return response()->json( [ 'success' => 'false' ], 404, [], JSON_UNESCAPED_UNICODE );
    } else {
      $result = $result->forceDelete();
    }
    return response()->json( [ 'success' => (bool)$result ] );
  }

  /**
   * Удалить шаблоны по родителю с типом review
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function getReview( Request $request )
  {
    $result = Template::where( [
      [ 'parent_template', $request->template_id ],
      [ 'type', 'review' ],
      [ 'id', $request->review_id ],
    ] );
    if ( ! $result->count() ) {
      return response()->json( [ 'success' => 'false' ], 404, [], JSON_UNESCAPED_UNICODE );
    } else {
      return response()->json( [ 'success' => (bool)$result, 'data' => $result->get()->toArray() ] );
    }
  }

  /**
   * Удалить все review по
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function deleteAllReviews()
  {
    $result = Template::where( 'type', 'review' );

    if ( ! $result->count() ) {
      $result = true;
    } else {
      $result = $result->forceDelete();
    }

    return response()->json( [ 'success' => (bool)$result ] );
  }

  /**
   * получить review по ID
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function getAllReview( Request $request )
  {
    $result = Template::where( [
      [ 'id', $request->review_id ],
      [ 'type', 'review' ]
    ] )->get();
    return response()->json( $result );
  }

  /**
   * Обрабатываем запрос на получение настройки
   * @param string $template_id
   * @param string $setting_name
   * @return JsonResponse
   */
  public function settingGet( $template_id, $setting_name )
  {
    $setting = TemplateSetting::where( [
      'template_id' => $template_id,
      'setting_name' => $setting_name,
    ] )->first();
    if ( ! $setting ) {
      return response()->json( new \stdClass(), 200, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( $setting->toArray(), 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Обрабатываем запрос на сохранение настройки
   * @param string $template_id
   * @param string $setting_name
   * @param Request $request
   * @return JsonResponse
   */
  public function settingSet( $template_id, $setting_name, Request $request )
  {
    $template = Template::find( $template_id );
    if ( ! $template ) {
      return response()->json( [ 'message' => 'Template not Found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }
    $setting = TemplateSetting::where( [
      'template_id' => $template_id,
      'setting_name' => $setting_name,
    ] )->first();
    if ( ! $setting ) {
      $setting = new TemplateSetting( [
        'template_id' => $template_id,
        'setting_name' => $setting_name,
        'template_guid' => $template->guid,
        'data' => $request->get( 'data' ),
      ] );
    } else {
      $setting->data = $request->get( 'data' );
    }
    if ( ! $setting->save() ) {
      return response()->json( [ 'message' => 'Setting not Saved' ], 500, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json( [ 'success' => true ], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Получение условий текущего шаблона
   * @param $template_id
   * @param Request $request
   * @return JsonResponse
   */
  public function conditionsGet( $template_id, Request $request )
  {
    if(Uuid::isValid($template_id)){
      $data = Template::firstWhere( 'guid', $template_id )->getTemplateConditions();
    } else {
      $data = Template::find( $template_id )->getTemplateConditions();
    }

    return response()->json( [
      'success' => true,
      'data' => $data,
    ], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Сохранение условий текущего шаблона
   * @param $template_id
   * @param Request $request
   * @return JsonResponse
   */
  public function conditionsSet( $template_id, Request $request )
  {

    if(Uuid::isValid($template_id)){
      $template = Template::firstWhere( 'guid', $template_id );
    } else {
      $template = Template::find( $template_id );
    }


    if ( ! $template ) {
      return response()->json( [ 'message' => 'Template not Found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }
    /**
     * Сначала сохраним сами настройки
     */
    $setting = TemplateSetting::where( [
      'template_id' => $template->id,
      'setting_name' => 'conditions',
    ] )->first();
    if ( ! $setting ) {
      $setting = new TemplateSetting( [
        'template_id' => $template->id,
        'setting_name' => 'conditions',
        'template_guid' => $template->guid,
        'data' => $request->get( 'data' ),
      ] );
    } else {
      $setting->data = $request->get( 'data' );
    }

    if ( ! $setting->save() ) {
      return response()->json( [ 'message' => 'Conditions not Saved' ], 500, [], JSON_UNESCAPED_UNICODE );
    }
    /**
     * Обновим/добавим необходимые данные в БД
     */
    if ( $template ) {
      $template->all_site = false;
      if ( ! $template->save() ) {
        return response()->json( [ 'message' => 'Conditions "all_site" not Saved' ],
          500,
          [],
          JSON_UNESCAPED_UNICODE );
      }
      $template->pages()->detach();
      foreach ( $request->get( 'data', [] ) as $datum ) {
        switch ( $datum['object_type'] ) {
          case 'all_site';
            {
              $template->all_site = $datum['condition_type'] === 'include';
              if ( ! $template->save() ) {
                return response()->json( [ 'message' => 'Conditions "all_site" not Saved' ],
                  500,
                  [],
                  JSON_UNESCAPED_UNICODE );
              }
              clearAllCache();
            }
            break;
          case 'page';
            {
              foreach ( $datum['object_ids'] as $id ) {
                $page = Page::find( $id );
                $pages_template = new PagesTemplate( [
                  'page_id' => $id,
                  'page_guid' => $page->guid,
                  'template_id' => $template->id,
                  'template_guid' => $template->guid,
                  'condition_type' => $datum['condition_type'],
                  'template_type' => $template->template_type
                ] );
                if ( ! $pages_template->save() ) {
                  return response()->json( [ 'message' => 'Conditions "page" not Saved' ],
                    500,
                    [],
                    JSON_UNESCAPED_UNICODE );
                }
                clearPageCache( $id );
              }
            }
            break;
          case 'report';
            {
              foreach ( $datum['object_ids'] as $id ) {
                $page = Page::find( $id );
                $pages_template = new PagesTemplate( [
                  'page_id' => $id,
                  'page_guid' => $page->guid,
                  'template_id' => $template->id,
                  'template_guid' => $template->guid,
                  'condition_type' => $datum['condition_type'],
                  'template_type' => $template->template_type
                ] );
                if ( ! $pages_template->save() ) {
                  return response()->json( [ 'message' => 'Conditions "page" not Saved' ],
                    500,
                    [],
                    JSON_UNESCAPED_UNICODE );
                }
                clearPageCache( $id );
              }
            }
            break;
        }
      }
    }
    return response()->json( [ 'success' => true ], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Загрузка кэшированного шаблона
   * @param $template_id
   */
  public static function loadCachedTemplate( string $template_id )
  {
    if ( !$template_id ) {
      return false;
    }

    $cachePath = storage_path() . '/framework/cache/templates';

    if ( ! File::exists($cachePath . '/relations.json') ) {
      return false;
    }

    $cachedFiles = [];
    $relationsJson = File::get($cachePath . '/relations.json');

    if( $relationsJson ){

      $cachedFiles = json_decode($relationsJson, true);

      $hash_to_delete = '';
      if (!empty($cachedFiles)) {
        foreach ($cachedFiles as $key => $cachedFile) {
          if ( $cachedFile['template_id'] === $template_id ) {
            if ( File::exists($cachePath . '/' . $cachedFile['hash']) ) {
              $file = File::get($cachePath . '/' . $cachedFile['hash']);
              return $file;
            } else {
              $hash_to_delete = $cachedFile['hash'];
            }
          }
        }
      }
      if( $hash_to_delete ){
        $cachedFiles = array_filter( $cachedFiles, function ( $file ) use ( $hash_to_delete ){
          return $file['hash'] !== $hash_to_delete;
        } );
        $json = json_encode( $cachedFiles );

        File::put($cachePath . '/relations.json', $json);
      }
    }

    return false;

  }

  /**
   * @param string $id
   * @return JsonResponse
   */
  public function exportTemplate( string $id ): JsonResponse
  {

    if( Uuid::isValid( $id ) ){
      $template = Template::where( 'guid', $id )->first();
    } else {
      $template = Template::find( $id );
    }
    /**
     * @var $template Template
     */
    if( ! $template ){
      return response()
        ->json(
          ['success' => false, 'message' => 'Template not Found'],
          404,
          [],
          JSON_UNESCAPED_UNICODE );
    }
    $data = json_decode( $template->data, true );
    /**
     * Ищем все url и заменяем на url с доменом
     */
    recurseMapElements( $data, function ( $element ) use ( &$template ){

      foreach ( $element['settings'] as $key => $value ) {
//        if( is_array( $value ) ) {
//          dd([$key => $value]);
//        }
        if(is_array( $value ) ){
          foreach ( $value as $label => $repeater_item ) {
            if( is_string( $label ) ){
              continue;
            }
            if( is_array( $repeater_item ) ){
              foreach ( $repeater_item as $item ) {
                if( ! ( isset( $item['filename'] ) && isset( $item['url'] ) ) ) {
                  continue;
                }
                if( env( 'APP_URL' ) ){
                  $template->data = str_replace(
                    json_encode($item['url']),
                    json_encode( env('APP_URL') . $item['url'] ),
                    $template->data );
                }
              }
            }
          }
        }
        if( ! ( isset( $value['filename'] ) && isset( $value['url'] ) ) ) {
          continue ;
        }
        if( env( 'APP_URL' ) ){
          $template->data = str_replace(
            json_encode($value['url']),
            json_encode( env('APP_URL') . $value['url'] ),
            $template->data );
        }
      }
    } );
    $res = $template->toArray();
    $res['__exported_metas__'] = [];
    $res['__exported_metas__']['styles_presets'] = AltrpMeta::getGlobalStyles();
    $res['__exported_metas__']['global_styles'] = GlobalTemplateStyle::all();
    return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE );
  }
}
