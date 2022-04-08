<?php

namespace App\Observers;

use App\Altrp\Accessor;
use App\Altrp\Builders\AccessorBuilder;
use App\Altrp\Column;
use App\Altrp\Controller;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\Event\EventFile;
use App\Altrp\Generators\Event\EventFileWriter;
use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Generators\Observer\ObserverFile;
use App\Altrp\Generators\Observer\ObserverFileWriter;
use App\Altrp\Generators\RouteGenerator;
use App\Altrp\Generators\TableMigrationGenerator;
use App\Altrp\Migration;
use App\Altrp\Model;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
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
        $eventFile = new EventFile($model);
        $eventWriter = new EventFileWriter($eventFile);

        if (!$eventWriter->write()) {
            throw new CommandFailedException('Failed to create event file', 500);
        }

        $observerFile = new ObserverFile($model);
        $observerWriter = new ObserverFileWriter($observerFile);

        if (! $observerWriter->write()) {
            throw new CommandFailedException('Failed to update observer file', 500);
        }
        if (! $observerWriter->writeToServiceProvider()) {
            throw new CommandFailedException('Failed to update service provider file', 500);
        }

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

            if (!$model->hasTimestamps() && $model->time_stamps) {
                $this->createColumn([
                    "name" => "created_at",
                    "title" => "created_at",
                    "description" => null,
                    "type" => "timestamp",
                    "size" => null,
                    "null" => null,
                    "default" => null,
                    "primary" => null,
                    "unique" => null,
                    "user_id" => auth()->user()->id,
                    "table_id" => $table->id,
                    "altrp_migration_id" => $migration->id,
                    "is_label" => 0,
                    "is_title" => 0,
                    "is_auth" => 0,
                    "attribute" => null,
                    "input_type" => null,
                    "options" => null,
                    "indexed" => 0,
                    "editable" => 0,
                    'calculation' => null,
                    'calculation_logic' => null,
                    "hidden" => 0,
                    "model_id" => $model->id,
                    "preset" => 0
                ]);

                $this->createColumn([
                    "name" => "updated_at",
                    "title" => "updated_at",
                    "description" => null,
                    "type" => "timestamp",
                    "size" => null,
                    "null" => null,
                    "default" => null,
                    "primary" => null,
                    "unique" => null,
                    "user_id" => auth()->user()->id,
                    "table_id" => $table->id,
                    "altrp_migration_id" => $migration->id,
                    "is_label" => 0,
                    "is_title" => 0,
                    "is_auth" => 0,
                    "attribute" => null,
                    "input_type" => null,
                    "options" => null,
                    "indexed" => 0,
                    "editable" => 0,
                    'calculation' => null,
                    'calculation_logic' => null,
                    "hidden" => 0,
                    "model_id" => $model->id,
                    "preset" => 0
                ]);
            }

            if (!$model->hasSoftDeletes() && $model->soft_deletes) {
                $this->createColumn([
                    "name" => "deleted_at",
                    "title" => "deleted_at",
                    "description" => null,
                    "type" => "timestamp",
                    "size" => null,
                    "null" => null,
                    "default" => null,
                    "primary" => null,
                    "unique" => null,
                    "user_id" => auth()->user()->id,
                    "table_id" => $table->id,
                    "altrp_migration_id" => $migration->id,
                    "is_label" => 0,
                    "is_title" => 0,
                    "is_auth" => 0,
                    "attribute" => null,
                    "input_type" => null,
                    "options" => null,
                    "indexed" => 0,
                    "editable" => 0,
                    'calculation' => null,
                    'calculation_logic' => null,
                    "hidden" => 0,
                    "model_id" => $model->id,
                    "preset" => 0
                ]);
            }
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
        if (!$model->parent_model_id) {
            $table = Table::find($model->table_id);
        } else {
            $parentModel = Model::find($model->parent_model_id);
            $table = Table::find($parentModel->table_id);
        }

        if (!$model->getOriginal('preset'))
            $model->namespace = 'App\\AltrpModels\\' . $model->name;

        $generator = new ModelGenerator($model);

        //При изменении имени модели, переименовываем таблицу
        if ($table && $model->getOriginal('name') != $model->name) {
            $table->name = strtolower(\Str::plural($model->name));
            $table->title = ucfirst(\Str::plural($model->name));
            $table->user_id = auth()->user()->id;
            $table->save();

            $generator->updateAssociateRelations();
        }

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
        $eventFile = new EventFile($model);
        $eventWriter = new EventFileWriter($eventFile);

        if (! $eventWriter->write()) {
            throw new CommandFailedException('Failed to update event file', 500);
        }

       $observerFile = new ObserverFile($model);
       $observerWriter = new ObserverFileWriter($observerFile);

       if (! $observerWriter->write()) {
           throw new CommandFailedException('Failed to update observer file', 500);
       }
       if (! $observerWriter->writeToServiceProvider()) {
           throw new CommandFailedException('Failed to update service provider file', 500);
       }

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
            throw new ModelNotWrittenException('Failed to write source action to the database (Model Observer)', 500);
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

            if (!$model->hasTimestamps() && $model->time_stamps) {
                $this->createColumn([
                    "name" => "created_at",
                    "title" => "created_at",
                    "description" => null,
                    "type" => "timestamp",
                    "size" => null,
                    "null" => null,
                    "default" => null,
                    "primary" => null,
                    "unique" => null,
                    "user_id" => auth()->user()->id,
                    "table_id" => $table->id,
                    "altrp_migration_id" => $migration->id,
                    "is_label" => 0,
                    "is_title" => 0,
                    "is_auth" => 0,
                    "attribute" => null,
                    "input_type" => null,
                    "options" => null,
                    "indexed" => 0,
                    "editable" => 0,
                    'calculation' => null,
                    'calculation_logic' => null,
                    "hidden" => 0,
                    "model_id" => $model->id,
                    "preset" => 0
                ]);

                $this->createColumn([
                    "name" => "updated_at",
                    "title" => "updated_at",
                    "description" => null,
                    "type" => "timestamp",
                    "size" => null,
                    "null" => null,
                    "default" => null,
                    "primary" => null,
                    "unique" => null,
                    "user_id" => auth()->user()->id,
                    "table_id" => $table->id,
                    "altrp_migration_id" => $migration->id,
                    "is_label" => 0,
                    "is_title" => 0,
                    "is_auth" => 0,
                    "attribute" => null,
                    "input_type" => null,
                    "options" => null,
                    "indexed" => 0,
                    "editable" => 0,
                    'calculation' => null,
                    'calculation_logic' => null,
                    "hidden" => 0,
                    "model_id" => $model->id,
                    "preset" => 0
                ]);
            }

            if (!$model->hasSoftDeletes() && $model->soft_deletes) {
                $this->createColumn([
                    "name" => "deleted_at",
                    "title" => "deleted_at",
                    "description" => null,
                    "type" => "timestamp",
                    "size" => null,
                    "null" => null,
                    "default" => null,
                    "primary" => null,
                    "unique" => null,
                    "user_id" => auth()->user()->id,
                    "table_id" => $table->id,
                    "altrp_migration_id" => $migration->id,
                    "is_label" => 0,
                    "is_title" => 0,
                    "is_auth" => 0,
                    "attribute" => null,
                    "input_type" => null,
                    "options" => null,
                    "indexed" => 0,
                    "editable" => 0,
                    'calculation' => null,
                    'calculation_logic' => null,
                    "hidden" => 0,
                    "model_id" => $model->id,
                    "preset" => 0
                ]);
            }

            if ($model->getOriginal('time_stamps') && !$model->time_stamps) {
                $created_at = Column::where([['name', 'created_at'], ['model_id', $model->id]])->first();
                $updated_at = Column::where([['name', 'updated_at'], ['model_id', $model->id]])->first();
                Column::withoutEvents(function () use ($created_at, $updated_at){
                    $created_at->delete();
                    $updated_at->delete();
                });
            }

            if ($model->getOriginal('soft_deletes') && !$model->soft_deletes) {
                $deleted_at = Column::where([['name', 'deleted_at'], ['model_id', $model->id]])->first();
                Column::withoutEvents(function () use ($deleted_at){
                    $deleted_at->delete();
                });
            }
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
        \Schema::disableForeignKeyConstraints();
        $sources = $model->altrp_sources();
        $sourcePermissionsIds = [];
        $permissionsIds = [];
        $sourceRolesIds = [];
        foreach ($sources->get() as $source) {
            foreach ($source->source_permissions as $sPerm) {
                $sourcePermissionsIds[] = $sPerm->id;
            }

            foreach ($source->source_roles as $sRole) {
                $sourceRolesIds[] = $sRole->id;
            }

            if ($source->page_data_sources) {
                $source->page_data_sources()->delete();
            }

            foreach ($source->source_permissions as $sPerm) {
                $permissionsIds[] = $sPerm->permission->id;
            }
        }
        SourcePermission::destroy($sourcePermissionsIds);
        SourceRole::destroy($sourceRolesIds);
        Permission::destroy($permissionsIds);
        $sources->delete();
        Accessor::where('model_id',$model->id)->delete();
        Column::where([['table_id', $model->table->id], ['type','calculated']])->delete();
        $model->altrp_relationships()->delete();
        $model->altrp_sql_editors()->delete();
        $model->altrp_queries()->delete();
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
        $eventFile = new EventFile($model);
        $eventWriter = new EventFileWriter($eventFile);

        if (!$eventWriter->remove()) {
            throw new CommandFailedException('Failed to delete event file', 500);
        }
//        $model->table->forceDelete();
    }

    /**
     * Создать колонку
     * @param $data
     */
    protected function createColumn($data)
    {
        $column = new Column($data);
        Column::withoutEvents(function () use ($column) {
            $column->save();
        });
    }
}
