<?php


namespace App\Services\ImportExport\Files;


use App\Dashboards;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для дашбордов
 * Class DashboardsFile
 * @package App\Services\ImportExport\Files
 */
class DashboardsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-dashboards.json";

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

        $data = Dashboards::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_dashboard ) {
            $old_dashboard = $data->where( 'guid', $imported_dashboard['guid'] )->first();

            if( $old_dashboard ){
                $user_id = $old_dashboard->user_id;
                $old_dashboard->fill((array) $imported_dashboard);
                $old_dashboard->user_id = $user_id;

                if(count($old_dashboard->getDirty()) > 0) {
                    $updated[] = $old_dashboard;
                }
            }
            else {
                $new_dashboard = new Dashboards($imported_dashboard);
                $new_dashboard->user_id = auth()->user()->id;
                $inserted[] = $new_dashboard;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $dashboard) {
            if(!$import_data->where("guid"," = ", $dashboard->guid)->first()) {
                $deleted[] = $dashboard;
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
    public function export(IWriter $writer, string $path)
    {
        $data = DB::table( 'dashboards' )
            ->select('dashboards.*')
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
