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
use App\Constructor\Template;
use DOMDocument;


class RobotNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var object узел диаграммы робота
     */
    private $node;

    /**
     * @var object узел диаграммы робота
     */
    private $modelData;

    /**
     * RobotNotification constructor.
     * @param $node
     * @param null $modelData
     */
    public function __construct($node, $modelData = null)
    {
        $this->node = $node;
        $this->modelData = $modelData;
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
            'message' => $this->replaceColumns($this->node->data->props->nodeData->data->content->broadcast->message)
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
            'message' => $this->replaceColumns($this->node->data->props->nodeData->data->content->broadcast->message)
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
//        dump($this->templateHandler());
        $mailObj = new MailMessage;
//        $mailObj = $mailObj->line($this->templateHandler());
        $mailObj = $mailObj->view(
            'emails.robotmail', ['data' => $this->templateHandler()]
        );

        $mailObj = $mailObj->from($this->replaceColumns($this->node->data->props->nodeData->data->content->mail->from));
        $mailObj = $mailObj->subject($this->replaceColumns($this->node->data->props->nodeData->data->content->mail->subject));
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
        $tmObj = $tmObj->content($this->replaceColumns($this->node->data->props->nodeData->data->content->telegram->message));
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
    protected function replaceColumns($subject)
    {
        preg_match_all("#\{\{altrpdata\.(?<fields>[\w]+)\}\}#", $subject, $matches);
        if ($matches && !empty($this->modelData)) {
            $matches = $matches['fields'];
            foreach ($matches as $field) {
                if (in_array($field, $this->modelData['columns'])) {
                    $subject = str_replace("{{altrpdata.{$field}}}", $this->modelData['record']->$field, $subject);
                }
            }
        }
        return $subject;
    }

    /**
     * Получение верстки шаблона по guid
     * @param $subject
     * @return string|string[]
     */
    protected function templateHandler()
    {
        $result = [];
        if (isset($this->node->data->props->nodeData->data->content->mail->template)) {
            $template = Template::where( 'guid', $this->node->data->props->nodeData->data->content->mail->template )->first()->html_content;
            $dom = new DOMDocument();
            $dom->loadHTML($template);
            $result = $template;
        }
         return $result;
    }
}
