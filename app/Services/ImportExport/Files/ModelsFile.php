<?php


namespace App\Services\ImportExport\Files;

use App\Altrp\Model;
use App\Altrp\Table;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для моделей
 * Class ModelsFile
 * @package App\Services\ImportExport\Files
 */
class ModelsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-models.json";

    const EXCEPT_MODELS = ["user"];

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

        $data = Model::where("preset", "!=", "1")->whereNotIn("name", self::EXCEPT_MODELS)->with("table")->get();

        $tables_data = Table::all();

        $models_data = Model::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_model ) {
            $old_model = $data->where( 'name', $imported_model['name'] )->first();
            $table = $tables_data->where( 'name', $imported_model['table_name'] )->first();

            if( $old_model && $table && strtotime( $imported_model["updated_at"] ) > strtotime( $old_model->updated_at )){

                $parent_model = $models_data->where( 'name', $imported_model['parent_model_name'] )->first();
                $old_model->fill((array) $imported_model);
                $old_model->table_id = $table->id;
                $old_model->parent_model_id = $parent_model ? $parent_model->id : null;

                $updated[] = $old_model;
            }

            if(!$old_model) {
                $parent_model = $models_data->where( 'name', $imported_model['parent_model_name'] )->first();
                $new_model = new Model($imported_model);

                if($table && is_null($new_model->parent_model_id)) {
                    $table->delete();
                }

                $new_model->parent_model_id = $parent_model ? $parent_model->id : null;
                $new_model->table_id = null;
                $inserted[] = $new_model;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $model) {
            if(!$import_data->where("name"," = ", $model->name)->first()) {
                $deleted[] = $model;
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
     * Экспорт настроек
     * @param IWriter $writer
     * @param string $path
     * @return mixed
     */
    public function export(IWriter $writer, string $path, array $params = [])
    {
        $data = DB::table( 'altrp_models' )
            ->select('altrp_models.*', 'tables.name as table_name', 'parent_models.name as parent_model_name')
            ->leftJoin('tables', 'altrp_models.table_id', '=', 'tables.id')
            ->leftJoin('altrp_models as parent_models', 'altrp_models.parent_model_id', '=', 'parent_models.id')
            ->where("altrp_models.preset", "=", 0)
            ->whereNotIn('altrp_models.name', self::EXCEPT_MODELS)
            ->havingRaw('table_name IS NOT NULL')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_models.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
