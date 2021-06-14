<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Model;
use App\Altrp\Query;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для sql builder
 * Class QueriesFile
 * @package App\Services\ImportExport\Files
 */
class QueriesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-queries.json";

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

        $data = Query::with("model")->get();
        $models_data = Model::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_query ) {
            $model = $models_data->where( 'name', $imported_query['model_name'] )->first();

            if( ! $model ){
                continue;
            }

            $old_query = $data->where( 'name', $imported_query['name'] )->where("model_id", "=", $model->id)->first();

            if($old_query && date( $imported_query['updated_at'] ) > date( $old_query->updated_at )) {

                $user_id = $old_query->user_id;
                $old_query->fill($this->getQuery($imported_query));
                $old_query->model_id = $model->id;
                $old_query->user_id = $user_id;

                if(count($old_query->getDirty()) > 0) {
                    $updated[] = $old_query;
                }

                $updated[] = $old_query;
            }

            if(!$old_query) {
                $new_query = new Query( $this->getQuery($imported_query) );
                $new_query->model_id = $model->id;
                $new_query->user_id = auth()->user()->id;
                $inserted[] = $new_query;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $query) {
            if(!$import_data->where("name"," = ", $query->name)->where("model_name"," = ", $query->model->name)->first()) {
                $deleted[] = $query;
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
     * Создаем объект класса Query из импортируемых данных
     * @param array $imported_query
     * @return array
     */
    private function getQuery(array $imported_query ) {

        $imported_query["columns"] = json_decode( $imported_query["columns"]);
        $imported_query["joins"] = json_decode( $imported_query["joins"]);
        $imported_query["aggregates"] = json_decode( $imported_query["aggregates"]);
        $imported_query["conditions"] = json_decode( $imported_query["conditions"]);
        $imported_query["relations"] = json_decode( $imported_query["relations"]);
        $imported_query["order_by"] = json_decode( $imported_query["order_by"]);
        $imported_query["group_by"] = json_decode( $imported_query["group_by"]);
        $imported_query["access"] = json_decode( $imported_query["access"]);

        return $imported_query;
    }

    /**
     * Экспорт настроек
     * @param IWriter $writer
     * @param string $path
     * @return mixed
     */
    public function export(IWriter $writer, string $path, array $params = [])
    {
        $data = DB::table( 'altrp_queries' )
            ->select('altrp_queries.*', 'altrp_models.name as model_name')
            ->leftJoin('altrp_models', 'altrp_queries.model_id', '=', 'altrp_models.id')
            ->havingRaw('model_name IS NOT NULL')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_queries.model_id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
