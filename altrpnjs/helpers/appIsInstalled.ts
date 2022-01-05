/**
 * Check if the app is installed
 *
 * @return bool
 */
import env from "./env";

export default function appIsInstalled()
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
