<?php

namespace App\Console;
use App\Console\Commands\PluginMake;
use App\Console\Commands\PluginMigrate;
use App\Console\Commands\RunRobotCommand;
use App\Console\Commands\ScheduleWorkCommand;
use App\Console\Commands\WriteModulesStatuses;
use App\Console\Commands\WriteServiceProvider;
use Illuminate\Console\Scheduling\Schedule;
use App\Console\Commands\PluginMakeMigration;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        PluginMakeMigration::class,
        PluginMigrate::class,
        PluginMake::class,
        WriteModulesStatuses::class,
        WriteServiceProvider::class,
        RunRobotCommand::class,
        ScheduleWorkCommand::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
         // CUSTOM_SCHEDULES_BEGIN

         // CUSTOM_SCHEDULES_END
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
