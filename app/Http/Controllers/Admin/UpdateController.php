<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Services\AltrpUpdateService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateController extends Controller
{
  public function check_update( AltrpUpdateService $updateService ){
    try {
      $new_version = $updateService->get_version();
    } catch ( NotFoundHttpException $e ){
      return response()->json( ['message' => $e->getMessage()], 404 );
    }
    $res = ['result' => false];
    if( version_compare( $new_version, getLatestVersion()) > 0){
      $res = ['result' => true];
    }
    return response()->json( $res );
  }
}