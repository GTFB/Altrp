<?php


namespace App\Mails;


use App\Services\Robots\RobotsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RobotsMail extends Mailable implements ShouldQueue
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->view(
            'emails.robotmail', ['data' => $this->data]
        );
    }
}
