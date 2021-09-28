<?php


namespace App\Services\Robots\Bots\TelegramBot\Commands;


use WeStacks\TeleBot\Handlers\CommandHandler;
use WeStacks\TeleBot\Objects\InlineKeyboardButton;
use WeStacks\TeleBot\Objects\Keyboard\ReplyKeyboardMarkup;
use WeStacks\TeleBot\Objects\Update;
use WeStacks\TeleBot\TeleBot;

class StartCommand extends CommandHandler
{
    protected static $aliases = [ '/start'];

    protected static $description = 'Запустить бота или поздороваться с ним.';

    protected $data;

    public function __construct(TeleBot $bot, Update $update)
    {
        parent::__construct($bot, $update);
    }

    public function handle()
    {
        $this->showRegister();
    }

    public function getBotData()
    {
        $update = $this->getUpdates();
        if (isset($update->callback_query)) {
            return $update->callback_query->data;
        }
        return $update->message->text;
    }

    public function getBotInfo()
    {
        return $this->bot->getMe();
    }

    protected function getChatUser()
    {
        if (isset($this->update->callback_query)) {
            return $this->update->callback_query->from;
        }
        return $this->update->message->from;
    }

    protected function showRegister()
    {
        $keyboard = [
            [
                (new InlineKeyboardButton([
                    'text' => 'test',
                    'callback_data' => 'test'
                ])),
                (new InlineKeyboardButton([
                    'text' => 'awp',
                    'callback_data' => 'awp'
                ])),
                (new InlineKeyboardButton([
                    'text' => 'altrp',
                    'callback_data' => 'altrp'
                ]))
            ],
        ];

        $replyMarkup = ReplyKeyboardMarkup::create([
            'inline_keyboard' => $keyboard,
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);

        $message = 'хэлло';

        // $bot = TelegramBot::where(
        //     'bot_token',
        //     config('telebot.bots.' . config('telebot.default') . '.token')
        // )->first();

        // if ($bot && $bot->settings && $bot->settings->start_message) {
        //     $message = $bot->settings->start_message;
        // }

        $this->sendMessage([
            'text' => $message,
            'reply_markup' => $replyMarkup
        ]);
    }
}
