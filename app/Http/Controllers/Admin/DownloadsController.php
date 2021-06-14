<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AltrpImportExportService;
use App\Services\ImportExport\ExportService;
use App\Services\ImportExport\Writers\EncodeWriter;
use App\Services\ImportExport\Writers\StreamWriter;
use Illuminate\Http\Request;

class DownloadsController extends Controller{
  /**
   * @param AltrpImportExportService $altrpImportExportService
   * @return \Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\BinaryFileResponse
   */
  public function exportAltrpSettings(){

      set_time_limit(0);

      $writer = new EncodeWriter();
      $export_service = new ExportService($writer);

      try {
          $filename = $export_service->exportAll();
      }
      catch( \Exception $e ) {
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

    public function exportStreamAltrpSettings(Request $request){

        set_time_limit(0);

        $writer = new StreamWriter();
        $export_service = new ExportService($writer);

        try {
            $filename = $export_service->exportAll();
        }
        catch( \Exception $e ) {
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

  public function exportAltrpFilteredSettings(Request $request){

    set_time_limit(0);

    $writer = new EncodeWriter();
    $export_service = new ExportService($writer);

    try {
      $params = $request->all();
      $filename = $export_service->exportFilteredAll($params);
    }
    catch( \Exception $e ) {
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
