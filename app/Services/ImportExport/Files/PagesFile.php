<?php


namespace App\Services\ImportExport\Files;

use App\Altrp\Model;
use App\Page;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для данных по страницам
 * Class PagesFile
 * @package App\Services\ImportExport\Files
 */
class PagesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-pages.json";

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

        $models_data = Model::all();
        $data = Page::with("model")->get();

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_page ) {
            $old_page = $data->where("guid"," = ", $imported_page["guid"])->first();
            $model = $models_data->where( 'name', "=", $imported_page['model_name'])->first();

            if( $old_page && strtotime( $imported_page["updated_at"] ) > strtotime( $old_page->updated_at )){

                $author = $old_page->author;
                $old_page->fill((array) $imported_page);
                $old_page->author = $author;
                $old_page->model_id = $model ? $model->id : null;

                if($with_delete) {
                    $old_page->deleted_at = $imported_page["deleted_at"];
                }

                if(count($old_page->getDirty()) > 0) {
                    $updated[] = $old_page;
                }
            }

            if( !$old_page ) {
                $new_page = new Page( $imported_page );
                $new_page->author = auth()->user()->id;
                $new_page->model_id = $model ? $model->id : null;
                $inserted[] = $new_page;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $page) {
            if(!$import_data->where("guid"," = ", $page->guid)->first()) {
                $deleted[] = $page;
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
        $data = DB::table( 'pages' )
            ->select('pages.*', 'altrp_models.name as model_name')
            ->leftJoin('altrp_models', 'pages.model_id', '=', 'altrp_models.id')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('pages.id', $params);
            })
            ->get();
        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
