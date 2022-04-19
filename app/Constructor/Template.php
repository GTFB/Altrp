<?php

namespace App\Constructor;

use App\Area;
use App\Media;
use App\Page;
use App\PagesTemplate;
use App\Permission;
use App\Role;
use App\Category;
use App\Traits\Searchable;
use App\User;
use App\CategoryObject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * Class Page
 * @package App
 * @property Area $area
 * @property User $user
 */
class Template extends Model
{
  use SoftDeletes, Searchable;

//  protected $table = 'altrp_templates'; todo: переименовать все altrp таблицы

  protected $casts = [
    'template_type' => 'string',
    'triggers' => 'array',
  ];

  const SANITIZE_IGNORE = [
    'button_text',
    'loading_text',
    'simple_title_media_settings',
    'text_advanced_heading_content',
    'description_icon_box_content',
    'prev_text',
    'next_text',
  ];

  protected $fillable = [
    'name',
    'title',
    'data',
    'type',
    'area',
    'guid',
    'user_id',
    'html_content',
    'styles',
    'all_site'
  ];
//  public $area;

  /**
   * Вернуть json для data пустого шаблона для front-app
   * @return array
   */
  private static function getDefaultData()
  {
    return [
      "name" => "root-element",
      "type" => "root-element",
      "children" => [],
      'settings' => [],
    ];
  }

  /**
   * @param array $imported_templates
   * @deprecated
   * Импортирует шаблоны
   */
  public static function import( $imported_templates = [] )
  {
    foreach ( $imported_templates as $imported_template ) {
      $old_template = self::where( 'guid', $imported_template['guid'] )->first();
      if ( $old_template ) {
        if ( strtotime( $imported_template['updated_at'] ) > strtotime( $old_template->updated_at ) ) {
          $old_template->data = $imported_template['data'];
          $old_template->all_site = $imported_template['all_site'];
          try {
            $old_template->save();
          } catch ( \Exception $e ) {
            Log::error( $e->getMessage(), $imported_template ); //
            continue;
          }
        }
        continue;
      }
      $new_template = new self( $imported_template );
      $new_template->user_id = Auth::user()->id;
      if ( Arr::get( $imported_template, 'area_name' ) ) {
        $area = Area::where( 'name', $imported_template['area_name'] )->first();
        $area_name = $area ? $area->id : 1;
      } else {
        $area_name = 1;
      }
      $new_template->area = $area_name;
      try {
        $new_template->save();
      } catch ( \Exception $e ) {
        Log::error( $e->getMessage(), $imported_template ); //
        continue;
      }
    }
  }

  /**
   * @param string $data - json
   */
  public static function prepareAfterImport( string $data ): string
  {
    $_data = json_decode( $data, true );


    $_data = recurseMutateMapElements( $_data, function ( $element ) {
      if ( isset( $element['settings'] ) && is_array( $element['settings'] ) ) {
        foreach ( $element['settings'] as $index => $value ) {
          if ( is_array( $value ) ) {
            foreach ( $value as $label => $repeater_item ) {
              if ( is_string( $label ) ) {
                continue;
              }
              if ( is_array( $repeater_item ) ) {
                foreach ( $repeater_item as $idx => $item ) {
                  if ( ! ( isset( $item['filename'] ) && isset( $item['url'] ) ) ) {
                    continue;
                  }

                  //todo
                  $new_media = Media::createByUrl( $item['url'] );

                  if ( $new_media ) {
                    $new_media->title = $item['title'];
                    $new_media->media_type = $item['media_type'];
                    $new_media->type = $item['type'];
                    $new_media->width = $item['width'];
                    $new_media->height = $item['height'];
                    $new_media->main_color = $item['main_color'];
                    try{
                      $new_media->save();
                    }catch(\Exception $e){
                      logger()->error($e->getMessage());
                    }
                    $element['settings'][$index][$label][$idx] = $new_media->toArray();
                    $element['settings'][$index][$label][$idx]['name'] = $item['name'];
                    $element['settings'][$index][$label][$idx]['assetType'] = $item['assetType'];
                  }
                }
              }
            }
          }
          if ( ! ( isset( $value['filename'] ) && isset( $value['url'] ) ) ) {
            continue;
          }

          $new_media = Media::createByUrl( $value['url'] );
          if ( $new_media ) {
            $new_media->title = $value['title'];
            $new_media->media_type = $value['media_type'];
            $new_media->type = $value['type'];
            $new_media->width = $value['width'];
            $new_media->height = $value['height'];
            $new_media->main_color = $value['main_color'];
            try{
              $new_media->save();
            }catch(\Exception $e){
              logger()->error($e->getMessage());
            }
            $element['settings'][$index] = $new_media->toArray();
            $element['settings'][$index]['name'] = $value['name'];
            $element['settings'][$index]['assetType'] = $value['assetType'];
          }
          //todo
        }
      }
      return $element;
    } );

    return json_encode( $_data );
  }

  public function user()
  {
    return $this->belongsTo( User::class, 'user_id' );
  }

  /**
   * @return Area|\Illuminate\Database\Eloquent\Builder
   */
  public function area()
  {
    return Area::find( $this->area );
  }

  /**
   * Тип шаблона (область/карточка)
   * @return string
   */
  public function getTemplateTypeAttribute()
  {
    if ( ! $this->area() instanceof Area ) {
      return '';
    }
    return $this->area()->name;
  }

  /**
   * условия для попапов
   * @return array
   */
  public function getTriggersAttribute()
  {
    $triggers = TemplateSetting::where( 'template_id', $this->id )
      ->where( 'setting_name', 'triggers' )->first();
    if ( ! $triggers ) {
      return [];
    }
    return $triggers->toArray();
  }

  /**
   * Связь с настройками шаблона
   */
  public function template_settings()
  {
    if ( ! $this->id ) {
      return [];
    }

    return TemplateSetting::where( 'template_id', $this->id )->get()->toArray();
  }

  /**
   * Проверяем условия отоборажения элементов
   */
  public function check_elements_conditions()
  {

    $data = json_decode( $this->data, true );
    $data = $this->recursively_children_check_conditions( $data );

    $this->data = json_encode( $data );
  }

  /**
   * Рекурсивно Проверяем условия отоборажения в дочерних элементах
   * @param array $element_data
   * @return array
   */
  public static function recursively_children_check_conditions( $element_data = [] )
  {
    $_element_data = $element_data;
    $_element_data['children'] = [];

//    if(isset( $_element_data['settingsLock']) ?? is_array( $_element_data['settingsLock'])){
//      $_element_data['settings']
//    }
    foreach ( $element_data['children'] as $child ) {
      if ( self::show_element( $child['settings'] ) ) {
        $child = self::recursively_children_check_conditions( $child );
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
  public static function show_element( $settings )
  {
    if ( ! isset( $settings['conditional_display_choose'] ) ) {
      return true;
    }
    if ( $settings['conditional_display_choose'] === 'all' ) {
      return true;
    }

    if ( $settings['conditional_display_choose'] === 'guest' ) {
      return ! Auth::check();
    }
    if ( $settings['conditional_display_choose'] === 'auth' ) {
      return self::check_auth_conditions( $settings );
    }
    return true;
  }

  /**
   * Проверяам роли разрешения пользователя
   * @param array $settings
   * @return boolean
   */
  public static function check_auth_conditions( $settings = [] )
  {
    $result = true;
    if ( ! ( isset( $settings['conditional_roles'] ) && $settings['conditional_roles']
      || isset( $settings['conditional_permissions'] ) && $settings['conditional_permissions'] ) ) {
      return $result;
    }
    $roles = data_get( $settings, 'conditional_roles', [] );
    $permissions = data_get( $settings, 'conditional_permissions', [] );

    if ( ( count( $roles ) || count( $permissions ) ) && ! Auth::user() ) {
      return false;
    }
    if ( $roles ) {
      return Auth::user()->hasRole( $roles );
    }

    if ( $permissions ) {
      return Auth::user()->hasPermission( $permissions );
    }
    return $result;
  }

  public function template_area()
  {
    return $this->hasOne( Area::class, 'id', 'area' );
  }

  public function categories()
  {
    return $this->hasMany( CategoryObject::class, 'object_guid', 'guid' );
  }

  public function categoryOptions()
  {
      return CategoryObject::select('altrp_categories.guid as value', 'altrp_categories.title as label')->leftJoin('altrp_categories', 'altrp_categories.guid', '=', 'altrp_category_objects.category_guid')
          ->where('altrp_category_objects.object_guid', $this->guid)->get();
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
  public function getTemplateConditions()
  {
    $conditions = [];

    $settings = $this->template_settings();

    foreach ( $settings as $setting ) {
      if ( $setting['setting_name'] === 'conditions' ) {

        if ( is_string( $setting['data'] ) ) {
          $conditions = json_decode( $setting['data'], true ) ? json_decode( $setting['data'], true ) : [];
        } else {
          $conditions = $setting['data'];
        }
      }
    }

    if ( ! count( $conditions ) ) {
      if ( $this->all_site ) {
        $conditions[] = [
          'object_type' => 'all_site',
          'condition_type' => 'include',
          'id' => uniqid(),
        ];
      }
      if ( $this->pages_templates->filter( function ( $value ) {
        return $value->condition_type === 'include';
      } )->count() ) {
        $conditions[] = [
          'object_type' => 'page',
          'condition_type' => 'include',
          'id' => uniqid(),
          'object_ids' => $this->pages_templates->map( function ( $value ) {
            return $value->id;
          } )->toArray(),
        ];
        $conditions[] = [
          'object_type' => 'reports',
          'condition_type' => 'include',
          'id' => uniqid(),
          'object_ids' => $this->pages_templates->map( function ( $value ) {
            return $value->id;
          } )->toArray(),
        ];
      }
      if ( $this->pages_templates->filter( function ( $value ) {
        return $value->condition_type === 'exclude';
      } )->count() ) {
        $conditions[] = [
          'object_type' => 'page',
          'condition_type' => 'exclude',
          'id' => uniqid(),
          'object_ids' => $this->pages_templates->map( function ( $value ) {
            return $value->id;
          } )->toArray(),
        ];
        $conditions[] = [
          'object_type' => 'reports',
          'condition_type' => 'exclude',
          'id' => uniqid(),
          'object_ids' => $this->pages_templates->map( function ( $value ) {
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
  public function pages()
  {
    return $this->belongsToMany( Page::class,
      'pages_templates',
      'template_id',
      'page_id' );
  }

  /**
   * Список связей с таблицами
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function pages_templates()
  {
    return $this->hasMany( PagesTemplate::class,
      'template_id',
      'id' );
  }

  /**
   * Получить объект шаблона по параметрам
   * @param array $param
   * @return array | Template
   */
  public static function getTemplate( $param = [] )
  {

    $template = new Template( [ 'data' => self::getDefaultData() ] );

    $template_type = Arr::get( $param, 'template_type', 'content' );

    $page_id = Arr::get( $param, 'page_id' );
    $page = Page::find( $page_id );

    if ( ! $page ) {
      return $template->toArray();
    }

    /**
     * Сначала проверим есть ли конкретный шаблон для страницы
     */

    $_template = Template::join( 'pages_templates', 'templates.guid', '=', 'pages_templates.template_guid' )
      ->where( 'pages_templates.condition_type', 'include' )
      ->where( 'templates.type', 'template' )
      ->where( 'pages_templates.page_guid', $page->guid )
      ->where( 'pages_templates.template_type', $template_type )->get( 'templates.*' )->first();
    if ( $_template ) {
      $_template = $_template->toArray();
      $_template['data'] = json_decode( $_template['data'], true );
      if ( empty( $_template['data'] ) ) {
        $_template['data'] = self::getDefaultData();
      }

      //$_template['data'] = self::recursively_children_check_conditions($_template['data']);

      return $_template;
    }

    /**
     * Потом ищем шаблон, который отмечен 'all_site'
     */
    $_template = Template::join( 'areas', 'templates.area', '=', 'areas.id' )
      ->where( 'areas.name', $template_type )
      ->where( 'templates.type', 'template' )
      ->where( 'templates.all_site', 1 )->get( 'templates.*' )->first();

    /**
     * И проверяем, есть ли шаблон в исключениях
     */
    if ( $_template && ! Template::join( 'pages_templates', 'templates.guid', '=', 'pages_templates.template_guid' )
        ->where( 'pages_templates.condition_type', 'exclude' )
        ->where( 'pages_templates.page_guid', $page->guid )
        ->where( 'pages_templates.template_type', $template_type )->first() ) {
      //$_template->check_elements_conditions();
      $_template = $_template->toArray();
      $_template['data'] = json_decode( $_template['data'], true );
      if ( empty( $_template['data'] ) ) {
        $_template['data'] = self::getDefaultData();
      }
      return $_template;
    }
    if ( empty( $template->data ) ) {
      $template->data = self::getDefaultData();
    }
    return $template->toArray();
  }

  /**
   * Получить объект шаблона по параметрам
   * @param array $param
   * @return array | Template
   */
  public static function getTemplates( $param = [] )
  {

    $templates = [];

    $template_type = Arr::get( $param, 'template_type', 'content' );
    $page_id = Arr::get( $param, 'page_id' );

    /**
     * Сначала проверим есть ли конкретный шаблон для стрницы
     */

    $templates = Template::join( 'pages_templates', 'templates.id', '=', 'pages_templates.template_id' )
      ->where( 'pages_templates.condition_type', 'include' )
      ->where( 'pages_templates.page_id', $page_id )
      ->where( 'templates.type', 'template' )
      ->where( 'pages_templates.template_type', $template_type )->get( 'templates.*' );


    /**
     * Потом ищем шаблон, который отмечен 'all_site'
     */
    $_templates = Template::join( 'areas', 'templates.area', '=', 'areas.id' )
      ->where( 'areas.name', $template_type )
      ->where( 'templates.type', 'template' )
      ->where( 'templates.all_site', 1 )->get( 'templates.*' );

    /**
     * И проверяем, есть ли шаблон в исключениях
     */

    $_templates = $_templates->filter( function ( Template $_template ) use ( $page_id ) {
      $pages_template = PagesTemplate::where( 'template_id', $_template->id )
        ->where( 'page_id', $page_id )
        ->where( 'condition_type', '=', 'exclude' )->first();

      return ! $pages_template;
    } );

    $templates = $templates->merge( $_templates );


    $templates->each( function ( Template $_template ) {
      //$_template->check_elements_conditions();

      if ( $_template->template_type === 'popup' ) {
        $_template->triggers = $_template->triggers;
      }
      $_template->data = json_decode( $_template->data, true );

    } );

    return $templates->toArray();
  }

  public function getAuthorAttribute()
  {
    $author = User::find( $this->user_id );
    return data_get( $author, 'name', 'admin' );
  }

  /**
   * Очистить пустые значения
   * @param * $data
   * @return array
   */
  public static function sanitizeSettings( $data = [] )
  {
//    return $data; //todo: to test

    if ( is_string( $data ) ) {
      $data = json_decode( $data, true );
      if ( ! $data ) {
        $data = array();
      }
    }
    if ( ! is_array( $data ) ) {
      $data = (array)$data;
    }
    if ( is_array( $data['children'] ) ) {
      foreach ( $data['children'] as $index => $child ) {
        $data['children'][$index] = self::sanitizeSettings( $child );
      }
    }
    $data['settings']['styles'] = [];

    if ( is_array( $data['settings'] ) ) {
      foreach ( $data['settings'] as $index => $setting ) {

        if ( array_search( $index, self::SANITIZE_IGNORE ) !== false ) {
          continue;
        }
        if ( empty( $setting ) && ! is_string( $setting ) ) {



          unset( $data['settings'][$index] );
        } else {

        }
      }
    }
    return $data;
  }
}
