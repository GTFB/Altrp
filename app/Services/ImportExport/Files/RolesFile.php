<?php


namespace App\Services\ImportExport\Files;


use App\Role;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для ролей
 * Class RolesFile
 * @package App\Services\ImportExport\Files
 */
class RolesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-roles.json";

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

        $data = Role::all();

        $inserted = [];
        $deleted = [];

        foreach ( $import_data  as $imported_role ) {
            if( $data->where( 'name', $imported_role['name'] )->first() ){
                continue;
            }

            $new_role = new Role( $imported_role );
            $inserted[] = $new_role;
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $role) {
            if(!$import_data->where("name"," = ", $role->name)->first()) {
                $deleted[] = $role;
            }
        }

        $this->insertValues($inserted);

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
        $data = DB::table( 'roles' )
            ->select('roles.*')
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
