<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\AltrpDiagram;
use App\Http\Controllers\Controller;
use App\Services\AltrpImportExportService;
use App\Services\ImportExport\ImportService;
use App\Services\ImportExport\Readers\JsonDecodeReader;
use App\Services\ImportExport\Readers\JsonStreamingReader;
use Illuminate\Http\Request;

class ImportsController extends Controller{


  /**
   * @param AltrpImportExportService $altrpImportExportService
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function importAltrpSettings( AltrpImportExportService $altrpImportExportService, Request $request ){

    set_time_limit(0);
    try {
      $altrpImportExportService->importAltrpSettings( $request );
    } catch ( \Exception $e ){
      return response()->json( ['success' => false, 'message' => $e->getMessage(), 'stack' => $e->getTrace()],
        500,
        [],
        JSON_UNESCAPED_UNICODE);
    }
    return response()->json( ['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
  }


  public function importCustomAltrpSettings( Request $request ){

      set_time_limit(0);

      try {
          $reader = new JsonDecodeReader();
          $import_service = new ImportService($reader, $request->file( 'files' )[0]);
          $import_service->importAll();
      } catch ( \Exception $e ){
          return response()->json( ['success' => false, 'message' => $e->getMessage(), 'stack' => $e->getTrace()],
              500,
              [],
              JSON_UNESCAPED_UNICODE);
      }
      return response()->json( ['success' => true], 200, [], JSON_UNESCAPED_UNICODE);

  }
}
