<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Column;
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
class RemoteDataFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-remote_data.json";

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

        $data = DB::table( 'altrp_remote_data' )
            ->select('altrp_remote_data.*', 'altrp_models.name as model_name', 's_q_l_editors.name as editor_name',
                's_q_l_editors.model_id as editor_model_id', 'altrp_queries.name as query_name', 'altrp_queries.model_id as query_model_id')
            ->leftJoin('altrp_models', 'altrp_remote_data.remotable_id', '=', 'altrp_models.id')
            ->leftJoin('s_q_l_editors', 'altrp_remote_data.remotable_id', '=', 's_q_l_editors.id')
            ->leftJoin('altrp_queries', 'altrp_remote_data.remotable_id', '=', 'altrp_queries.id')
            ->get();

        $models_data = Model::all();
        $columns_data = Column::all();
        $sources_data = Source::all();
        $sql_editors_data = SQLEditor::all();
        $queries_data = Query::all();

        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_remote_data ) {

            $remotable = $this->getRemotable($imported_remote_data, $models_data, $sql_editors_data, $queries_data);

            if(!$remotable) {
                continue;
            }

            $column_id = null;

            if( !is_null($imported_remote_data["column_id"]) ) {
                $column_model = $models_data->where( 'name', $imported_remote_data['column_model_name'] )->first();
                $column_id = $columns_data->where( 'name', $imported_remote_data['column_id_name'] )
                    ->where('model_id', $column_model->id )->first();
            }


            $source_list = $sources_data->where( 'url', $imported_remote_data['list_source_url'] )
                ->where('type', $imported_remote_data['list_source_type'] )->first();
            $source_single = $sources_data->where( 'url', $imported_remote_data['single_source_url'] )
                ->where('type', $imported_remote_data['single_source_type'] )->first();


            if(!$source_list || !$source_single) {
                continue;
            }

            $new_remote_data = new RemoteData($imported_remote_data);
            $new_remote_data->column_id = $column_id;
            $new_remote_data->single_source_id = $source_single->id;
            $new_remote_data->list_source_id = $source_list->id;
            $new_remote_data->remotable_id = $remotable->id;
            $inserted[] = $new_remote_data;

        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $remote_data) {
            $deleted_remote_data = new RemoteData((array) $remote_data);
            $deleted_remote_data->id = $remote_data->id;
            $deleted_remote_data->exists = true;
            $deleted[] = $deleted_remote_data;
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
        $data = DB::table( 'altrp_remote_data' )
            ->select('altrp_remote_data.*', 'altrp_models.name as model_name',
                's_q_l_editors.name as editor_name', 's_q_l_editors_models.name as editor_model_name',
                'altrp_queries.name as query_name', 'altrp_queries_models.name as query_model_name',
                'altrp_sources_single.url as single_source_url', 'altrp_sources_single.type as single_source_type',
                'altrp_sources_list.url as list_source_url', 'altrp_sources_list.type as list_source_type',
                'altrp_columns.name as column_id_name', 'altrp_columns_models.name as column_model_name'
            )
            ->leftJoin('altrp_models', 'altrp_remote_data.remotable_id', '=', 'altrp_models.id')
            ->leftJoin('s_q_l_editors', 'altrp_remote_data.remotable_id', '=', 's_q_l_editors.id')
            ->leftJoin('altrp_models as s_q_l_editors_models', 's_q_l_editors.model_id', '=', 's_q_l_editors_models.id')
            ->leftJoin('altrp_queries', 'altrp_remote_data.remotable_id', '=', 'altrp_queries.id')
            ->leftJoin('altrp_models as altrp_queries_models', 'altrp_queries.model_id', '=', 'altrp_queries_models.id')

            ->leftJoin('altrp_sources as altrp_sources_single', 'altrp_remote_data.single_source_id', '=', 'altrp_sources_single.id')
            ->leftJoin('altrp_sources as altrp_sources_list', 'altrp_remote_data.list_source_id', '=', 'altrp_sources_list.id')

            ->leftJoin('altrp_columns', 'altrp_remote_data.column_id', '=', 'altrp_columns.id')
            ->leftJoin('altrp_models as altrp_columns_models', 'altrp_columns.model_id', '=', 'altrp_columns_models.id')
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }


    /**
     * Получаем источник к которому приминяется удаленный справочник
     * @param $remote_data
     * @param Collection $models_data
     * @param Collection $sql_editors_data
     * @param Collection $queries_data
     * @return bool|mixed
     */
    private function getRemotable($remote_data, Collection $models_data, Collection $sql_editors_data, Collection $queries_data) {

        $remotable = false;

        if($remote_data["remotable_type"] == RemoteDataType::QUERY) {
            $model = $models_data->where( 'name', $remote_data['query_model_name'] )->first();
            $remotable = $queries_data->where( 'name', $remote_data['query_name'] )
                ->where('model_id', $model ? $model->id : null)->first();
        }
        else if($remote_data["remotable_type"] == RemoteDataType::SQL_EDITOR) {
            $model = $models_data->where( 'name', $remote_data['editor_model_name'] )->first();
            $remotable = $sql_editors_data->where( 'name', $remote_data['editor_name'] )
                ->where('model_id', $model ? $model->id : null)->first();
        }
        else if($remote_data["remotable_type"] == RemoteDataType::MODEL) {
            $remotable = $models_data->where( 'name', $remote_data['model_name'] )->first();
        }

        return $remotable;

    }
}
