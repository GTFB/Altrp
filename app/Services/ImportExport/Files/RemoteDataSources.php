<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Column;
use App\Altrp\Controller;
use App\Altrp\Model;
use App\Altrp\Query;
use App\Altrp\RemoteData;
use App\Altrp\RemoteDataType;
use App\Altrp\Source;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use App\SQLEditor;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для удаленных справочников
 * Class RemoteDataFile
 * @package App\Services\ImportExport\Files
 */
class RemoteDataSources extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-remote_datasource.json";

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

        $data = DB::table( 'altrp_sources' )
            ->select('altrp_sources.*', 'altrp_models.name as model_name', 'altrp_controllers.namespace as controller_namespace', 'permissions.name as permission_name', 'roles.name as role_name')
            ->leftJoin('altrp_models', 'altrp_sources.model_id', '=', 'altrp_models.id')
            ->leftJoin('altrp_controllers', 'altrp_sources.controller_id', '=', 'altrp_controllers.id')
            ->leftJoin('altrp_sources_permissions', 'altrp_sources.id', '=', 'altrp_sources_permissions.source_id')
            ->leftJoin('altrp_sources_roles', 'altrp_sources.id', '=', 'altrp_sources_roles.source_id')
            ->leftJoin('roles', 'altrp_sources_roles.role_id', '=', 'roles.id')
            ->leftJoin('permissions', 'altrp_sources_permissions.permission_id', '=', 'permissions.id')
            ->havingRaw('type = "remote"')
            ->get();

        $models_data = Model::all();
        $controllers_data = Controller::all();

        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_remote_data ) {

            $model = $models_data->where( 'name', $imported_remote_data['model_name'] )->first();

            if(!$model) {
                continue;
            }

            $controller_id = $controllers_data->where( 'model_id', $model->id )->first();

            $new_remote_datasource = new Source($imported_remote_data);
            $new_remote_datasource->model_id = $model->id;
            $new_remote_datasource->controller_id = $controller_id;
            $inserted[] = $new_remote_datasource;

        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $remote_datasource) {
            $deleted_remote_datasource = new Source((array) $remote_datasource);
            $deleted_remote_datasource->id = $remote_datasource->id;
            $deleted[] = $deleted_remote_datasource;
        }

        //dd($inserted, $updated, $deleted);
        $this->deleteValues($deleted, false);
        $this->insertValues($inserted);

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
      $data = DB::table( 'altrp_sources' )
        ->select('altrp_sources.*', 'altrp_models.name as model_name', 'altrp_controllers.namespace as controller_namespace', 'permissions.name as permission_name', 'roles.name as role_name')
        ->leftJoin('altrp_models', 'altrp_sources.model_id', '=', 'altrp_models.id')
        ->leftJoin('altrp_controllers', 'altrp_sources.controller_id', '=', 'altrp_controllers.id')
        ->leftJoin('altrp_sources_permissions', 'altrp_sources.id', '=', 'altrp_sources_permissions.source_id')
        ->leftJoin('altrp_sources_roles', 'altrp_sources.id', '=', 'altrp_sources_roles.source_id')
        ->leftJoin('roles', 'altrp_sources_roles.role_id', '=', 'roles.id')
        ->leftJoin('permissions', 'altrp_sources_permissions.permission_id', '=', 'permissions.id')
        ->havingRaw('type = "remote"')
        ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }

}
