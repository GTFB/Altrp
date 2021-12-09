<?php


namespace App\Services\ImportExport\Files;

use App\Altrp\Customizer;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для кастомайзера
 * Class Customizer
 * @package App\Services\ImportExport\Files
 */
class CustomizerFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-customizer.json";

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

        //$data = Media::all();

        $data = DB::table( 'altrp_customizers' )
            ->select('altrp_customizers.*')
            ->get();

        $inserted = [];

        foreach ( $import_data as $_сustomizer ){
            if( $data->where( 'guid', $_сustomizer['guid'] )->first() ){
                continue;
            }

            $new_сustomizer = new Customizer( $_сustomizer );

            $inserted[] = $new_сustomizer;
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
        $data = DB::table( 'altrp_customizers' )
            ->select('altrp_customizers.*')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_customizers.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
