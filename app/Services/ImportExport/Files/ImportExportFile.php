<?php


namespace App\Services\ImportExport\Files;

use Illuminate\Support\Facades\Log;

/**
 *
 * Class ImportExportFile
 * @package App\Services\ImportExport\Files
 */
abstract class ImportExportFile implements IImportExportFile
{

    /**
     * Получение названия файла экспорта
     * @return string
     */
    public function getFileName() {
        return $this::FILENAME;
    }

    /**
     * Получение пути к файлу в архивет
     * @return string
     */
    public function getArchivePath() {
        return $this::ARCHIVE_PATH;
    }

    /**
     * Метод добавления новых записей
     * @param array $values
     */
    protected function insertValues(array $values) {
        foreach ($values as $value) {
            try {
                $value->save();
            } catch ( \Exception $e ) {
                Log::error( $e->getMessage(), $value->toArray() );
            }
        }
    }

    /**
     * Метод обновления новых записей
     * @param array $values
     */
    protected function updateValues(array $values) {
        foreach ($values as $value) {
            try {
                $value->save();
            } catch ( \Exception $e ) {
                Log::error( $e->getMessage(), $value->toArray() );
            }
        }
    }

    /**
     * Метод удаления старых записей
     * @param array $values
     * @param bool $soft_delete
     */
    protected function deleteValues(array $values, bool $soft_delete = true) {
        foreach ($values as $value) {
            try {
                $soft_delete ? $value->trashed() : $value->delete();
            } catch ( \Exception $e ) {
                Log::error( $e->getMessage(), $value->toArray() );
            }
        }
    }

}
