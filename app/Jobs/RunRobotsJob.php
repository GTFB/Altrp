<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Ixudra\Curl\Facades\Curl;

class RunRobotsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data;

    protected $startCond;

    protected $robots;

    protected $robotsService;


    /**
     * Create a new job instance.
     *
     * @param $robots
     * @param $robotsService
     * @param $data
     * @param $startCond
     * @param $currentEnv
     */
    public function __construct($robots, $robotsService, $data, $startCond, $currentEnv)
    {
        $this->robots = $robots;
        $this->startCond = $startCond;
        $this->robotsService = $robotsService;
        $this->data = $data;
        $this->data['app'] = $currentEnv;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->robots as $robot) {
            if ($robot->start_condition != $this->startCond || !$robot->enabled) continue;
            $this->robotsService
                ->initRobot($robot)
                ->runRobot($this->data);
        }
    }

    /**
     * @param \Exception $exception
     */
    public function failed(\Exception $exception)
    {
        Log::info($exception->getMessage());
    }
}
