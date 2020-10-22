<?php

namespace App\Observers;

use App\Altrp\Builders\Traits\DynamicVariables;
use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Generators\Controller\ControllerFileWriter;
use App\Altrp\Generators\Repository\RepositoryFile;
use App\Altrp\Generators\Repository\RepositoryInterfaceFile;
use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Generators\Route\RouteFileWriter;
use App\Altrp\Model;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Exceptions\Controller\ControllerFileException;
use App\Permission;
use App\SQLEditor;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AltrpSQLEditorObserver
{
    use DynamicVariables;
    /**
     * Handle the s q l editor "creating" event.
     *
     * @param \App\SQLEditor $sQLEditor
     * @return void
     * @throws ControllerFileException
     */
    public function creating(SQLEditor $sQLEditor)
    {
        $model = Model::find($sQLEditor->model_id);
        $controllerFile = new ControllerFile($model);
        $repo = new RepositoryFile($model);
        $repoInterface = new RepositoryInterfaceFile($model);
        $controllerWriter = new ControllerFileWriter(
            $controllerFile,
            $repo,
            $repoInterface
        );
        if ($controllerWriter->methodSqlExists($sQLEditor->name)) {
            throw new ControllerFileException('Method already exists', 500);
        }
        $controllerWriter->writeSqlMethod($sQLEditor->name, $this->replaceDynamicVars(addslashes($sQLEditor->sql), true), $sQLEditor->is_object);
    }

    /**
     * Handle the s q l editor "created" event.
     *
     * @param \App\SQLEditor $sQLEditor
     * @return void
     * @throws ControllerFileException
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function created(SQLEditor $sQLEditor)
    {
        $model = Model::find($sQLEditor->model_id);
        $controllerFile = new ControllerFile($model);
        $permission = Permission::where('name', 'sql-editor-' . $sQLEditor->name)->first();
        if (! $permission) {
            $permission = new Permission([
                'name' => 'sql-editor-' . $sQLEditor->name,
                'display_name' => 'SQL Editor ' . Str::studly($sQLEditor->name),
                'created_at' => Carbon::now()
            ]);
            $permission->save();
        }
        $source = Source::where('type',Str::snake($sQLEditor->name))->first();
        if (! $source) {
            $source = new Source([
                'model_id' => $sQLEditor->model_id,
                'controller_id' => $model->altrp_controller->id,
                'url' => '/' . strtolower(Str::plural($model->name)) . '/' . $sQLEditor->name,
                'api_url' => '/' . strtolower(Str::plural($model->name)) . '/' . $sQLEditor->name,
                'type' => Str::snake($sQLEditor->name),
                'request_type' => 'get',
                'title' => 'SQL Editor ' . Str::studly($sQLEditor->name),
                'name' => 'SQL Editor ' . Str::studly($sQLEditor->name),
                'sourceable_id' => $sQLEditor->id,
                'sourceable_type' => SQLEditor::class
            ]);
            $source->save();
        }
        $routeFile = new RouteFile($model);
        $routeWriter = new RouteFileWriter($routeFile, $controllerFile);
        $apiRouteFile = new RouteFile($model, 'routes/AltrpApiRoutes.php', true);
        $apiRouteWriter = new RouteFileWriter($apiRouteFile, $controllerFile);
        $routeWriter->addRoute($sQLEditor->name);
        $apiRouteWriter->addRoute($sQLEditor->name);
    }

    /**
     * Handle the s q l editor "updating" event.
     *
     * @param \App\SQLEditor $sQLEditor
     * @return void
     * @throws ControllerFileException
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function updating(SQLEditor $sQLEditor)
    {
        $model = Model::find($sQLEditor->model_id);
        $controllerFile = new ControllerFile($model);
        $repo = new RepositoryFile($model);
        $repoInterface = new RepositoryInterfaceFile($model);
        $controllerWriter = new ControllerFileWriter(
            $controllerFile,
            $repo,
            $repoInterface
        );
        if ($controllerWriter->methodSqlExists($sQLEditor->name)
            && $sQLEditor->getOriginal('name') != $sQLEditor->name) {
            throw new ControllerFileException('Method already exists', 500);
        }
        $controllerWriter->updateSqlMethod(
            $sQLEditor->getOriginal('name'),
            $sQLEditor->name,
            $this->replaceDynamicVars(addslashes($sQLEditor->sql),true),
            $sQLEditor->is_object
        );
    }

    /**
     * Handle the s q l editor "updated" event.
     *
     * @param \App\SQLEditor $sQLEditor
     * @return void
     * @throws ControllerFileException
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function updated(SQLEditor $sQLEditor)
    {
        $model = Model::find($sQLEditor->model_id);
        $controllerFile = new ControllerFile($model);
        $permission = Permission::where('name', 'sql-editor-' . $sQLEditor->getOriginal('name'));
        $permission->update([
            'name' => 'sql-editor-' . $sQLEditor->name,
            'display_name' => 'SQL Editor ' . Str::studly($sQLEditor->name),
            'updated_at' => Carbon::now()
        ]);
        $source = Source::where('type',Str::snake($sQLEditor->getOriginal('name')));
        $source->update([
            'model_id' => $sQLEditor->model_id,
            'controller_id' => $model->altrp_controller->id,
            'url' => '/' . strtolower(Str::plural($model->name)) . '/' . $sQLEditor->name,
            'api_url' => '/' . strtolower(Str::plural($model->name)) . '/' . $sQLEditor->name,
            'type' => Str::snake($sQLEditor->name),
            'request_type' => 'get',
            'title' => 'SQL Editor ' . Str::studly($sQLEditor->name),
            'name' => 'SQL Editor ' . Str::studly($sQLEditor->name),
            'sourceable_id' => $sQLEditor->id,
            'sourceable_type' => SQLEditor::class
        ]);
        $routeFile = new RouteFile($model);
        $routeWriter = new RouteFileWriter($routeFile, $controllerFile);
        $apiRouteFile = new RouteFile($model, 'routes/AltrpApiRoutes.php', true);
        $apiRouteWriter = new RouteFileWriter($apiRouteFile, $controllerFile);
        $routeWriter->updateSqlRoute($sQLEditor->getOriginal('name'), $sQLEditor->name);
        $apiRouteWriter->updateSqlRoute($sQLEditor->getOriginal('name'), $sQLEditor->name);
    }

    /**
     * Handle the s q l editor "deleting" event.
     *
     * @param  \App\SQLEditor  $sQLEditor
     * @return void
     */
    public function deleting(SQLEditor $sQLEditor)
    {
        $model = Model::find($sQLEditor->model_id);
        $controllerFile = new ControllerFile($model);
        $repo = new RepositoryFile($model);
        $repoInterface = new RepositoryInterfaceFile($model);
        $controllerWriter = new ControllerFileWriter(
            $controllerFile,
            $repo,
            $repoInterface
        );
        if ($controllerWriter->methodSqlExists($sQLEditor->name)) {
            $controllerWriter->deleteSqlMethod($sQLEditor->getOriginal('name'));
        }
    }

    /**
     * Handle the s q l editor "deleted" event.
     *
     * @param  \App\SQLEditor  $sQLEditor
     * @return void
     */
    public function deleted(SQLEditor $sQLEditor)
    {
        $model = Model::find($sQLEditor->model_id);
        $controllerFile = new ControllerFile($model);
        $permission = Permission::where('name', 'sql-editor-' . $sQLEditor->getOriginal('name'));
        $source = Source::where('type',Str::snake($sQLEditor->getOriginal('name')));
        $currentPermission = Permission::where('name', 'sql-editor-' . $sQLEditor->name)->first();
        $currentSource = Source::where('type',Str::snake($sQLEditor->name))->first();
        if ($currentSource && $currentPermission) {
            $sourcePermission = SourcePermission::where([
                ['permission_id',$currentPermission->id],
                ['source_id',$currentSource->id]
            ]);
            if ($sourcePermission->first()) {
                $sourcePermission->delete();
            }
        }
        $permission->delete();
        $source->delete();
        $routeFile = new RouteFile($model);
        $routeWriter = new RouteFileWriter($routeFile, $controllerFile);
        $apiRouteFile = new RouteFile($model, 'routes/AltrpApiRoutes.php', true);
        $apiRouteWriter = new RouteFileWriter($apiRouteFile, $controllerFile);
        $routeWriter->deleteSqlRoute($sQLEditor->getOriginal('name'));
        $apiRouteWriter->deleteSqlRoute($sQLEditor->getOriginal('name'));
    }

    /**
     * Handle the s q l editor "restored" event.
     *
     * @param  \App\SQLEditor  $sQLEditor
     * @return void
     */
    public function restored(SQLEditor $sQLEditor)
    {
        //
    }

    /**
     * Handle the s q l editor "force deleted" event.
     *
     * @param  \App\SQLEditor  $sQLEditor
     * @return void
     */
    public function forceDeleted(SQLEditor $sQLEditor)
    {
        //
    }
}
