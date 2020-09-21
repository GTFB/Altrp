<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\AltrpDiagram;
use App\Http\Controllers\Controller;
use App\Services\AltrpImportExportService;
use Illuminate\Http\Request;

class ImportsController extends Controller{


  /**
   * @param AltrpImportExportService $altrpImportExportService
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function importAltrpSettings( AltrpImportExportService $altrpImportExportService, Request $request ){
    try {
      $altrpImportExportService->importAltrpSettings( $request );
    } catch ( \Exception $e ){
      return response()->json( ['success' => false, 'message' => $e->getMessage(), 'stack' => $e->getTrace()],
        $e->getCode() ? $e->getCode() : 500,
        [],
        JSON_UNESCAPED_UNICODE);
    }
    return response()->json( ['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
  }
}
