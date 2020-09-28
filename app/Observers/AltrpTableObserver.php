<?php

namespace App\Observers;

use App\Altrp\Generators\NewMigrationGenerator;
use App\Altrp\Model;
use App\Altrp\Table;
use App\Altrp\Migration;
use App\Altrp\Column;
use App\Altrp\Generators\MigrationGenerator;
use App\Altrp\Generators\TableMigrationGenerator;

use App\Exceptions\AltrpMigrationCreateFileExceptions;
use App\Exceptions\AltrpMigrationRunExceptions;
use App\Exceptions\Migration\AltrpTableExistException;

class AltrpTableObserver
{
    /**
     * @param Table $table
     */
    public function creating(Table $table) {

        //проверяем имеется ли таблица с таким именем в БД
        if($table->is_db_exist()) {
            throw new AltrpTableExistException("Table ".$table->name." already exists", 500);
        }
    }

  /**
   * Вызываем после создания таблицы
   * @param Table $table
   * @throws AltrpMigrationCreateFileExceptions
   */
    public function created(Table $table)
    {
        $generator = new TableMigrationGenerator($table);
        $file = $generator->createTableGenerate();
        $name = $generator->getMigrationName();

        //Если не создался файл миграции, удаляем таблицу
        if(!$file) {
            Table::withoutEvents(function () use ($table) {
                $table->delete();
            });
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $table->id;
        $migration->status = "1";
        $migration->data = "";

        Migration::withoutEvents(function() use ($migration) {
            $migration->save();
        });

        //При ошибке в миграции удаляем миграцию и таблицу
        if(!NewMigrationGenerator::runMigration()) {
            $migration->delete();
            Table::withoutEvents(function () use ($table) {
                $table->forceDelete();
            });
            throw new AltrpMigrationRunExceptions("Failed to run migration file on creating migration");
        }

        $column = new Column();
        $column->name = "id";
        $column->title = "ID";
        $column->description = "Identifier";
        $column->type = "id";
        $column->table_id = $table->id;
        $column->user_id = auth()->user()->id;
        $column->altrp_migration_id = $migration->id;

        Column::withoutEvents(function () use ($column){
            $column->save();
        });


    }

    /**
     * Вызываем перед обновлением таблицы
     * @param Table $table
     */
    public function updating(Table $table)
    {

        //проверяем имеется ли таблица с таким именем в БД
        if($table->is_db_exist()) {
            throw new AltrpTableExistException("Table ".$table->name." already exists", 500);
        }

        $generator = new TableMigrationGenerator($table);

        $file = $generator->updateTableGenerate($table->getOriginal('name'));
        $name = $generator->getMigrationName();

        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $table->id;
        $migration->status = "1";
        $migration->data = "";

        Migration::withoutEvents(function() use ($migration) {
            $migration->save();
        });

        //При ошибке в миграции удаляем миграцию
        if(!NewMigrationGenerator::runMigration()) {
            $migration->delete();
            throw new AltrpMigrationRunExceptions("Failed to run migration file on creating migration");
        }

    }

    /**
     * Вызываем после обновления таблицы
     * @param Table $table
     */
    public function updated(Table $table)
    {

    }

  /**
   * Вызываем после удаления таблицы
   * @param Table $table
   * @throws AltrpMigrationRunExceptions
   * @throws AltrpMigrationCreateFileExceptions
   */
    public function deleting(Table $table)
    {
        $generator = new TableMigrationGenerator($table);

        $file = $generator->deleteTableGenerate();
        $name = $generator->getMigrationName();

        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        if(!TableMigrationGenerator::runMigration()) {
            throw new AltrpMigrationRunExceptions("Failed to run migration file on delete table");
        }

        $table->columns()->delete();
        $table->migrations()->delete();


    }
}
