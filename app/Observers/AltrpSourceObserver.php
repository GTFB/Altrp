<?php

namespace App\Observers;

use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Generators\Controller\ControllerFileWriter;
use App\Altrp\Generators\Repository\RepositoryFile;
use App\Altrp\Generators\Repository\RepositoryInterfaceFile;
use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Generators\Route\RouteFileWriter;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Exceptions\Controller\ControllerFileException;
use App\Permission;
use App\Role;
use Carbon\Carbon;

class AltrpSourceObserver
{
    /**
     * Handle the source "creating" event.
     *
     * @param \App\Altrp\Source $source
     * @return void
     * @throws ControllerFileException
     */
    public function creating(Source $source)
    {
        $model = $source->model;
        $source->controller_id = $model->altrp_controller->id;

        $oldSource = Source::where([
            ['model_id', $model->id],
            ['controller_id', $source->controller_id],
            ['name', $source->name]
        ])->first();
        if ($oldSource) {
            throw new ControllerFileException('Data source already exists', 403);
        }
    }

    /**
     * Handle the source "created" event.
     *
     * @param \App\Altrp\Source $source
     * @return void
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function created(Source $source)
    {
        $model = $source->model;
        if ($source->type == 'remote') {
            $controllerFile = new ControllerFile($model);
            $repo = new RepositoryFile($model);
            $repoInterface = new RepositoryInterfaceFile($model);
            $controllerWriter = new ControllerFileWriter(
                $controllerFile,
                $repo,
                $repoInterface
            );
            if ($controllerWriter->methodSourceExists($source->name)) {
                throw new ControllerFileException('Method already exists', 403);
            }
            $result = $controllerWriter->writeDataSourceMethod($source->name, $source->request_type, $source->url, []);
            if (! $result)
                throw new ControllerFileException('Failed to write method to the controller file', 500);
            $routeFile = new RouteFile($model);
            $routeWriter = new RouteFileWriter($routeFile, $controllerFile);
            $routeWriter->addSourceRoute($source);
        }
    }

    /**
     * Handle the source "updating" event.
     *
     * @param \App\Altrp\Source $source
     * @return void
     * @throws ControllerFileException
     */
    public function updating(Source $source)
    {
        $model = $source->model;
        $source->controller_id = $model->altrp_controller->id;

        $oldSource = Source::where([
            ['model_id', $model->id],
            ['controller_id', $source->controller_id],
            ['name', $source->name]
        ])->first();
        if ($oldSource && $source->name != $source->getOriginal('name')) {
            throw new ControllerFileException('Data source already exists', 403);
        }
    }

    /**
     * Handle the source "updated" event.
     *
     * @param \App\Altrp\Source $source
     * @return void
     * @throws ControllerFileException
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function updated(Source $source)
    {
        $model = $source->model;
        if ($source->type == 'remote') {
            $controllerFile = new ControllerFile($model);
            $repo = new RepositoryFile($model);
            $repoInterface = new RepositoryInterfaceFile($model);
            $controllerWriter = new ControllerFileWriter(
                $controllerFile,
                $repo,
                $repoInterface
            );
            if ($controllerWriter->methodSourceExists($source->getOriginal('name'))) {
                $result = $controllerWriter->updateSourceMethod(
                    $source->getOriginal('name'),
                    $source->name,
                    $source->request_type,
                    $source->url
                );
                if (! $result)
                    throw new ControllerFileException('Failed to update method to the controller file', 500);
                $routeFile = new RouteFile($model);
                $routeWriter = new RouteFileWriter($routeFile, $controllerFile);
                if ($routeWriter->routeSourceExist($source)) {
                    $routeWriter->updateSourceRoute($source);
                }
            }
        }

    }

    /**
     * Handle the source "deleting" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function deleting(Source $source)
    {
        SourcePermission::where('source_id',$source->id)->delete();
        SourceRole::where('source_id',$source->id)->delete();
    }

    /**
     * Handle the source "deleted" event.
     *
     * @param \App\Altrp\Source $source
     * @return void
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function deleted(Source $source)
    {
        $model = $source->model;
        if ($source->type == 'remote') {
            $controllerFile = new ControllerFile($model);
            $repo = new RepositoryFile($model);
            $repoInterface = new RepositoryInterfaceFile($model);
            $controllerWriter = new ControllerFileWriter(
                $controllerFile,
                $repo,
                $repoInterface
            );
            if ($controllerWriter->methodSourceExists($source->getOriginal('name'))) {
                $result = $controllerWriter->removeMethod(
                    $source->getOriginal('name')
                );
                if (! $result)
                    throw new ControllerFileException('Failed to delete method to the controller file', 500);
            }
            $routeFile = new RouteFile($model);
            $routeWriter = new RouteFileWriter($routeFile, $controllerFile);
            if ($routeWriter->routeSourceExist($source)) {
                $routeWriter->removeRoute($source->name, 'data_sources', $source->request_type);
            }
        }
    }

    /**
     * Handle the source "restored" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function restored(Source $source)
    {
        //
    }

    /**
     * Handle the source "force deleted" event.
     *
     * @param  \App\Altrp\Source  $source
     * @return void
     */
    public function forceDeleted(Source $source)
    {
        //
    }


}
