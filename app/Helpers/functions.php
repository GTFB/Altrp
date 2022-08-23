<?php

use App\Altrp\Plugin;
use App\Constructor\Template;
use App\Http\Requests\ApiRequest;
use App\PagesTemplate;
use App\Role;
use App\Media;
use App\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use League\ColorExtractor\Color;
use League\ColorExtractor\ColorExtractor;
use League\ColorExtractor\Palette;
use App\Page;
use App\Altrp\Menu;
use Illuminate\Support\Facades\Auth;
use App\Altrp\Facades\CacheService;

/**
 * Get the script possible URL base
 *
 * @return mixed
 */
function getRawBaseUrl()
{
  // Get the Laravel's App public path name
  $laravelPublicPath = trim( public_path(), '/' );
  $laravelPublicPathLabel = last( explode( '/', $laravelPublicPath ) );

  // Get Server Variables
  $httpHost = ( trim( request()->server( 'HTTP_HOST' ) ) != '' ) ? request()->server( 'HTTP_HOST' ) : ( isset( $_SERVER['HTTP_HOST'] ) ? $_SERVER['HTTP_HOST'] : '' );
  $requestUri = ( trim( request()->server( 'REQUEST_URI' ) ) != '' ) ? request()->server( 'REQUEST_URI' ) : ( isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '' );

  // Clear the Server Variables
  $httpHost = trim( $httpHost, '/' );
  $requestUri = trim( $requestUri, '/' );
  $requestUri = ( mb_substr( $requestUri, 0, strlen( $laravelPublicPathLabel ) ) === $laravelPublicPathLabel ) ? '/' . $laravelPublicPathLabel : '';

  // Get the Current URL
  $currentUrl = ( ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] != 'off' ) ? 'https://' : 'http://' ) . $httpHost . strtok( $requestUri, '?' );
  $currentUrl = head( explode( '/' . admin_uri(), $currentUrl ) );

  // Get the Base URL
  $baseUrl = head( explode( '/install', $currentUrl ) );
  $baseUrl = rtrim( $baseUrl, '/' );

  return $baseUrl;
}


/**
 * @param string $path
 * @return string
 */
function admin_uri( $path = '' )
{
  $path = str_replace( url( config( 'altrp.admin.route_prefix', 'admin' ) ), '', $path );
  $path = ltrim( $path, '/' );

  if ( ! empty( $path ) ) {
    $path = config( 'altrp.admin.route_prefix', 'admin' ) . '/' . $path;
  } else {
    $path = config( 'altrp.admin.route_prefix', 'admin' );
  }

  return $path;
}

function updateIsAvailable()
{

  if ( env( 'APP_ENV' ) === 'local' ) {
    return false;
  }
  // Check if the '.env' file exists
  if ( ! file_exists( base_path( '.env' ) ) ) {
    return false;
  }

  $updateIsAvailable = false;

  // Get eventual new version value & the current (installed) version value
  $lastVersion = getLatestVersion();
  $currentVersion = getCurrentVersion();

  // Check the update
  if ( version_compare( $lastVersion, $currentVersion, '>' ) ) {
    $updateIsAvailable = true;
  }

  return $updateIsAvailable;
}

/**
 * Redirect (Prevent Browser cache)
 *
 * @param $url
 * @param int $code (301 => Moved Permanently | 302 => Moved Temporarily)
 */
function headerLocation( $url, $code = 301 )
{
  header( "Cache-Control: no-store, no-cache, must-revalidate, max-age=0" );
  header( "Cache-Control: post-check=0, pre-check=0", false );
  header( "Pragma: no-cache" );
  header( "Location: " . $url, true, $code );

  exit();
}

/**
 * Get file/folder permissions.
 *
 * @param $path
 * @return string
 */
function getPerms( $path )
{
  return substr( sprintf( '%o', fileperms( $path ) ), -4 );
}

/**
 * Check if the app is installed
 *
 * @return bool
 */
function appIsInstalled()
{
  // Check if the app's installation files exist

  if( env( 'APP_ENV' ) === 'local' ){
    return true;
  }
  if ( ! appInstallFilesExist() ) {
    return false;
  }

  // Check Installation Setup
  $properly = true;
  try {
    // Check if all database tables exists
    $namespace = 'App\\Models\\';
    $modelsPath = app_path( 'Models' );
    $modelFiles = array_filter( glob( $modelsPath . DIRECTORY_SEPARATOR . '*.php' ), 'is_file' );

    if ( count( $modelFiles ) > 0 ) {
      foreach ( $modelFiles as $filePath ) {
        $filename = last( explode( DIRECTORY_SEPARATOR, $filePath ) );
        $modelname = head( explode( '.', $filename ) );

        if (
          ! \Illuminate\Support\Str::contains( strtolower( $filename ), '.php' )
          || \Illuminate\Support\Str::contains( strtolower( $modelname ), 'base' )
        ) {
          continue;
        }

        eval( '$model = new ' . $namespace . $modelname . '();' );
        if ( ! \Illuminate\Support\Facades\Schema::hasTable( $model->getTable() ) ) {
          $properly = false;
        }
      }
    }

  } catch ( \PDOException $e ) {
    $properly = false;
  } catch ( \Exception $e ) {
    $properly = false;
  }

  return $properly;
}

/**
 * Check if the app's installation files exist
 *
 * @return bool
 */
function appInstallFilesExist()
{
  // Check if the '.env' and 'storage/installed' files exist

  if ( file_exists( base_path( '.env' ) ) && file_exists( storage_path( 'installed' ) ) ) {
    return true;
  }

  return false;
}

/**
 * Check if function is enabled
 *
 * @param $name
 * @return bool
 */
function func_enabled( $name )
{
  try {
    $disabled = array_map( 'trim', explode( ',', ini_get( 'disable_functions' ) ) );

    return ! in_array( $name, $disabled );
  } catch ( \Exception $ex ) {
    return false;
  }
}

/**
 * Check if json string is valid
 *
 * @param $string
 * @return bool
 */
function isValidJson( $string )
{
  try {
    json_decode( $string );
  } catch ( \Exception $e ) {
    return false;
  }

  return ( json_last_error() == JSON_ERROR_NONE );
}

/**
 * @param $array
 * @return mixed|string
 */
function httpBuildQuery( $array )
{
  if ( ! is_array( $array ) && ! is_object( $array ) ) {
    return $array;
  }

  $queryString = http_build_query( $array );
  $queryString = str_replace( [ '%5B', '%5D' ], [ '[', ']' ], $queryString );

  return $queryString;
}


/**
 * Get the app latest version
 *
 * @return \Illuminate\Config\Repository|mixed|string
 */
function getLatestVersion()
{
  return checkAndUseSemVer( config( 'app.altrp_version' ) );
}

/**
 * Check and use semver version num format
 *
 * @param $version
 * @return string
 */
function checkAndUseSemVer( $version )
{
  $semver = '0.0.0';
  if ( ! empty( $version ) ) {
    $numPattern = '([0-9]+)';
    if ( preg_match( '#^' . $numPattern . '\.' . $numPattern . '\.' . $numPattern . '$#', $version ) ) {
      $semver = $version;
    } else {
      if ( preg_match( '#^' . $numPattern . '\.' . $numPattern . '$#', $version ) ) {
        $semver = $version . '.0';
      } else {
        if ( preg_match( '#^' . $numPattern . '$#', $version ) ) {
          $semver = $version . '.0.0';
        } else {
          $semver = '0.0.0';
        }
      }
    }
  }

  return $semver;
}

/**
 * Get the current version value
 *
 * @return null|string
 */
function getCurrentVersion()
{
  // Get the Current Version
  $version = null;
  if ( \Jackiedo\DotenvEditor\Facades\DotenvEditor::keyExists( 'APP_VERSION' ) ) {
    try {
      $version = \Jackiedo\DotenvEditor\Facades\DotenvEditor::getValue( 'APP_VERSION' );
    } catch ( \Exception $e ) {
      $version = '0.0.0';
    }
  }
  $version = checkAndUseSemVer( $version );

  return $version;
}

/**
 * Возвращает адрес статики в зависимости от среды разработки
 * @param string $path
 * @param string $domain
 * @return string
 */
function altrp_asset( $path, $domain = 'http://localhost:3002/' )
{
  if ( env( 'APP_ENV', 'production' ) !== 'local' ) {
    return asset( $path ) . '?' . env( 'APP_VERSION' );
  }
  $client = new \GuzzleHttp\Client();
  try {
    $client->get( $domain )->getStatusCode();
  } catch ( Exception $e ) {
    return asset( $path ) . '?' . env( 'APP_VERSION' );
  }
  if( $domain === 'http://localhost:3001/' ){
    if( strpos( $path, 'h-altrp.js') !== false){
      return $domain . 'src/bundle.h-altrp.js';

    }
    return $domain . 'src/bundle.front-app.js';
  }
  return $domain . 'src/bundle.js';
}

/**
 * @param string $setting_name
 * @param string $default
 * @return string
 */
function get_altrp_setting( $setting_name, $default = '' )
{
  /**
   * @var \App\Services\AltrpSettingsService $settings_service
   */
  $settings_service = app( 'App\Services\AltrpSettingsService' );
  return $settings_service->get_setting_value( $setting_name, $default );

}

function get_logo_url(){
  return json_decode( env( 'ALTRP_SETTING_ADMIN_LOGO' ), true )['url'];
}

/**
 * Обработка запроса, чтобы работали фильтры и сортировка
 * @param string $sql
 * @param array $bindings
 * @param array $sql_editor_params
 * @param ApiRequest $request
 * @return array
 */
function selectForSQLEditor( $sql, $bindings, $sql_editor_params, ApiRequest $request ){

  $_sql_order_by = '';
  $_sql_and_filters = '';
  $_sql_filters = '';
  $_sql_detail_filters = '';
  $_sql_detail_and_filters = '';

  if( $request->get( 'filters' ) ){
    $_filters = json_decode( $request->get( 'filters' ), true );

    if( strpos( $sql, 'ALTRP_FILTERS' ) !== false ){
      $_sql_filters = 'WHERE';
      foreach ( $_filters as $key => $value ) {
        $_sql_filters .= ' AND `' . $key . '` LIKE "%' . $value . '%" ';
      }
    }
    if( strpos( $sql, 'ALTRP_AND_FILTERS' ) !== false ) {
      $_sql_and_filters = '';
      foreach ( $_filters as $key => $value ) {
        $_sql_and_filters .= ' AND `' . $key . '` LIKE "%' . $value . '%" ';
      }
    }
      if( strpos( $sql, 'ALTRP_DETAIL_FILTERS' ) !== false ) {
          $_detail_filter_params = getDetailQueryValues($sql, 'ALTRP_DETAIL_FILTERS');

          $_detail_filter_conditionals = [];
          foreach ( $_filters as $key => $value ) {
              if(isset($_detail_filter_params[$key])) {
                  $_detail_filter_params[$key] = str_replace(".", "`.`", $_detail_filter_params[$key]);
                  $_detail_filter_conditionals[] = ' `' . $_detail_filter_params[$key] . '` LIKE "%' . $value . '%" ';
              }
          }

          if(count($_detail_filter_conditionals) > 0) {
              $_sql_detail_filters = " WHERE ";
          }

          $_sql_detail_filters .= implode(" AND ", $_detail_filter_conditionals);
      }
      if( strpos( $sql, 'ALTRP_DETAIL_AND_FILTERS' ) !== false ) {
          $_detail_and_filter_params = getDetailQueryValues($sql, 'ALTRP_DETAIL_AND_FILTERS');

          $_detail_and_filter_conditionals = [];
          foreach ( $_filters as $key => $value ) {
              if(isset($_detail_and_filter_params[$key])) {
                  $_detail_and_filter_params[$key] = str_replace(".", "`.`", $_detail_and_filter_params[$key]);
                  $_detail_and_filter_conditionals[] = ' `' . $_detail_and_filter_params[$key] . '` LIKE "%' . $value . '%" ';
              }
          }

          if(count($_detail_and_filter_conditionals) > 0) {
              $_sql_detail_and_filters = " AND ";
          }

          $_sql_detail_and_filters .= implode(" AND ", $_detail_and_filter_conditionals);
      }
  }

  if( $request->get( 'order' ) && $request->get( 'order_by' ) ){

      $_sql_order_by = ' ORDER BY `' . $request->get( 'order_by') . '`' . ( $request->get( 'order' ) === 'DESC' ? ' DESC' : ' ');

    if( strpos( $sql, 'ALTRP_DETAIL_FILTERS' ) !== false ) {
        $_detail_filter_params = getDetailQueryValues($sql, 'ALTRP_DETAIL_FILTERS');

        if(isset($_detail_filter_params[$request->get( 'order_by')])) {
            $_sql_order_by = ' ORDER BY ' . $_detail_filter_params[$request->get( 'order_by')] . '' . ( $request->get( 'order' ) === 'DESC' ? ' DESC' : ' ');
        }
    }
    else if(strpos( $sql, 'ALTRP_DETAIL_AND_FILTERS' ) !== false) {
        $_detail_and_filter_params = getDetailQueryValues($sql, 'ALTRP_DETAIL_AND_FILTERS');

        if(isset($_detail_and_filter_params[$request->get( 'order_by')])) {
            $_sql_order_by = ' ORDER BY ' . $_detail_and_filter_params[$request->get( 'order_by')] . '' . ( $request->get( 'order' ) === 'DESC' ? ' DESC' : ' ');
        }
    }

    $sql .= $_sql_order_by;
  }



  $sql = str_replace( 'ALTRP_FILTERS', $_sql_filters, $sql ) ;

  $sql = str_replace( 'ALTRP_AND_FILTERS', $_sql_and_filters, $sql ) ;

  $sql = preg_replace( "/'?(ALTRP_DETAIL_FILTERS)(:[a-z0-9_,.:]+)?'?/", $_sql_detail_filters, $sql ) ;

  $sql = preg_replace( "/'?(ALTRP_DETAIL_AND_FILTERS)(:[a-z0-9_,.:]+)?'?/", $_sql_detail_and_filters, $sql ) ;

  return [ 'data' => DB::select( $sql, $bindings ) ];
}

function getDetailQueryValues($query, $filter) {

    $filter .= ":";
    $_detail_filter = Str::after($query, $filter);


    $_detail_filter = Str::before($_detail_filter, ' ');

    $_detail_filter_array = explode(':',$_detail_filter);
    $_detail_filter_params = [];

    foreach ($_detail_filter_array as $param) {
        $line = explode(',',$param);
        $_detail_filter_params[$line[0]] = $line[1];
    }

    return $_detail_filter_params;
}

function getFilterValues() {

}

/**
 * Вернет true, если пользователь админ, false - в остальных случаях
 * @param bool $for_css
 * @return boolean
 */
function isAdmin( bool $for_css = true){
  /**
   * @var User $user
   */
  $user = auth()->user();
  if( ! auth()->user() ){
    return false;
  }
  if( $for_css && array_search( get_current_device(), ['DEFAULT_BREAKPOINT', 'Desktop'] ) === false ){
    return false;
  }
  return $user->hasRole( 'admin' );
}

function getCurrentEnv(){
    return App\Helpers\Classes\CurrentEnvironment::getInstance();
}

function getFavicons() {
    if(env("ALTRP_CUSTOM_ICON")) {
        $icons = [];
        $path = Storage::url("media/favicons");
        //ico
        array_push($icons, "<link type='image/x-icon' rel='shortcut icon' href='$path/favicon.ico'>");

        //png
        $sizes = [16, 32, 96, 120, 192];
        foreach ($sizes as $size) {
            $href = $path ."/" .$size ."_favicon.png";
            $size_png = $size ."x" .$size;
            array_push($icons, "<link type='image/png' sizes='$size_png' rel='icon' href='$href'>");
        }

        //apple png
        $sizes_apple = [57, 60, 72, 76, 114, 120, 144, 152, 180];

        foreach ($sizes_apple as $size) {
            $href = $path ."/" .$size ."_favicon.png";
            $size_png = $size ."x" .$size;
            array_push($icons, "<link type='image/png' sizes='$size_png' rel='apple-touch-icon' href='$href'>");
        }

        $links = "";

        foreach ($icons as $icon) {
            $links = $links . $icon;
        }

        return $links;
    }
}
/**
 * Заменить динамические переменные на данные из data (CurrentEnvironment)
 * @param string $template
 * @param mixed $data
 * @return string|string[]
 */
function setDynamicData($template, $data)
{
    try {
        if ($template && $data) {
            preg_match_all("#\{\{(?<path>(.*?)+)\}\}#", $template, $matches);
            $matches = $matches['path'];

            foreach ($matches as $path) {
                $item = data_get($data, $path);
                $template = str_replace("{{{$path}}}", $item, $template);
            }
        }
    } catch (\Exception $e){
        Log::info($e->getMessage());
    }
    return $template;
}

/**
 * Сохранение кэша страниц
 * @param string $html
 * @return boolean
 * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
 */
function saveCache( $html, $page_id ) {

  if ( ! $html ) {
    return false;
  }
  $url = $_SERVER['REQUEST_URI'];

  // $html = minificationHTML($html);
  // $html = minifyHTML($html);
  $hash = md5($url . $html);

  $cachePath = storage_path() . '/framework/cache/pages';

  File::ensureDirectoryExists( $cachePath, 0775);

  if ( ! File::exists($cachePath . '/relations.json') ) {
    File::put($cachePath . '/relations.json', '{}');
  }

  $relationsJson = File::get($cachePath . '/relations.json');
  $relations = json_decode($relationsJson, true);

  if ( ! is_array($relations) ) {
    File::put($cachePath . '/relations.json', '{}');
    $relations = [];
  }

  $newRelation = [
    'hash' => $hash,
    "url" => $url,
    "page_id" => $page_id
  ];

  $key = false;
  $current_device = get_current_device();
  if( ! isset($relations[$current_device]) || ! is_array( $relations[$current_device] ) ){
    $relations[$current_device] = [];
  }
  foreach ($relations[$current_device] as $relation) {
    if ($relation['hash'] === $hash && $page_id === $relation['page_id']) {
      $key = true;
      break;
    }
  }

  if (!$key) {
    array_push($relations[get_current_device()], $newRelation);
  }

  $relations = json_encode($relations);

  File::put($cachePath . '/relations.json', $relations);
  File::put($cachePath . '/' . $hash, $html);

  return true;
}


function minifyHTML($html) {

  // Settings
  return $html;
  $compress_css = true;
  $compress_js = true;
  $remove_comments = true;

  $pattern = '/<(?<script>script).*?<\/script\s*>|<(?<style>style).*?<\/style\s*>|<!(?<comment>--).*?-->|<(?<tag>[\/\w.:-]*)(?:".*?"|\'.*?\'|[^\'">]+)*>|(?<text>((<[^!\/\w.:-])?[^<]*)+)|/si';
  preg_match_all($pattern, $html, $matches, PREG_SET_ORDER);

  $overriding = false;
  $raw_tag = false;

  // Variable reused for output
  $html = '';

  foreach ($matches as $token) {
    $tag = (isset($token['tag'])) ? strtolower($token['tag']) : null;

    $content = $token[0];

    if (is_null($tag)) {
      if ( !empty($token['script']) ) {
        $strip = $compress_js;
      }
      else if ( !empty($token['style']) ) {
        $strip = $compress_css;
      }
      else if ($content == '<!--wp-html-compression no compression-->') {
        $overriding = !$overriding;

        // Don't print the comment
        continue;
      }
      else if ($remove_comments) {
        if (!$overriding && $raw_tag != 'textarea') {
          // Remove any HTML comments, except MSIE conditional comments
          $content = preg_replace('/<!--(?!\s*(?:\[if [^\]]+]|<!|>))(?:(?!-->).)*-->/s', '', $content);
        }
      }
    }
    else {
      if ($tag == 'pre' || $tag == 'textarea') {
        $raw_tag = $tag;
      }
      else if ($tag == '/pre' || $tag == '/textarea') {
        $raw_tag = false;
      }
      else {
        if ($raw_tag || $overriding) {
          $strip = false;
        }
        else {
          $strip = true;

          // Remove any empty attributes, except:
          // action, alt, content, src
          $content = preg_replace('/(\s+)(\w++(?<!\baction|\balt|\bcontent|\bsrc)="")/', '$1', $content);

          // Remove any space before the end of self-closing XHTML tags
          // JavaScript excluded
          $content = str_replace(' />', '/>', $content);
        }
      }
    }

    if ($strip) {
      $content = removeWhiteSpace($content);
    }

    $html .= $content;
  }

  return $html;
}

function removeWhiteSpace($str) {
  $str = str_replace("\t", ' ', $str);
  $str = str_replace("\n",  '', $str);
  $str = str_replace("\r",  '', $str);

  while (stristr($str, '  ')) {
    $str = str_replace('  ', ' ', $str);
  }

  return $str;
}

function saveTemplateCache( $json, $template_id ) {

  if (!$json || !$template_id) {
    return false;
  }

  $hash = md5($json);

  $cachePath = storage_path() . '/framework/cache/templates';

  File::ensureDirectoryExists( $cachePath, 0775);

  if ( ! File::exists($cachePath . '/relations.json') ) {
    File::put($cachePath . '/relations.json', '{}');
  }

  $relationsJson = File::get($cachePath . '/relations.json');
  $relations = json_decode($relationsJson, true);

  if ( ! is_array($relations) ) {
    File::put($cachePath . '/relations.json', '{}');
    $relations = [];
  }

  $newRelation = [
    'hash' => $hash,
    'template_id' => $template_id
  ];

  $key = false;
  foreach ($relations as $relation) {
    if ($relation['hash'] === $hash) {
      $key = true;
      break;
    }
  }

  if (!$key) {
    array_push($relations, $newRelation);
  }

  $relations = json_encode($relations);

  File::put($cachePath . '/relations.json', $relations);
  File::put($cachePath . '/' . $hash, $json);

  return true;
}

function clearAllCache() {
  $cachePath = storage_path() . '/framework/cache/pages';
  if( File::exists( storage_path() . '/framework/cache/pages' ) ){
    File::cleanDirectory( storage_path() . '/framework/cache/pages' );
    File::put($cachePath . '/relations.json', '{}');
  }
  $pages = Page::all();
  foreach($pages as $page ){
    Cache::delete( 'areas_' . $page->id );
  }

  return true;
}

/**
 * @param $page_id
 * @return bool
 * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
 * @throws \Psr\SimpleCache\InvalidArgumentException
 */
function clearPageCache( $page_id ) {

  $cachePath = storage_path() . '/framework/cache/pages';

  if ( !File::exists($cachePath . '/relations.json') ) {
    File::put($cachePath . '/relations.json', '{}');
  }

  $relationsJson = File::get($cachePath . '/relations.json');
  $relations = json_decode($relationsJson, true);

  if ( ! is_array($relations) ) {
    File::put($cachePath . '/relations.json', '{}');
    $relations = [];
  }
  foreach ( $relations as $index => $device_relations ) {
    foreach ($device_relations as $key => $relation) {
      if (isset($relation['page_id']) && $relation['page_id'] == $page_id) {
        if ( File::exists($cachePath . '/' . $relation['hash']) ) {
          File::delete($cachePath . '/' . $relation['hash']);
        }

        unset($relations[$index][$key]);
      }
    }
  }

  $relations = json_encode($relations);
  File::put($cachePath . '/relations.json', $relations);
  Cache::delete( 'areas_' . $page_id );

  return true;
}


/**
 * Минификация HTML
 * @param string $html
 * @return null|string|string[]
 */
function minificationHTML($input) {
    if(trim($input) === "") return $input;
    // Remove extra white-space(s) between HTML attribute(s)
    $input = preg_replace_callback('#<([^\/\s<>!]+)(?:\s+([^<>]*?)\s*|\s*)(\/?)>#s', function($matches) {
        return '<' . $matches[1] . preg_replace('#([^\s=]+)(\=([\'"]?)(.*?)\3)?(\s+|$)#s', ' $1$2', $matches[2]) . $matches[3] . '>';
    }, str_replace("\r", "", $input));
    // Minify inline CSS declaration(s)
    if(strpos($input, ' style=') !== false) {
        $input = preg_replace_callback('#<([^<]+?)\s+style=([\'"])(.*?)\2(?=[\/\s>])#s', function($matches) {
            return '<' . $matches[1] . ' style=' . $matches[2] . minify_css($matches[3]) . $matches[2];
        }, $input);
    }
    if(strpos($input, '</style>') !== false) {
      $input = preg_replace_callback('#<style(.*?)>(.*?)</style>#is', function($matches) {
        return '<style' . $matches[1] .'>'. minify_css($matches[2]) . '</style>';
      }, $input);
    }
    if(strpos($input, '</script>') !== false) {
      $input = preg_replace_callback('#<script(.*?)>(.*?)</script>#is', function($matches) {
        return '<script' . $matches[1] .'>'. minify_js($matches[2]) . '</script>';
      }, $input);
    }

    return preg_replace(
        array(
            // t = text
            // o = tag open
            // c = tag close
            // Keep important white-space(s) after self-closing HTML tag(s)
            '#<(img|input)(>| .*?>)#s',
            // Remove a line break and two or more white-space(s) between tag(s)
            '#(<!--.*?-->)|(>)(?:\n*|\s{2,})(<)|^\s*|\s*$#s',
            '#(<!--.*?-->)|(?<!\>)\s+(<\/.*?>)|(<[^\/]*?>)\s+(?!\<)#s', // t+c || o+t
            '#(<!--.*?-->)|(<[^\/]*?>)\s+(<[^\/]*?>)|(<\/.*?>)\s+(<\/.*?>)#s', // o+o || c+c
            '#(<!--.*?-->)|(<\/.*?>)\s+(\s)(?!\<)|(?<!\>)\s+(\s)(<[^\/]*?\/?>)|(<[^\/]*?\/?>)\s+(\s)(?!\<)#s', // c+t || t+o || o+t -- separated by long white-space(s)
            '#(<!--.*?-->)|(<[^\/]*?>)\s+(<\/.*?>)#s', // empty tag
            '#<(img|input)(>| .*?>)<\/\1>#s', // reset previous fix
            '#(&nbsp;)&nbsp;(?![<\s])#', // clean up ...
            '#(?<=\>)(&nbsp;)(?=\<)#', // --ibid
            // Remove HTML comment(s) except IE comment(s)
            '#\s*<!--(?!\[if\s).*?-->\s*|(?<!\>)\n+(?=\<[^!])#s'
        ),
        array(
            '<$1$2</$1>',
            '$1$2$3',
            '$1$2$3',
            '$1$2$3$4$5',
            '$1$2$3$4$5$6$7',
            '$1$2$3',
            '<$1$2',
            '$1 ',
            '$1',
            ""
        ),
    $input);
}

// CSS Minifier
function minify_css($input) {
    if(trim($input) === "") return $input;
    return preg_replace(
        array(
            // Remove comment(s)
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)|^\s*|\s*$#s',
            // Remove unused white-space(s)
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~]|\s(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
            // Replace `0(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)` with `0`
            '#(?<=[\s:])(0)(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)#si',
            // Replace `:0 0 0 0` with `:0`
            '#:(0\s+0|0\s+0\s+0\s+0)(?=[;\}]|\!important)#i',
            // Replace `background-position:0` with `background-position:0 0`
            '#(background-position):0(?=[;\}])#si',
            // Replace `0.6` with `.6`, but only when preceded by `:`, `,`, `-` or a white-space
            '#(?<=[\s:,\-])0+\.(\d+)#s',
            // Minify string value
            '#(\/\*(?>.*?\*\/))|(?<!content\:)([\'"])([a-z_][a-z0-9\-_]*?)\2(?=[\s\{\}\];,])#si',
            '#(\/\*(?>.*?\*\/))|(\burl\()([\'"])([^\s]+?)\3(\))#si',
            // Minify HEX color code
            '#(?<=[\s:,\-]\#)([a-f0-6]+)\1([a-f0-6]+)\2([a-f0-6]+)\3#i',
            // Replace `(border|outline):none` with `(border|outline):0`
            '#(?<=[\{;])(border|outline):none(?=[;\}\!])#',
            // Remove empty selector(s)
            '#(\/\*(?>.*?\*\/))|(^|[\{\}])(?:[^\s\{\}]+)\{\}#s'
        ),
        array(
            '$1',
            '$1$2$3$4$5$6$7',
            '$1',
            ':0',
            '$1:0 0',
            '.$1',
            '$1$3',
            '$1$2$4$5',
            '$1$2$3',
            '$1:0',
            '$1$2'
        ),
    $input);
}

// JavaScript Minifier
function minify_js($input) {
    if(trim($input) === "") return $input;
    return preg_replace(
        array(
            // Remove comment(s)
            '#\s*("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')\s*|\s*\/\*(?!\!|@cc_on)(?>[\s\S]*?\*\/)\s*|\s*(?<![\:\=])\/\/.*(?=[\n\r]|$)|^\s*|\s*$#',
            // Remove white-space(s) outside the string and regex
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/)|\/(?!\/)[^\n\r]*?\/(?=[\s.,;]|[gimuy]|$))|\s*([!%&*\(\)\-=+\[\]\{\}|;:,.<>?\/])\s*#s',
            // Remove the last semicolon
            '#;+\}#',
            // Minify object attribute(s) except JSON attribute(s). From `{'foo':'bar'}` to `{foo:'bar'}`
            '#([\{,])([\'])(\d+|[a-z_][a-z0-9_]*)\2(?=\:)#i',
            // --ibid. From `foo['bar']` to `foo.bar`
            '#([a-z0-9_\)\]])\[([\'"])([a-z_][a-z0-9_]*)\2\]#i'
        ),
        array(
            '$1',
            '$1$2',
            '}',
            '$1$3',
            '$1.$3'
        ),
    $input);
}


/**
 * @param $path
 * @param int $count
 * @return string
 */
if( ! function_exists( 'getMainColor' ) ){
  function getMainColor( $path, $count = 1 ){

    try{
      $palette = Palette::fromFilename($path);
      $extractor = new ColorExtractor($palette);
      $colors = $extractor->extract($count);
      $color = $colors[0];
      $color = Color::fromIntToHex($color);
      return $color;
    } catch (\Exception $e){
      Log::debug($e);
      return '';
    }

  }
}
/**
 * @param array $areas
 * @param boolean $only_react_elements
 * @return array
 */
function extractElementsNames( array $areas = [], bool $only_react_elements = false){
  $elementNames = [];

  foreach ( $areas as $area ) {

    if( ! isset( $area['template']['data'] ) ){
      continue;
    }

    $data = $area['template']['data'];
    _extractElementsNames( $data, $elementNames, $only_react_elements );

  }
  $elementNames = array_unique( $elementNames );
  $elementNames = array_values( $elementNames );
  return $elementNames;
}

/**
 * @param string $template_id
 * @param array $elementNames
 */
function extractElementsNamesFromTemplate( $template_id, &$elementNames ){
  global $altrp_settings;
  if( Str::isUuid( $template_id ) ){
    $template = Template::where( 'guid', $template_id )->first();
  } else {
    $template = Template::find( $template_id );
  }
  if( ! $template ){
    return;
  }
  data_set($altrp_settings, 'templates_data.' . $template_id,  $template->toArray());

  $data = json_decode( $template->data, true );
  _extractElementsNames( $data, $elementNames, false );
}

/**
 * @param array $element
 * @param array $elementNames
 * @param boolean $only_react_elements
 */
function _extractElementsNames( $element,  &$elementNames, $only_react_elements ){
  $plugins_widget_list = env( Plugin::ALTRP_PLUGINS_WIDGET_LIST, '' );
  if( ! $plugins_widget_list ){
    $plugins_widget_list = [];
  } else {
    $plugins_widget_list = explode( ',', $plugins_widget_list );
  }
  $DEFAULT_REACT_ELEMENTS = array_merge($plugins_widget_list, [
    'action-trigger',
    'input',
    'input-select',
    'input-date-range',
    'input-select-tree',
    'input-multi-select',
    'input-select2',
    'input-radio',
    'input-checkbox',
    'input-wysiwyg',
    'input-textarea',
    'input-slider',
    'input-range-slider',
    'input-image-select',
    'input-accept',
    'input-text',
    'input-text-common',
    'input-text-autocomplete',
    'input-password',
    'input-number',
    'input-tel',
    'input-email',
    'input-date',
    'input-hidden',
    'input-file',
    'input-gallery',
    'input-crop-image',
    'posts',
    'breadcrumbs',
    'carousel',
    'map',
    'text',
    'map_builder',
    'location',
    'menu',
    'pie-diagram',
    'line-diagram',
    'bar-diagram',
    'nav',
    'breadcrumbs',
    'dashboards',
    'tour',
    'icon',
    'export',
    'template',
    'dropbar',
    'gallery',
    'table',
    'tabs',
    'heading-type-animating',
    'scheduler',
    'tree',
    'list',
    'stars',
    'progress-bar',
    'tournament',//todo: move to plugin
    'input-pagination'
  ]);
  if( ! is_array( $elementNames ) ){
    $elementNames = [];
  }
  if( ! isset( $element['name'] ) || ! is_string( $element['name'] ) ){
    return;
  }

//  if( isset( $element['lazySection'] ) && $element['lazySection'] ){
//    return;
//  }

//echo '<pre style="padding-left: 200px;">';
//var_dump( array_search( $element['name'], $elementNames ) === false
//  && ! ( $only_react_elements
//    && (! data_get( $element, 'settings.react_element' ) )
//    || array_search( $DEFAULT_REACT_ELEMENTS, $elementNames ) !== false )  );
//echo '</pre>';

  if( ! ( $only_react_elements
      && ! ( data_get( $element, 'settings.react_element' )
        || array_search(  $element['name'], $DEFAULT_REACT_ELEMENTS ) !== false ) ) ){
    $elementNames[] = $element['name'];
    if($element['name'] === 'section' || $element['name'] === 'column'){

      recurseMapElements( $element, function( $element ) use( &$elementNames ){

        if( $element['name'] && array_search(  $element['name'], $elementNames ) === false ) {
          $elementNames[] = $element['name'];
        }
      } );
    }
  }
  if( isset( $element['children'] ) && is_array( $element['children'] ) ){
    foreach ( $element['children'] as $child ) {
      _extractElementsNames( $child, $elementNames, $only_react_elements );
    }
  }
  if( $element['name'] === 'template' && data_get( $element, 'settings.template' ) ){
    extractElementsNamesFromTemplate( data_get( $element, 'settings.template' ), $elementNames );
  }
  if( $element['name'] === 'posts' && data_get( $element, 'settings.posts_card_template' ) ){
    extractElementsNamesFromTemplate( data_get( $element, 'settings.posts_card_template' ), $elementNames );
  }
  if( $element['name'] === 'posts' && data_get( $element, 'settings.posts_card_hover_template' ) ){
    extractElementsNamesFromTemplate( data_get( $element, 'settings.posts_card_hover_template' ), $elementNames );
  }
  if( $element['name'] === 'table'
    && data_get( $element, 'settings.row_expand' )
    && data_get( $element, 'settings.card_template' ) ){
    extractElementsNamesFromTemplate( data_get( $element, 'settings.card_template' ), $elementNames );
  }
  if( $element['name'] === 'dropbar'
    && data_get( $element, 'settings.template_dropbar_section' ) ){
    extractElementsNamesFromTemplate( data_get( $element, 'settings.template_dropbar_section' ), $elementNames );
  }
  if( $element['name'] === 'table'
    && data_get( $element, 'settings.tables_columns' ) ){
    $columns = data_get( $element, 'settings.tables_columns', [] );
    foreach ($columns as $column) {
      if(data_get($column, 'column_template')){
        extractElementsNamesFromTemplate( data_get($column, 'column_template'), $elementNames );
      }
    }
  }
  if( $element['name'] === 'tabs'
    && data_get( $element, 'settings.items_tabs' ) ){
    $tabs = data_get( $element, 'settings.items_tabs', [] );
    foreach ($tabs as $tab) {
      if(data_get($tab, 'card_template')){
        extractElementsNamesFromTemplate( data_get($tab, 'card_template'), $elementNames );
      }
    }
  }
  if( $element['name'] === 'table'
    && data_get( $element, 'settings.row_expand' )
    && data_get( $element, 'settings.tables_columns' )
    && is_array( data_get( $element, 'settings.tables_columns' ) ) ){
    $columns = data_get( $element, 'settings.tables_columns' );
    foreach ( $columns as $column ) {
      if( data_get( $column, 'column_template') ){
        extractElementsNamesFromTemplate( data_get( $column, 'column_template'), $elementNames );
      }
    }
  }
}

/**
 * Получить данные текущего пользователя, либо [is_guest => true] если не залогинен
 * @return array
 */
function getCurrentUser(): array
{
  $user = Auth::user();
  if ( ! $user ) {
    return ['is_guest' => true];
  }
  $user = $user->toArray();
  $user['roles'] = Auth::user()->roles->map(function (Role $role) {
    $_role = $role->toArray();
    $_role['permissions'] = $role->permissions;
    return $_role;
  });
  $user['local_storage'] = json_decode($user['local_storage'], 255);
  $user['permissions'] = Auth::user()->permissions;
  return $user;
}

/**
 * Заменяет в тексте конструкции типа {{path_to_data...}} на данные
 * @param string $content
 * @return string
 */
function replaceContentWithData( $content ){
//  if( ! $modelContext ){
//    return $content;
//  }
  global $altrp_env;
  global $altrp_current_page;
  if( ! isset( $altrp_env['altrpuser'] ) ){
    data_set( $altrp_env, 'altrpuser', getCurrentUser() );
  }
  if( ! isset( $altrp_env['altrppage'] ) ){
    data_set( $altrp_env, 'altrppage.url', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" );
    data_set( $altrp_env, 'altrppage.title', data_get( $altrp_current_page, 'title', '' ) );
  }
//  dd($altrp_env);
  is_string( $content ) ? preg_match_all( '/{{([\s\S]+?)(?=}})/', $content, $path ) : null;
  if( ! isset( $path ) || ! isset( $path[1] )){
    return $content;
  }

  foreach ( $path[1] as $item ) {
    $value = data_get( $altrp_env, $item, '');

    $content = str_replace( '{{' . $item . '}}', $value, $content );
  }
  return $content;
}
/**
 * Convert array to string
 * @param $data
 * @return string
 */
function array2string($data) {
  $log_a = "[";
  try {
    foreach ($data as $key => $value) {
      if (!is_numeric($key)) $key = "'{$key}'";
      if (is_array($value))
        $log_a .= $key." => " . array2string($value) . ",";
      elseif (is_object($value))
        $log_a .= $key." => " . array2string(json_encode(json_decode($value))) . ",";
      elseif (is_bool($value))
        $log_a .= $key." => " . ($value ? 'true' : 'false') . ",";
      elseif (is_string($value))
        $log_a .= $key." => '" . $value . "',";
      elseif (is_null($value))
        $log_a .= $key." => null,";
      else
        $log_a .= $key." => " . $value . ",";
    }
  } catch (\Exception $exception) {
    $data = json_decode($data);
    if (is_array($data))
      array2string($data);
  }

  $log_a = trim($log_a, ",");
  return $log_a . ']';
}

/**
 * @param int $page_id
 * @param array $params
 * @param string $params_string
 * @return [] | null
 */
function getDataSources( $page_id, $params = array(), $params_string = '' ){
  global $altrp_env;
  $altrp_env['altrpdata'] = [];
  $datasources = [];

  $page = Page::find( $page_id );
  if( ! $page ){
    return $datasources;
  }

//  dd($page->data_sources->get(0)->model->altrp_controller->toArray());
  try{
    if( ! $page->data_sources ){
      return $datasources;
    }
    $default_params = [];
    if( $params_string ){
      foreach ( explode( ',', $params_string ) as $idx => $item) {
        $item = trim( $item );
        $item = str_replace( '$', '', $item );
        $default_params[$item] = $params[$idx];
      }
    }
    if( count( $default_params ) ){
      $altrp_env = array_merge( $default_params, $altrp_env );
    }
    $page_data_sources = $page->page_data_sources->filter( function ( $ds ){
      return $ds->server_side;
    } );
    $page_data_sources = $page_data_sources->sortBy( 'priority' );

    foreach ( $page_data_sources as $ds ) {
      if( ! $ds->source || ! $ds->source->model || ! $ds->alias ){
        continue;
      }
      $request_parameters = [];
      if( $ds->parameters ){
        $_request_parameters = json_decode( replaceContentWithData( $ds->parameters ), true );

        if( ! $_request_parameters ){
          $_request_parameters = explode( "\n", replaceContentWithData( $ds->parameters ) );
          $_request_parameters = array_map( function( $item ){
            $item = explode( '|', $item );
            $item = array_map( function( $i ){
              return trim( $i );
            }, $item );
            if( ! isset( $item[1] ) ){
              $item[1] = $item[0];
            }
            return [
              'paramName' => $item[0],
              'paramValue' => $item[1],
            ];
          }, $_request_parameters );
        }
        foreach ( $_request_parameters as $request_parameter ) {
          $request_parameters[$request_parameter['paramName']] = replaceContentWithData( $request_parameter['paramValue'] );
        }
      }

      $classname = '\App\Http\Controllers\AltrpControllers\\' . $ds->source->model->name . 'Controller' ;
      $controllerInstance = new $classname;

      $request = new ApiRequest( $request_parameters );

      if ($ds->source->type == 'get') $method = 'index';
      elseif ($ds->source->type == 'filters') $method = 'getIndexedColumnsValueWithCount';
      elseif ($ds->source->type == 'add') $method = 'store';
      elseif ($ds->source->type == 'update_column') $method = 'updateColumn';
      elseif ($ds->source->type == 'delete') $method = 'destroy';
      elseif ($ds->source->type == 'customizer') {
        $method = $ds->source->name;
      }
      else {
        $method = $ds->source->type;
      }
      $result = call_user_func( [$controllerInstance, $method], $request, ...explode( ',', $params_string ) );
      if( $result ){
        $result = $result->getContent();
        $result = json_decode( $result, true );
        $datasources[$ds->alias] = $result;
        if( isset( $result['data'] ) ){
          $result = array_merge( $result, $result['data'] );
          unset( $result['data'] );
        }
        data_set( $altrp_env['altrpdata'], $ds->alias, $result );
      }

    }
  } catch( \Exception $e ){
    logger()->error( $e->getMessage() . "\n" .
       $e->getTraceAsString()
      . "\n" );
    return $datasources;
  }
  return $datasources;
}
function uploadMedia($file)
{
    $media = new Media();
    $media->media_type = \Illuminate\Support\Facades\File::mimeType($file);
    $media->author = Auth::id() ?? null;
    $media->type = getTypeForFile($file);
    File::ensureDirectoryExists( 'app/media/' .  date("Y") . '/' .  date("m" ), 0775 );
    $media->filename = \Illuminate\Support\Facades\Storage::disk('public')->putFileAs(
            'media/' .  date("Y") . '/' .  date("m" ),
            $file,
            \Illuminate\Support\Facades\File::name($file) .
            '.' . \Illuminate\Support\Facades\File::extension($file)
        );

    $path = Storage::path( 'public/' . $media->filename );
    $ext = pathinfo( $path, PATHINFO_EXTENSION );
    if( $ext === 'svg' ){
        $svg = file_get_contents( $path );
        $svg = simplexml_load_string( $svg );
        $media->width = ( string ) data_get( $svg->attributes(), 'width', 150 );
        $media->height = ( string ) data_get( $svg->attributes(), 'height', 150 );
    } else {
        $size = getimagesize( $path );
        $media->width = data_get( $size, '0', 0 );
        $media->height = data_get( $size, '1', 0 );
    }
    $media->url =  Storage::url( $media->filename );
    $media->save();
    return $media;
}

function getTypeForFile( $file ){
    $extension_loaded = \Illuminate\Support\Facades\File::extension($file);
    $type = '';
    $file_types = getFileTypes();
    foreach ( $file_types as $file_type ){
        if( ( ! $type ) &&  array_search($extension_loaded, $file_type['extensions'] ) !== false ){
            $type = $file_type['name'];
        }
    }
    if( ! $type ){
        $type = 'other';
    }
    return $type;
}

function getFileTypes(){
    $file_types = file_get_contents( base_path( 'config/file-types.json' ) );
    $file_types = json_decode( $file_types, true);
    return $file_types;
}
const ACTIONS_NAMES = [
  'actions',
  'focus_actions',
  'change_actions',
  'page_load_actions',
];
const ACTIONS_COMPONENTS = [
  'email',
  'toggle_popup',
];

 function dedup($array, $key)
 {
  $temp_array = array();
      $i = 0;
      $key_array = array();

      foreach($array as $val) {
          if (!in_array($val[$key], $key_array)) {
              $key_array[$i] = $val[$key];
              $temp_array[$i] = $val;
          }
          $i++;
      }
      return $temp_array;
 };

/**
 * Получить настройки для фронтенда h-altrp
 * @return array['action_components']=array - компоненты, которые нужно загрузить для действий ('mail', 'popups')
 *
 *
 * ]
 */
function getPageSettings( $page_id ): array
{

  global $altrp_settings;
  $settings = $altrp_settings;
  $settings['action_components'] = [];
  $settings['libsToLoad'] = [];
  $settings['page_params'] = $_GET;
  $settings["altrpMenus"] = [];

  if( ! $page_id ){
    return $settings;
  }

  $areas = Page::get_areas_for_page( $page_id );
  $json_areas = json_encode( $areas );
  if( strpos( $json_areas, 'altrptime' ) !== false){
    $settings['libsToLoad'][] = 'moment';
  }

  $action_types = [];
  foreach ( $areas as $area ) {
    $templates = data_get( $area, 'templates' );
    if( ! $templates ){
      $templates = [data_get( $area, 'template' )];
    }
    if( empty( $templates ) ){
      continue;
    }
    foreach ( $templates as $template ) {

      $root_element = data_get( $template, 'data');

      if ( $root_element ) {

        recurseMapElements( $root_element, function ( $element ) use ( &$settings, &$action_types ) {

          if($element["name"] === "menu") {
            $guid = data_get($element, "settings.menu");
            try {
              $menu = Menu::where("guid", $guid)->get()[0];
              if($menu) {
                $settings["altrpMenus"][] = $menu;
              }
            } catch(Exception $e) {
            }
          }

          if ( data_get( $element, 'settings.tooltip_enable' ) && array_search( "blueprint", $settings['libsToLoad'] ) === false ) {
            $settings['libsToLoad'][] = "blueprint";
          }

          if ( ! data_get( $element, 'settings.react_element' ) ) {
            return;
          }

          $actions = [];
          foreach ( ACTIONS_NAMES as $ACTIONS_NAME ) {
            $actions = array_merge( $actions, data_get( $element, 'settings.' . $ACTIONS_NAME, [] ) );
          }
          foreach ( $actions as $action ) {
            $action_type = data_get( $action, 'type' );
            if ( array_search( $action_type, $action_types ) === false ) {
              $action_types[] = $action_type;
            }
          }
        } );
      }
    }

//    if( is_array( data_get( $area, 'templates') ) ){
//      $settings['libsToLoad'][] = 'moment';
//    }
  }

  foreach ( ACTIONS_COMPONENTS as $ACTIONS_COMPONENT ) {
    if( array_search( $ACTIONS_COMPONENT, $action_types ) !== false ){
      $settings['action_components'][] = $ACTIONS_COMPONENT;
    }
  }
  $page = Page::find( $page_id );
  try{
    if( $page && ! $page->allowedForUser() ){
      $url = $page->redirect ? $page->redirect : '/';
      $settings['redirect'] = $url;
    }
  } catch( Exception $e ){

  }

 $settings["altrpMenus"] = dedup($settings["altrpMenus"], "id");

 return $settings;
}

function recurseMapElements( $element, $callback ){
  $callback($element);
  if( isset( $element['children'] ) && is_array( $element['children'] ) ){
    foreach ( $element['children'] as $idx => $child ) {
      recurseMapElements( $element['children'][$idx], $callback );
    }
  }
}

/**
 * @param array $element
 * @param $callback
 * @return array mixed
 */
function recurseMutateMapElements( array $element, $callback ): array
{
  if( isset( $element['children'] ) && is_array( $element['children'] ) ){
    foreach ( $element['children'] as $idx => $child ) {
      $element['children'][$idx] = recurseMutateMapElements( $element['children'][$idx], $callback );
    }
  }
  $element = $callback( $element );
  return $element;
}

/**
 * загрузим шрифты
 * @param string | [] $page_areas
 * @return string
 */
function loadFonts( $page_areas ){
  $out = '';
  if( is_string($page_areas) ){
    $page_areas = json_decode( $page_areas, true);
  }
  $fonts = [];
  foreach ( $page_areas as $area ) {
    $templates = data_get( $area, 'templates' );
    if( ! $templates ){
      $templates = [data_get( $area, 'template' )];
    }
    foreach ( $templates as $template ) {
      $root_element = data_get( $template, 'data' );
      recurseMapElements( $root_element, function( $element ) use( &$fonts ) {
        $_fonts = data_get( $element, 'settings.__altrpFonts__' );
        if( is_array( $_fonts ) ){
          foreach ( $_fonts as $font ) {
            if( is_array( $font ) ){
              $font = $font[array_key_first( $font )];
            }
            $fonts[] = $font;
          }
        }
      } );
    }

  }
  $fonts = array_unique( $fonts );
  $fonts = array_filter( $fonts, function( $font ){
    return $font !== 'Arial';//todo: написать для всех системных шрифтов список вести в json?
  } );
  foreach ( $fonts as $font ){
    $font = str_replace( ' ', '+', $font);
    $font .= ":100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic";
    $fontUrl =
      "https://fonts.googleapis.com/css?family=" . $font . "&subset=cyrillic";
//    $fontUrl = urlencode( $fontUrl );
    $out .= '<link rel="stylesheet"  href="'. $fontUrl .'" />';
  }
  return $out;
}

function unsetAltrpIndex($array){
  if (is_array($array)) {
    $array = collect($array)->map(function ($item) {
        if (isset($item['altrpIndex'])) unset($item['altrpIndex']);
        return $item;
      })
      ->toArray();
   }
   return $array;
}

/**
 * @param $value
 * @param $words
 * @param bool $show
 * @return string
 */

function num_word($value, $words, $show = true)
{
  $num = $value % 100;
  if ($num > 19) {
    $num = $num % 10;
  }

  $out = ($show) ?  $value . ' ' : '';
  switch ($num) {
    case 1:  $out .= $words[0]; break;
    case 2:
    case 3:
    case 4:  $out .= $words[1]; break;
    default: $out .= $words[2]; break;
  }

  return $out;
}


global $__customizer_data__;
$__customizer_data__ = [
  'context' => [],
];
/**
 * @param string $path
 * @param mixed $default
 * @return mixed
 */
function get_customizer_data($path, $default = null)
{
  global $__customizer_data__;
  if( ! isset($__customizer_data__['session'])){
    $__customizer_data__['session'] = session();
  }
  if( ! isset($__customizer_data__['current_user'])){
    $__customizer_data__['current_user'] = auth()->user();
  }
  return data_get($__customizer_data__, $path, $default);
}

/**
 * @param string $path
 * @param mixed $data
 * @return mixed
 */
function set_customizer_data($path, $data)
{
  global $__customizer_data__;
  if( ! isset($__customizer_data__['session'])){
    $__customizer_data__['session'] = session();
  }
  if( ! isset($__customizer_data__['current_user'])){
    $__customizer_data__['current_user'] = auth()->user();
  }
  return data_set($__customizer_data__, $path, $data);
}
/**
 * @param string $path
 * @param mixed $data
 * @return mixed
 */
function unset_customizer_data($path, $data)
{
  global $__customizer_data__;
  if( ! isset($__customizer_data__['session'])){
    $__customizer_data__['session'] = session();
  }
  if( ! isset($__customizer_data__['current_user'])){
    $__customizer_data__['current_user'] = auth()->user();
  }
  if( strpos( $path,'context' ) !== 0 ){
    return false;
  }
  return data_set($__customizer_data__, $path, null);
}

/**
 * Выводит получение данных при помощи функции get_customizer_data
 * @param $property_data
 * @return string
 */
function property_to_php( $property_data ) : string{
  $PHPContent = '';
  if( empty( $property_data ) ){
    return 'null';
  }
  $namespace = data_get($property_data,'namespace', 'context');
  $path = data_get($property_data,'path');
  $expression = data_get($property_data,'expression', 'null');
  $method = data_get($property_data,'method');
  $method_settings = data_get($property_data,'methodSettings', []);

  switch($namespace){
    case 'string':{
      $PHPContent .='"'. $path .'"';
    }break;
    case 'expression':{
      $PHPContent .= $expression ;
    }break;
    case 'number':{
      $PHPContent .= $path ;
    }break;
    case 'env':{
      $PHPContent = "get_customizer_data('env.$path')";
    }break;
    case 'session':
    case 'context':
    case 'this':
    case 'current_user':{
    if( ! $path ) {
      $path = $namespace;
    } else {
      $path = $namespace . '.' . $path;
    }
    $PHPContent = "get_customizer_data('$path')";
    if($method){
      $PHPContent .=  method_to_php( $method, $method_settings);
    }
    }break;
    default:
      $PHPContent = "null";
  }
  return $PHPContent;
}

/**
 * Выводит сохранение данных при помощи функций set_customizer_data и unset_customizer_data
 * @param $property_data
 * @param string $value
 * @param string $type
 * @return string
 */

function change_property_to_php( $property_data, $value = 'null', $type= 'set' ) : string{
  if( empty($property_data) ){
    return 'null';
  }
  $namespace = data_get($property_data,'namespace', 'context');
  $path = data_get($property_data,'path');

  switch($namespace){
    case 'context':{
    if( ! $path ) {
      $path = $namespace;
    } else {
      $path = $namespace . '.' . $path;
    }
    $PHPContent = "{$type}_customizer_data('$path', $value)";

    }break;
    default:
      $PHPContent = "null";
  }
  return $PHPContent;
}

function method_to_php( $method, $method_settings = []){
  if( ! $method ){
    return '';
  }
  if( strpos( $method, '.') !== false ){
    $method = explode('.', $method)[1];
  }
  $PHPContent = '->' . $method . '(';
  $parameters = data_get( $method_settings, 'parameters', [] );
  $parameters = array_filter( $parameters, function( $item ){
    return ! empty( $item ) && data_get( $item, 'value' );
  } );
  foreach ( $parameters as $key => $parameter ){
    $PHPContent .= property_to_php( data_get( $parameter, 'value', [] ) );
    if( $key < count( $parameters ) - 1){
      $PHPContent .= ', ';
    }
  }

  $PHPContent .= ')';
  return $PHPContent;
}

/**
 * Выводит операторы сравнения
 * @param $operator
 * @param string $left_php_property
 * @param string $right_php_property
 * @return string
 */
function customizer_build_compare( $operator, string $left_php_property = 'null', string $right_php_property = 'null'): string
{
  if(! $operator || $operator == 'empty'){
    return "empty($left_php_property)";
  }
  switch($operator){
    case 'not_empty':{
      return "! empty($left_php_property)";
    }
    case 'null':{
      return "$left_php_property == null";
    }
    case 'not_null':{
      return "$left_php_property != null";
    }
    case 'true':{
      return "$left_php_property == true";
    }
    case 'false':{
      return "$left_php_property == false";
    }
    case '==':{
      return "$left_php_property == $right_php_property";
    }
    case '<>':{
      return "$left_php_property != $right_php_property";
    }
    case '<':{
      return "$left_php_property < $right_php_property";
    }
    case '>':{
      return "$left_php_property > $right_php_property";
    }
    case '<=':{
      return "$left_php_property <= $right_php_property";
    }
    case '>=':{
      return "$left_php_property >= $right_php_property";
    }
    case 'in':{
      return "array_search($left_php_property, $right_php_property) !== false";
    }
    case 'not_in':{
      return "array_search($left_php_property, $right_php_property) === false";
    }
    case 'contain':{
      return "strpos( $right_php_property, $left_php_property) !== false";
    }
    case 'not_contain':{
      return "strpos( $right_php_property, $left_php_property) === false";
    }
    default: return 'null';
  }
}

/**
 * @param string $type
 * @param string $place
 * @return string
 */
function print_statics( string $type, string $place, $attributes  = []): string
{
  $content = '';
  $statics = env( $place );
  if( ! $statics ){
    return $content;
  }
  $statics = explode(',', $statics);
  foreach ( $statics as $static ) {
    switch ( $type ){
      case 'script':{
        $content .= sprintf( '<script src="%s"></script>', $static );
      } break;
      case 'style':{
        $content .= sprintf( '<link href="%s" type="text/css" rel="stylesheet">', $static );
      } break;
    }
  }
  return $content;
}

/**
 * @param string $type
 * @param string $place
 * @return string
 */
function str_replace_once($search, $replace, $text)
{
   $pos = strpos($text, $search);
   return $pos!==false ? substr_replace($text, $replace, $pos, strlen($search)) : $text;
}


function getAppUrl()
{
  return substr(env('APP_URL'), -1) == "/" ? substr(env('APP_URL'),0,-1) : env('APP_URL');
}

function array_unique_key($array, $key) {
  $tmp = $key_array = array();
  $i = 0;

  foreach($array as $val) {
    if (!in_array($val[$key], $key_array)) {
      $key_array[$i] = $val[$key];
      $tmp[$i] = $val;
    }
    $i++;
  }
  return $tmp;
}

function generateSitemap()
{

    $pages_ = PagesTemplate::select('templates.updated_at as updated_at', 'pages.path as path')
      ->leftJoin('pages', 'pages.id', '=', 'pages_templates.page_id')
      ->leftJoin('templates', 'templates.id', '=', 'pages_templates.template_id')
      ->whereNotNull('pages_templates.page_id')
      ->whereNotNull('pages.path')
      ->orderBy('templates.updated_at', 'desc')
      ->get();

    if ($pages_) {

      $pages = array_unique_key($pages_->toArray(), 'path');

      $output = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
      $output .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

      $priority = 0.5;
      foreach ($pages as $page) {
        if (strlen($page['path']) == 1 && $page['path'] == "/") {
          $priority = 1;
        }
        $output .= '<url>' . PHP_EOL;
        $output .= '<loc>' . getAppUrl() . $page['path'] . '</loc>' . PHP_EOL;
        $output .= '<lastmod>' . date('Y-m-d', strtotime($page['updated_at'])) . '</lastmod>' . PHP_EOL;
        $output .= '<priority>' . $priority . '</priority>' . PHP_EOL;
        $output .= '</url>' . PHP_EOL;
      }
      $output .= '</urlset>' . PHP_EOL;
    }

    file_put_contents(public_path().'/sitemap.xml' , $output);

    generateRobotsTXT();
}


function generateRobotsTXT()
{
    $pobots_txt = 'User-agent: *' . PHP_EOL;
    $pobots_txt .= 'Sitemap: ' . getAppUrl() . '/sitemap.xml' . PHP_EOL;
    file_put_contents(public_path().'/robots.txt' , $pobots_txt);
}
