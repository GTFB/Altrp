<?php


namespace App\Services\ImportExport\Files;

use App\Altrp\AltrpDiagram;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для диаграм
 * Class DiagramsFile
 * @package App\Services\ImportExport\Files
 */
class DiagramsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-diagrams.json";

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

        $data = AltrpDiagram::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_diagram ) {
            $old_diagram = $data->where( 'guid', $imported_diagram['guid'] )->first();

            if( $old_diagram ){
                $author = $old_diagram->author;
                $old_diagram->fill((array) $imported_diagram);
                $old_diagram->author = $author;

                if(count($old_diagram->getDirty()) > 0) {
                    $updated[] = $old_diagram;
                }
            }
            else {
                $new_diagram = new AltrpDiagram($imported_diagram);
                $new_diagram->author = auth()->user()->id;
                $inserted[] = $new_diagram;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $diagram) {
            if(!$import_data->where("guid"," = ", $diagram->guid)->first()) {
                $deleted[] = $diagram;
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
        $data = DB::table( 'altrp_diagrams' )
            ->select('altrp_diagrams.*')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_diagrams.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
