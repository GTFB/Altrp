<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\AltrpDiagram;
use App\Http\Controllers\Controller;
use App\Services\AltrpImportExportService;
use Illuminate\Http\Request;

class DownloadsController extends Controller{
  /**
   * @param AltrpImportExportService $altrpImportExportService
   * @return \Illuminate\Http\JsonResponse
   */
  public function exportAltrpSettings( AltrpImportExportService $altrpImportExportService ){
    try {
      $filename = $altrpImportExportService->exportAltrpSettings();
    } catch ( \Exception $e ){
      return response()->json(
        ['success' => false,
          'error' => $e->getMessage(),
          'stack' => $e->getTrace(),
        ],
        500,
        [],
        JSON_UNESCAPED_UNICODE
      );
    }
    return response()->download( $filename )->deleteFileAfterSend();
  }


}
