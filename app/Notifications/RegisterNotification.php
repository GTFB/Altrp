<?php

namespace App\Notifications;

use App\Notifications\Channels\CustomDatabaseChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramChannel;
use NotificationChannels\Telegram\TelegramMessage;


class RegisterNotification extends Notification
{
    use Queueable;

    /**
     * @var array Данные юзера из формы (request)
     */
    private $data;

    /**
     * @var string метод модели
     */
    private $method;

    /**
     * RegisterNotification constructor.
     * @param $data
     * @param null $method
     */
    public function __construct($data, $method = null)
    {
        $this->data = $data;
        $this->method = $method;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = [];
        if(config('altrp.admin.send_email_new_users') && config('mail.username')) $via[] = 'mail';
        if ($notifiable->telegram_user_id) $via[] = TelegramChannel::class;

        return $via;
    }

    /**
     * Отправка уведомления через email
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $subject = $this->method === 'created' ? 'Новый пользователь успешно создан' : 'Данные пользователя успешно изменены';
        $mailObj = new MailMessage;
        $mailObj = $mailObj->line($this->getMessageText());
        $mailObj = $mailObj->from(config('mail.from.address'));
        $mailObj = $mailObj->subject($subject);
        return $mailObj;
    }

    /**
     * Отправка уведомления через телеграм
     * @param $notifiable
     * @return TelegramMessage|bool
     */
    public function toTelegram($notifiable)
    {
        if (!$notifiable->telegram_user_id) return false;
        $tmObj = TelegramMessage::create()
            ->to($notifiable->telegram_user_id);
        $tmObj = $tmObj->content($this->getMessageText());
        return $tmObj;
    }

    /**
     * Получить текст сообщения
     * @return string
     */
    public function getMessageText()
    {
        $info = '';
        $name = $this->data['name'] ?? '';
        $password = $this->data['password'] ?? '';
        if($this->method === 'created') $info = 'Новый пользователь успешно создан. ';
        if($this->method === 'updated') $info = 'Данные пользователя успешно изменены. ';
        return $info . "Login: $name , Password: $password";
    }
}
