<?php

namespace App\Console\Commands;

use App\Altrp\Robot;
use App\Helpers\Classes\CurrentEnvironment;
use App\Jobs\RunRobotsJob;
use App\Services\Robots\RobotsService;
use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;

class RunRobotCommand extends Command
{
    use DispatchesJobs;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'robot:run {robot_id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run robot';

    protected $robotsService;

    /**
     * Create a new command instance.
     *
     * @param RobotsService $robotsService
     */
    public function __construct(RobotsService $robotsService)
    {
        $this->robotsService = $robotsService;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $robotId = $this->argument('robot_id');
        $robot = Robot::where([
            ['id', $robotId],
            ['start_condition','cron'],
            ['enabled',1]
        ])->first();

        if ($robot) {
            $this->dispatch(new RunRobotsJob(
                [$robot],
                $this->robotsService,
                [],
                $robot->start_condition,
                CurrentEnvironment::getInstance()
            ));
            $this->info('Robot ' . $robotId . ' run successfully!');
        } else {
            $this->info('Robot with ID ' . $robotId . ' not found.');
        }
    }
}
