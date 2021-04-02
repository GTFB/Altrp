<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Source;
use App\Altrp\ValidationField;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для колонок валидации
 * Class ValidationFieldsFile
 * @package App\Services\ImportExport\Files
 */
class ValidationFieldsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архивет
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-validation_fields.json";

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

        $data = DB::table( 'altrp_validation_fields' )
            ->select('altrp_validation_fields.*', 'altrp_models.name as model_name',
                'altrp_sources.url as source_url', 'altrp_sources.type as source_type',
                'altrp_columns.name as column_id_name', 'altrp_columns_models.name as column_model_name'
            )
            ->leftJoin('altrp_models', 'altrp_validation_fields.model_id', '=', 'altrp_models.id')
            ->leftJoin('altrp_sources', 'altrp_validation_fields.source_id', '=', 'altrp_sources.id')
            ->leftJoin('altrp_columns', 'altrp_validation_fields.column_id', '=', 'altrp_columns.id')
            ->leftJoin('altrp_models as altrp_columns_models', 'altrp_columns.model_id', '=', 'altrp_columns_models.id')
            ->get();

        $models_data = Model::all();

        $columns_data = Column::all();

        $sources_data = Source::all();

        $inserted = [];
        $updated = [];
        $deleted = [];

        //Формируем массив записей которые нужно обновить или добавить
        foreach ($import_data as $imported_field) {
            $model = $models_data->where("name"," = ", $imported_field["model_name"])->first();
            $column_model = $models_data->where( 'name', $imported_field['column_model_name'] )->first();
            $source = $sources_data->where( 'url', $imported_field['source_url'] )
                ->where('type', $imported_field['source_type'] )->first();

            if(!$model || !$source || !$column_model) {
                continue;
            }

            $column = $columns_data->where( 'name', $imported_field['column_id_name'] )
                ->where('model_id', $column_model->id )->first();

            $old_field = $data->where("model_id"," = ", $model->id)
                ->where("source_id"," = ", $source->id)
                ->where("column_id"," = ", $column->id )
                ->first();

            if($old_field && strtotime( $imported_field["updated_at"] ) > strtotime( $old_field->updated_at )) {
                $field = new ValidationField((array) $old_field);
                $field->column_id = $column->id;
                $field->model_id = $model->id;
                $field->source_id = $source->id;

                //Что бы запись обновилась
                $field->id = $old_field->id;
                $field->exists = true;

                $updated[] = $field;
            }

            if(!$old_field) {
                $new_field = new ValidationField( $imported_field );
                $new_field ->column_id = $column->id;
                $new_field ->model_id = $model->id;
                $new_field ->source_id = $source->id;

                $inserted[] = $new_field ;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $field) {

            $model = $models_data->where("id"," = ", $field->model_id)->first();
            $column = $columns_data->where( 'id', $field->column_id )->first();
            $source = $sources_data->where( 'id', $field->source_id )->first();

            if(!$import_data->where("model_name"," = ", $model->name)
                ->where("source_url"," = ", $source->url)
                ->where("source_type"," = ", $source->type)
                ->where("column_id_name"," = ", $column->name)->first()
            ) {
                $deleted_field = new ValidationField((array) $field);
                $deleted_field->id = $field->id;
                $deleted_field->exists = true;
                $deleted[] = $deleted_field;
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
    public function export(IWriter $writer, string $path)
    {
        $data = DB::table( 'altrp_validation_fields' )
            ->select('altrp_validation_fields.*', 'altrp_models.name as model_name',
                'altrp_sources.url as source_url', 'altrp_sources.type as source_type',
                'altrp_columns.name as column_id_name', 'altrp_columns_models.name as column_model_name'
            )
            ->leftJoin('altrp_models', 'altrp_validation_fields.model_id', '=', 'altrp_models.id')
            ->leftJoin('altrp_sources', 'altrp_validation_fields.source_id', '=', 'altrp_sources.id')
            ->leftJoin('altrp_columns', 'altrp_validation_fields.column_id', '=', 'altrp_columns.id')
            ->leftJoin('altrp_models as altrp_columns_models', 'altrp_columns.model_id', '=', 'altrp_columns_models.id')
            ->havingRaw('model_name IS NOT NULL')
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
