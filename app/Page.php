<?php

namespace App;

use App\Reports;
use App\Altrp\Source;
use DOMDocument;
use DOMXPath;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use Mockery\Exception;
use App\Traits\Searchable;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Constructor\Template;
use Facade\FlareClient\Report;
use App\Altrp\Model as AltrpModel;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Page
 * @package App
 * @property User $user
 * @property \App\Altrp\Model $model
 */
class Page extends Model
{
  //
  use SoftDeletes, Searchable;

  protected $fillable = [
    'title',
    'author',
    'content',
    'path',
    'model_id',
    'redirect',
    'guid',
    'for_guest',
    'parent_page_id',
    'seo_description',
    'seo_keywords',
    'seo_title',
    'type',
    'is_cached',
    'not_found',
    'sections_count',
    'icon',
    'param_name',
    'model_column',
  ];

  const DEFAULT_AREAS = [
    'content',
    'footer',
    'header',
    'popup',
    'email',
    'card',
    'reports',
  ];

  protected $appends = [
    'model_name',
  ];
  /**
   * @return array
   */
  static function get_frontend_routes()
  {
    $pages = [];
    if ( ! appIsInstalled() ) {
      return $pages;
    }
    if ( ! Schema::hasTable( 'pages' ) ) {
      return $pages;
    }
    try {
      $pages = Page::all()->map->only( [ 'path', 'title', 'id', 'model', 'model_column', 'param_name' ] )
        //        ->map( function ( $path ) {
        //
        //        return [
        //          'path'=>$path['path'],
        //          'title'=>$path['title'],
        //          'id'=>$path['id'],
        //        ];
        //      } )
        ->toArray();
    } catch ( Exception $e ) {
    }
    return $pages;
  }

  /**
   * @return array
   */
  static function get_reports_routes()
  {
    $pages = [];
    if ( ! appIsInstalled() ) {
      return $pages;
    }
    if ( ! Schema::hasTable( 'pages' ) ) {
      return $pages;
    }
    if ( app()->runningInConsole() ) {
      return $pages;
    }
    try {
      $pages = Page::where( 'type', 'report' )->get()->map->only( [ 'path', 'title' ] )->map( function ( $path ) {
        return [
          'path' => $path['path'],
          'title' => $path['title']
        ];
      } )->toArray();
    } catch ( Exception $e ) {
      error_log( $e->getMessage() );
    }
    return $pages;
  }


  /**
   * Ищет отчет по номеру айди среди страниц
   * @param int $id
   * @return \Illuminate\Database\Eloquent\Builder|Model|null|object
   * @throws \Throwable
   */
  public static function findReport( int $id )
  {
    try {
      return ( new static )->where( 'type', 'report' )->where( 'id', $id )->first();
    } catch ( \Throwable $th ) {
      throw $th;
    }
  }

  /**
   * @param bool $lazy
   * @param int $page_id
   * @param bool $only_parents
   * @return array
   */
  public static function get_pages_for_frontend( bool $lazy = false, int $current_page_id = 0, bool $only_parents = false )
  {
    $pages = [];

    if( ! $only_parents ){
      $_pages = static::all()->where( 'type', null );

      $pages = ( new static )->getPagesData( $_pages, $lazy );

      if ( self::firstWhere( 'not_found', 1 ) ) {
        $not_found_page = ( new static )->getPagesData( [ self::firstWhere( 'not_found', 1 ) ], $lazy );
        $not_found_page[0]['path'] = '*';

        $pages[] = $not_found_page[0];
      }
    } else {
      $current_page = self::find( $current_page_id );
      if( $current_page ){
        $pages[] = $current_page->toArray();
        $_page = $current_page;
        try {

          while( $_page && $_page->parent_page_id ){
            $_page = self::find( $_page->parent_page_id );
            if( $_page ){
              $pages[] = $_page->toArray();
            }
        }
        } catch( Exception $e ){
          logger( $e->getMessage() );
        }
      }
    }

    return $pages;
  }

  /**
   * @param bool $lazy
   * @return array
   */
  public static function get_reports_for_frontend( $lazy = false )
  {
    $_pages = static::all()->where( 'type', 'report' );

    $pages = ( new static )->getPagesData( $_pages, $lazy );

    return $pages;
  }

  /**
   * @param Collection | array $_pages
   * @param bool $lazy
   * @return Array
   */
  private function getPagesData( $_pages, bool $lazy = true ): array
  {
    $pages = [];
    /** @var Page $page */
    foreach ( $_pages as $page ) {
      if ( $page->allowedForUser() ) {

        $_page = [
          'path' => $page->path,
          'id' => $page->id,
          'title' => $page->title,
          'icon' => $page->icon,
          'parent_page_id' => $page->parent_page_id,
          'allowed' => true,
          'data_sources' => $page->page_data_sources->map( function ( PageDatasource $page_data_source ) {
            if ( $page_data_source->source ) {
              $page_data_source->source->web_url = $page_data_source->source->web_url;
            }
            return $page_data_source;
          } ),
          /**
           * Если лениво загружаем области то возвращаем пустой массив
           */
          'areas' => $lazy ? [] : self::get_areas_for_page( $page->id ),
        ];
      } else {
        $_page = [
          'path' => $page->path,
          'id' => $page->id,
          'allowed' => false,
          'redirect' => $page->redirect ? $page->redirect : '/',
        ];
      }
      $_page['lazy'] = $lazy;
      if ( $page->model ) {
        $_page['model'] = $page->model->toArray();
        $_page['model']['modelName'] = Str::plural( $page->model->name );
      }

      $pages[] = $_page;
    }
    return $pages;
  }

  /**
   * @param $page_id
   * @param bool $sections_limit
   * @return array
   */
  public static function get_lazy_sections_for_page( $page_id )
  {
    $lazy_sections = [];

    $currentPage = Page::find( $page_id );
    if ( ! $currentPage || ! $currentPage->sections_count ) {
      return $lazy_sections;
    }
    $sections_count = $currentPage->sections_count;
    $header_template = Template::getTemplate( [
      'page_id' => $page_id,
      'template_type' => 'header',
    ] );
    if ( $header_template['data'] ) {
      $data = $header_template['data'];
      if ( isset( $data['children'] ) && is_array( $data['children'] ) ) {
        $header_lazy_sections = array_map( function ( $item ) use ( $data ) {
          return [
            'parent_id' => $data['id'],
            'area_name' => 'header',
            'element' => $item
          ];
        }, $data['children'] );
        $lazy_sections = array_merge( $lazy_sections, $header_lazy_sections );
      }
    }
    $content_template = Template::getTemplate( [
      'page_id' => $page_id,
      'template_type' => 'content',
    ] );
    if ( $content_template['data'] ) {
      $data = $content_template['data'];
      if ( isset( $data['children'] ) && is_array( $data['children'] ) ) {
        $content_lazy_sections = array_map( function ( $item ) use ( $data ) {
          return [
            'parent_id' => $data['id'],
            'area_name' => 'content',
            'element' => $item
          ];
        }, $data['children'] );
        $lazy_sections = array_merge( $lazy_sections, $content_lazy_sections );
      }
    }
    $footer_template = Template::getTemplate( [
      'page_id' => $page_id,
      'template_type' => 'footer',
    ] );
    if ( $footer_template['data'] ) {
      $data = $footer_template['data'];
      if ( isset( $data['children'] ) && is_array( $data['children'] ) ) {
        $footer_lazy_sections = array_map( function ( $item ) use ( $data ) {
          return [
            'parent_id' => $data['id'],
            'area_name' => 'footer',
            'element' => $item
          ];
        }, $data['children'] );
        $lazy_sections = array_merge( $lazy_sections, $footer_lazy_sections );
      }
    }

    array_splice( $lazy_sections, 0, $sections_count );
    return $lazy_sections;
  }

  /**
   * @param $page_id
   * @param bool $sections_limit
   * @return array
   */
  public static function get_areas_for_page( $page_id )
  {
    $currentPage = Page::find( $page_id );

    if ( 0 ) {
      $areas = Cache::get( 'areas_' . $page_id );
    } else {

      $areas = [];

      $contentType = $currentPage->type;

      $header_template = Template::getTemplate( [
        'page_id' => $page_id,
        'template_type' => 'header',
      ] );
      unset( $header_template['html_content'] );
      unset( $header_template['styles'] );


      $areas[] = [
        'area_name' => 'header',
        'id' => 'header',
        'settings' => [],
        'template' => $header_template,
      ];


      $content_template = Template::getTemplate( [
        'page_id' => $page_id,
        'template_type' => $contentType ? 'reports' : 'content',
      ] );
      unset( $content_template['html_content'] );
      unset( $content_template['styles'] );
      $areas[] = [
        'area_name' => 'content',
        'id' => 'content',
        'settings' => [],
        'template' => $content_template,
      ];

      $footer_template = Template::getTemplate( [
        'page_id' => $page_id,
        'template_type' => 'footer',
      ] );

      unset( $footer_template['html_content'] );
      unset( $footer_template['styles'] );
      $areas[] = [
        'area_name' => 'footer',
        'id' => 'footer',
        'settings' => [],
        'template' => $footer_template,
      ];

      //    $popups = Template::join( 'areas', 'areas.id', '=', 'templates.area' )
      //      ->where( 'areas.name', '=', 'popup' )
      //      ->where( 'type', 'template' )->get( 'templates.*' );
      //
      //
      //
      //    if( $popups->count() ){
      //      foreach ( $popups as $key => $popup ) {
      //        $popups[$key]->template_settings = $popup->template_settings();
      //
      //      }
      $areas[] = [
        'area_name' => 'popups',
        'id' => 'popups',
        'settings' => [],
        'templates' => Template::getTemplates( [
          'page_id' => $page_id,
          'template_type' => 'popup',
        ] ),
      ];

      $custom_areas = Area::whereNotIn( 'name', self::DEFAULT_AREAS )->get();


      if ( $custom_areas->count() ) {
        foreach ( $custom_areas as $custom_area ) {

          $custom_template = Template::getTemplate( [
            'page_id' => $page_id,
            'template_type' => $custom_area->name,
          ] );
//
          if ( ! data_get( $custom_template, 'id' ) ) {
            continue;
          }

          unset( $custom_template['html_content'] );
          unset( $custom_template['styles'] );
          $areas[] = [
            'area_name' => $custom_area->name,
            'id' => $custom_area->name,
            'settings' => $custom_area->settings,
            'template' => $custom_template,
          ];
        }
      }


      Cache::put( 'areas_' . $page_id, $areas, 86400 );

    }

    if ( $currentPage->sections_count ) {
      $sections_count = $currentPage->sections_count;
    }
    foreach ( $areas as $key => $area ) {
      if ( isset( $area['template'] ) ) {
        $areas[$key]['template']['data'] = Template::recursively_children_check_conditions( $area['template']['data'] );

        if ( isset( $sections_count ) && $areas[$key]['template']['data'] ) {
          $areas[$key]['template']['data'] = self::spliceSections( $areas[$key]['template']['data'], $sections_count );
        }
      }
    }
    if ( isset( $areas[3] ) ) {
      foreach ( $areas[3]['templates'] as $key => $template ) {
        $areas[3]['templates'][$key]['data'] = Template::recursively_children_check_conditions( $template['data'] );
      }
    }
    return $areas;
  }

  /**
   * @param [] $data
   * @param int $sections_count
   * @return []
   */
  public static function spliceSections( $data, &$sections_count = 0 )
  {
    if ( ! isset( $sections_count ) || ! $data ) {
      return $data;
    }
    if ( count( $data['children'] ) < $sections_count ) {
      $sections_count -= count( $data['children'] );
    } else if ( count( $data['children'] ) > $sections_count ) {
      //      $data['children'] = array_slice( $data['children'], 0, $sections_count );
      for ( $i = $sections_count; $i < count( $data['children'] ); $i++ ) {
        //        echo '<pre style="padding-left: 200px;">';
        //        var_dump( $data['children'][$i] );
        //        echo '</pre>';

        $data['children'][$i]['lazySection'] = true;
      }
      $sections_count = 0;
    } else {
      $sections_count = 0;
    }

    return $data;
  }

  /**
   * Сылка на пользователя создавшего страницу
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function user()
  {
    return $this->belongsTo( User::class, 'author' );
  }

  /**
   * Список ресурсов связанных со страницей
   * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
   */
  public function data_sources()
  {
    return $this->belongsToMany( Source::class, 'page_data_sources', 'page_id', 'source_id' );
  }

  /**
   * Список ресурсов связанных со страницей через
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function page_data_sources()
  {
    return $this->hasMany( PageDatasource::class, 'page_id', 'id' );
  }

  public function categories()
  {
      return $this->hasMany(CategoryObject::class, 'object_guid', 'guid');
  }

  public function categoryOptions()
  {
    return CategoryObject::select('altrp_categories.guid as value', 'altrp_categories.title as label')->leftJoin('altrp_categories', 'altrp_categories.guid', '=', 'altrp_category_objects.category_guid')
            ->where('altrp_category_objects.object_guid', $this->guid)->get();
  }
  
  public static function search($search, $field = 'pages.title', $relations = [], $orderColumn = 'id', $orderType = 'Desc', $categories=null)
  {
      $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);
      return self::select('pages.*')->with($relations)
          ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'pages.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
          ->where(function ($query) use ($field, $search) {
              $query->where($field,'like', "%{$search}%")
                    ->orWhere('pages.id', 'like', "%{$search}%");
          })
          ->$sortType($orderColumn)
          ->get();
  }

  /**
   * @param array $page_roles
   * @deprecated
   * Импортируем связи стрнаиц с ролями
   */
  public static function importPageRoles( $page_roles = [] )
  {
    $table = DB::table( 'page_role' );
    $table->delete();
    foreach ( $page_roles as $page_role ) {
      $role = Role::where( 'name', data_get( $page_role, 'role_name' ) )->first();
      $page = self::where( 'guid', data_get( $page_role, 'page_guid' ) )->first();
      if ( ! ( $page && $role ) ) {
        continue;
      }
      try {
        $table->insert( [
          'page_id' => $page->id,
          'role_id' => $role->id,
        ] );
      } catch ( \Exception $e ) {
      }
    }
  }

  /**
   * @return \Illuminate\Database\Eloquent\Builder|Model|null|Template
   */
  function get_content_template()
  {
    $pages_template = PagesTemplate::where( 'page_id', $this->id )
      ->where( 'template_type', 'content' )->first();
    if ( ! $pages_template ) {
      return null;
    }
    return $pages_template->template;
  }

  function model()
  {
    return $this->hasOne( "App\Altrp\Model", 'id', 'model_id' );
  }

  /**
   * @return \App\Altrp\Model[]|null
   */
  function get_models()
  {
    if ( ! $this->model ) {
      return null;
    }
    $models[] = [
      'modelName' => $this->model->altrp_table->name,
      'name' => $this->model->name,
    ];
    $relations = $this->model->altrp_table->relationships;

    foreach ( $relations as $relation ) {
      if ( $relation->get_model_for_route() ) {
        $models[] = $relation->get_model_for_route();
      }
    }

    return $models;
  }

  /**
   * Привязывает набор ролей к сттанице, удаляя старые связи
   * @param {string | array}$roles
   */
  public function attachRoles( $roles )
  {
    if ( ! $this->id ) {
      return;
    }
    $roles = is_string( $roles ) ? [ $roles ] : $roles;
    $page_role_table = DB::table( 'page_role' );
    $page_role_table->where( 'page_id', $this->id )->delete();
    foreach ( $roles as $role_id ) {
      $page_role_table->insert( [
        'page_id' => $this->id,
        'role_id' => $role_id,
      ] );
    }
  }


  /**
   * Перебирает массив от фронтенда и привязвает/удаляет роли;отмечает for_guest
   * @param {string | array} $roles
   */
  public function parseRoles( $roles )
  {
    $_roles = [];
    $for_guest = false;
    foreach ( $roles as $role ) {
      if ( ! is_string( $role['value'] ) ) {
        $_roles[] = $role['value'];
      } else if ( $role['value'] === 'guest' ) {
        $for_guest = true;
      }
    }
    $this->attachRoles( $_roles );
    $this->for_guest = $for_guest;
  }

  /**
   * @return array
   */
  public function getRoles()
  {
    if ( ! $this->id ) {
      return [];
    }
    $page_role_table = DB::table( 'page_role' );
    $page_roles = $page_role_table->where( 'page_id', $this->id )->get();
    $roles = [];
    if ( $this->for_guest ) {
      $roles[] = [
        'value' => 'guest',
        'label' => 'Guest',
      ];
    }
    foreach ( $page_roles as $page_role ) {
      $role = Role::find( $page_role->role_id );

      $roles[] = [
        'value' => $role->id,
        'label' => $role->display_name,
      ];
    }
    return $roles;
  }

  /**
   * Проверяем доступна ли страница для текущего пользователя
   * @param string $user_id
   * @return bool
   */
  public function allowedForUser( $user_id = '' )
  {

    if ( ! $user_id ) {
      $user = auth()->user();
    } else {
      $user = User::find( $user_id );
    }
    $allowed = false;

    /** @var User $user */
    $page_role_table = DB::table( 'page_role' );
    $page_roles = $page_role_table->where( 'page_id', $this->id )->get();
    /**
     * Если никаких ролей не указано и for_guest false, то всегда доступно
     */
    if ( ( ! $page_roles->count() ) && ! $this->for_guest ) {
      return true;
    }
    if ( ( ! $user ) && $this->for_guest ) {
      return true;
    }
    if ( ! $user ) {
      return false;
    }
    foreach ( $page_roles as $page_role ) {
      $role = Role::find( $page_role->role_id );
      if ( $user->hasRole( $role->name ) ) {
        $allowed = true;
      }
    }
    return $allowed;
  }

  /**
   * @param array $imported_pages
   * @deprecated
   * Испортирует страницы
   */
  static public function import( $imported_pages = [] )
  {
    foreach ( $imported_pages as $imported_page ) {

      if ( Arr::get( $imported_page, 'model_name' ) ) {
        $model = AltrpModel::where( 'name', $imported_page['model_name'] )->first();
        $model_id = $model ? $model->id : null;
      } else {
        $model_id = null;
      }
      $old_page = self::where( 'guid', $imported_page['guid'] )->first();
      if ( $old_page ) {
        if ( strtotime( $imported_page['updated_at'] ) > strtotime( $old_page->updated_at ) ) {
          $old_page->model_id = $model_id;
          $old_page->redirect = $imported_page['redirect'];
          $old_page->content = $imported_page['content'];
          $old_page->path = $imported_page['path'];
          $old_page->title = $imported_page['title'];
          $old_page->for_guest = $imported_page['for_guest'];
          $old_page->author = Auth::user()->id;
          try {
            $old_page->save();
          } catch ( \Exception $e ) {
            Log::error( $e->getMessage(), $imported_page ); //
            continue;
          }
        }
        continue;
      }
      $new_page = new self( $imported_page );
      $new_page->author = Auth::user()->id;
      $new_page->model_id = $model_id;
      try {
        $new_page->save();
      } catch ( \Exception $e ) {
        Log::error( $e->getMessage(), $imported_page ); //
        continue;
      }
    }
  }

  /**
   * @param string $page_id
   * @param array $route_args
   * @return null | array
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  static function getPreloadPageContent( $page_id, $route_args = [] )
  {
    $result = [
      'content' => '',
      'important_styles' => '',
    ];
    if ( get_altrp_setting( 'altrp_ssr_disabled' ) ) {
      return $result;
    }
    if ( ! $page_id ) {
      return $result;
    }
    /** @var Page $page */
    $page = Page::find( $page_id );
    if ( ! $page ) {
      return $result;
    }
    if ( ! $page->allowedForUser() ) {
      return $result;
    }
    $base_uri = 'http://localhost:' . get_altrp_setting( 'ssr_port', '9000' ) . '/';
    $client = new Client( [ 'base_uri' => $base_uri ] );
    try {
      $test_result = $client->request( 'GET' )->getStatusCode();
      if ( $test_result === 200 ) {

        $postExpress = new Client( [
          'base_uri' => $base_uri,
          'defaults' => [
            'headers' => [ 'Content-Type' => 'application/x-www-form-urlencoded' ],
          ]
        ] );
        $page_areas = static::get_areas_for_page( $page_id );
        $elements_list = extractElementsNames( $page_areas, true );
        $postResult = $postExpress->request( 'POST', '', [
          'form_params' => [
            'json' =>
              json_encode(
                [
                  'page' => $page_areas,
                  'page_id' => $page_id,
                  'altrp_settings' => getPageSettings( $page_id ),
                  'altrp' => [
                    'version' => getCurrentVersion()
                  ],
                  'altrpImageLazy' => get_altrp_setting( 'altrp_image_lazy', 'none' ),
                  'altrpSkeletonColor' => get_altrp_setting( 'altrp_skeleton_color', '#ccc' ),
                  'altrpSkeletonHighlightColor' => get_altrp_setting( 'altrp_skeleton_highlight_color', '#d0d0d0' ),
                  'current_user' => getCurrentUser(),
                  'current_device' => get_current_device(),
                  'route_args' => $route_args,
                ]
              ),

          ]
        ] );
      $result = $postResult->getBody()->getContents();
      $result = json_decode( $result, true );
      return $result;
      }
    } catch ( \Exception $e ) {
      logger( $e );

      return [
        'content' => '',
        'important_styles' => '',
      ];

    }

    $areas = Area::all()->filter( function ( Area $area ) {
      return ! in_array( $area->name, Area::NOT_CONTENT_AREAS );
    } )->map( function ( Area $area ) {
      return $area->name;
    } )->sortBy( function ( $area ) {
      if ( $area === 'header' ) {
        return 0;
      }
      if ( $area === 'content' ) {
        return 100;
      }
      if ( $area === 'footer' ) {
        return 200;
      }
      return $area;
    } )->toArray();
    if ( ! count( $areas ) ) {
      return $result;
    }
    $templates = [];
    foreach ( $areas as $area ) {
      $template = Template::getTemplate( [
        'page_id' => $page_id,
        'template_type' => $area,
      ] );
      $template['template_type'] = $area;
      $templates[] = $template;
    }
    $important_styles = [];
    ob_start();
    ?>
    <div class="front-app-content front-app-content_preloaded">
      <div class="route-content" id="route-content">
        <?php
        foreach ( $templates as $template ) {

          $styles = data_get( $template, 'styles' );
          $styles = json_decode( $styles, true );

          if ( data_get( $styles, 'important_styles' ) ) {
            $important_styles = array_merge( $important_styles, data_get( $styles, 'important_styles', [] ) );
          }
          ?>
          <div class="app-area app-area_<?php echo $template['template_type']; ?>">
            <?php
            echo self::replace_tags( data_get( $template, 'html_content', '' ) );
            ?>
          </div>
          <?php
        }
        ?>
      </div>
    </div>
    <?php
    $result['content'] = ob_get_clean();
    $result['important_styles'] = implode( '', $important_styles );

    return $result;
  }

  /**
   * @param $content
   * @return string
   */
  static public function replace_tags( $content )
  {
    if ( ! $content ) {
      return $content;
    }
    try {

      $dom = new DOMDocument( '1.0', 'utf-8' );
      $content = mb_convert_encoding( $content, 'HTML-ENTITIES', 'utf-8' );
      $dom->loadHTML( $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOERROR );
      $altrp_image_lazy = get_altrp_setting( 'altrp_image_lazy', 'none' );
      $finder = new DomXPath( $dom );

      if ( $altrp_image_lazy !== 'none' ) {
        $images = $finder->query( "//*[contains(@class, ' altrp-image ')]" );
        $image_placeholders = $finder->query( "//*[contains(@class, 'altrp-image-placeholder')]" );

        foreach ( $image_placeholders as $item ) {

          $item->removeAttribute( 'style' );
        }
        foreach ( $images as $image ) {
          $image->parentNode->removeChild( $image );
        }
      }
      $content = $dom->saveHTML();
      //      $content =  mb_convert_encoding( $content );
    } catch ( \Exception $e ) {
      Log::debug( $e->getMessage() );
    }
    return $content;
  }

  /**
   * @param string $page_id
   * @return boolean
   */
  static function isCached( $page_id )
  {

    $page = Page::find( $page_id );
    if ( $page->is_cached ) {
      return true;
    }
    return false;
  }

  /**
   * @param string $page_id
   * @return boolean
   */
  static function switchCaching( $page_id )
  {

    $page = self::find( $page_id );
    if ( $page->is_cached ) {
      $res = false;
    } else {
      $res = true;
    }
    self::whereId( $page_id )->update( [ 'is_cached' => $res ] );

    return $res;
  }

  /**
   * очистить кэш связанный со страницей
   * @param string $id
   */
  static function clearAllCacheById( string $id )
  {
    clearPageCache( $id );
    Cache::delete( 'areas_' . $id );
  }

  /**
   * @return array
   */
  static function getRolesToCache( $page_id )
  {
    if ( ! $page_id ) {
      return [];
    }
    $page_role_table = DB::table( 'page_role' );
    $page_roles = $page_role_table->where( 'page_id', $page_id )->get();
    $roles = [];
    foreach ( $page_roles as $key => $page_role ) {
      $roles[$key] = $page_role->role_id;
    }

    $page = Page::find( $page_id );
    if ( $page->for_guest ) {
      array_push( $roles, 'guest' );
    }
    return $roles;
  }


  /**
   * @return array
   */
  static function getPagesByTemplateId( $template_id )
  {
    if ( ! $template_id ) {
      return [];
    }
    $pages = DB::table( 'pages_templates' )->where( 'template_id', $template_id )->get();
    return $pages;
  }

  static public function getPageModel()
  {

  }

  /**
   * @return string
   */
  public function getModelNameAttribute(): string
  {
    if( ! $this->model ){
      return '';
    }
    return Str::plural( $this->model->name );
  }
}
