<?php

namespace App\Altrp;


use App\AltrpMeta;
use Facade\FlareClient\Http\Exceptions\NotFound;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Request;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

/**
 * Class Plugin
 * @package App\Altrp
 */
class Plugin extends Model
{

  /**
   * Ключ списка плагинов в .env
   */
  const ALTRP_PLUGINS = 'ALTRP_PLUGINS';
  /**
   * Ключ списка виджетов в .env
   */
  const ALTRP_PLUGINS_WIDGET_LIST = 'ALTRP_PLUGINS_WIDGET_LIST';
  /**
   * Ключ списка виджетов в plugin_meta
   */
  const PLUGIN_WIDGETS = 'plugin_widgets';
  /**
   * Ключ списка статики активных плагинов в таблице altrp_meta
   */
  const ALTRP_STATIC_META = 'altrp_static_meta';

  /**
   * список локаций для статики в шаблонах
   */
  const STATIC_LOCATIONS_LIST = [
    'front_head_styles',
    'front_bottom_styles',
    'front_head_scripts',
    'front_bottom_scripts',
    'admin_head_styles',
    'admin_bottom_styles',
    'admin_head_scripts',
    'admin_bottom_scripts',
    'editor_head_styles',
    'editor_bottom_styles',
    'editor_head_scripts',
    'editor_bottom_scripts',
    'customizer_head_styles',
    'customizer_bottom_styles',
    'customizer_head_scripts',
    'customizer_bottom_scripts',
    'robot_head_styles',
    'robot_bottom_styles',
    'robot_head_scripts',
    'robot_bottom_scripts ',
  ];

  protected $casts = [
    'title' => 'string',
    'logo' => 'string',
    'tags' => 'array',
    'enabled' => 'boolean',
    'description' => 'string',
    'version' => 'string',
    'check_version_url' => 'string',
    'update_url' => 'string',
  ];
  protected $appends = [
    'title',
    'tags',
    'logo',
    'enabled',
    'description',
    'version',
    'check_version_url',
    'update_url',
  ];
  private $plugin_main_file_content = null;
  private $plugin_meta_data = null;

  protected $fillable = [
    'name'
  ];

  public function clearMetadata(){
    $this->plugin_meta_data = null;
    $this->plugin_main_file_content = null;
  }

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
    $enabledPlugins = env( self::ALTRP_PLUGINS );
    if( ! $enabledPlugins ){
      $enabledPlugins = [];
    } else {
      $enabledPlugins = explode(',',  $enabledPlugins );
    }
    $plugin = new Plugin(['name' => $pluginName ]);
    if( $enable ){
      $plugin->updatePluginSettings();
      if( ! array_search( $plugin->name, $enabledPlugins ) ){
        $enabledPlugins[] = $plugin->name;
      }
    } else {
      $enabledPlugins = array_filter( $enabledPlugins, function ( $_plugin ) use( $plugin ){
        return $_plugin != $plugin->name;
      } );
      $plugin->removeStaticsFromAltrpMeta();
    }
    $enabledPlugins = implode(',', $enabledPlugins);
    DotenvEditor::setKey( self::ALTRP_PLUGINS, $enabledPlugins );
    DotenvEditor::save();
    Artisan::call( 'cache:clear' );
    self::updateAltrpPluginLists();
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
  public function getCheckVersionUrlAttribute()
  {
    return $this->getMeta( 'check_version_url' );
  }
  /**
   * @return string
   * @throws FileNotFoundException
   * @throws NotFound
   */
  public function getUpdateUrlAttribute()
  {
    return $this->getMeta( 'update_url' );
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

    $enabledPlugins = env( self::ALTRP_PLUGINS );

    if( ! $enabledPlugins ){
      return false;
    }
    $enabledPlugins = explode( ',', $enabledPlugins );
    return array_search( $pluginName, $enabledPlugins ) !== false;
  }
  /**
   * @throws NotFound
   */
  public function updatePluginSettings()
  {
    $this->copyStaticFiles();
    $this->writeStaticsToAltrpMeta();

  }

  public function removeStaticsFromAltrpMeta(){

    $altrp_static_meta = AltrpMeta::find( self::ALTRP_STATIC_META );
    if( ! $altrp_static_meta ){
      $altrp_static_meta = new AltrpMeta(
        [
          'meta_name' =>self::ALTRP_STATIC_META,
          'meta_value' => '{}',
        ]
      );
      $altrp_static_meta->save();
    }
    $value = json_decode( $altrp_static_meta->meta_value, true );

    foreach ( self::STATIC_LOCATIONS_LIST as $item ) {
      data_set( $value, $item . '.' . $this->name, null );
    }
    $altrp_static_meta->meta_value = json_encode( $value );
    $altrp_static_meta->save();
    self::writePluginsSettings();
  }

  function writeStaticsToAltrpMeta()
  {
    $altrp_static_meta = AltrpMeta::find( self::ALTRP_STATIC_META );
    if( ! $altrp_static_meta ){
      $altrp_static_meta = new AltrpMeta(
        [
          'meta_name' =>self::ALTRP_STATIC_META,
          'meta_value' => '{}',
        ]
      );
      $altrp_static_meta->save();
    }
    $value = json_decode( $altrp_static_meta->meta_value, true );

    foreach ( self::STATIC_LOCATIONS_LIST as $item ) {
      data_set( $value, $item . '.' . $this->name, $this->getMeta( $item ) );
    }
    $altrp_static_meta->meta_value = json_encode( $value );
    $altrp_static_meta->save();
    self::writePluginsSettings();
  }

  static public function writePluginsSettings(){

    $altrp_static_meta = AltrpMeta::find( self::ALTRP_STATIC_META );
    if( ! $altrp_static_meta ){
      $altrp_static_meta = new AltrpMeta(
        [
          'meta_name' =>self::ALTRP_STATIC_META,
          'meta_value' => '{}',
        ]
      );
      $altrp_static_meta->save();
    }
    $value = json_decode( $altrp_static_meta->meta_value, true );

    foreach ( self::STATIC_LOCATIONS_LIST as $item ) {
      $statics_lis = data_get( $value, $item );
      $statics_string = [];
      if( is_array( $statics_lis ) ){
        foreach ( $statics_lis as $plugin_name => $static ) {
          if( is_string( $static ) && $static ){
            $statics_string[] = trim( $static );
          }
        }
      }
      if( $statics_string ){
        $statics_string = implode( ',', $statics_string );
        DotenvEditor::setKey( \Str::upper( $item ), $statics_string );
      } else {
        DotenvEditor::deleteKey( \Str::upper( $item ) );
      }
      DotenvEditor::save();
    }
  }
  /**
   * @return bool
   * @throws NotFound
   */
  public function updatePluginFiles(){

    if( ! \URL::isValidUrl( $this->update_url )){
      return true;
    }

    $client = new \GuzzleHttp\Client;
    try{

      $res = $client->get( $this->update_url, [
        'headers' => [
          'authorization' => request()->cookie('altrpMarketApiToken'),
          'altrp-domain-resource' => str_replace(['https://', 'http://'], '', Request::root()),
        ]
      ])->getBody()->getContents();
    } catch(\Throwable $e){
      logger()->error( $e->getMessage() ."\n" . $e->getTraceAsString() );
      return false;
    }
    if( ! $res ){
      return false;
    }
    $temp_path = storage_path( 'temp' );
    File::ensureDirectoryExists( $temp_path );
    $filename = $temp_path . '/' . $this->name . '.zip';
    File::put( $filename,  $res );
    $archive = new \ZipArchive();

    if ( ! $archive->open( $filename ) ) {
      return false;
    }

    if ( ! $archive->extractTo( $this->getPath() ) ) {
      $archive->close();
      File::deleteDirectory( $temp_path );
      return false;
    }
    $archive->close();
    File::deleteDirectory( $temp_path );
    return true;
  }

  /**
   * @return Collection
   */
  static function getEnabledPlugins(): Collection{
    if(DotenvEditor::keyExists(self::ALTRP_PLUGINS)){
      $enabledPlugins =  explode(',', DotenvEditor::getValue( self::ALTRP_PLUGINS ));
    } else {
      $enabledPlugins = [];
    }
    $enabledPlugins =  collect( $enabledPlugins );
    $enabledPlugins = $enabledPlugins->map(function( $plugin_name) {
      return new Plugin(['name' => $plugin_name ]);
    });
    $duplicatesPlugins = $enabledPlugins->duplicates( function( Plugin $plugin ){
      return $plugin->name;
    });
    if( $duplicatesPlugins->count() ){
      $enabledPlugins = $enabledPlugins->unique( function( Plugin $plugin ){
        return $plugin->name;
      })->values();

      $enabledPluginsString = $enabledPlugins->map(function ( Plugin $plugin ) {
        return $plugin->name;
      } );
      $enabledPluginsString = $enabledPluginsString->implode( ',' );

      DotenvEditor::setKey( self::ALTRP_PLUGINS, $enabledPluginsString );
      DotenvEditor::save();
    }
    return $enabledPlugins;
  }

  /**
   * @return Collection
   */
  static function getPlugins(): Collection
  {

    if( File::exists( app_path( 'AltrpPlugins' ) )){
      $plugins = File::directories( app_path( 'AltrpPlugins' ) );
    } else {
      $plugins = [];
    }
    return collect( $plugins );
  }


  /**
   * Удалить списки виджетов и пр. для активных плагинов из .env
   */
  static function updateAltrpPluginLists()
  {
    $plugins = self::getEnabledPlugins();
    $new_widget_list = [];
    $plugins->each( function( Plugin $plugin )use(&$new_widget_list){
      try {
        if ( $plugin->getMeta( Plugin::PLUGIN_WIDGETS ) )  {
          $new_widget_list =
            array_merge( $new_widget_list,
              explode( ',',$plugin->getMeta( Plugin::PLUGIN_WIDGETS))
            );
        }
      } catch ( NotFound | FileNotFoundException $e ) {
      }
    });
    $new_widget_list = implode( ',',$new_widget_list);
    DotenvEditor::setKey( self::ALTRP_PLUGINS_WIDGET_LIST, $new_widget_list );
    DotenvEditor::save();
  }

}
