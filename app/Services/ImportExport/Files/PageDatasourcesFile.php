<?php


namespace App\Services\ImportExport\Files;


use App\Altrp\Source;
use App\Page;
use App\PageDatasource;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\DB;


/**
 * Класс экспорта импорта для подключенных к странице источников данных
 * Class PageDatasourcesFile
 * @package App\Services\ImportExport\Files
 */
class PageDatasourcesFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-page_datasources.json";

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

        $data = PageDatasource::with("source")->get();
        $sources_data = Source::all();
        $pages_data = Page::all();

        $inserted = [];
        $deleted = [];

        foreach ( $import_data as $imported_page_data_source ) {
            $source = $sources_data->where("url", "=", $imported_page_data_source["source_url"])
                ->where("type", "=", $imported_page_data_source["source_type"])->first();
            $page = $pages_data->where( 'guid', $imported_page_data_source['page_guid' ] )->first();

            if( ! ( $page && $source ) ){
                continue;
            }

            $new_page_data_source = new PageDatasource($imported_page_data_source);
            $new_page_data_source->page_id = $page ? $page->id : null;
            $new_page_data_source->source_id = $source ? $source->id : null;
            $inserted[] = $new_page_data_source;

        }

        //Формируем массив записей которые нужно удалить
        foreach ($data as $page_data_source) {
            $deleted[] = $page_data_source;
        }

        $this->deleteValues( $deleted, false);
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
        $data = DB::table( 'page_data_sources' )
            ->select('page_data_sources.*', 'altrp_sources.url as source_url', 'altrp_sources.type as source_type')
            ->leftJoin('altrp_sources', 'page_data_sources.source_id', '=', 'altrp_sources.id')
            ->havingRaw('source_url IS NOT NULL')
            ->when(!empty($params), function ($query) use ($params) {
              return $query->whereIn('page_data_sources.page_id', $params);
            })
            ->get();

        $writer->createJsonFile($path, self::FILENAME, $data->toArray());
        return $this;
    }
}
