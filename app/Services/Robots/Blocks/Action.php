<?php


namespace App\Services\Robots\Blocks;


use App\Altrp\Model;
use App\Mails\RobotsMail;
use App\Notifications\RobotNotification;
use App\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class Action
{
    /**
     * @var object Узел диаграммы
     */
    protected $node;

    /**
     * Action constructor.
     * @param $node
     */
    public function __construct($node)
    {
        $this->node = $node;
    }

    /**
     * Запусить действие в записимости от типа
     */
    public function runAction()
    {
        switch ($this->getNodeProperties()->nodeData->type) {
            case 'crud':
                $this->execCrud();
                break;
            case 'send_notification':
                $this->sendNotification();
                break;
            case 'send_mail':
                $this->sendEmail();
                break;
        }
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
        $id = $this->node->data->props->nodeData->data->record_id;
        $entity = $modelClass::find($id);
        return $entity->$method($data);
    }

    /**
     * Отправить уведомление
     * @return bool
     */
    protected function sendNotification()
    {
        $entities = $this->getNodeProperties()->nodeData->data->entities;
        $users = $this->getRequiredUsers($entities);
        Notification::send($users, new RobotNotification($this->node));
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
     * Отправить письмо по электронной почте
     * @return bool
     */
    protected function sendEmail()
    {
        $from = config('mail.username');
        $entities = $this->getNodeProperties()->nodeData->data->entities;
        $users = $this->getRequiredUsers($entities)->toArray();
        $message = $this->getNodeProperties()->nodeData->data->message;
        $subject = $this->getNodeProperties()->nodeData->data->subject;
        $data = [
            'user_message' => $message,
            'subject' => $subject,
            'email' => $from,
            'name' => $from
        ];
        try {
            Mail::to($users)->send(new RobotsMail($data));
            return true;
        } catch (\Exception $e) {
            return false;
        }
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
