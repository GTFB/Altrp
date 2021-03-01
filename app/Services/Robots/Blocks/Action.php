<?php


namespace App\Services\Robots\Blocks;


use App\Mails\RobotsMail;
use App\User;
use Illuminate\Support\Facades\Mail;

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
        $model_class = '\\' . $this->node->data->props->nodeData->data->model_class;
        $method = $this->node->data->props->nodeData->data->method;
        $id = $this->node->data->props->nodeData->data->model_id;
        $entity = $model_class::find($id);
        return $entity->$method($data);
    }

    /**
     * Отправить уведомление
     * @return bool
     */
    protected function sendNotification()
    {
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
        $users = User::whereIn('id', $this->getNodeProperties()->nodeData->data->users)->get()->toArray();
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
}
