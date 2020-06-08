<?php

/**
 * Get the script possible URL base
 *
 * @return mixed
 */
function getRawBaseUrl()
{
  // Get the Laravel's App public path name
  $laravelPublicPath = trim(public_path(), '/');
  $laravelPublicPathLabel = last(explode('/', $laravelPublicPath));

  // Get Server Variables
  $httpHost = (trim(request()->server('HTTP_HOST')) != '') ? request()->server('HTTP_HOST') : (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '');
  $requestUri = (trim(request()->server('REQUEST_URI')) != '') ? request()->server('REQUEST_URI') : (isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '');

  // Clear the Server Variables
  $httpHost = trim($httpHost, '/');
  $requestUri = trim($requestUri, '/');
  $requestUri = (mb_substr($requestUri, 0, strlen($laravelPublicPathLabel)) === $laravelPublicPathLabel) ? '/' . $laravelPublicPathLabel : '';

  // Get the Current URL
  $currentUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 'https://' : 'http://') . $httpHost . strtok($requestUri, '?');
  $currentUrl = head(explode('/' . admin_uri(), $currentUrl));

  // Get the Base URL
  $baseUrl = head(explode('/install', $currentUrl));
  $baseUrl = rtrim($baseUrl, '/');

  return $baseUrl;
}


/**
 * @param string $path
 * @return string
 */
function admin_uri($path = '')
{
  $path = str_replace(url(config('altrp.admin.route_prefix', 'admin')), '', $path);
  $path = ltrim($path, '/');

  if (!empty($path)) {
    $path = config('altrp.admin.route_prefix', 'admin') . '/' . $path;
  } else {
    $path = config('altrp.admin.route_prefix', 'admin');
  }

  return $path;
}

function updateIsAvailable(){
  return false;
}

/**
 * Redirect (Prevent Browser cache)
 *
 * @param $url
 * @param int $code (301 => Moved Permanently | 302 => Moved Temporarily)
 */
function headerLocation($url, $code = 301)
{
  header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
  header("Location: " . $url, true, $code);

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