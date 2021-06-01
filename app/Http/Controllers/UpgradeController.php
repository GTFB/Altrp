<?php
/**
 * LaraClassified - Classified Ads Web Application
 * Copyright (c) BedigitCom. All Rights Reserved
 *
 * Website: http://www.bedigit.com
 *
 * LICENSE
 * -------
 * This software is furnished under a license and may be used and copied
 * only in accordance with the terms of such license and with the inclusion
 * of the above copyright notice. If you Purchased from Codecanyon,
 * Please read the full License from here - http://codecanyon.net/licenses/standard
 */

namespace App\Http\Controllers;

/*
 * Increase PHP page execution time for this controller.
 * NOTE: This function has no effect when PHP is running in safe mode (http://php.net/manual/en/ini.sect.safe-mode.php#ini.safe-mode).
 * There is no workaround other than turning off safe mode or changing the time limit (max_execution_time) in the php.ini.
 */
set_time_limit( 0 );

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class UpgradeController extends Controller
{
  /**
   * URL: /upgrade
   *
   * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
   */
  public function version()
  {
    // Lunch the installation if the /.env file doesn't exists
    if ( ! File::exists( base_path( '.env' ) ) ) {
      return redirect( '/install' );
    }


    // Get eventual new version value & the current (installed) version value
    $lastVersion = getLatestVersion();
    $currentVersion = getCurrentVersion();

    // All is Up to Date
    if ( version_compare( $lastVersion, $currentVersion, '<=' ) ) {
      abort( 401 );
    }


    // Go to maintenance with DOWN status
    \Log::info(date('d.m.Y H:i:s') . " | User Id: " . \Auth::user()->id . " | User Ip: " . $_SERVER['REMOTE_ADDR'] . " | Method:" . __METHOD__);
    Artisan::call( 'down' );

    // Clear all the cache
    $this->clearCache();

    // Upgrade the Database
    $res = $this->upgradeDatabase( $lastVersion, $currentVersion );
    if ( $res === false ) {
      dd( 'ERROR' );
    }

    // Update the current version to last version
    $this->setCurrentVersion( $lastVersion );

    // Clear all the cache
    $this->clearCache();

    // Restore system UP status
    $exitCode = Artisan::call( 'up' );

    // Success message

    // Redirection
    return redirect( '/admin/settings' );
  }

  /**
   * Clear all the cache
   */
  private function clearCache()
  {
    $this->removeRobotsTxtFile();
    $exitCode = Artisan::call( 'cache:clear' );
    sleep( 2 );
    $exitCode = Artisan::call( 'view:clear' );
    sleep( 1 );
    File::delete( File::glob( storage_path( 'logs' ) . DIRECTORY_SEPARATOR . 'laravel*.log' ) );
  }

  /**
   * Remove the robots.txt file (It will be re-generated automatically)
   */
  private function removeRobotsTxtFile()
  {
    $robotsFile = public_path( 'robots.txt' );
    if ( File::exists( $robotsFile ) ) {
      File::delete( $robotsFile );
    }
  }

  /**
   * Upgrade the Database & Apply actions
   *
   * @param $lastVersion
   * @param $currentVersion
   * @return bool
   */
  private function upgradeDatabase( $lastVersion, $currentVersion )
  {
    Artisan::call( 'config:clear' );
    Artisan::call( 'migrate', [ '--force' => true ] );
    return true;
  }

  /**
   * Update the current version to last version
   *
   * @param $last
   */
  private function setCurrentVersion( $last )
  {
    if ( ! DotenvEditor::keyExists( 'APP_VERSION' ) ) {
      DotenvEditor::addEmpty();
    }
    DotenvEditor::setKey( 'APP_VERSION', $last );
    DotenvEditor::save();
  }
}
