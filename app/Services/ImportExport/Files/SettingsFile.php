<?php


namespace App\Services\ImportExport\Files;


use App\Services\AltrpSettingsService;
use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Arr;

/**
 * Класс экспорта импорта для конфига
 * Class SettingsFile
 * @package App\Services\ImportExport\Files
 */
class SettingsFile extends ImportExportFile implements IImportExportFile
{
    /**
     * Путь к файлу в архиве
     */
    const ARCHIVE_PATH = "altrp-settings";

    /**
     * Название файла
     */
    const FILENAME = "altrp-settings.json";

    /**
     * Импорт настроек
     * @param IReader $reader
     * @param string $path
     * @param bool $with_delete
     * @return SettingsFile
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function import(IReader $reader, string $path, bool $with_delete = false)
    {
        $import_data = $reader->readJsonFile($path);
        $altrp_settings = app()->make( AltrpSettingsService::class );

        if( Arr::get( $import_data, 'container_width' ) ){
            $altrp_settings->set_setting_value( 'container_width', Arr::get( $import_data, 'container_width' ) );
        }
        if( Arr::get( $import_data, 'admin_logo' ) ){
            $altrp_settings->set_setting_value( 'admin_logo', Arr::get( $import_data, 'admin_logo' ) );
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
        $data = [
            "admin_logo" => env( 'ALTRP_SETTING_ADMIN_LOGO', null ),
            "container_width" => env( 'ALTRP_SETTING_CONTAINER_WIDTH', null )
        ];
        if (!empty($params)) {
          foreach ($params as $param) {
            if (!array_key_exists($param, $data)) {
              if (isset($data[$param]))
                unset($data[$param]);
            }
          }
        }
        $writer->createJsonFile($path, self::FILENAME,  $data);
        return $this;
    }
}
