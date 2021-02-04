<?php

namespace App\Notifications;

use App\Notifications\Channels\CustomDatabaseChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;
use NotificationChannels\Telegram\TelegramChannel;
use NotificationChannels\Telegram\TelegramFile;
use NotificationChannels\Telegram\TelegramMessage;

class CommonNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Модель данных
     * @var $model
     */
    public $model;

    /**
     * Настройки уведомления
     * @var $noticeSettings
     */
    protected $noticeSettings;

    /**
     * Обработанные настройки уведомления
     * @var $parsedNoticeSettings
     */
    protected $parsedNoticeSettings;

    /**
     * Дополнительные данные
     * @var $data
     */
    protected $data;

    /**
     * Create a new notification instance.
     *
     * @param $model
     * @param $noticeSettings
     * @param array $otherData
     */
    public function __construct($model, $noticeSettings, $otherData = [])
    {
        $this->model = $model;
        $this->noticeSettings = $noticeSettings;
        $this->parsedNoticeSettings = $noticeSettings->parsed_settings;
        $this->data = $otherData;
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

        if ($this->parsedNoticeSettings->send->front->enabled) $via[] = 'broadcast';

        if ($notifiable->telegram_user_id && $this->parsedNoticeSettings->send->telegram->enabled) $via[] = TelegramChannel::class;

        if ($this->parsedNoticeSettings->send->email->enabled) $via[] = 'mail';

        return $via;
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
        $data = $this->parsedNoticeSettings->data;

        foreach ($data as $item) {
            switch ($item->type) {
                case 'content':
                    $mailObj = $mailObj->line($this->replaceColumns($item->value));
                    break;
                case 'button':
                    $url = $this->replaceColumns($item->value);
                    $url = Str::contains($url, 'http') || Str::contains($url, 'https')
                        ? $url : url($url);
                    $mailObj = $mailObj->action($item->field, $url);
                    break;
            }
        }

        return $mailObj;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        $data = $this->parseData($this->parsedNoticeSettings->data);
        $data['action_type'] = $this->data['action_type'];
        $data['delete_url'] = "/notifications/delete/{$this->id}";
        $data['make_as_read_url'] = "/unread_notifications/{$this->id}/mark_as_read";
        $data['name'] = $this->getNotificationSettingName();
        $data['notice_name'] = $this->getNoticeName();

        return new BroadcastMessage($data);
    }

    /**
     * Сохранение уведомлений в базе данных
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return $this->parseData($this->parsedNoticeSettings->data);
    }

    /**
     * Сохранение уведомлений в базе данных
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toCustomDatabase($notifiable)
    {
        return $this->parseData($this->parsedNoticeSettings->data);
    }

    /**
     * Отправка уведомлений через телеграм
     * @param $notifiable
     * @return TelegramMessage
     */
    public function toTelegram($notifiable)
    {
        $tmObj = TelegramMessage::create()
            ->to($notifiable->telegram_user_id);

        $data = $this->parsedNoticeSettings->data;
        $content = 'notice: ';

        foreach ($data as $item) {
            if ($item->type == 'content') {
                $content .= $item->value . "\n";
            }
            if ($item->type == 'file' || $item->type == 'document' || $item->type == 'video' || $item->type == 'animation') {
                $tmObj = TelegramFile::create()
                    ->to($notifiable->telegram_user_id)
                    ->options([
                        'parse_mode' => 'HTML'
                    ]);
            }
        }
        $tmObj = $tmObj->content($this->replaceColumns($content));

        foreach ($data as $item) {
            switch ($item->type) {
                case 'file':
                    $tmObj = $tmObj->photo($this->replaceColumns($item->value));
                    break;
                case 'document':
                    $tmObj = $tmObj->document($this->replaceColumns($item->value), $item->field);
                    break;
                case 'video':
                    $tmObj = $tmObj->video($this->replaceColumns($item->value));
                    break;
                case 'animation':
                    $tmObj = $tmObj->animation($this->replaceColumns($item->value));
                    break;
                case 'button':
                    $url = $this->replaceColumns($item->value);
                    $url = Str::contains($url, 'http') || Str::contains($url, 'https')
                        ? $url : url($url);
                    $tmObj = $tmObj->button($item->field, $url);
                    break;
            }
        }

        return $tmObj;
    }

    /**
     * Спарсить данные
     * @param $data
     * @return array
     */
    protected function parseData($data)
    {
        $parsedData = [];
        foreach ($data as $item) {
            $parsedData[$item->field] = $this->replaceColumns($item->value);
        }
        return $parsedData;
    }

    /**
     * Заменить динамические переменные на данные из полей модели
     * @param $subject
     * @return string|string[]
     */
    protected function replaceColumns($subject)
    {
        preg_match_all("#\{\{altrpdata\.(?<fields>[\w]+)\}\}#", $subject, $matches);
        if ($matches) {
            $matches = $matches['fields'];
            foreach ($matches as $field) {
                if (in_array($field, $this->data['columns'])) {
                    $subject = str_replace("{{altrpdata.{$field}}}", $this->model->$field, $subject);
                }
            }
        }
        return $subject;
    }

    /**
     * Получить название уведомления
     * @return mixed
     */
    public function getNotificationSettingName()
    {
        return $this->noticeSettings->name;
    }

    /**
     * Получить тип действия, на которое срабатывает уведомление
     * @return mixed
     */
    public function getActionType()
    {
        return $this->data['action_type'];
    }

    public function getNoticeName()
    {
        return $this->parsedNoticeSettings->notice_name;
    }

}
