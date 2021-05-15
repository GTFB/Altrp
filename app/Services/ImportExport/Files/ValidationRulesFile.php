<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Model;
use App\Altrp\ValidationField;
use App\Altrp\ValidationRule;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для колонок валидации
 * Class ValidationRulesFile
 * @package App\Services\ImportExport\Files
 */
class ValidationRulesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архивет
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-validation_rules.json";

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

        $data = ValidationRule::with(["validation_field", "validation_field.model"])->get();
        $models_data = Model::all();
        $fields_data = ValidationField::all();

        $inserted = [];
        $updated = [];
        $deleted = [];

        //Формируем массив записей которые нужно обновить или добавить
        foreach ($import_data as $imported_rule) {

            $model = $models_data->where("name"," = ", $imported_rule["model_name"])->first();
            if(!$model) {
                continue;
            }

            $field = $fields_data->where( 'name', $imported_rule['validation_field_name'] )
                ->where("model_id", "=", $model->id)->first();

            if(!$field) {
                continue;
            }

            $old_rule = $data->where("validation_field_id"," = ", $field->id)
                ->where("rule"," = ", $imported_rule["rule"])->first();

            if($old_rule && strtotime( $imported_rule["updated_at"] ) > strtotime( $old_rule->updated_at )) {

                $old_rule->fill((array) $imported_rule);
                $old_rule->validation_field_id = $field->id;

                if(count($old_rule->getDirty()) > 0) {
                    $updated[] = $old_rule;
                }
            }

            if(!$old_rule) {
                $new_rule = new ValidationRule( $imported_rule );
                $new_rule->validation_field_id = $field->id;

                $inserted[] = $new_rule ;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $rule) {
            $field = $fields_data->where("id"," = ", $rule->validation_field_id)->first();
            $model = $models_data->where( 'id', $field->model_id )->first();

            if(!$import_data->where("model_name"," = ", $model->name)
                ->where("validation_field_name"," = ", $field->name)->first()
            ) {
                $deleted[] = $rule;
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
        $data = DB::table( 'altrp_validation_rules' )
            ->select('altrp_validation_rules.*', 'altrp_validation_fields.name as validation_field_name',
                'altrp_models.name as model_name'
            )
            ->leftJoin('altrp_validation_fields', 'altrp_validation_rules.validation_field_id', '=', 'altrp_validation_fields.id')
            ->leftJoin('altrp_models', 'altrp_validation_fields.model_id', '=', 'altrp_models.id')
            ->havingRaw('validation_field_name IS NOT NULL')
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
