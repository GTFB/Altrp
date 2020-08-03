<?php

namespace App\Observers;

use App\Altrp\Table;
use App\Altrp\Migration;
use App\Altrp\Column;
use App\Altrp\Generators\MigrationGenerator;
use App\Altrp\Generators\TableMigrationGenerator;

use App\Exceptions\AltrpMigrationCreateFileExceptions;

class AltrpTableObserver
{
    /**
     * Вызываем после создания таблицы
     * @param Table $table
     */
    public function created(Table $table)
    {
        $generator = new TableMigrationGenerator($table);
        $file = $generator->createTableGenerate();
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
        $migration->save();


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
        $migration->save();
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
            throw new AltrpMigrationRunExceptions("Failed to run migration file");
        }

        $table->columns()->delete();
        $table->migrations()->delete();


    }
}
