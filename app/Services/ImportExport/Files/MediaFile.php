<?php


namespace App\Services\ImportExport\Files;


use App\Media;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;


/**
 * Класс экспорта импорта для данных по медиафайлам
 * Class MediaFile
 * @package App\Services\ImportExport\Files
 */
class MediaFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-media.json";

    /**
     * Импорт настроек
     * @param IReader $reader
     * @param string $path
     * @param bool $with_delete
     * @return mixed
     */
    public function import(IReader $reader, string $path, bool $with_delete = false )
    {
        $import_data = collect($reader->readJsonFile($path));

        $data = Media::all();

            DB::table( 'altrp_media' )
            ->select('altrp_media.*')
            ->get();

        $inserted = [];

        foreach ( $import_data as $_media ){
            if( $data->where( 'url', $_media['url'] )->first() ){
                continue;
            }

            $new_media = new Media( $_media );
            $new_media->author = auth()->user()->id;

            $inserted[] = $new_media;
        }

        $this->insertValues($inserted);

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
        $data = DB::table( 'altrp_media' )
            ->select('altrp_media.*')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_media.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
