<?php


namespace App\Services\ImportExport\Files;


use App\Page;
use App\Role;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для доступных для страниц ролей
 * Class PageRolesFile
 * @package App\Services\ImportExport\Files
 */
class PageRolesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-page_roles.json";

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

        $data = DB::table( 'page_role' )
            ->select('page_role.*', 'pages.guid as page_guid', 'roles.name as role_name')
            ->join('pages', 'page_role.page_id', '=', 'pages.id')
            ->join('roles', 'page_role.role_id', '=', 'roles.id')
            ->get();

        $pages_data = Page::all();
        $roles_data = Role::all();

        $inserted = [];

        $table = DB::table( 'page_role' );
        $table->delete();

        foreach ( $import_data as $page_role ) {
            $role = $roles_data->where( 'name', data_get( $page_role, 'role_name' ) )->first();
            $page = $pages_data->where( 'guid', data_get( $page_role, 'page_guid' ) )->first();
            if( !$page || !$role ){
                continue;
            }

            $inserted[] = [
                'page_id' => $page->id,
                'role_id' => $role->id,
            ];
        }

        //Делим, что бы при больших объемах не вызывать ошибку
        foreach (array_chunk($inserted,1000) as $t) {
            $table->insert($t);
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

        $data = DB::table( 'page_role' )
            ->select('page_role.*', 'pages.guid as page_guid', 'roles.name as role_name')
            ->join('pages', 'page_role.page_id', '=', 'pages.id')
            ->join('roles', 'page_role.role_id', '=', 'roles.id')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('page_role.page_id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
