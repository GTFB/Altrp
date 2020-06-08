<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Jenssegers\Date\Date;
use PulkitJalan\GeoIP\Facades\GeoIP;

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

    // Create SQL destination path if not exists
    if ( ! File::exists( storage_path( 'app/database/geonames/countries' ) ) ) {
      File::makeDirectory( storage_path( 'app/database/geonames/countries' ), 0755, true );
    }

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
      ( file_exists( storage_path( 'app/public/app/categories/custom' ) ) &&
        is_dir( storage_path( 'app/public/app/categories/custom' ) ) &&
        ( is_writable( storage_path( 'app/public/app/categories/custom' ) ) ) &&
        getPerms( storage_path( 'app/public/app/categories/custom' ) ) >= 755 )
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

    $data = $request->session()->get( 'site_info' );
    if ( isset( $data ) ) {
      $step = 3;
    } else {
      return $step;
    }

    $data = $request->session()->get( 'database' );
    if ( isset( $data ) ) {
      $step = 4;
    } else {
      return $step;
    }

    $data = $request->session()->get( 'database_imported' );
    if ( isset( $data ) ) {
      $step = 5;
    } else {
      return $step;
    }

    $data = $request->session()->get( 'cron_jobs' );
    if ( isset( $data ) ) {
      $step = 6;
    } else {
      return $step;
    }

    return $step;
  }

  public function process( Request $request ){
    // Make sure session is working
    $rules = [
      'site_name' => 'required',
      'site_slogan' => 'required',
      'database_username' => 'required',
      'database_password' => 'required',
      'database_name' => 'required',
      'database_prefix' => 'required',
      'name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email',
      'passwrod' => 'required',
    ];
    if ( $request->isMethod( 'post' ) ) {
      if( ! $request->validate( $rules ) ){
        return redirect( '/' );
      }


      $this->writeEnv($request);

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
    $key = config( 'app.key', $key );


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
    $content .= 'DB_PORT=3306'. "\n";
    $content .= 'DB_DATABASE=' . ( isset( $request->database_name ) ? $request->database_name : '' ) . "\n";
    $content .= 'DB_USERNAME=' . ( isset( $request->database_username ) ? $request->database_username : '' ) . "\n";
    $content .= 'DB_PASSWORD="' . ( isset( $request->database_password ) ? addcslashes( $request->database_password, '"' ) : '' ) . '"' . "\n";
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

  /**
   * STEP 4 - Import Database
   *
   * @param Request $request
   * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
   */
  public function databaseImport( Request $request )
  {
    if ( $this->step( $request ) < 3 ) {
      return redirect( $this->installUrl . '/database' );
    }

    // Get database connexion info & site info
    $database = $request->session()->get( 'database' );
    $siteInfo = $request->session()->get( 'site_info' );

    if ( $request->action == 'import' ) {
      $request->session()->forget( 'database_imported' );

      // Get PDO connexion
      $pdo = DBTool::getPDOConnexion( $database );

      // Check if database is not empty
      $rules = [];
      $tableNames = $this->getDatabaseTables( $pdo, $database );
      if ( count( $tableNames ) > 0 ) {
        // 1. Drop all old tables
        $this->dropExistingTables( $pdo, $tableNames );

        // 2. Check if all table are dropped (Check if database's tables still exist)
        $tablesExist = false;
        $tableNames = $this->getDatabaseTables( $pdo, $database );
        if ( count( $tableNames ) > 0 ) {
          $tablesExist = true;
        }

        if ( $tablesExist ) {
          $rules['database_not_empty'] = 'required';
          $rules['can_not_empty_database'] = 'required';
        }

        // 3. Validation
        $this->validate( $request, $rules );
      }

      // Import database with prefix
      $this->importDatabase( $pdo, $database['prefix'], $siteInfo );

      // Close PDO connexion
      DBTool::closePDOConnexion( $pdo );

      // The database is now imported !
      $request->session()->put( 'database_imported', true );

      $request->session()->flash( 'alert-success', trans( 'messages.install.database_import.success' ) );

      return redirect( $this->installUrl . '/cron_jobs' );
    }

    return view( 'install.database_import', [
      'database' => $database,
      'step' => $this->step( $request ),
      'current' => 3,
    ] );
  }

  /**
   * Get all the database tables
   *
   * @param $pdo
   * @param $database
   * @return array
   */
  private function getDatabaseTables( $pdo, $database )
  {
    $tables = [];

    $prefixChecker = ! empty( $database['prefix'] ) ? '  AND table_name LIKE "' . $database['prefix'] . '%"' : '';
    $sql = 'SELECT GROUP_CONCAT(table_name) AS table_names
				FROM information_schema.tables
                WHERE table_schema = "' . $database['database'] . '"' . $prefixChecker;
    $query = $pdo->query( $sql );
    $databaseSchemaInfo = $query->fetch();
    if ( isset( $databaseSchemaInfo->table_names ) ) {
      $tables = array_merge( $tables, explode( ',', $databaseSchemaInfo->table_names ) );
    }

    return $tables;
  }

  /**
   * Drop All Existing Tables
   *
   * @param $pdo
   * @param $tableNames
   */
  private function dropExistingTables( $pdo, $tableNames )
  {
    if ( is_array( $tableNames ) && count( $tableNames ) > 0 ) {
      // Try 4 times
      $try = 5;
      while ( $try > 0 ) {
        try {
          // Extend query max setting
          $pdo->exec( 'FLUSH TABLES;' );
          $pdo->exec( 'SET group_concat_max_len = 9999999;' );

          // Drop all tables
          $pdo->exec( 'SET foreign_key_checks = 0;' );
          foreach ( $tableNames as $tableName ) {
            if ( $this->tableExists( $pdo, $tableName ) ) {
              $pdo->exec( 'DROP TABLE ' . $tableName . ';' );
            }
          }
          $pdo->exec( 'SET foreign_key_checks = 1;' );

          $pdo->exec( 'FLUSH TABLES;' );

          $try--;
        } catch ( \Exception $e ) {
          dd( $e->getMessage() );
        }
      }
    }
  }

  /**
   * Check if a table exists in the current database.
   *
   * @param $pdo
   * @param $table
   * @return bool
   */
  private function tableExists( $pdo, $table )
  {
    // Try a select statement against the table
    // Run it in try/catch in case PDO is in ERRMODE_EXCEPTION.
    try {
      $result = $pdo->query( 'SELECT 1 FROM ' . $table . ' LIMIT 1' );
    } catch ( \Exception $e ) {
      // We got an exception == table not found
      return false;
    }

    // Result is either boolean FALSE (no table found) or PDOStatement Object (table found)
    return $result !== false;
  }

  /**
   * Import Database - Migration & Seed
   *
   * @param $pdo
   * @param $tablesPrefix
   * @param $siteInfo
   * @return bool
   */
  private function importDatabase( $pdo, $tablesPrefix, $siteInfo )
  {
    // Import database schema
    $this->importSchemaSql( $pdo, $tablesPrefix );

    // Import required data
    $this->importRequiredDataSql( $pdo, $tablesPrefix );

    // Import Geonames Default country database
    $this->importGeonamesSql( $pdo, $tablesPrefix, $siteInfo['default_country'] );

    // Update database with customer info
    $this->updateDatabase( $pdo, $tablesPrefix, $siteInfo );

    return true;
  }

  /**
   * Import Database's Schema
   *
   * @param $pdo
   * @param $tablesPrefix
   * @return bool
   */
  private function importSchemaSql( $pdo, $tablesPrefix )
  {
    // Default Schema SQL file
    $filename = 'database/schema.sql';
    $filePath = storage_path( $filename );

    // Import the SQL file
    $res = DBTool::importSqlFile( $pdo, $filePath, $tablesPrefix );
    if ( $res === false ) {
      dd( 'ERROR' );
    }

    return $res;
  }

  /**
   * Import Database's Required Data
   *
   * @param $pdo
   * @param $tablesPrefix
   * @return bool
   */
  private function importRequiredDataSql( $pdo, $tablesPrefix )
  {
    // Default Required Data SQL file
    $filename = 'database/data.sql';
    $filePath = storage_path( $filename );

    // Import the SQL file
    $res = DBTool::importSqlFile( $pdo, $filePath, $tablesPrefix );
    if ( $res === false ) {
      dd( 'ERROR' );
    }

    return $res;
  }

  /**
   * Import the Default Country Data from the Geonames SQL Files
   *
   * @param $pdo
   * @param $tablesPrefix
   * @param $defaultCountryCode
   * @return bool
   */
  private function importGeonamesSql( $pdo, $tablesPrefix, $defaultCountryCode )
  {
    // Default Country SQL file
    $filename = 'database/geonames/countries/' . strtolower( $defaultCountryCode ) . '.sql';
    $filePath = storage_path( $filename );

    // Import the SQL file
    $res = DBTool::importSqlFile( $pdo, $filePath, $tablesPrefix );
    if ( $res === false ) {
      dd( 'ERROR' );
    }

    return $res;
  }

  /**
   * Update the Database with the Site Information
   *
   * @param $pdo
   * @param $tablesPrefix
   * @param $siteInfo
   */
  private function updateDatabase( $pdo, $tablesPrefix, $siteInfo )
  {
    // Default date
    $date = Date::now();

    try {

      // USERS - Insert default superuser
      $pdo->exec( 'DELETE FROM `' . $tablesPrefix . 'users` WHERE 1' );
      $sql = 'INSERT INTO `' . $tablesPrefix . 'users`
				(`id`, `country_code`, `user_type_id`, `gender_id`, `name`, `about`, `email`, `password`, `is_admin`, `verified_email`, `verified_phone`)
				VALUES (1, :countryCode, 1, 1, :name, "Administrator", :email, :password, 1, 1, 1);';
      $query = $pdo->prepare( $sql );
      $res = $query->execute( [
        ':countryCode' => $siteInfo['default_country'],
        ':name' => $siteInfo['name'],
        ':email' => $siteInfo['email'],
        ':password' => Hash::make( $siteInfo['password'] ),
      ] );

      // COUNTRIES - Activate default country
      $sql = 'UPDATE `' . $tablesPrefix . 'countries` SET `active`=1 WHERE `code`=:countryCode';
      $query = $pdo->prepare( $sql );
      $res = $query->execute( [
        ':countryCode' => $siteInfo['default_country'],
      ] );

      // SETTINGS - Update settings
      // App
      $appSettings = [
        'purchase_code' => isset( $siteInfo['purchase_code'] ) ? $siteInfo['purchase_code'] : '',
        'name' => isset( $siteInfo['site_name'] ) ? $siteInfo['site_name'] : '',
        'slogan' => isset( $siteInfo['site_slogan'] ) ? $siteInfo['site_slogan'] : '',
        'email' => isset( $siteInfo['email'] ) ? $siteInfo['email'] : '',
      ];
      $sql = 'UPDATE `' . $tablesPrefix . 'settings` SET `value`=:appSettings WHERE `key`="app"';
      $query = $pdo->prepare( $sql );
      $res = $query->execute( [
        ':appSettings' => json_encode( $appSettings ),
      ] );

      // Geo Location
      $geoLocationSettings = [
        'default_country_code' => isset( $siteInfo['default_country'] ) ? $siteInfo['default_country'] : '',
      ];
      $sql = 'UPDATE `' . $tablesPrefix . 'settings` SET `value`=:geoLocationSettings WHERE `key`="geo_location"';
      $query = $pdo->prepare( $sql );
      $res = $query->execute( [
        ':geoLocationSettings' => json_encode( $geoLocationSettings ),
      ] );

      // Mail
      $mailSettings = [
        'email_sender' => isset( $siteInfo['email'] ) ? $siteInfo['email'] : '',
        'driver' => isset( $siteInfo['mail_driver'] ) ? $siteInfo['mail_driver'] : '',
      ];
      if ( isset( $siteInfo['mail_driver'] ) ) {
        if ( $siteInfo['mail_driver'] == 'sendmail' ) {
          $mailSettings['sendmail_path'] = isset( $siteInfo['sendmail_path'] ) ? $siteInfo['sendmail_path'] : '';
        }
        if ( in_array( $siteInfo['mail_driver'], [ 'smtp', 'mailgun', 'mandrill', 'ses', 'sparkpost' ] ) ) {
          $mailSettings['host'] = isset( $siteInfo['smtp_hostname'] ) ? $siteInfo['smtp_hostname'] : '';
          $mailSettings['port'] = isset( $siteInfo['smtp_port'] ) ? $siteInfo['smtp_port'] : '';
          $mailSettings['encryption'] = isset( $siteInfo['smtp_encryption'] ) ? $siteInfo['smtp_encryption'] : '';
          $mailSettings['username'] = isset( $siteInfo['smtp_username'] ) ? $siteInfo['smtp_username'] : '';
          $mailSettings['password'] = isset( $siteInfo['smtp_password'] ) ? $siteInfo['smtp_password'] : '';
        }
        if ( $siteInfo['mail_driver'] == 'mailgun' ) {
          $mailSettings['mailgun_domain'] = isset( $siteInfo['mailgun_domain'] ) ? $siteInfo['mailgun_domain'] : '';
          $mailSettings['mailgun_secret'] = isset( $siteInfo['mailgun_secret'] ) ? $siteInfo['mailgun_secret'] : '';
        }
        if ( $siteInfo['mail_driver'] == 'mandrill' ) {
          $mailSettings['mandrill_secret'] = isset( $siteInfo['mandrill_secret'] ) ? $siteInfo['mandrill_secret'] : '';
        }
        if ( $siteInfo['mail_driver'] == 'ses' ) {
          $mailSettings['ses_key'] = isset( $siteInfo['ses_key'] ) ? $siteInfo['ses_key'] : '';
          $mailSettings['ses_secret'] = isset( $siteInfo['ses_secret'] ) ? $siteInfo['ses_secret'] : '';
          $mailSettings['ses_region'] = isset( $siteInfo['ses_region'] ) ? $siteInfo['ses_region'] : '';
        }
        if ( $siteInfo['mail_driver'] == 'sparkpost' ) {
          $mailSettings['sparkpost_secret'] = isset( $siteInfo['sparkpost_secret'] ) ? $siteInfo['sparkpost_secret'] : '';
        }
      }
      $sql = 'UPDATE `' . $tablesPrefix . 'settings` SET `value`=:mailSettings WHERE `key`="mail"';
      $query = $pdo->prepare( $sql );
      $res = $query->execute( [
        ':mailSettings' => json_encode( $mailSettings ),
      ] );

    } catch ( \PDOException $e ) {
      dd( $e->getMessage() );
    } catch ( \Exception $e ) {
      dd( $e->getMessage() );
    }
  }


  /**
   * STEP 6 - Finish
   *
   * @param Request $request
   * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
   */
  public function finish( Request $request )
  {
    if ( $this->step( $request ) < 6 ) {
      return redirect( $this->installUrl . '/database' );
    }

    $request->session()->put( 'install_finish', true );

    // Delete all front&back office cookies
    if ( isset( $_COOKIE['ip_country_code'] ) ) {
      unset( $_COOKIE['ip_country_code'] );
    }

    // Clear all Cache
    $exitCode = Artisan::call( 'cache:clear' );
    sleep( 2 );
    $exitCode = Artisan::call( 'view:clear' );
    sleep( 1 );
    File::delete( File::glob( storage_path( 'logs' ) . DIRECTORY_SEPARATOR . 'laravel*.log' ) );

    // Rendering final Info
    return view( 'install.finish', [
      'step' => $this->step( $request ),
      'current' => 6,
    ] );
  }

  /**
   * @return string
   */
  private function checkServerVar()
  {
    $vars = [ 'HTTP_HOST', 'SERVER_NAME', 'SERVER_PORT', 'SCRIPT_NAME', 'SCRIPT_FILENAME', 'PHP_SELF', 'HTTP_ACCEPT', 'HTTP_USER_AGENT' ];
    $missing = [];
    foreach ( $vars as $var ) {
      if ( ! isset( $_SERVER[$var] ) ) {
        $missing[] = $var;
      }
    }

    if ( ! empty( $missing ) ) {
      return '$_SERVER does not have: ' . implode( ', ', $missing );
    }

    if ( ! isset( $_SERVER['REQUEST_URI'] ) && isset( $_SERVER['QUERY_STRING'] ) ) {
      return 'Either $_SERVER["REQUEST_URI"] or $_SERVER["QUERY_STRING"] must exist.';
    }

    if ( ! isset( $_SERVER['PATH_INFO'] ) && strpos( $_SERVER['PHP_SELF'], $_SERVER['SCRIPT_NAME'] ) !== 0 ) {
      return 'Unable to determine URL path info. Please make sure $_SERVER["PATH_INFO"] (or $_SERVER["PHP_SELF"] and $_SERVER["SCRIPT_NAME"]) contains proper value.';
    }

    return '';
  }
}