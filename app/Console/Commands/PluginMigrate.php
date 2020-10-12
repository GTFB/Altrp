<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class PluginMigrate extends Command
{
  /**
   * 
   *
   * @var string
   */
  protected $signature = 'plugin:migrate {plugin}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Run plugin migrations';

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
    $pathToMigrationFolder = "app/Plugins/$pluginName/Migrations/";
    if (!is_dir($pathToMigrationFolder)) {
      echo "Can't find this plugin or migration folder!\n";
      return;
    }
    try {
      Artisan::call("migrate", [
        '--path' => "$pathToMigrationFolder",
        '--force' => true
      ]);
      echo "Migration end successfully!\n";
    } catch (\Throwable $th) {
      dd($th);
    }
  }
}
