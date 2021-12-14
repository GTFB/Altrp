<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\Plugin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Nwidart\Modules\Facades\Module;


class PluginController extends Controller
{
  /**
   * Переключатель состояния плагина (вкл./выкл.)
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function switch( Request $request )
  {

    Plugin::switchEnable( $request->get('name'), ! ! $request->get('value') );

    $plugin = new Plugin(['name'=> $request->get('name')]);
    return response()->json( ['success' => true, 'data' => $plugin->toArray()], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Переключатель состояния плагина (вкл./выкл.)
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   * @throws \Facade\FlareClient\Http\Exceptions\NotFound
   */
  public function delete_plugin( Request $request )
  {


    $plugin = new Plugin(['name'=> $request->get('name')]);
    $plugin->deletePlugin();
    return response()->json( ['success' => true, 'data' => $plugin->toArray()], 200, [], JSON_UNESCAPED_UNICODE );
  }

  /**
   * Установить плагин
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function install( Request $request )
  {
    \Validator::make( $request->all(), [
      'name' => 'required',
      'version' => 'required'
    ] );
    $moduleName = $request->get( 'name' );
    $moduleVersion = $request->get( 'version' );
    $success = Module::install( $moduleName, $moduleVersion );
    $exitCode = Artisan::call( 'migrate', [ '--force' => true ] );
    if ( $success )
      return response()->json( 'Successfully installed!', 200 );

    return response()->json( 'Failed of installation!', 500 );
  }
}
