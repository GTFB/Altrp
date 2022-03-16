<?php


namespace App\Notifications;


use App\Notifications\Channels\CustomDatabaseChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Mails\RobotsMail;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramChannel;
use NotificationChannels\Telegram\TelegramMessage;
use NotificationChannels\Telegram\TelegramFile;
use Illuminate\Notifications\AnonymousNotifiable;
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
    public function __construct($node, $modelData = null, $type = '')
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
        // проверка на зарегистрированного юзера
        if(!$notifiable instanceof AnonymousNotifiable) $this->setDataDynamic($notifiable);

        $channels = [];
        $channel = $this->node->data->props->nodeData->data->channel;

        if ($this->checkData($notifiable, 'telegram')) $channels[] = TelegramChannel::class;
        if ($this->checkData($notifiable, 'mail')) $channels[] = $channel;
        if ($this->checkData($notifiable, 'broadcast')) $channels[] = $channel;
        // if ($this->checkData($notifiable, 'database')) $channels[] = [CustomDatabaseChannel::class]; // Добавление канала для записи уведомлений в БД

        return $channels;
    }

    /**
     * Проверка на валидность данных для типа канала уведомления
     *
     * @param  mixed  $notifiable
     * @return mixed
     */
    protected function checkData($notifiable, $type)
    {
        $result = false;
        $user = !$notifiable instanceof AnonymousNotifiable;
        $channel = $this->node->data->props->nodeData->data->channel;
        $content = $this->node->data->props->nodeData->data->content;

        switch ($type){
            case 'telegram':
                $toId = $this->getIdForType($notifiable, 1);     
                if ($channel === 'telegram' && $toId && config('services.telegram-bot-api.token') && is_array($content) && !empty($content)) $result = true;
                break;
            case 'mail':
                $toEmail = $this->getEmail($notifiable);     
                if ($channel === 'mail' && $toEmail && config('mail.username')) $result = true;
                break;
            case 'broadcast':
                if ($channel === 'broadcast' && $user) $result = true;
                break;
            case 'database':
                if ($user) $result = true;
                break;
            }

        return $result;
    }

    /**
     * Получение из коллекции id канала телеграмма (чата или пользователя)
     *
     * @param  mixed  $notifiable
     * @return mixed
     */
    protected function getIdForType($notifiable, $type)
    {
        $entitiesType = $this->node->data->props->nodeData->data->entities;
        $dynamicValue = $this->node->data->props->nodeData->data->entitiesData->dynamicValue;
        $id = 0;

        if (!$notifiable instanceof AnonymousNotifiable && is_object($notifiable->social_interactions) && !$notifiable->social_interactions->isEmpty()) {
            $socialArray = $notifiable->social_interactions->toArray();
            foreach ($socialArray as $item){
                if (is_array($item) && $item['type_id'] == $type) $id = $item['value'];
            }
        } else {
            if ($entitiesType === 'dynamic' && $dynamicValue) $id = setDynamicData($dynamicValue, $this->modelData);
        }

        return $id;
    }

    /**
     * Получение адреса email
     *
     * @param  mixed  $notifiable
     * @return mixed
     */
    protected function getEmail($notifiable)
    {
        $entitiesType = $this->node->data->props->nodeData->data->entities;
        $dynamicValue = $this->node->data->props->nodeData->data->entitiesData->dynamicValue;
        $email = 0;

        if ($notifiable instanceof AnonymousNotifiable) {
            if ($entitiesType === 'dynamic' && $dynamicValue) $email = setDynamicData($dynamicValue, $this->modelData);
        } else {
            if ($notifiable->email) $email = $notifiable->email;
        }

        return $email;
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
        $toEmail = $this->getEmail($notifiable);     

        $mailObj = (new RobotsMail($this->templateHandler()))
                        ->from(setDynamicData($this->node->data->props->nodeData->data->content->from, $this->modelData))
                        ->subject(setDynamicData($this->node->data->props->nodeData->data->content->subject, $this->modelData))
                        ->to($toEmail);
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

        $toId = $this->getIdForType($notifiable, 1);        

        $tmObj = TelegramMessage::create();
        $tmObj->to($toId);

        foreach ($content as $item) {
            if ($item->type === 'file' || $item->type === 'document' || $item->type === 'video' || $item->type === 'animation') {
              $tmObj = TelegramFile::create();
              $tmObj->to($toId);
            }
        }

        $text = '';

        foreach ($content as $item) {
            switch ($item->type){
                case "content":
                    $text .= setDynamicData($item->data->text, $this->modelData) . "\n";
                    break;
                case "link":
                    $text .= '[' . setDynamicData($item->data->text, $this->modelData) . '](' . setDynamicData($item->data->url, $this->modelData) . ") \n";
                    break;
                case "button":
                    if (!empty($item->data->url)) {
                        $tmObj = $tmObj->button(setDynamicData($item->data->text, $this->modelData), setDynamicData($item->data->url, $this->modelData));
                    }
                    if (!empty($item->data->shortcode)) {
                        $tmObj = $tmObj->buttonWithCallback(setDynamicData($item->data->text, $this->modelData), setDynamicData($item->data->shortcode, $this->modelData));
                    }
                    break;
                case "photo":
                    if (!empty($item->data->url)) $tmObj = $tmObj->photo(setDynamicData($item->data->url, $this->modelData));
                    elseif (!empty($item->data->path)) $tmObj = $tmObj->file(setDynamicData($item->data->path, $this->modelData), setDynamicData($item->data->text, $this->modelData));
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
     * Запись в хранилище юзера, которому адресовано уведомление
     * @param $notifiable
     */
    protected function setDataDynamic($notifiable)
    {
        $this->modelData['altrpuserto'] = $notifiable->toArray();
    }

    /**
     * @param \Exception $exception
     */
    public function failed(\Exception $exception)
    {
        dump($exception);
    }
}
