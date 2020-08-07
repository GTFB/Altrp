<?php

namespace App\Observers;

use App\Altrp\Column;
use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Model;
use App\Altrp\Migration;
use App\Altrp\Generators\ColumnMigrationGenerator;
use App\Altrp\Generators\NewMigrationGenerator;

use App\Exceptions\AltrpMigrationCreateFileExceptions;
use App\Exceptions\AltrpMigrationRunExceptions;

class AltrpColumnObserver
{
  /**
   * Вызываем после создания колонки
   * @param Column $column
   * @throws AltrpMigrationCreateFileExceptions
   */
    public function creating(Column $column)
    {
        $generator = new ColumnMigrationGenerator($column);
        $file = $generator->createColumnGenerate();
        $name = $generator->getMigrationName();
        if($column->name === 'id'){
          return;
        }

        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $column->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

        $column->altrp_migration_id = $migration->id;
    }

    public function created(Column $column)
    {
        $model = Model::find($column->model_id);
        $generator = new ModelGenerator($model);
        $generator->updateModelFile();
    }

    /**
     * Вызываем после обновления колонки
     * @param Column $column
     */
    public function updating(Column $column)
    {
        $old_column = Column::find($column->id);

        $generator = new ColumnMigrationGenerator($column);
        $file = $generator->updateColumnGenerate($old_column);
        $name = $generator->getMigrationName();

        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $column->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

        $column->altrp_migration_id = $migration->id;
    }

    public function updated(Column $column)
    {
        $model = Model::find($column->model_id);
        $generator  = new ModelGenerator($model);
        $generator->updateModelFile();
    }

    /**
     * Вызываем после удаления колонки
     * @param Column $column
     */
    public function deleting(Column $column)
    {
        $model = Model::find($column->model_id);

        $generator = new ColumnMigrationGenerator($column);
        $file = $generator->deleteColumnGenerate();
        $name = $generator->getMigrationName();

        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }
        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $column->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

        $column->altrp_migration_id = $migration->id;

    }
}
