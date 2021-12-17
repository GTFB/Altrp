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
  public function update_plugin_files( Request $request )
  {
    $res = ['success' => true, ];
    $status = 200;

    $plugin = new Plugin(['name'=> $request->get('name')]);

    $client = new \GuzzleHttp\Client;
    if( $request->get('version_check') ){

      $version = $client->get( $plugin->check_version_url, [
        'query' => ['plugin_name' => $plugin->name],
        'headers' => [
          'Authorization' => request()->cookie('altrpMarketApiToken'),
        ]
      ] )->getBody()->getContents();
      $version = json_decode( $version );
      $version = data_get( $version, 'data.version' );
      if( ! $version ){
        $status = 404;
        $res['success'] = false;
        $res['data']['message'] = 'Not Found New Version';
      } elseif( version_compare( $plugin->version, $version ) !== -1 ){
        $status = 404;
        $res['success'] = false;
        $res['data']['message'] = 'Not Found New Version';
      }
      if($status === 404){
        return response()->json( $res, $status, [], JSON_UNESCAPED_UNICODE );
      }
    }

    if( ! $plugin->update_url ){
      $status = 404;
      $res['success'] = false;
      $res['data']['message'] = 'Update_url not Found in Plugin';
    } else {
      if( ! $plugin->updatePluginFiles() ){
        $status = 500;
        $res['success'] = false;
        $res['data']['message'] = 'Update Plugin Files Error';
      } else {
        $plugin->clearMetadata();
        if( $plugin->enabled ){
          $plugin->updatePluginStaticFiles();
        }
      }
    }

    return response()->json( $res, $status, [], JSON_UNESCAPED_UNICODE );
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
