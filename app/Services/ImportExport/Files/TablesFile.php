<?php


namespace App\Services\ImportExport\Files;

use App\Altrp\Table;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для таблиц
 * Class TablesFile
 * @package App\Services\ImportExport\Files
 */
class TablesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-tables.json";

    /**
     * Импорт настроек
     * @param IReader $reader
     * @param string $path
     * @param bool $with_delete
     * @return mixed
     */
    public function import(IReader $reader, string $path, bool $with_delete = false)
    {
        //Таблицы теперь создаются при создании модели.

        $import_data = collect($reader->readJsonFile($path));

        $data = Table::all();

        $deleted = [];

        //Формируем массив записей которые нужно удалить
        foreach ($data as $table) {
            if(!$import_data->where("name"," = ", $table->name)->first()) {
                $deleted[] = $table;
            }
        }

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
        $data = DB::table( 'tables' )
            ->select('tables.*')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('tables.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
