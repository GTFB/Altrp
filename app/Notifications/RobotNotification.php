<?php


namespace App\Notifications;


use App\Notifications\Channels\CustomDatabaseChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramChannel;
use NotificationChannels\Telegram\TelegramMessage;

class RobotNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var object узел диаграммы робота
     */
    private $node;

    /**
     * RobotNotification constructor.
     * @param $node
     */
    public function __construct($node)
    {
        $this->node = $node;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = [CustomDatabaseChannel::class];
        if (isset($this->node->data->props->nodeData->data->channels)) {
            $via = array_merge($via, $this->parseChannels($this->node->data->props->nodeData->data->channels));
        }
        return $via;
    }

    /**
     * Преобразовать названия каналов
     * @param $channels
     * @return array
     */
    protected function parseChannels($channels)
    {
        $parsedChannels = [];
        foreach ($channels as $i => $channel) {
            switch ($channel) {
                case 'telegram':
                    $parsedChannels[] = TelegramChannel::class;
                    break;
                default:
                    $parsedChannels[] = $channel;
            }
        }
        return $parsedChannels;
    }

    /**
     * Сохранение уведомлений в базе данных
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toCustomDatabase($notifiable)
    {
        return [
            'message' => $this->node->data->props->nodeData->data->content->broadcast->message
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'message' => $this->node->data->props->nodeData->data->content->broadcast->message
        ]);
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $mailObj = new MailMessage;
        $mailObj = $mailObj->line($this->node->data->props->nodeData->data->content->mail->message);
        return $mailObj;
    }

    /**
     * Отправка уведомлений через телеграм
     * @param $notifiable
     * @return TelegramMessage|bool
     */
    public function toTelegram($notifiable)
    {
        if (!$notifiable->telegram_user_id) return false;
        $tmObj = TelegramMessage::create()
            ->to($notifiable->telegram_user_id);
        $tmObj = $tmObj->content($this->node->data->props->nodeData->data->content->telegram->message);
        return $tmObj;
    }

    /**
     * Получить название уведомления
     * @return mixed
     */
    public function getNotificationSettingName()
    {
        return 'RobotNotification';
    }

    /**
     * Получить тип действия, на которое срабатывает уведомление
     * @return mixed
     */
    public function getActionType()
    {
        return $this->node->data->props->nodeData->type;
    }

    /**
     * @return string
     */
    public function getNoticeName()
    {
        return 'RobotNotification';
    }

    /**
     * Заменить динамические переменные на данные из полей модели
     * @param $subject
     * @return string|string[]
     */
    // protected function replaceColumns($subject)
    // {
    //     preg_match_all("#\{\{altrpdata\.(?<fields>[\w]+)\}\}#", $subject, $matches);
    //     if ($matches) {
    //         $matches = $matches['fields'];
    //         foreach ($matches as $field) {
    //             if (in_array($field, $this->data['columns'])) {
    //                 $subject = str_replace("{{altrpdata.{$field}}}", $this->model->$field, $subject);
    //             }
    //         }
    //     }
    //     return $subject;
    // }

}
