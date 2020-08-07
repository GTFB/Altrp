<?php

namespace App\Observers;

use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Relationship;
use App\Altrp\Model;
use App\Altrp\Migration;
use App\Altrp\Generators\KeyMigrationGenerator;
use App\Altrp\Generators\NewMigrationGenerator;

use App\Exceptions\AltrpMigrationCreateFileExceptions;
use App\Exceptions\AltrpMigrationRunExceptions;
use App\Exceptions\CommandFailedException;

class AltrpRelationshipObserver
{
    /**
     * Вызываем после создания связи
     * @param Relationship $relationship
     * @throws AltrpMigrationCreateFileExceptions
     */
    public function creating(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $generator = new KeyMigrationGenerator($relationship);
        $file = $generator->createKeyGenerate();
        $name = $generator->getMigrationName();

        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

        $relationship->altrp_migration_id = $migration->id;

    }

    /**
     * @param Relationship $relationship
     * @throws CommandFailedException
     * @throws \App\Exceptions\TableNotFoundException
     * @throws \Exception
     */
    public function created(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $generator = new ModelGenerator($model);
        if (! $generator->updateModelFile()) {
            throw new CommandFailedException('Failed to update model file', 500);
        }
    }

    /**
     * Вызываем после обновления колонки
     * @param Relationship $relationship
     * @throws AltrpMigrationCreateFileExceptions
     */
    public function updating(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $old_key = Relationship::find($relationship->id);
        $generator = new KeyMigrationGenerator($relationship);
        $file = $generator->updateKeyGenerate($old_key);
        $name = $generator->getMigrationName();

        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

    }

    /**
     * @param Relationship $relationship
     * @throws CommandFailedException
     * @throws \Exception
     */
    public function updated(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $generator = new ModelGenerator($model);
        if (! $generator->updateModelFile()) {
            throw new CommandFailedException('Failed to update model file', 500);
        }
    }

    /**
     * Вызываем после удаления колонки
     * @param Relationship $relationship
     * @throws AltrpMigrationCreateFileExceptions
     */
    public function deleting(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $generator = new KeyMigrationGenerator($relationship);
        $file = $generator->deleteKeyGenerate();
        $name = $generator->getMigrationName();

        if(!$file) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $model->altrp_table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();


    }

    /**
     * @param Relationship $relationship
     * @throws CommandFailedException
     */
    public function deleted(Relationship $relationship)
    {
        $model = Model::find($relationship->model_id);
        $generator = new ModelGenerator($model);
        if (! $generator->updateModelFile()) {
            throw new CommandFailedException('Failed to update model file', 500);
        }
    }
}
