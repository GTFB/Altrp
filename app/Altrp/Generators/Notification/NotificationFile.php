<?php


namespace App\Altrp\Generators\Notification;


use Illuminate\Database\Eloquent\Model;

class NotificationFile
{
    protected $name;

    protected $namespace;

    protected $path;

    protected $model;

    public function __construct(Model $model, $path = null)
    {
        $this->model = $model;
        if (! $path) {
            $this->path = config('altrp.admin.notifications_path');
        }
        $this->name = $model->name . 'Notification';
        $this->namespace = 'App\\Notifications\\AltrpNotifications\\' . $this->name;
    }

    public function getModel()
    {
        return $this->model;
    }

    public function getNamespace()
    {
        return $this->namespace;
    }

    public function getFile()
    {
        return base_path($this->path . '/' . $this->name . '.php');
    }
}
