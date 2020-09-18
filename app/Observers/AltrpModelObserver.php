<?php

namespace App\Observers;

use App\Altrp\Accessor;
use App\Altrp\Builders\AccessorBuilder;
use App\Altrp\Column;
use App\Altrp\Controller;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Generators\RouteGenerator;
use App\Altrp\Generators\TableMigrationGenerator;
use App\Altrp\Migration;
use App\Altrp\Model;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\Table;
use App\Exceptions\AltrpMigrationCreateFileExceptions;
use App\Exceptions\CommandFailedException;
use App\Exceptions\Controller\ControllerFileException;
use App\Exceptions\ControllerNotWrittenException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\PermissionNotWrittenException;
use App\Exceptions\RouteGenerateFailedException;
use App\Permission;
use Carbon\Carbon;

class AltrpModelObserver
{
    /**
     * Вызываем перед созданием модели
     * @param Model $model
     * @throws CommandFailedException
     * @throws \Exception
     */
    public function creating(Model $model)
    {
        if (!$model->parent_model_id) {
            $table = Table::find($model->table_id);
        } else {
            $parentModel = Model::find($model->parent_model_id);
            $table = Table::find($parentModel->table_id);
        }

        if (!$table) {
            $table = new Table();
            $table->name = strtolower(\Str::plural($model->name));
            $table->title = ucfirst(\Str::plural($model->name));
            $table->user_id = auth()->user()->id;
            $table->save();
        }

        $model->table_id = $table->id;
        $model->namespace = 'App\\AltrpModels\\' . $model->name;

        $generator = new ModelGenerator($model);
        $result = $generator->createModelFile();
        if (! $result) {
            throw new CommandFailedException('Failed to create model file', 500);
        }
        if (! $generator->writePermissions()) {
            throw new PermissionNotWrittenException("Failed to write permissions", 500);
        }
    }

    /**
     * Вызываем после создания модели
     * @param Model $model
     * @throws ControllerFileException
     * @throws AltrpMigrationCreateFileExceptions
     */
    public function created(Model $model)
    {
        $controller = new Controller();
        $controller->model_id = $model->id;
        if (! $controller->save()) {
            throw new ControllerFileException('Failed to create controller');
        }

        if (!$model->parent_model_id && ($model->time_stamps || $model->soft_deletes)) {
            $table = $model->table;

            $generator = new TableMigrationGenerator($table);

            $file = $generator->updateTableTimestamps(
                $model->time_stamps,
                $model->soft_deletes
            );
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
    }

    /**
     * Вызываем перед обновлением модели
     * @param Model $model
     * @throws CommandFailedException
     * @throws \Exception
     */
    public function updating(Model $model)
    {
        if (!$model->getOriginal('preset'))
            $model->namespace = 'App\\AltrpModels\\' . $model->name;
        $generator = new ModelGenerator($model);
        if ($model->altrp_accessors) {
            foreach ($model->altrp_accessors as $accessor) {
                $accessor->updated_at = Carbon::now();
                $accessorBuilder = new AccessorBuilder($model, $accessor);
                $accessorBuilder->update();
            }
        }
        if (! $generator->updateModelFile()) {
            throw new CommandFailedException('Failed to update model file', 500);
        }
        if (! $generator->writePermissions()) {
            throw new PermissionNotWrittenException("Failed to write permissions", 500);
        }
    }

    /**
     * Вызываем после обновления модели
     * @param Model $model
     * @return bool|void
     * @throws CommandFailedException
     * @throws ControllerNotWrittenException
     * @throws ModelNotWrittenException
     * @throws RouteGenerateFailedException
     * @throws AltrpMigrationCreateFileExceptions
     */
    public function updated(Model $model)
    {
        /**
         * @var Controller $controller
         */
        $controller = $model->altrp_controller;
        if (! $controller) return true;
        $desc = $model->name . ' ' . $model->title . ' '
            . $model->description . ' ' . $model->time_stamps . ' ' . $model->soft_deletes;
        Controller::withoutEvents(function () use ($controller, $desc) {
            if (! $controller->update(['description' => $desc])) {
                throw new ControllerFileException('Failed to update controller',  500);
            }
        });
        $generator = new ControllerGenerator($controller, ['old_model_name' => $model->getOriginal('name')]);
        if (! $generator->generateRequests()) {
            throw new ControllerNotWrittenException('Failed to generate requests', 500);
        }
        if (! $generator->updateControllerFile()) {
            throw new CommandFailedException('Failed to update controller file', 500);
        }
        if (! $generator->writeSourceActions()) {
            throw new ModelNotWrittenException('Failed to write source action to the database', 500);
        }
        if (! $generator->writeSourceRoles()) {
            throw new ModelNotWrittenException('Failed to write source roles to the database', 500);
        }
        if (! $generator->writeSourcePermissions($model)) {
            throw new ModelNotWrittenException('Failed to write source permissions to the database', 500);
        }
        if (! $generator->generateRoutes($controller->model, new RouteGenerator($controller))) {
            throw new RouteGenerateFailedException('Failed to generate routes', 500);
        }
        if (! $generator->generateRoutes($controller->model, new RouteGenerator($controller, 'AltrpApiRoutes'), true)) {
            throw new RouteGenerateFailedException('Failed to generate api routes', 500);
        }

        if (!$model->parent_model_id && ($model->time_stamps != $model->getOriginal('time_stamps')
            || $model->soft_deletes != $model->getOriginal('soft_deletes'))) {
            $table = $model->table;
            $generator = new TableMigrationGenerator($table);

            $file = $generator->updateTableTimestamps(
                $model->time_stamps,
                $model->soft_deletes
            );
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
    }

    /**
     * Вызываем перед удалением модели
     * @param Model $model
     * @throws CommandFailedException
     * @throws ControllerFileException
     */
    public function deleting(Model $model)
    {
//        $table = $model->table;
//        \DB::table($table->name)->delete();
//        $migration = $table->actual_migration();
//        Column::where('altrp_migration_id', $migration->id)->delete();
//        $migration->delete();
        $sources = $model->altrp_sources();
        $sourcePermissionsIds = [];
        $permissionsIds = [];
        foreach ($sources->get() as $source) {
            foreach ($source->source_permissions as $sPerm) {
                $sourcePermissionsIds[] = $sPerm->id;
            }

            foreach ($source->source_permissions as $sPerm) {
                $permissionsIds[] = $sPerm->permission->id;
            }
        }
        SourcePermission::destroy($sourcePermissionsIds);
        Permission::destroy($permissionsIds);
        $sources->delete();
        $generator = new ModelGenerator($model);
        $result = $generator->deleteModelFile();
        if (! $result) {
            throw new CommandFailedException('Failed to delete model file', 500);
        }
        $controller = $model->altrp_controller;
        if ($controller) {
            if (! $controller->delete()) {
                throw new ControllerFileException('Failed to delete controller',  500);
            }
        }

    }

    public function deleted(Model $model)
    {
//        $model->table->forceDelete();
    }
}
