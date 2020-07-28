<?php

namespace App;

use App\Constructor\Template;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
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
          'areas' => self::get_areas_for_page( $page->id ),
        ];
      } else {
        $_page = [
          'path' => $page->path,
          'id' => $page->id,
          'allowed' => false,
          'redirect' => '/',
        ];
      }
      $_page['lazy'] = $lazy;
      if($page->model){
        $_page['model'] = $page->model->toArray();
        $_page['model']['modelName'] = $page->model->altrp_table->name;
      }
      if( $page->get_models() ){
        $_page['models'] = $page->get_models();
      }
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

    $header = Template::where( 'area', 2 )->first();
    if( $header ){
      $areas[] = [
        'area_name' => 'header',
        'id' => 'header',
        'settings' => [],
        'template' => $header
      ];
    }
    $areas[] = [
      'area_name' => 'content',
      'id' => 'content',
      'settings' => [],
      'template' => PagesTemplate::where( 'page_id', $page_id )
        ->where( 'template_type', 'content' )->first()->template
    ];

    $footer = Template::where( 'area', 3 )->first();
    if( $footer ){
      $areas[] = [
        'area_name' => 'footer',
        'id' => 'footer',
        'settings' => [],
        'template' => $footer
      ];
    }

    return $areas;
  }

  function user()
  {
    return $this->belongsTo( User::class, 'author' );
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
    if( ( ! auth()->user() ) ) {
      return true;
    }
    if( ! $user_id ) {
      $user = auth()->user();
    } else {
      $user = User::find( $user_id );
    }
    $allowed = false;

    /** @var User $user */
    $user = auth()->user();
    $page_role_table = DB::table( 'page_role' );
    $page_roles = $page_role_table->where( 'page_id', $this->id )->get();
    /**
     * Если никаких ролей не указано и for_guest false, то всегда доступно
     */
    if( ( ! $page_roles->count() ) && ! $this->for_guest ){
      $allowed = true;
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
}
