<?php

namespace App\Services;

use App\Altrp\Plugin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Page;
use App\User;

/**
 *
 */
class AltrpPluginsService
{
  /**
   * @return array|\Illuminate\Support\Collection
   */
	public function getDownloadedPluginsList()
  {
    if( File::exists( app_path( 'AltrpPlugins' ) )){
      $plugins = File::directories( app_path( 'AltrpPlugins' ) );

    } else {
      $plugins = [];
    }
    foreach ( $plugins as $key => $plugin ) {
      $plugins[$key] = File::name( $plugin );
    }
    return collect( array_map( function( $plugin) {
      return (new Plugin( ['name'=>$plugin] ));
    }, $plugins ) );
  }
}
