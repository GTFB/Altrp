<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\Plugin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
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
          $plugin->updatePluginSettings();
        }
      }
    }
    Plugin::updateAltrpPluginLists();
    return response()->json( $res, $status, [], JSON_UNESCAPED_UNICODE );
  }

  /**
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
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   * @throws \Illuminate\Validation\ValidationException
   */
  public function install( Request $request )
  {
    $res = ['success' => true, ];
    $status = 200;
    $this->validate($request,
      ['name'=>'required',
        'update_url' => 'required',]
    );


    $client = new \GuzzleHttp\Client;
    try{

      $response = $client->get( $request->get('update_url'), [
        'headers' => [
          'altrp-domain-resource' => str_replace(['https://', 'http://'], '', $request->root()),
          'authorization' => request()->cookie('altrpMarketApiToken'),
        ]
      ])->getBody()->getContents();
    } catch(\Throwable $e){
      $res = ['success' => false,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTrace(),
        ];
      $status = 500;
      return response()->json( $res, $status, [], JSON_UNESCAPED_UNICODE );
    }

    $temp_path = storage_path( 'temp' );
    $plugin = new Plugin(['name'=>$request->get('name')]);
    File::ensureDirectoryExists( $temp_path );
    $filename = $temp_path . '/' . $plugin->name . '.zip';
    File::put( $filename,  $response );
    $archive = new \ZipArchive();

    if ( ! $archive->open( $filename ) ) {
      $res = ['success' => false,'message' => 'Zip archive could not be open'];
      $status = 500;
      return response()->json( $res, $status, [], JSON_UNESCAPED_UNICODE );
    }

    if ( ! $archive->extractTo( $plugin->getPath() ) ) {
      $archive->close();
      File::deleteDirectory( $temp_path );
      $res = ['success' => false,'message' => 'Zip archive could not be extracted'];
      $status = 500;
      return response()->json( $res, $status, [], JSON_UNESCAPED_UNICODE );
    }
    $archive->close();
    File::deleteDirectory( $temp_path );
    $plugin->updatePluginSettings();
    return response()->json( $res, $status, [], JSON_UNESCAPED_UNICODE );
  }
}
