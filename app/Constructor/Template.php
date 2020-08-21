<?php

namespace App\Constructor;

use App\Area;
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

  protected $fillable =
    [ 'name',
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
      return Auth::check();
    }
    return true;
  }
}
