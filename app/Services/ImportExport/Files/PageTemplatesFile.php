<?php


namespace App\Services\ImportExport\Files;


use App\Constructor\Template;
use App\Page;
use App\PagesTemplate;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;

/**
 * Класс экспорта импорта для данных по подключенным к странице шаблонам
 * Class PageTemplatesFile
 * @package App\Services\ImportExport\Files
 */
class PageTemplatesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-page_templates.json";

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

        $data = PagesTemplate::all();

        $pages_data = Page::all();

        //Убираем data, html_content и styles. Уменьшаем размер переменной, что бы не получить Out of memory
        $templates_data = Template::with("template_area")->has("template_area")->get(
            ["id", "name", "title", "type", "user_id", "created_at", "updated_at", "deleted_at", "parent_template", "area", "all_site", "guid"]
        );

        $inserted = [];
        $deleted = [];

        //Удаляем все предыдущие записи
        foreach ($data as $page_template) {
            $deleted[] = $page_template;
        }

        foreach ( $import_data as $imported_page_template ) {
            $template = $templates_data->where("guid"," = ",$imported_page_template["template_guid"])->first();
            $page = $pages_data->where("guid"," = ",$imported_page_template["page_guid"])->first();

            if($template && $page) {
                $new_page_template =  new PagesTemplate( $imported_page_template );
                $new_page_template->template_id = $template->id;
                $new_page_template->page_id = $page->id;
                $inserted[] = $new_page_template;
            }
        }

        $this->deleteValues( $deleted , false);
        $this->insertValues($inserted);

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
        $data = DB::table( 'pages_templates' )
            ->select('pages_templates.*')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('pages_templates.id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME,  $data->toArray());
        return $this;
    }
}
