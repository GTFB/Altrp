<?php

namespace App\Observers;

use App\Altrp\Column;
use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Migration;
use App\Altrp\Model;
use App\Altrp\Table;
use App\Exceptions\CommandFailedException;

class AltrpModelObserver
{
    /**
     * Вызываем перед созданием модели
     * @param Model $model
     */
    public function creating(Model $model)
    {
        $table = Table::find($model->table_id);
        if (! $table) {
            $table = new Table();
            $table->name = strtolower(\Str::plural($model->name));
            $table->title = ucfirst(\Str::plural($model->name));
            $table->user_id = auth()->user()->id;
            $table->save();

        }
        $model->table_id = $table->id;

        $generator = new ModelGenerator($model);
        $result = $generator->createModelFile();
        if (! $result) {
            throw new CommandFailedException('Failed to create model file', 500);
        }
    }

    /**
     * Вызываем после создания модели
     * @param Model $model
     */
    public function created(Model $model)
    {

    }

    /**
     * Вызываем перед обновлением модели
     * @param Model $model
     * @throws CommandFailedException
     */
    public function updating(Model $model)
    {
        $generator = new ModelGenerator($model);
        $result = $generator->updateModelFile();
        if (! $result) {
            throw new CommandFailedException('Failed to update model file', 500);
        }
    }

    /**
     * Вызываем после обновления модели
     * @param Model $model
     */
    public function updated(Model $model)
    {

    }

    /**
     * Вызываем перед удалением модели
     * @param Model $model
     * @throws CommandFailedException
     */
    public function deleting(Model $model)
    {
//        $table = Table::find($model->table_id);
//        \DB::table($table->name)->delete();
//        $migration = $table->actual_migration();
//        Column::where('altrp_migration_id', $migration->id)->delete();
//        $migration->delete();
        $generator = new ModelGenerator($model);
        $result = $generator->deleteModelFile();
        if (! $result) {
            throw new CommandFailedException('Failed to delete model file', 500);
        }
    }

    public function deleted(Model $model)
    {

    }
}
