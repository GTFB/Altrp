<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Model;
use App\Altrp\Relationship;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Класс экспорта импорта для связей
 * Class RelationshipsFile
 * @package App\Services\ImportExport\Files
 */
class RelationshipsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-relationships.json";

    /**
     * типы обратных связей, выполняются во вторую очередь
     */
    const REVERSE_TYPES = ["belongsTo", "belongsToMany"];

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

        $data = $this->getData();
        $models_data = Model::all();
        $deleted = [];

        $main = $import_data->filter(function ($value, $key) {
            return array_search($value["type"], self::REVERSE_TYPES) === false;
        });

        $reverse = $import_data->whereIn("type", self::REVERSE_TYPES);



        $crud_main_data = $this->getCRUDValues($main, $data, $models_data);



        $this->insertValues($crud_main_data["inserted"]);
        /**
         * @todo Связь есть, нет ключа
         */
        $this->updateValues($crud_main_data["updated"]);

        $data = $this->getData();

        $crud_reverse_data = $this->getCRUDValues($reverse, $data, $models_data);

        $this->insertValues($crud_reverse_data["inserted"]);
        $this->updateValues($crud_reverse_data["updated"]);

        //Формируем массив записей которые нужно удалить
        foreach ($data as $relation) {
            if(!$import_data->where("name"," = ", $relation->name)->where("model_name"," = ", $relation->altrp_model->name)->first()) {
                $deleted[] = $relation;
            }
        }

        if($with_delete) {
            $this->deleteValues($deleted, false);
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
        $data = DB::table( 'altrp_relationships' )
            ->select('altrp_relationships.*', 'models.name as model_name', 'target_models.name as target_model_name' )
            ->leftJoin('altrp_models as models', 'altrp_relationships.model_id', '=', 'models.id')
            ->leftJoin('altrp_models as target_models', 'altrp_relationships.target_model_id', '=', 'target_models.id')
            ->havingRaw('model_name IS NOT NULL AND target_model_name IS NOT NULL')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_relationships.model_id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }

    private function getCRUDValues(Collection $import_data, Collection $data, Collection $models_data) {

        $updated = [];
        $inserted = [];

        foreach ( $import_data as $imported_relation ) {
            $model = $models_data->where( 'name', $imported_relation[ 'model_name'] )->first();
            if( ! $model ){
                continue;
            }
            $target_model = $models_data->where( 'name', $imported_relation[ 'target_model_name'] )->first();
            if( ! $target_model ){
                continue;
            }

            $old_relation = $data->where("model_id", "=", $model->id )
                ->where('name', "=", $imported_relation['name'])->first();

            if($old_relation) {
                $old_relation->fill((array) $imported_relation);
                $old_relation->target_model_id = $target_model->id;
                $old_relation->model_id = $model->id;

                if(count($old_relation->getDirty()) > 0) {
                    $updated[] = $old_relation;
                }
            }
            else {
                $new_relation = new Relationship($imported_relation);
                $new_relation->model_id = $model ? $model->id : null;
                $new_relation->target_model_id = $target_model ? $target_model->id : null;

                $inserted[] = $new_relation;
            }
        }

        return [
            "inserted" => $inserted,
            "updated" => $updated
        ];

    }

    /**
     * Получение данных о имеющихся связях
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    private function getData() {
        return Relationship::with(["altrp_target_model.altrp_table", "altrp_model.altrp_table"])
            ->has("altrp_model")->has("altrp_target_model")->get();
    }
/*
    protected function insertValues(array $values)
    {
        foreach ($values as $value) {
            try {
                $state = false;
                if($value->add_belong_to) {
                    $state = true;
                    $value->add_belong_to = false;
                }
                $data = $value->save();

                if($state) {
                    DB::table("altrp_relationships")->where("id","=", $data->id)->update(["add_belong_to" => 1]);
                }

            } catch ( \Exception $e ) {
                Log::error( $e->getMessage(), $value->toArray() );
            }
        }
    }*/
}
