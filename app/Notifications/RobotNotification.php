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
use NotificationChannels\Telegram\TelegramFile;

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
        $channels = [CustomDatabaseChannel::class];
        $channel = $this->node->data->props->nodeData->data->channel;
        $channels = array_merge($channels, $this->addChannel($notifiable, $channel));
        return $channels;
    }

    /**
     * @param $user
     * @param $channel
     * @return array
     */
    protected function addChannel($user, $channel)
    {
        $channels = [];
        if ($channel == 'telegram' && ($user->telegram_user_id || $this->node->data->props->nodeData->data->telegram_id) && config('services.telegram-bot-api.token')) {
            $channel = TelegramChannel::class;
            $channels[] = $channel;
        }
        if (($channel == 'mail' && config('mail.username')) || $channel == 'broadcast') {
            $channels[] = $channel;
        }
        return $channels;
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
        $content = $this->node->data->props->nodeData->data->content;
        $toId = setDynamicData($this->node->data->props->nodeData->data->telegram_id, $this->modelData);
        if ((!$notifiable->telegram_user_id && !$toId) || !is_array($content) || empty($content) ) return false;

        $tmObj = TelegramMessage::create();
        if ($notifiable->telegram_user_id) $tmObj->to($notifiable->telegram_user_id);
        if ($toId) $tmObj->to($toId);

        foreach ($content as $item) {
            if ($item->type === 'file' || $item->type === 'document' || $item->type === 'video' || $item->type === 'animation') {
              $tmObj = TelegramFile::create();
              if ($notifiable->telegram_user_id) $tmObj->to($notifiable->telegram_user_id);
              if ($toId) $tmObj->to($toId);
            }
        }

        $text = '';
//        dump($tmObj);
//        dump($content);

        foreach ($content as $item) {
            switch ($item->type){
                case "content":
                    $text .= setDynamicData($item->data->text, $this->modelData) . "\n";
                    break;
                case "link":
                    $text .= '[' . setDynamicData($item->data->text, $this->modelData) . '](' . setDynamicData($item->data->url, $this->modelData) . ") \n";
                    break;
                case "button":
                    $tmObj = $tmObj->button(setDynamicData($item->data->text, $this->modelData), setDynamicData($item->data->url, $this->modelData));
                    break;
                case "file":
                    if (!empty($item->data->url)) $tmObj = $tmObj->photo(setDynamicData($item->data->url, $this->modelData));
                    elseif (!empty($item->data->path)) $tmObj = $tmObj->file(setDynamicData($item->data->path, $this->modelData), setDynamicData($item->data->text, $this->modelData));
                    break;
                case "document":
                    if (!empty($item->data->url)) $tmObj = $tmObj->document(setDynamicData($item->data->url, $this->modelData), setDynamicData($item->data->text, $this->modelData));
                    elseif (!empty($item->data->path)) $tmObj = $tmObj->document(setDynamicData($item->data->path, $this->modelData), setDynamicData($item->data->text, $this->modelData));
                    break;
                case "video":
                    if (!empty($item->data->url)) $tmObj = $tmObj->video(setDynamicData($item->data->url, $this->modelData));
                    elseif (!empty($item->data->path)) $tmObj = $tmObj->video(setDynamicData($item->data->path, $this->modelData));
                    $tmObj = $tmObj->video(setDynamicData($item->data->path, $this->modelData));
                    break;
                case "animation":
                    if (!empty($item->data->url)) $tmObj = $tmObj->animation(setDynamicData($item->data->url, $this->modelData));
                    elseif (!empty($item->data->path)) $tmObj = $tmObj->animation(setDynamicData($item->data->path, $this->modelData));
                    break;
            }
        }
        if ($text) $tmObj = $tmObj->content($text);
//        dd($text);
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
