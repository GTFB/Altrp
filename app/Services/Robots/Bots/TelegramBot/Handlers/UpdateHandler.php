<?php


namespace App\Services\Robots\Bots\TelegramBot\Handlers;


use WeStacks\TeleBot\Interfaces\UpdateHandler as BaseUpdateHandler;
use WeStacks\TeleBot\Objects\InlineKeyboardButton;
use WeStacks\TeleBot\Objects\Keyboard\ReplyKeyboardMarkup;
use WeStacks\TeleBot\Objects\Update;
use WeStacks\TeleBot\TeleBot;

class UpdateHandler extends BaseUpdateHandler
{
    private static $name;

    protected $prevAction;

    public static function trigger(Update $update, TeleBot $bot)
    {
        return true;
    }

    public function handle()
    {
        if(isset($this->update->callback_query) && $this->getBotData() == 'awp'){
            $this->answerCallbackQuery([
                'callback_query_id' => $this->update->callback_query->id,
            ]);
            $this->sendMessage([
                'text' => 'кнопка awp!!!'
            ]);
            return;
        }
    }

    protected function getChatUser()
    {
        if (isset($this->update->callback_query))  return $this->update->callback_query->from;

        return $this->update->message->from;
    }

     /**
     * @return string
     */
    protected function getBotData()
    {
        if (isset($this->update->callback_query)) return $this->update->callback_query->data;

        return $this->update->message->text ?? '';
    }
}
