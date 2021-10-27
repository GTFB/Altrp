<?php


namespace App\Services\Robots\Bots\TelegramBot\Handlers;


use WeStacks\TeleBot\Interfaces\UpdateHandler as BaseUpdateHandler;
use WeStacks\TeleBot\Objects\InlineKeyboardButton;
use WeStacks\TeleBot\Objects\Keyboard\ReplyKeyboardMarkup;
use WeStacks\TeleBot\Objects\Update;
use WeStacks\TeleBot\TeleBot;

class UpdateHandler extends BaseUpdateHandler
{
    protected $currentNode = false;

    protected $robotser;

    public static function trigger(Update $update, TeleBot $bot)
    {
        return true;
    }

    public function handle()
    {
        $config = $this->bot->getConfig();
        $this->robotser = $config['poll']['robotser'] ?? false;

        if($this->robotser) {
            $currentAction = $this->robotser->getCurrentBlock('start');

            if ($currentAction->getCurrentNode() === 'onstart'){
                do {
                    $currentAction->run();
                    $this->currentNode = $currentAction->getNextNode();
                    $currentAction = $currentAction->next();
                } while(! $currentAction->isEnd('bot'));
                $this->sendCustomMessage();
                return;
            }
           
            if(isset($this->update->callback_query)){
                $this->answerCallbackQuery([
                    'callback_query_id' => $this->update->callback_query->id,
                ]);
                $this->currentNode = $currentAction->getNextNode();

                if ($this->currentNode->type === 'bot'){
                    $currentAction->run($this->update);
                    $this->currentNode = $currentAction->getNextNode();
                    $currentAction = $currentAction->next();
                }
                
                do {
                    $currentAction->run();
                    $this->currentNode = $currentAction->getNextNode();                    
                    $currentAction = $currentAction->next();
                } while(! $currentAction->isEnd('bot'));

                $this->sendCustomMessage();
            }
        }
    }

    protected function getChatUser()
    {
        if (isset($this->update->callback_query))  return $this->update->callback_query->from;

        return $this->update->message->from;
    }

    protected function sendCustomMessage()
    {
        if ($this->currentNode->type === 'bot'){
            $message = '';
            $button = [];
            $send = [];
            if (is_array($this->currentNode->data->props->nodeData->data->content)){
                foreach ($this->currentNode->data->props->nodeData->data->content as $item){
                    switch ($item->type){
                        case 'content':
                            $message .= $item->data->text ?? '';
                            break;
                        case 'link':
                            break;
                        case 'button':
                            $button[] = (new InlineKeyboardButton([
                                'text' => $item->data->text ?? '',
                                'callback_data' => $item->data->shortcode ?? ''
                            ]));
                            break;
                        case 'file':
                            break;
                        case 'document':
                            break;
                        case 'video':
                            break;
                        case 'animation':
                            break;
                        case '':
                            break;
                    }
                }

                $replyMarkup = ReplyKeyboardMarkup::create([
                    'inline_keyboard' => [$button],
                    'resize_keyboard' => true,
                    'one_time_keyboard' => true
                ]);

                if (!$message) $message = 'message';
        
                $this->sendMessage([
                    'text' => $message,
                    'reply_markup' => $replyMarkup
                ]);            
            }
        }
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
