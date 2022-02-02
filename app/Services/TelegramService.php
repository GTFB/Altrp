<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Client;

class TelegramService {

    protected $client;
    protected $bot_id;
    protected $chat_id;

    const URL = 'https://api.tlgr.org/bot';

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function sendMessage($bot_id, $chat_id, $message){
        return  $this->client->request('POST', self::URL.$bot_id.'/sendMessage', [
          'form_params' =>  [
            'chat_id' => $chat_id,
            'text' => $message,
            'parse_mode' => 'html'
          ]
        ]);
    }

    public function replyMessage($bot_id, $chat_id, $message, $message_id){
        return $this->client->request('POST', self::URL.$bot_id.'/sendMessage', [
          'form_params' =>  [
            'chat_id' => $chat_id,
            'text' => $message,
            'parse_mode' => 'html',
            'reply_to_message_id' => $message_id
          ]
        ]);
    }

    public function editMessage($bot_id, $chat_id, $message, $message_id){
        return $this->client->request('POST', self::URL.$bot_id.'/editMessageText', [
          'form_params' =>  [
            'chat_id' => $chat_id,
            'text' => $message,
            'parse_mode' => 'html',
            'message_id' => $message_id
          ]
        ]);
    }

    public function sendDocument($bot_id, $chat_id, $file_url, $filename=null, $reply_id = null){
      $pos = strpos($file_url, '/storage/');
      if ($pos == 0) {
        $file_url = str_replace("/storage/", "", $file_url);
      }
      return  $this->client->request('POST', self::URL.$bot_id.'/sendDocument', [
          'multipart' => [
            [
              'name'     => 'chat_id',
              'contents' => $chat_id
            ],
            [
              'name'     => 'document',
              'contents' => fopen(Storage::path( '/public/'.$file_url ), 'r'),
              'filename' => $filename
            ],
            [
              'name'     => 'reply_to_message_id',
              'contents' => $reply_id
            ]
          ]
        ]);
    }
    

    public function sendPhoto($bot_id, $chat_id, $file_url, $filename=null, $reply_id = null){
      $pos = strpos($file_url, '/storage/');
      if ($pos == 0) {
        $file_url = str_replace("/storage/", "", $file_url);
      }
      return  $this->client->request('POST', self::URL.$bot_id.'/sendPhoto', [
          'multipart' => [
            [
              'name'     => 'chat_id',
              'contents' => $chat_id
            ],
            [
              'name'     => 'photo',
              'contents' => fopen(Storage::path( '/public/'.$file_url ), 'r'),
              'filename' => $filename
            ],
            [
              'name'     => 'reply_to_message_id',
              'contents' => $reply_id
            ]
          ]
        ]);
    }


    public function sendButtons($bot_id, $chat_id, $message, $button){
        return  $this->client->request('POST', self::URL.$bot_id.'/sendMessage', [
          'form_params' =>  [
            'chat_id' => $chat_id,
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => json_encode($button)
          ]
        ]);
    }

    public function editButtons($bot_id, $chat_id, $message, $button, $message_id){
        return  $this->client->request('POST', self::URL.$bot_id.'/editMessageText', [
          'form_params' =>  [
            'chat_id' => $chat_id,
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => json_encode($button),
            'message_id' => $message_id,
          ]
        ]);
    }
}
