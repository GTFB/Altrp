<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Accessor;
use App\Altrp\Model;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для аксессоров
 * Class AccessorsFile
 * @package App\Services\ImportExport\Files
 */
class AccessorsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-accessors.json";

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

        $data = Accessor::with(["model", "model.altrp_table"])->get();
        $models_data = Model::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_accessor ) {

            $model = $models_data->where( 'name', $imported_accessor['model_name'] )->first();
            if( ! $model ){
                continue;
            }

            $old_accessor = $data->where( 'model_id', $model->id )->where('name', '=', $imported_accessor['name'])->first();

            if($old_accessor) {
                $user_id = $old_accessor->user_id;
                $old_accessor->fill((array) $imported_accessor);
                $old_accessor->model_id = $model->id;
                $old_accessor->user_id = $user_id;

                if(count($old_accessor->getDirty()) > 0) {
                    $updated[] = $old_accessor;
                }
            }
            else {
                $new_accessor = new Accessor($imported_accessor);
                $new_accessor->model_id = $model->id;
                $new_accessor->user_id = auth()->user()->id;
                $inserted[] = $new_accessor;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $accessor) {
            if(!$import_data->where("name"," = ", $accessor->name)->where("model_name"," = ", $accessor->model->name)->first()) {
                $deleted[] = $accessor;
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
        $data = DB::table( 'altrp_accessors' )
            ->select('altrp_accessors.*', 'altrp_models.name as model_name')
            ->leftJoin('altrp_models', 'altrp_accessors.model_id', '=', 'altrp_models.id')
            ->havingRaw('model_name IS NOT NULL')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('altrp_accessors.model_id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
