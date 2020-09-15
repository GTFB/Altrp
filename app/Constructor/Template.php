<?php

namespace App\Constructor;

use App\Area;
use App\Page;
use App\PagesTemplate;
use App\Permission;
use App\Role;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

/**
 * Class Page
 * @package App
 * @property Area $area
 * @property User $user
 */
class Template extends Model
{
  use SoftDeletes;


  protected $casts = [
    'template_type' => 'string',
  ];

  protected $fillable =[ 'name',
      'title',
      'data',
      'type',
      'area',
      'user_id' ];


  public function user(){
    return $this->belongsTo( User::class, 'user_id' );
  }

  /**
   * @return Area|\Illuminate\Database\Eloquent\Builder
   */
  public function area(){
    return Area::find( $this->area );
  }

  /**
   * Тип шаблона (область/карточка)
   * @return string
   */
  public function getTemplateTypeAttribute(){
    if( ! $this->area() instanceof Area ){
      return '';
    }
    return $this->area()->name;
  }

  /**
   * Связь с настройками шаблона
   */
  public function template_settings(){
    if( ! $this->id ){
      return [];
    }

    return TemplateSetting::where( 'template_id',  $this->id )->get()->toArray();
  }

  /**
   * Проверяем условия отоборажения элементов
   */
  public function check_elements_conditions(){

    $data = json_decode( $this->data, true );
    $data = $this->recursively_children_check_conditions( $data );

    $this->data = json_encode( $data );
  }

  /**
   * Рекурсивно Проверяем условия отоборажения в дочерних элементах
   * @param array $children
   * @return array
   */
  public function recursively_children_check_conditions( $element_data = [] ){
    $_element_data = $element_data;
    $_element_data['children'] = [];
    foreach ( $element_data['children'] as $child ) {
      if( $this->show_element( $child['settings'] ) ){
        $child = $this->recursively_children_check_conditions( $child );
        $_element_data['children'][] = $child;
      }
    }
    return $_element_data;
  }

  /**
   * Проверим настройки условий элемента
   * @param array $settings
   * @return bool
   */
  public  function show_element( $settings ){
    if( ! isset( $settings['conditional_display_choose'] ) ){
      return true;
    }
    if( $settings['conditional_display_choose'] === 'all' ){
      return true;
    }

    if( $settings['conditional_display_choose'] === 'guest' ){
      return ! Auth::check();
    }
    if( $settings['conditional_display_choose'] === 'auth' ){
      return $this->check_auth_conditions( $settings );
    }
    return true;
  }

  /**
   * Проверяам роли разрешения пользователя
   * @param array $settings
   * @return boolean
   */
  public function check_auth_conditions( $settings = [] ){
    $result = true;
    if(! ( isset( $settings['conditional_roles'] ) && $settings['conditional_roles']
      || isset( $settings['conditional_permissions'] ) && $settings['conditional_permissions'] ) ){
      return $result;
    }
    $roles = Role::find( $settings['conditional_roles'] );
    if( $roles->count() ){
      $roles = $roles->toArray();
      return Auth::user()->hasRole( $roles );
    }

    $permissions = Permission::find( $settings['conditional_permissions'] );
    if( $permissions->count() ){
      $permissions = $permissions->toArray();

      return Auth::user()->hasPermission( $permissions );
    }
    return $result;
  }

  public function template_area(){
    return $this->hasOne( Area::class, 'id', 'area' );
  }

  /**
   * Получить настройки условий отображения шаблона
   * возвращает
   * [
   *  array['condition_type'] - 'include', 'exclude'
   *  array['object_ids'] - список id объектов
   *  array['object_type'] - 'page', 'model', 'all_site'
   * ]
   * @return array
   */
  public function getTemplateConditions(){
    $conditions = [];

    $settings = $this->template_settings();

    foreach ( $settings as $setting ) {
      if( $setting['setting_name'] === 'conditions' ){
        $conditions = $setting['data'];
      }
    }

    if( ! count( $conditions ) ){
      if( $this->all_site ){
        $conditions[] = [
          'object_type' => 'all_site',
          'condition_type' => 'include',
          'id' => uniqid(),
        ];
      }
      if( $this->pages_templates->filter( function( $value ){
        return $value->condition_type === 'include';
      } )->count() ){
        $conditions[] = [
          'object_type' => 'page',
          'condition_type' => 'include',
          'id' => uniqid(),
          'object_ids' => $this->pages_templates->map(function( $value ){
            return $value->id;
          } )->toArray(),
        ];
      }
      if( $this->pages_templates->filter( function( $value ){
        return $value->condition_type === 'exclude';
      } )->count() ){
        $conditions[] = [
          'object_type' => 'page',
          'condition_type' => 'exclude',
          'id' => uniqid(),
          'object_ids' => $this->pages_templates->map(function( $value ){
            return $value->id;
          } )->toArray(),
        ];
      }
    }

    return $conditions;
  }

  /**
   * Связанные страницы
   * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
   */
  public function pages(){
    return $this->belongsToMany( Page::class,
      'pages_templates',
      'template_id',
      'page_id' );
  }
  /**
   * Список связей с таблицами
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function pages_templates(){
    return $this->hasMany( PagesTemplate::class,
      'template_id',
      'id' );
  }
}
