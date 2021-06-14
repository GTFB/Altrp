<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Table;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для колонок
 * Class ColumnsFile
 * @package App\Services\ImportExport\Files
 */
class ColumnsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-columns.json";

    /**
     * Исключения, миграции создаются моделью
     */
    const SOFT_DELETE_EXCEPTION = ["deleted_at"];

    /**
     * Исключения, миграции создаются моделью
     */
    const TIME_STAMPS_EXCEPTION = ["created_at", "updated_at"];

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

        $data = Column::where("name", "!=", "id")->has('altrp_model')->with(["altrp_model", "altrp_model.altrp_table"])->get();
        $tables_data = Table::all();
        $models_data = Model::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_column ) {
            $model = $models_data->where( 'name', $imported_column['model_name'] )->first();
            $table = $tables_data->where( 'name', $imported_column['table_name'] )->first();

            if( ! $model || !$table ){
                continue;
            }

            $old_column = $data->where( 'model_id', $model->id )->where('name', '=', $imported_column['name'])->first();

            if($old_column) {
                $user_id = $old_column->user_id;
                $migration_id = $old_column->altrp_migration_id;
                $old_column->fill((array) $imported_column);
                $old_column->table_id = $table->id;
                $old_column->model_id = $model->id;
                $old_column->user_id = $user_id;
                $old_column->altrp_migration_id = $migration_id;
                if(count($old_column->getDirty()) > 0 && $this->checkException($old_column)) {
                    $updated[] = $old_column;
                }
            }
            else {
                $new_column = new Column($imported_column);
                $new_column->table_id = $table->id;
                $new_column->model_id = $model->id;
                $new_column->user_id = auth()->user()->id;

                if($this->checkException($new_column)) {
                    $inserted[] = $new_column;
                }
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $column) {
            if(!$import_data->where("name"," = ", $column->name)->where("model_name"," = ", $column->altrp_model->name)->first()) {
                $deleted[] = $column;
            }
        }

        $this->insertValues($inserted);
        $this->updateValues($updated);

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
        $data = DB::table( 'altrp_columns' )
            ->select('altrp_columns.*', 'tables.name as table_name', 'altrp_models.name as model_name')
            ->leftJoin('altrp_models', 'altrp_columns.model_id', '=', 'altrp_models.id')
            ->leftJoin('tables', 'altrp_columns.table_id', '=', 'tables.id')
            ->havingRaw('table_name IS NOT NULL AND model_name IS NOT NULL')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_columns.table_id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }


    /**
     * Функция проверки колонки на исключение
     * @param Column $column
     * @return bool
     */
    private function checkException(Column $column) {

        if(!$column->altrp_model) {
            return false;
        }

        if($column->name == "id") {
            return false;
        }

        if($column->altrp_model->soft_deletes && array_search($column->name, self::SOFT_DELETE_EXCEPTION) !== false) {
            return false;
        }

        if($column->altrp_model->time_stamps && array_search($column->name, self::TIME_STAMPS_EXCEPTION) !== false) {
            return false;
        }

        return true;
    }
}
