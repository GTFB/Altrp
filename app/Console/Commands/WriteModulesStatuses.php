<?php

namespace App\Console\Commands;

use App\Altrp\Plugin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class WriteModulesStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'modules-statuses:write';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Write all modules statuses';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $modulesStatusesFile = base_path('modules_statuses.json');
        $content = '';
        try {
            DB::connection()->getPdo();
        } catch (\Exception $e) {
            return true;
        }
        $plugins = Plugin::all();
        foreach ($plugins as $plugin) {
            $enabled = $plugin->enabled ? 'true' : 'false';
            $content .= '    "' . $plugin->name . '": ' . $enabled . ',' . PHP_EOL;
        }
        $result = file_put_contents($modulesStatusesFile, '{}');
        if ($result)
            $this->info('Modules statuses write successfully!');
    }
}
