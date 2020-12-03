<?php

namespace App\Events;

use App\DialogMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\User;



class SendNotifications implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $modelName;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( User $user, string $modelName = "user")
    {
        $this->user = $user;
        //Передаем в конструктор название модели, 
        //если что нужно будет убрать предустановленный "user" из имени в конструкторе (я написал для примера)
        $this->modelName = $modelName;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        //Используйте просто имя модели в качестве названия канала
        // 1 модель = 1 канал
        // Тогда вроде как не придется создавать даже файла для каналов
        // мы подпишемся на все CRUD запросы этой модели, кроме GET
        // и будем слушать изменения
        return new Channel("notifications.{$this->modelName}");
    }
}