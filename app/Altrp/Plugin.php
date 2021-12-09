<?php

namespace App\Altrp;


use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Facades\File;

/**
 * Class Plugin
 * @package App\Altrp
 */
class Plugin extends Model
{


  protected $casts = [
    'title' => 'string',
    'logo' => 'string',
    'tags' => 'array',
  ];
  protected $appends = [
    'title',
    'tags',
    'logo',
  ];
  private $plugin_main_file_content = null;
  private $plugin_meta_data = null;

  protected $fillable = [
    'name'
  ];

  /**
   * @throws FileNotFoundException
   */
  public function getTitleAttribute()
  {
    return $this->getMeta( 'title' );
  }
  /**
   * @throws FileNotFoundException
   */
  public function getLogoAttribute()
  {
    return '/storage/plugins/' . $this->name . $this->getMeta( 'logo', '/public/logo.png' );
  }

  /**
   * @throws FileNotFoundException
   */
  public function getTagsAttribute()
  {
    $tags = $this->getMeta( 'tags', '' );
    if( ! $tags ) {
      return [];
    }
    return explode( ',', $tags );
  }

  /**
   * @param string $meta_name
   * @param null $default
   * @return array|mixed
   * @throws FileNotFoundException
   */
  private function getMeta( string $meta_name, $default = null )
  {
    if ( is_null( $this->plugin_meta_data ) ) {
      $this->plugin_meta_data = [];

      $this->plugin_main_file_content = File::get( app_path( 'AltrpPlugins/' . $this->name . '/plugin_meta' ) );

      foreach ( explode( "\n", $this->plugin_main_file_content ) as $item ) {
        $item = explode( '=', $item );
        if ( trim( $item[0] ) && trim( $item[1] ) )
          $this->plugin_meta_data[trim( $item[0] )] = trim( $item[1] );
      }
    }

    return data_get( $this->plugin_meta_data, $meta_name, $default );
  }
}
