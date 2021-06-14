<?php


namespace App\Services\ImportExport\Files;


use App\Constructor\Template;
use App\Constructor\TemplateSetting;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для настроек шаблонов
 * Class TemplateSettingsFile
 * @package App\Services\ImportExport\Files
 */
class TemplateSettingsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-template_settings.json";

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

        $data = TemplateSetting::with("template")->get();
        //Убираем data, html_content и styles. Уменьшаем размер переменной, что бы не получить Out of memory
        $templates_data = Template::with("template_area")->get(
            ["id", "name", "title", "type", "user_id", "created_at", "updated_at", "deleted_at", "parent_template", "area", "all_site", "guid"]
        );

        $updated = [];
        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_setting ) {

            $template = $templates_data->where( 'guid', $imported_setting['template_guid'] )->first();
            $imported_setting['data'] = json_decode($imported_setting['data']);
            if( ! $template ){
                continue;
            }

            $old_setting = $data->where( 'template_id', "=", $template->id )
                ->where( 'setting_name', "=", $imported_setting['setting_name'] )->first();

            if( $old_setting ){
                $old_setting->fill((array) $imported_setting);
                $old_setting->template_id = $template->id;
                if(count($old_setting->getDirty()) > 0) {
                    $updated[] = $old_setting;
                }
            }
            else {
                $new_setting = new TemplateSetting( $imported_setting );
                $new_setting->template_id = $template->id;
                $new_setting->data = $imported_setting['data'];
                $inserted[] = $new_setting;
            }
        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $setting) {
            if(!$import_data->where("template_guid"," = ", $setting->template_guid)
                ->where("setting_name", "=", $setting->setting_name )->first()
            ) {
                $deleted[] = $setting;
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
        $data = DB::table( 'template_settings' )
            ->select('template_settings.*', 'templates.guid as template_guid')
            ->leftJoin('templates', 'template_settings.template_id', '=', 'templates.id')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('template_settings.template_id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME,  $data->toArray());
        return $this;
    }
}
