<?php

use App\Http\Requests\ApiRequest;

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
    return asset( $path ) . '?' . getCurrentVersion();
  }
  $client = new \GuzzleHttp\Client();
  try {
    $client->get( $domain )->getStatusCode();
  } catch ( Exception $e ) {
    return asset( $path ) . '?' . getCurrentVersion();
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
  if( $request->get( 'order' ) && $request->get( 'order_by' ) ){
    $sql .= ' ORDER BY `' . $request->get( 'order_by') . '`' . ( $request->get( 'order' ) === 'DESC' ? ' DESC' : ' ');
  }
  $_sql_and_filters = '';
  $_sql_filters = '';
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
  }
  $sql = str_replace( 'ALTRP_FILTERS', $_sql_filters, $sql ) ;

  $sql = str_replace( 'ALTRP_AND_FILTERS', $_sql_and_filters, $sql ) ;

  return [ 'data' => DB::select( $sql, $bindings ) ];
}