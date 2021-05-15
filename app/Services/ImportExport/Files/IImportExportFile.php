<?php


namespace App\Services\ImportExport\Files;


use App\Services\ImportExport\Readers\IReader;
use App\Services\ImportExport\Writers\IWriter;

/**
 * Интерфейс для классов экспортируемых и импортируемых файлов
 * Interface IImportExportFile
 * @package App\Services\ImportExport\Files
 */
interface IImportExportFile
{
    /**
     * Импорт настроек
     * @param IReader $reader
     * @param string $path
     * @param bool $with_delete
     * @return IImportExportFile
     */
    public function import(IReader $reader, string $path, bool $with_delete = false);

    /**
     * Экспорт настроек
     * @param IWriter $writer
     * @param string $path
     * @return IImportExportFile
     */
    public function export(IWriter $writer, string $path);

    /**
     * Получение пути к файлу в архиве
     * @return string
     */
    public function getArchivePath();

    /**
     * Получение названия файла
     * @return string
     */
    public function getFilename();
}
