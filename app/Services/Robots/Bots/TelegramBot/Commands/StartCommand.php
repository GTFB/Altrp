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
    }
}
