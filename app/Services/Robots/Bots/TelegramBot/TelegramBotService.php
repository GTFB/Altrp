<?php

namespace App\Services\Robots\Bots\TelegramBot;

use Jackiedo\DotenvEditor\Facades\DotenvEditor;
use App\Services\Robots\Bots\TelegramBot\Handlers\UpdateHandler;
use WeStacks\TeleBot\TeleBot;
use WeStacks\TeleBot\BotManager;

class TelegramBotService
{
    protected $bot;

    public function __construct($token = false)
    {
        if (!$token) $token = env('TELEGRAM_BOT_TOKEN', '');

        $this->bot = new TeleBot([
            'token'      => $token,
            'api_url'       => env('TELEGRAM_API_URL', 'https://api.telegram.org'),
            'exceptions'    => env('TELEGRAM_BOT_DEBUG', false),
            'async'         => env('TELEGRAM_ASYNC_REQUESTS', false),
        //     'webhook' => [
        //         'url'               => env('TELEGRAM_WEBHOOK_URL', env('APP_URL') . '/telegrambot/webhook'),
        //         'certificate'       => env('TELEGRAM_BOT_CERT_PATH', storage_path('app/ssl/public.pem')),
        //         'max_connections'   => env('TELEGRAM_MAX_CONNECTIONS', 40),
        //         'ip_address'        => env('TELEGRAM_IP_ADDRESS', ''),
        //         'allowed_updates'   => ["message", "edited_channel_post", "callback_query"]
        //    ],
           'handlers'      => [
               // App\Services\Robots\Bots\TelegramBot\Commands\RegisterCommand::class,
               // App\Services\Robots\Bots\TelegramBot\Commands\HelpCommand::class,
               // App\Services\Robots\Bots\TelegramBot\Commands\InfoCommand::class,
               \App\Services\Robots\Bots\TelegramBot\Commands\StartCommand::class,
               \App\Services\Robots\Bots\TelegramBot\Handlers\UpdateHandler::class
           ],
           'poll'    => [
               'limit'             => 100,
               'timeout'           => 0,
               'allowed_updates'   => ["message", "edited_channel_post", "callback_query"]
           ],
       ]);
    }

    public function getBot()
    {
        return $this->bot;
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

    public function getUpdates()
    {
        if (env('APP_ENV') == 'local') {
            $updates = [];
            $last_offset = 0;
            while (true) {
                $updates = $this->bot->getUpdates([
                    'offset' => $last_offset + 1
                ]);
                foreach ($updates as $update) {
                    $this->bot->handleUpdate($update);
                    $last_offset = $update->update_id;

                    // $this->bot->callHandler(UpdateHandler::class, $update, true);
                }
            }
        } else {
            $updates = $this->bot->handleUpdate();
        }
        return $updates;
    }

    public function getWebhookInfo()
    {
        return $this->bot->getWebhookInfo();
    }

    public function setWebhook($params)
    {
        try {
            $response = $this->bot->setWebhook($params);
        } catch (\Exception $e) {
            return false;
        }

        $jsonResponse = json_decode($this->getWebhookInfo());
        \Log::info($jsonResponse);
        // dd($jsonResponse);
        if (isset($jsonResponse->url)) {
            DotenvEditor::setKey('TELEGRAM_WEBHOOK_URL', $jsonResponse->url);
            DotenvEditor::save();
        }

        return $response;
    }

    public function handleCommands()
    {
        return 1;
    }

    public function handleUpdates($updates)
    {

    }
}