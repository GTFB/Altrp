<?php

namespace App\Altrp;


use Facade\FlareClient\Http\Exceptions\NotFound;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Facades\Artisan;
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
    'version' => 'string',
  ];
  protected $appends = [
    'title',
    'tags',
    'logo',
    'enabled',
    'description',
    'version',
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
    $enabledPlugins =   env( self::ALTRP_PLUGINS );
    if( ! $enabledPlugins ){
      $enabledPlugins = [];
    } else {
      $enabledPlugins = explode(',',  $enabledPlugins );
    }
    $plugin = new Plugin(['name' => $pluginName ]);
    if( $enable ){
      if( ! array_search( $plugin->name, $enabledPlugins ) ){
        $enabledPlugins[] = $plugin->name;
      }
    } else {
      $enabledPlugins = array_filter( $enabledPlugins, function ( $_plugin ) use( $plugin ){
        return $_plugin != $plugin->name;
      } );
    }
    $enabledPlugins = implode(',', $enabledPlugins);
    DotenvEditor::setKey( self::ALTRP_PLUGINS, $enabledPlugins );
    DotenvEditor::save();
    Artisan::call( 'cache:clear' );
  }

  /**
   * @throws NotFound
   * @throws \Exception
   */
  public function copyStaticFiles(){

    $publicPath = $this->getPath('/public');
    if( ! File::copyDirectory( $publicPath, $this->getPublicPath('/public') ) ){
      throw new \Exception('Copy plugins public files error');
    }
  }
  /**
   * @throws NotFound
   */
  public function deleteStaticFiles(){
    if( File::exists( $this->getPublicPath() ) ){
      File::deleteDirectory( $this->getPublicPath() );
    }
  }

  /**
   * @throws NotFound
   */
  public function deletePluginFiles(){
    if( File::exists( $this->getPath() ) ){
      File::deleteDirectory( $this->getPath() );
    }
  }
  /**
   * @throws NotFound
   */
  public function deletePlugin(){
    self::switchEnable( $this->name, false );
    $this->deleteStaticFiles();
    $this->deletePluginFiles();
  }

  /**
   * @return string
   * @throws FileNotFoundException
   * @throws NotFound
   */
  public function getTitleAttribute()
  {
    return $this->getMeta( 'title' );
  }

  /**
   * @return string
   * @throws FileNotFoundException
   * @throws NotFound
   */
  public function getVersionAttribute()
  {
    return $this->getMeta( 'version' );
  }

  /**
   * @return string
   * @throws FileNotFoundException
   * @throws NotFound
   */
  public function getLogoAttribute(): string
  {
    return '/altrp-plugins/' . $this->name . $this->getMeta( 'logo', '/public/logo.png' );
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
  public function getPublicPath( string $path = '' ): string
  {
    if ( ! $this->name ) {
      throw new NotFound( 'Plugin Name not Found' );
    }
    return public_path( 'altrp-plugins/' . $this->name . $path ) ;
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

  /**
   * @return bool
   */
  public function getEnabledAttribute(): bool
  {
    return self::pluginEnabled( $this->name );
  }

  /**
   * @param string $pluginName
   * @return bool
   */
  static public function pluginEnabled( string $pluginName = '' ): bool
  {
    if ( ! $pluginName ) {
      return false;
    }
    Artisan::call( 'cache:clear' );
    $enabledPlugins = DotenvEditor::getValue( self::ALTRP_PLUGINS );
    if( ! $enabledPlugins ){
      return false;
    }
    $enabledPlugins = explode( ',', $enabledPlugins );
    return array_search( $pluginName, $enabledPlugins ) !== false;
  }
}
