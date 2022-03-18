<?php

namespace App\Observers;

use App\Altrp\Controller;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\RouteGenerator;
use App\Altrp\Source;
use App\Exceptions\CommandFailedException;
use App\Exceptions\ControllerNotWrittenException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\Route\RouteFileException;
use App\Exceptions\RouteGenerateFailedException;

class AltrpControllerObserver
{
    /**
     * Handle the controller "creating" event.
     *
     * @param \App\Altrp\Controller $controller
     * @return bool|void
     * @throws CommandFailedException
     * @throws ControllerNotWrittenException
     * @throws ModelNotWrittenException
     * @throws RouteGenerateFailedException
     */
    public function creating(Controller $controller)
    {
        $controllerExists = Controller::where('model_id', $controller->model->id)->first();
        if ($controllerExists) return false;
        $generator = new ControllerGenerator($controller);
        if (! $generator->generateRequests()) {
            throw new ControllerNotWrittenException('Failed to generate requests', 500);
        }
        if (! $generator->createControllerFile()) {
            throw new CommandFailedException('Failed to create controller file', 500);
        }

    }

    /**
     * Handle the controller "created" event.
     *
     * @param \App\Altrp\Controller $controller
     * @return void
     * @throws ModelNotWrittenException
     * @throws RouteGenerateFailedException
     */
    public function created(Controller $controller)
    {
        $generator = new ControllerGenerator($controller);

        if ($generator->getSourceActions()->isEmpty()) {
            // Записать основные действия над ресурсом в базу
            if (! $generator->writeSourceActions()) {
                throw new ModelNotWrittenException('Failed to write source action to the database (Controller Observer)', 500);
            }
        }
        if (! $generator->writeSourceRoles()) {
            throw new ModelNotWrittenException('Failed to write source roles to the database', 500);
        }
        if (! $generator->writeSourcePermissions($controller->model)) {
            throw new ModelNotWrittenException('Failed to write source permissions to the database', 500);
        }
        if (! $generator->generateRoutes($controller->model, new RouteGenerator($controller))) {
            throw new RouteGenerateFailedException('Failed to generate routes', 500);
        }
        if (! $generator->generateRoutes($controller->model, new RouteGenerator($controller, 'AltrpApiRoutes'), true)) {
            throw new RouteGenerateFailedException('Failed to generate api routes', 500);
        }
    }

    /**
     * Handle the controller "updating" event.
     *
     * @param \App\Altrp\Controller $controller
     * @return void
     * @throws CommandFailedException
     * @throws ControllerNotWrittenException
     * @throws ModelNotWrittenException
     * @throws RouteGenerateFailedException
     */
    public function updating(Controller $controller)
    {
        $generator = new ControllerGenerator($controller);
        // Обновить файлы запросов
        if (! $generator->generateRequests()) {
            throw new ControllerNotWrittenException('Failed to generate requests', 500);
        }
        // Обновить содержимое файла контроллера
        if (! $generator->updateControllerFile()) {
            throw new CommandFailedException('Failed to update controller file', 500);
        }
        // Записать основные действия над ресурсом в базу
        if (! $generator->writeSourceActions()) {
            throw new ModelNotWrittenException('Failed to write source action to the database (Controller Observer Updating)', 500);
        }
        // Записать роли для действий над ресурсами в базу
        if (! $generator->writeSourceRoles()) {
            throw new ModelNotWrittenException('Failed to write source roles to the database', 500);
        }
        // Записать права доступа к ресурсам в базу
        if (! $generator->writeSourcePermissions($controller->model)) {
            throw new ModelNotWrittenException('Failed to write source permissions to the database', 500);
        }
        // Сгенерировать маршруты для ресурса
        if (! $generator->generateRoutes($controller->model, new RouteGenerator($controller))) {
            throw new RouteGenerateFailedException('Failed to generate routes', 500);
        }
        if (! $generator->generateRoutes($controller->model, new RouteGenerator($controller, 'AltrpApiRoutes'), true)) {
            throw new RouteGenerateFailedException('Failed to generate routes', 500);
        }
    }

    /**
     * Handle the controller "updated" event.
     *
     * @param  \App\Altrp\Controller  $controller
     * @return void
     */
    public function updated(Controller $controller)
    {
        //
    }

    /**
     * Handle the controller "deleting" event.
     *
     * @param \App\Altrp\Controller $controller
     * @return void
     * @throws CommandFailedException
     * @throws RouteFileException
     * @throws ControllerNotWrittenException
     * @throws ModelNotWrittenException
     */
    public function deleting(Controller $controller)
    {
        $generator = new ControllerGenerator($controller);

        if (! $generator->removeRequests()) {
            throw new ControllerNotWrittenException('Failed to remove requests', 500);
        }
        if (! $generator->deleteControllerFile()) {
            throw new CommandFailedException('Failed to remove controller file', 500);
        }
        if (! $generator->deleteSourceActions()) {
            throw new ModelNotWrittenException('Failed to delete source actions', 500);
        }
        if (! $generator->removeRoutes()) {
            throw new RouteFileException('Failed to remove routes', 500);
        }
    }

    /**
     * Handle the controller "deleted" event.
     *
     * @param  \App\Altrp\Controller  $controller
     * @return void
     */
    public function deleted(Controller $controller)
    {
        //
    }

    /**
     * Handle the controller "restored" event.
     *
     * @param  \App\Altrp\Controller  $controller
     * @return void
     */
    public function restored(Controller $controller)
    {
        //
    }

    /**
     * Handle the controller "force deleted" event.
     *
     * @param  \App\Altrp\Controller  $controller
     * @return void
     */
    public function forceDeleted(Controller $controller)
    {
        //
    }
}
