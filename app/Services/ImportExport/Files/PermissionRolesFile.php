<?php


namespace App\Services\ImportExport\Files;


use App\Role;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для доступных для ролей действий
 * Class PermissionRolesFile
 * @package App\Services\ImportExport\Files
 */
class PermissionRolesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-permissions_roles.json";

    /**
     * @param IReader $reader
     * @param string $path
     * @param bool $with_delete
     * @return mixed
     * @todo Выглядит не рабочим. Доделать.
     * Импорт настроек
     */
    public function import(IReader $reader, string $path, bool $with_delete = false)
    {
        $import_data = $reader->readJsonFile($path);

        foreach ( $import_data as $permission_role ) {
            $role = Role::where( 'name', $permission_role['role_name'] )->first();

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
        $data = DB::table( 'permission_role' )
            ->select('permission_role.*', 'permissions.name as permission_name', 'roles.name as role_name')
            ->join('permissions', 'permission_role.permission_id', '=', 'permissions.id')
            ->join('roles', 'permission_role.role_id', '=', 'roles.id')
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
