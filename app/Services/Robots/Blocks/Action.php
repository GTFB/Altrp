<?php


namespace App\Services\Robots\Blocks;


use App\Altrp\Model;
use App\Notifications\RobotNotification;
use App\User;
use Illuminate\Support\Facades\Notification;

class Action
{
    /**
     * @var object Узел диаграммы
     */
    protected $node;

    /**
     * @var string Запись модели
     */
    protected $modelData;

    /**
     * Action constructor.
     * @param $node
     * @param null $modelData
     */
    public function __construct($node, $modelData = null)
    {
        $this->node = $node;
        $this->modelData = $modelData;
    }

    /**
     * Запустить действие в зависимости от типа
     */
    public function runAction()
    {
        $res = null;
        switch ($this->getNodeProperties()->nodeData->type) {
            case 'crud':
                $res = $this->execCrud();
                break;
            case 'send_notification':
                $res = $this->sendNotification();
                break;
        }
        return $res;
    }

    /**
     * Выполнить операцию в базе данных (CRUD)
     * @return mixed
     */
    protected function execCrud()
    {
        $data = json_decode(json_encode($this->node->data->props->nodeData->data->body), true);
        $model = Model::find($this->node->data->props->nodeData->data->model_id);
        $modelNamespace = $model->parent ? $model->parent->namespace : $model->namespace;
        $modelClass = '\\' . $modelNamespace;
        $method = $this->node->data->props->nodeData->data->method;
        if ($method == 'create') {
            $entity = new $modelClass($data);
            $result = $entity->$method($data);
        } elseif ($method == 'delete') {
            $id = $this->node->data->props->nodeData->data->record_id;
            $entity = $modelClass::find($id);
            $result = $entity->$method();
        } else {
            $id = $this->node->data->props->nodeData->data->record_id;
            $entity = $modelClass::find($id);
            $result = $entity->$method($data);
        }
        return $result;
    }

    /**
     * Отправить уведомление
     * @return bool
     */
    protected function sendNotification()
    {
        $entities = $this->getNodeProperties()->nodeData->data->entities;
        $users = $this->getRequiredUsers($entities);
        Notification::send($users, new RobotNotification($this->node, $this->modelData));
        return true;
    }

    /**
     * Получить свойства узла
     * @return mixed
     */
    protected function getNodeProperties()
    {
        return $this->node->data->props;
    }

    /**
     * Получить пользователей, которых нужно уведомить
     * @param $entities
     * @return User[]|\Illuminate\Database\Eloquent\Collection
     */
    protected function getRequiredUsers($entities)
    {
        if (is_object($entities)) {
            $users = isset($entities->users) && !empty($entities->users) ? User::whereIn('id', $entities->users): null;
            if (isset($entities->roles) && !empty($entities->roles)) {
                $roles = $entities->roles;
                $users = $users ? $users->whereHas('roles', function ($q) use ($roles){
                    $q->whereIn('id', $roles);
                }) : User::whereHas('roles', function ($q) use ($roles){
                    $q->whereIn('id', $roles);
                });
            }
            $users = $users->get();
        } else {
            $users = User::all();
        }
        return $users;
    }
}
