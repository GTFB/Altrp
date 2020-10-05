<?php

namespace App\Observers;

use App\Altrp\Migration;
use App\Altrp\Generators\NewMigrationGenerator;

use App\Exceptions\AltrpMigrationRunExceptions;
use Illuminate\Support\Str;

class AltrpMigrationObserver
{
  /**
   * Вызываем после создания таблицы
   * @param Migration $migration
   * @throws AltrpMigrationRunExceptions
   */
    public function created(Migration $migration)
    {

        if(!NewMigrationGenerator::runMigration()) {
            throw new AltrpMigrationRunExceptions("Failed to run migration file on creating migration");
        }


    }

    /**
     * Вызываем после удаления миграции
     * @param Migration $migration
     */
    public function deleted(Migration $migration)
    {

        if(!is_null($migration->file_path) && file_exists($migration->file_path)) {
            unlink($migration->file_path);
        }

    }
}
