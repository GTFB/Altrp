<?php


namespace App\Services\ImportExport\Files;


use App\Reports;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для отчетов
 * Class ReportsFile
 * @package App\Services\ImportExport\Files
 */
class ReportsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-reports.json";

    /**
     * Импорт настроек
     * @param IReader $reader
     * @param string $path
     * @param bool $with_delete
     * @return mixed
     */
    public function import(IReader $reader, string $path, bool $with_delete = false)
    {
        $import_data = collect($reader->readJsonFile($path));

        $data = Reports::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_report ) {
            $old_report = $data->where( 'guid', $imported_report['guid'] )->first();
            if( $old_report ){
                $user_id = $old_report->user_id;
                $old_report->fill((array) $imported_report);
                $old_report->user_id = $user_id;

                if(count($old_report->getDirty()) > 0) {
                    $updated[] = $old_report;
                }
            }
            else {
                $new_report = new Reports($imported_report);
                $new_report->user_id = auth()->user()->id;
                $inserted[] = $new_report;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $report) {
            if(!$import_data->where("guid"," = ", $report->guid)->first()) {
                $deleted[] = $report;
            }
        }

        $this->insertValues($inserted);
        $this->updateValues($updated);

        if($with_delete) {
            $this->deleteValues($deleted);
        }

        return $this;
    }

    /**
     * Экспорт настроек
     * @param IWriter $writer
     * @param string $path
     * @return mixed
     */
    public function export(IWriter $writer, string $path, array $params = [])
    {
        $data = DB::table( 'reports' )
            ->select('reports.*')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('reports.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
