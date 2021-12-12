<?php

namespace App\Altrp;


use Facade\FlareClient\Http\Exceptions\NotFound;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Facades\File;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

/**
 * Class Plugin
 * @package App\Altrp
 */
class Plugin extends Model
{

  const ALTRP_PLUGINS = 'ALTRP_PLUGINS';

  protected $casts = [
    'title' => 'string',
    'logo' => 'string',
    'tags' => 'array',
    'enabled' => 'boolean',
    'description' => 'string',
  ];
  protected $appends = [
    'title',
    'tags',
    'logo',
    'enabled',
    'description',
  ];
  private $plugin_main_file_content = null;
  private $plugin_meta_data = null;

  protected $fillable = [
    'name'
  ];

  /**
   * @param string $pluginName
   * @param bool $enable
   * @throws NotFound
   */
  public static function switchEnable( string $pluginName , bool $enable )
  {
    if( ! $pluginName ){
      return;
    }
    $enabledPlugins = explode(',',  env( self::ALTRP_PLUGINS, '' ) );
    $plugin = new Plugin(['name' => $pluginName ]);
    if( $enable && ! array_search( $plugin->name, $enabledPlugins ) ){
      $publicPath = $plugin->getPath('/public');
      if( ! File::copyDirectory( $publicPath, $plugin->getStoragePath() ) ){
       throw new \Exception('Copy plugins public files error');
      }
      $enabledPlugins[] = $plugin->name;
      $enabledPlugins = implode(',', $enabledPlugins);
    } else if( array_search( $plugin->name, $enabledPlugins ) ){
      File::deleteDirectory( $plugin->getStoragePath() );
      $enabledPlugins = array_filter( $enabledPlugins, function ( $_plugin ) use( $plugin ){
        return $_plugin != $plugin->name;
      } );
    }
    DotenvEditor::setKey( self::ALTRP_PLUGINS, $enabledPlugins );
  }

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
  public function getDescriptionAttribute()
  {
    return $this->getMeta( 'description', '' );
  }

  /**
   * @throws FileNotFoundException
   */
  public function getTagsAttribute()
  {
    $tags = $this->getMeta( 'tags', '' );
    if ( ! $tags ) {
      return [];
    }
    $tags = explode( ',', $tags );
    $tags = array_map( function ( $tag ) {
      return trim( $tag );
    }, $tags );
    return $tags;
  }

  /**
   * @param string $path
   * @return string
   * @throws NotFound
   */
  public function getPath( string $path = '' ): string
  {
    if ( ! $this->name ) {
      throw new NotFound( 'Plugin Name not Found' );
    }
    return app_path( 'AltrpPlugins/' . $this->name . $path );
  }
  /**
   * @param string $path
   * @return string
   * @throws NotFound
   */
  public function getStoragePath( string $path = '' ): string
  {
    if ( ! $this->name ) {
      throw new NotFound( 'Plugin Name not Found' );
    }
    return storage_path( 'app/public/plugins/' . $this->name . $path ) ;
  }

  /**
   * @param string $meta_name
   * @param null $default
   * @return array|mixed
   * @throws FileNotFoundException
   * @throws NotFound
   */
  private function getMeta( string $meta_name, $default = null )
  {
    if ( ! File::exists( $this->getPath() ) ) {
      throw new NotFound( 'Plugin not Found' );
    }
    if ( is_null( $this->plugin_meta_data ) ) {
      $this->plugin_meta_data = [];

      $this->plugin_main_file_content = File::get( $this->getPath( '/plugin_meta' ) );

      foreach ( explode( "\n", $this->plugin_main_file_content ) as $item ) {
        $item = explode( '=', $item );
        if ( trim( $item[0] ) && trim( $item[1] ) )
          $this->plugin_meta_data[trim( $item[0] )] = trim( $item[1] );
      }
    }

    return data_get( $this->plugin_meta_data, $meta_name, $default );
  }

  public function getEnabledAttribute()
  {
    return self::pluginEnabled( $this->name );
  }

  /**
   * @param string $pluginName
   * @return bool
   */
  static public function pluginEnabled( $pluginName = '' )
  {
    if ( ! $pluginName ) {
      return false;
    }
    $enabledPlugins = env( self::ALTRP_PLUGINS,  '' );
    $enabledPlugins = explode( ',', $enabledPlugins );
    return array_search( $pluginName, $enabledPlugins ) !== false;
  }
}
