<?php


namespace App\Services\ImportExport\Files;


use App\Area;
use App\Constructor\Template;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для данных по шаблонам
 * Class TemplatesFile
 * @package App\Services\ImportExport\Files
 */
class TemplatesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архивет
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-templates.json";

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

        //Убираем data, html_content и styles. Уменьшаем размер переменной, что бы не получить Out of memory
        $data = Template::with("template_area")->get(
            ["id", "name", "title", "type", "user_id", "created_at", "updated_at", "deleted_at", "parent_template", "area", "all_site", "guid"]
        );
        $areas_data = Area::all();

        $updated = [];
        $inserted = [];
        $deleted = [];

        //Формируем массив записей которые нужно обновить или добавить
        foreach ($import_data as $imported_template) {
            $old_template = $data->where("guid"," = ", $imported_template["guid"])->first();
            $area = $areas_data->where("name", "=", $imported_template['area_name'])->first();
            $imported_template["area"] = $area ? $area->id : 1;

            if($old_template && strtotime( $imported_template["updated_at"] ) > strtotime( $old_template->updated_at )) {
                $user_id = $old_template->user_id;
                $old_template->fill((array) $imported_template);

                $old_template->user_id = $user_id;
                if($with_delete) {
                    $old_template->deleted_at = $imported_template["deleted_at"];
                }

                if(count($old_template->getDirty()) > 0) {
                    $updated[] = $old_template;
                }
            }

            if(!$old_template) {
                $new_template = new Template( $imported_template );
                $new_template->user_id = auth()->user()->id;

                $inserted[] = $new_template;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $template) {
            if(!$import_data->where("guid"," = ", $template->guid)->first()) {
                $deleted[] = $template;
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
        $data = DB::table( 'templates' )
            ->select('templates.*', 'areas.name as area_name')
            ->leftJoin('areas', 'templates.area', '=', 'areas.id')
            ->where("type", "=", "template")
            ->havingRaw('area_name IS NOT NULL')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('templates.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
