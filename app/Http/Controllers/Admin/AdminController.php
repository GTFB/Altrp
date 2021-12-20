<?php

namespace App\Http\Controllers\Admin;

use App\Area;
use App\Http\Controllers\Controller;
use App\Media;
use App\Page;
use App\PagesTemplate;
use App\Services\AltrpPluginsService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller{

  const TABLES = [
    'templates',
    'customizers',
    'models',
    'robots',
  ];

  public function export_json( Request $request ){

    $result = [];



  }

  /**
   * Получить список установленных плагинов
   * @param Request $request
   * @param AltrpPluginsService $altrpPluginsService
   * @return \Illuminate\Http\JsonResponse
   */
  public function plugins( Request $request, AltrpPluginsService $altrpPluginsService ){
    return response()->json( $altrpPluginsService->getDownloadedPluginsList(), 200, [], JSON_UNESCAPED_UNICODE );
  }
}
