<?php

namespace App;

use App\Altrp\Source;
use App\Altrp\Model as AltrpModel;
use App\Constructor\Template;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Mockery\Exception;

/**
 * Class Page
 * @package App
 * @property User $user
 * @property \App\Altrp\Model $model
 */

class Page extends Model
{
  //
  use SoftDeletes;
  protected $fillable = [
    'title',
    'author',
    'content',
    'path',
    'model_id',
    'redirect',
    'guid',
    'for_guest',
  ];

  /**
   * @return array
   */
  static function get_frontend_routes( )
  {
    $pages = [];
    if( ! appIsInstalled()  ){
      return $pages;
    }
    if( ! Schema::hasTable( 'pages' )  ){
      return $pages;
    }
    try{
      $pages = Page::all()->map->only( [ 'path' ] )->map( function ( $path ) {
        return $path['path'];
      } )->toArray();
    } catch (Exception $e){
    }
    return $pages;
  }

  /**
   * @param bool $lazy
   * @return array
   */
  public static function get_pages_for_frontend( $lazy = false )
  {
    $pages = [];

    $_pages = static::all();

    /** @var Page $page */
    foreach ( $_pages as $page ) {
      if( $page->allowedForUser() ){
        $_page = [
          'path' => $page->path,
          'id' => $page->id,
          'title' => $page->title,
          'allowed' => true,
          'data_sources' => $page->page_data_sources->map( function ( PageDatasource $page_data_source ){
            if( $page_data_source->source ){
              $page_data_source->source->web_url = $page_data_source->source->web_url;
            }
            return $page_data_source;
          } ),
        /**
           * Если лениво загружаем области то возвращаем пустой массив
           */
          'areas' => $lazy ? [] : self::get_areas_for_page( $page->id ),
//          'areas' => self::get_areas_for_page( $page->id ),
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
      if($page->model){
        $_page['model'] = $page->model->toArray();
        $_page['model']['modelName'] = Str::plural( $page->model->name );
      }
//      if( $page->get_models() ){
//        $_page['models'] = $page->get_models();
//      }
      $pages[] = $_page;
    }

    return $pages;
  }

  /**
   * @param $page_id
   * @return array
   */
  public static function get_areas_for_page( $page_id ){
    $areas = [];

//    $header = Template::where( 'area', 2 )->where( 'type', 'template' )->first();
//    if( $header ){
//      $header->check_elements_conditions();
//      $areas[] = [
//        'area_name' => 'header',
//        'id' => 'header',
//        'settings' => [],
//        'template' => $header
//      ];
//    }
    /**
     * @var Template $content
     */
//    $content = PagesTemplate::where( 'page_id', $page_id )
//      ->where( 'template_type', 'content' )
//      ->where( 'condition_type', 'include' )
//      ->first();
//    if( $content ){
//      $content = $content->template;
//      $content->check_elements_conditions();
//      $areas[] = [
//        'area_name' => 'content',
//        'id' => 'content',
//        'settings' => [],
//        'template' => $content,
//      ];
//    } else {
//      /**
//       * Пустой контент, если страницы нет
//       */
//      $areas[] = [
//        'area_name' => 'content',
//        'id' => 'content',
//        'settings' => [],
//        'template' => [
//          'data' => json_encode([
//            "name"=>"root-element",
//            "type"=>"root-element",
//            "children"=> [],
//            'settings' => [],
//          ])
//        ],
//      ];
//    }

    $areas[] = [
      'area_name' => 'header',
      'id' => 'header',
      'settings' => [],
      'template' => Template::getTemplate([
        'page_id' => $page_id,
        'template_type' => 'header',
      ]),
    ];

    $areas[] = [
      'area_name' => 'content',
      'id' => 'content',
      'settings' => [],
      'template' => Template::getTemplate([
        'page_id' => $page_id,
        'template_type' => 'content',
      ]),
    ];

    $areas[] = [
      'area_name' => 'footer',
      'id' => 'footer',
      'settings' => [],
      'template' => Template::getTemplate([
      'page_id' => $page_id,
      'template_type' => 'footer',
      ]),
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
      'templates' => Template::getTemplates([
        'page_id' => $page_id,
        'template_type' => 'popup',
      ]),
    ];
//    }

    return $areas;
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
  public function data_sources(){
    return $this->belongsToMany( Source::class, 'page_data_sources', 'page_id', 'source_id' );
  }
  /**
   * Список ресурсов связанных со страницей через
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function page_data_sources(){
    return $this->hasMany( PageDatasource::class, 'page_id', 'id' );
  }
  /**
    * Импортируем связи стрнаиц с ролями
    * @param array $page_roles
  */
  public static function importPageRoles( $page_roles = [] )
{
  $table = DB::table( 'page_role' );
  $table->delete();
  foreach ( $page_roles as $page_role ) {
    $role = Role::where( 'name', data_get( $page_role, 'role_name' ) )->first();
    $page = self::where( 'guid', data_get( $page_role, 'page_guid' ) )->first();
    if( ! ( $page && $role ) ){
      continue;
    }
    try{
      $table->insert([
        'page_id' => $page->id,
        'role_id' => $role->id,
      ]);
    }catch(\Exception $e){}

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
  function get_models(){
    if( ! $this->model ){
      return null;
    }
    $models[] = [
      'modelName' => $this->model->altrp_table->name,
      'name' => $this->model->name,
    ];
    $relations = $this->model->altrp_table->relationships;

    foreach ( $relations as $relation ) {
      if($relation->get_model_for_route()){
        $models[] = $relation->get_model_for_route();
      }
    }

    return $models;
  }

  /**
   * Привязывает набор ролей к сттанице, удаляя старые связи
   * @param {string | array}$roles
   */
  public function attachRoles( $roles ){
    if( ! $this->id ){
      return;
    }
    $roles = is_string( $roles ) ? [$roles] : $roles;
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
  public function parseRoles( $roles ){
    $_roles = [];
    $for_guest = false;
    foreach ( $roles as $role ) {
      if( ! is_string( $role['value'] ) ){
        $_roles[] = $role['value'];
      } else if( $role['value'] === 'guest' ){
        $for_guest = true;
      }
    }
    $this->attachRoles( $_roles );
    $this->for_guest = $for_guest;
  }

  /**
   * @return array
   */
  public function getRoles(){
    if ( ! $this->id ){
      return[];
    }
    $page_role_table = DB::table( 'page_role' );
    $page_roles = $page_role_table->where( 'page_id', $this->id )->get();
    $roles = [];
    if( $this->for_guest ){
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
  public function allowedForUser( $user_id = '' ){

//    if( ( ! auth()->user() ) ) {
//      return true;
//    }
    if( ! $user_id ) {
      $user = auth()->user();
    } else {
      $user = User::find( $user_id );
    }
    $allowed = false;

    /** @var User $user */
//    $user = auth()->user();
    $page_role_table = DB::table( 'page_role' );
    $page_roles = $page_role_table->where( 'page_id', $this->id )->get();
    /**
     * Если никаких ролей не указано и for_guest false, то всегда доступно
     */
    if( ( ! $page_roles->count() ) && ! $this->for_guest ){
      return true;
    }
//    echo '<pre style="padding-left: 200px;">';
//    var_dump( $this->for_guest );
//    echo '</pre>';

    if( ( ! $user ) && $this->for_guest ){
      return true;
    }
    if( ! $user ){
      return false;
    }
    foreach ( $page_roles as $page_role ) {
      $role = Role::find( $page_role->role_id );
      if( $user->hasRole( $role->name ) ){
        $allowed = true;
      }
    }
    return $allowed;
  }

  /**
   * Испортирует страницы
   * @param array $imported_pages
   */
  static public function import( $imported_pages = []){
    foreach ( $imported_pages as $imported_page ) {

      if( Arr::get( $imported_page, 'model_name' ) ){
        $model = AltrpModel::where( 'name', $imported_page['model_name'] )->first();
        $model_id = $model ? $model->id : null;
      } else {
        $model_id = null;
      }
      $old_page = self::where( 'guid', $imported_page['guid'] )->first();
      if( $old_page ){
        if( date( $imported_page['updated_at'] ) > date( $old_page->updated_at ) ) {
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
      } catch (\Exception $e){
        Log::error( $e->getMessage(), $imported_page ); //
        continue;
      }
    }
  }
}
