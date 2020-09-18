<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class PluginMakeMigration extends Command
{
    /**
     * php artisan make:migration create_users_table --path=/path/to/your/migration/directory
     *
     * @var string
     */
    protected $signature = 'plugin:migration {plugin} {migration_name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make specific migration for plugin';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $pluginName = $this->argument('plugin');
        $migrationName = $this->argument('migration_name');
        $pathToMigrationFolder = "app/Plugins/$pluginName/Migrations";
        if (!is_dir($pathToMigrationFolder)) {
            echo "Can't find this plugin or migration folder!\n";
            return;
        }

        try {
            Artisan::call("make:migration", [
                'name' => $migrationName,
                '--path' => $pathToMigrationFolder
            ]);
            echo "Migration created successfully!\n";
        } catch (\Throwable $th) {
            dd($th);
        }
    }
}
