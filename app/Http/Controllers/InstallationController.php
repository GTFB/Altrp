<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

set_time_limit( 0 );

class InstallationController extends Controller

{
  public static $cookieExpiration = 3600;
  public $baseUrl;
  public $installUrl;
  private $phpVersion = '7.1.3';

  /**
   * InstallController constructor.
   *
   * @param Request $request
   */
  public function __construct( Request $request )
  {
    // From Laravel 5.3.4 or above
    $this->middleware( function ( $request, $next ) {
      $this->commonQueries( $request );

      return $next( $request );
    } );

    // Base URL
    $this->baseUrl = getRawBaseUrl();
    view()->share( 'baseUrl', $this->baseUrl );
    config( [ 'app.url' => $this->baseUrl ] );

    // Installation URL
    $this->installUrl = $this->baseUrl . '/install';
    view()->share( 'installUrl', $this->installUrl );
  }

  /**
   * Common Queries
   *
   * @param Request $request
   */
  public function commonQueries( Request $request )
  {
    // Delete all front&back office sessions
    $request->session()->forget( 'country_code' );
    $request->session()->forget( 'time_zone' );
    $request->session()->forget( 'language_code' );

  }

  /**
   * STEP 0 - Starting installation
   *
   * @param Request $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function starting( Request $request )
  {
    $exitCode = Artisan::call( 'cache:clear' );
    $exitCode = Artisan::call( 'config:clear' );

    // Get the Query String
    $queryString = ( request()->all() ? ( '?' . httpBuildQuery( request()->all() ) ) : '' );

    return redirect( $this->installUrl . '/process' . $queryString );
  }

  /**
   * STEP 1 - Check System Compatibility
   *
   * @param Request $request
   * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
   */
  public function systemCompatibility( Request $request )
  {
    // Begin check
    $request->session()->forget( 'compatibilities' );

    // Get the system compatibilities data
    $compatibilities = $this->getSystemCompatibilitiesData();

    // Auto-Checking: Skip this step If the system is Ok.
    if ( $this->checkSystemCompatibility( $request, $compatibilities ) ) {
      $request->session()->put( 'compatibilities', $compatibilities );

      // Get the Query String
      $queryString = ( request()->all() ? ( '?' . httpBuildQuery( request()->all() ) ) : '' );

      return redirect( $this->installUrl . '/site_info' . $queryString );
    }

    // Check the compatibilities manually
    $result = true;
    foreach ( $compatibilities as $compatibility ) {
      if ( ! $compatibility['check'] ) {
        $result = false;
      }
    }

    // Retry if something not work yet
    try {
      if ( $result ) {
        $request->session()->put( 'compatibilities', $compatibilities );
      }

      return view( 'install.compatibilities', [
        'compatibilities' => $compatibilities,
        'result' => $result,
        'step' => $this->step( $request ),
        'current' => 1,
      ] );
    } catch ( \Exception $e ) {
      $exitCode = Artisan::call( 'cache:clear' );
      $exitCode = Artisan::call( 'config:clear' );

      return redirect( $this->installUrl . '/system_compatibility' );
    }
  }

  /**
   * Get the system compatibilities data
   *
   * @return array
   */
  private function getSystemCompatibilitiesData()
  {
    return [
      [
        'type' => 'requirement',
        'name' => 'PHP version',
        'check' => version_compare( PHP_VERSION, $this->phpVersion, '>=' ),
        'note' => 'PHP ' . $this->phpVersion . ' or higher is required.',
      ],
      [
        'type' => 'requirement',
        'name' => 'OpenSSL Extension',
        'check' => extension_loaded( 'openssl' ),
        'note' => 'OpenSSL PHP Extension is required.',
      ],
      [
        'type' => 'requirement',
        'name' => 'Mbstring PHP Extension',
        'check' => extension_loaded( 'mbstring' ),
        'note' => 'Mbstring PHP Extension is required.',
      ],
      [
        'type' => 'requirement',
        'name' => 'PDO PHP Extension',
        'check' => extension_loaded( 'pdo' ),
        'note' => 'PDO PHP Extension is required.',
      ],
      [
        'type' => 'requirement',
        'name' => 'Tokenizer PHP Extension',
        'check' => extension_loaded( 'tokenizer' ),
        'note' => 'Tokenizer PHP Extension is required.',
      ],
      [
        'type' => 'requirement',
        'name' => 'XML PHP Extension',
        'check' => extension_loaded( 'xml' ),
        'note' => 'XML PHP Extension is required.',
      ],
      [
        'type' => 'requirement',
        'name' => 'PHP Fileinfo Extension',
        'check' => extension_loaded( 'fileinfo' ),
        'note' => 'PHP Fileinfo Extension is required.',
      ],
      [
        'type' => 'requirement',
        'name' => 'PHP GD Library',
        'check' => ( extension_loaded( 'gd' ) && function_exists( 'gd_info' ) ),
        'note' => 'PHP GD Library is required.',
      ],
      [
        'type' => 'requirement',
        'name' => 'escapeshellarg()',
        'check' => func_enabled( 'escapeshellarg' ),
        'note' => 'escapeshellarg() must be enabled.',
      ],
      [
        'type' => 'permission',
        'name' => 'bootstrap/cache/',
        'check' => file_exists( base_path( 'bootstrap/cache' ) ) &&
          is_dir( base_path( 'bootstrap/cache' ) ) &&
          ( is_writable( base_path( 'bootstrap/cache' ) ) ) &&
          getPerms( base_path( 'bootstrap/cache' ) ) >= 755,
        'note' => 'The directory must be writable by the web server (0755).',
      ],
      [
        'type' => 'permission',
        'name' => 'storage/',
        'check' => ( file_exists( storage_path( '/' ) ) &&
          is_dir( storage_path( '/' ) ) &&
          ( is_writable( storage_path( '/' ) ) ) &&
          getPerms( storage_path( '/' ) ) >= 755 ),
        'note' => 'The directory must be writable (recursively) by the web server (0755).',
      ],
    ];
  }

  /**
   * Check for requirement when install app (Automatic)
   *
   * @param $request
   * @param $compatibilities
   * @return bool
   */
  private function checkSystemCompatibility( $request, $compatibilities )
  {
    if ( $request->has( 'mode' ) && $request->input( 'mode' ) == 'manual' ) {
      return false;
    }

    // Check Default Compatibilities
    $defaultCompatibilityTest = true;
    foreach ( $compatibilities as $compatibility ) {
      if ( ! $compatibility['check'] ) {
        $defaultCompatibilityTest = false;
      }
    }

    // Check Additional Directories Permissions
    $additionalPermissionsAreOk = false;
    if (
      ( file_exists( storage_path( 'app/public/app' ) ) &&
        is_dir( storage_path( 'app/public/app' ) ) &&
        ( is_writable( storage_path( 'app/public/app' ) ) ) &&
        getPerms( storage_path( 'app/public/app' ) ) >= 755 )
      &&
      ( file_exists( storage_path( 'app/public/app/logo' ) ) &&
        is_dir( storage_path( 'app/public/app/logo' ) ) &&
        ( is_writable( storage_path( 'app/public/app/logo' ) ) ) &&
        getPerms( storage_path( 'app/public/app/logo' ) ) >= 755 )
      &&
      ( file_exists( storage_path( 'app/public/app/page' ) ) &&
        is_dir( storage_path( 'app/public/app/page' ) ) &&
        ( is_writable( storage_path( 'app/public/app/page' ) ) ) &&
        getPerms( storage_path( 'app/public/app/page' ) ) >= 755 )
      &&
      ( file_exists( storage_path( 'app/public/files' ) ) &&
        is_dir( storage_path( 'app/public/files' ) ) &&
        ( is_writable( storage_path( 'app/public/files' ) ) ) &&
        getPerms( storage_path( 'app/public/files' ) ) >= 755 )
    ) {
      $additionalPermissionsAreOk = true;
    }

    $allIsReady = $defaultCompatibilityTest && $additionalPermissionsAreOk;

    return $allIsReady;
  }

  /**
   * Check for current step
   *
   * @param $request
   * @param null $liveData
   * @return int
   */
  public function step( $request, $liveData = null )
  {
    $step = 0;

    $data = $request->session()->get( 'compatibilities' );
    if ( isset( $data ) ) {
      $step = 1;
    } else {
      return $step;
    }
    return $step;
  }

  public function process( Request $request )
  {
    // Make sure session is working
    $rules = [
      'site_name' => 'required',
      'site_description' => 'required',
      'database_username' => 'required',
      'database_name' => 'required',
      'database_prefix' => 'required',
      'name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email',
      'password' => 'required',
    ];
    if ( $request->isMethod( 'post' ) ) {

      $validatedData = $request->validate( $rules );

      $this->writeEnv( $request );

      $this->writeFiles( $request );

      $this->migrate( $request );

      return redirect( '/linkstorage' );
    }
    return view( 'installation' );
  }

  /**
   * Write configuration values to file
   *
   * @param $request
   */
  private function writeEnv( $request )
  {
    $filePath = base_path( '.env' );

    if ( File::exists( $filePath ) ) {
      File::delete( $filePath );
    }

    // Set app key
    $key = 'base64:' . base64_encode( $this->randomString( 32 ) );

    // Get app version
    $version = getLatestVersion();

    // Generate .env file content
    $content = '';
    $content .= 'APP_ENV=production' . "\n";
    $content .= 'APP_KEY=' . $key . "\n";
    $content .= 'APP_DEBUG=false' . "\n";
    $content .= 'APP_URL=' . $this->baseUrl . "\n";
    $content .= 'APP_LOCALE=en' . "\n";
    $content .= 'APP_VERSION=' . $version . "\n";
    $content .= "\n";
    $content .= 'FORCE_HTTPS=' . ( Str::startsWith( $this->baseUrl, 'https://' ) ? 'true' : 'false' ) . "\n";
    $content .= "\n";
    $content .= 'DB_HOST=127.0.0.1' . "\n";
    $content .= 'DB_PORT=3306' . "\n";
    $content .= 'DB_DATABASE=' . ( isset( $request->database_name ) ? $request->database_name : '' ) . "\n";
    $content .= 'DB_USERNAME=' . ( isset( $request->database_username ) ? $request->database_username : '' ) . "\n";
    $content .= 'DB_PASSWORD=' . ( isset( $request->database_password ) ? addcslashes( $request->database_password, '"' ) : '' ) . '' . "\n";
    $content .= 'DB_TABLES_PREFIX=' . ( isset( $request->database_prefix ) ? $request->database_prefix : '' ) . "\n";
    $content .= 'DB_CHARSET=utf8' . "\n";
    $content .= 'DB_COLLATION=utf8_unicode_ci' . "\n";
    $content .= 'DB_DUMP_BINARY_PATH=' . "\n";
    $content .= "\n";
    $content .= "\n";
    $content .= 'CACHE_DRIVER=file' . "\n";
    $content .= 'CACHE_PREFIX=altrp_' . "\n";
    $content .= 'QUEUE_CONNECTION=sync' . "\n";
    $content .= 'SESSION_DRIVER=file' . "\n";
    $content .= 'SESSION_LIFETIME=10080' . "\n";
    $content .= "\n";
    $content .= 'LOG_CHANNEL=daily' . "\n";
    $content .= 'LOG_LEVEL=debug' . "\n";
    $content .= 'LOG_DAYS=2' . "\n";
    $content .= "\n";

    // Save the new .env file
    File::put( $filePath, $content );

    // Reload .env (related to the config values)
    $exitCode = Artisan::call( 'config:clear' );
  }

  /**
   * @param int $length
   * @return string
   */
  private function randomString( $length = 6 )
  {
    $str = "";
    $characters = array_merge( range( 'A', 'Z' ), range( 'a', 'z' ), range( '0', '9' ) );
    $max = count( $characters ) - 1;
    for ( $i = 0; $i < $length; $i++ ) {
      $rand = mt_rand( 0, $max );
      $str .= $characters[$rand];
    }

    return $str;
  }

  public function migrate( Request $request )
  {
    Artisan::call( 'config:clear');
    sleep(1);
    Artisan::call( 'migrate', [ '--force' => true ] );

    $user = new User( [
      'last_name' => $request->last_name,
      'name' => $request->name,
      'password' => Hash::make( $request->password ),
      'email' => $request->email,
    ] );
    $user->save();
    $admin = new Role( [
      'name' => 'admin',
      'display_name' => 'Admin',
    ] );
    $admin->save();
    $user->attachRole( $admin );
    File::put(storage_path('installed'), '');
    Auth::loginUsingId( $user->id, true );
    Artisan::call( 'storage:link' );

    // Clear all Cache
    Artisan::call('cache:clear');
    sleep(1);
    Artisan::call('view:clear');
    sleep(1);
  }

  /**
   * Создаем необходимые файлы
   * @param $request
   */
  private function writeFiles( $request )
  {
    /**
     * Файл AltrpRoutes.php для пользовательских роутов
     */

    $filename = base_path( 'routes/AltrpRoutes.php' );
    $content = '<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */
';
    File::put( $filename, $content );
    /**
     * Файл AltrpCustomRoutes.php для пользовательских роутов
     */

    $filename = base_path( 'routes/AltrpCustomRoutes.php' );
    $content = '<?php
/*Custom routes*/';
    File::put( $filename, $content );
  }
}