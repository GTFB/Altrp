<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Model;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use App\SQLEditor;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для sql запросов
 * Class SQLEditorsFile
 * @package App\Services\ImportExport\Files
 */
class SQLEditorsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-s_q_l_editors.json";

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

        $data = SQLEditor::with("model")->get();

        $models_data = Model::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_editor ) {
            $model = $models_data->where( 'name', $imported_editor['model_name'] )->first();

            if( ! $model ){
                continue;
            }

            $old_editor = $data->where( 'name', $imported_editor['name'] )->where("model_id", "=", $model->id)->first();

            if($old_editor && date( $imported_editor['updated_at'] ) > date( $old_editor->updated_at )) {
                $old_editor->fill((array) $imported_editor);
                $old_editor->model_id = $model->id;

                if(count($old_editor->getDirty()) > 0) {
                    $updated[] = $old_editor;
                }
            }

            if( !$old_editor ) {
                $new_editor = new SQLEditor( $imported_editor );
                $new_editor->model_id = $model->id;
                $inserted[] = $new_editor;
            }

        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $editor) {
            if(!$import_data->where("name"," = ", $editor->name)->where("model_name"," = ", $editor->model->name)->first()) {
                $deleted[] = $editor;
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
        $data = DB::table( 's_q_l_editors' )
            ->select('s_q_l_editors.*', 'altrp_models.name as model_name')
            ->leftJoin('altrp_models', 's_q_l_editors.model_id', '=', 'altrp_models.id')
            ->havingRaw('model_name IS NOT NULL')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('s_q_l_editors.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
