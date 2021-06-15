<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Source;
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
class DataSourcesRolesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-datasource_roles.json";

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

        $data = DB::table( 'altrp_sources_roles' )
            ->select('altrp_sources_roles.*', 'roles.name as role_name')
            ->join('altrp_sources', 'altrp_sources_roles.source_id', '=', 'altrp_sources.id')
            ->join('roles', 'altrp_sources_roles.role_id', '=', 'roles.id')
            ->get();

        $source_data = DB::table( 'altrp_sources' )->where('type', '=', 'remote')->get();
        $roles_data = Role::all();

        $inserted = [];

        $table = DB::table( 'altrp_sources_roles' );
        //удаляем роли для sources type remote
        foreach ($source_data as $source) {
          $table->where('source_id', $source->id)->delete();
        }


        foreach ( $import_data as $source_role ) {
            $role = $roles_data->where( 'name', data_get( $source_role, 'role_name' ) )->first();
            $source = $source_data->where( 'name', data_get( $source_role, 'source_name' ) )->first();
            if( !$source || !$role ){
                continue;
            }

            $inserted[] = [
                'source_id' => $source->id,
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
        $data = DB::table( 'altrp_sources_roles' )
            ->select('altrp_sources_roles.*', 'roles.name as role_name', 'altrp_sources.name as source_name')
            ->join('altrp_sources', 'altrp_sources_roles.source_id', '=', 'altrp_sources.id')
            ->join('roles', 'altrp_sources_roles.role_id', '=', 'roles.id')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_sources_roles.source_id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
