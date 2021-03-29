<?php


namespace App\Notifications;


use App\Altrp\Source;
use App\Notifications\Channels\CustomDatabaseChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
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
     * @var array
     */
    private $dataDynamic = [];

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
        $this->dataDynamic = getCurrentEnv()->getData();
        $this->setDataDynamic($notifiable);
        $channel = $this->node->data->props->nodeData->data->channel;
        if ($channel == 'telegram') {
            $channel = TelegramChannel::class;
        }
        return [CustomDatabaseChannel::class, $channel];
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
            'message' => $this->templateHandler()
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
            'message' => setDynamicData($this->node->data->props->nodeData->data->content->message, $this->modelData)
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
        $mailObj = $mailObj->view(
            'emails.robotmail', ['data' => $this->templateHandler()]
        );
        $mailObj = $mailObj->from(setDynamicData($this->node->data->props->nodeData->data->content->from, $this->modelData));
        $mailObj = $mailObj->subject(setDynamicData($this->node->data->props->nodeData->data->content->subject, $this->modelData));
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
        $tmObj = $tmObj->content(setDynamicData($this->node->data->props->nodeData->data->content->message, $this->modelData));
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
     * Получение верстки шаблона по guid и его обработка (парсинг и динамические данные)
     * @return string
     */
    protected function templateHandler()
    {
        $result = [];
        if (isset($this->node->data->props->nodeData->data->content->template)) {
            $template = Template::where( 'guid', $this->node->data->props->nodeData->data->content->template )->first()->html_content;
            if($template){
                $template = setDynamicData($template, $this->modelData);
    //            $dom = new DOMDocument();
    //            $dom->loadHTML($template);
                $result = $template;
            }
        }
         return $result;
    }

    /**
     * @param $notifiable
     */
    protected function setDataDynamic($notifiable)
    {
        $this->modelData['altrpuserto'] = $notifiable->toArray();
        $this->modelData['altrpdata'] = $this->modelData['sources'];
    }

    /**
     * @param \Exception $exception
     */
    public function failed(\Exception $exception)
    {
        dump($exception);
    }
}
