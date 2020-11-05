<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PluginMake extends Command
{
      /**
       *
       *
       * @var string
       */
      protected $signature = 'plugin:make {plugin}';

      /**
       * The console command description.
       *
       * @var string
       */
      protected $description = 'Create empty plugin';

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

            $pathToPluginFolder = "app/Plugins/$pluginName";
            if (is_dir($pathToPluginFolder)) {
                  echo "Plugin exists!";
                  return;
            }

            mkdir($pathToPluginFolder);
            mkdir("$pathToPluginFolder/Migrations");
            mkdir("$pathToPluginFolder/Models");
            mkdir("$pathToPluginFolder/Public");
            mkdir("$pathToPluginFolder/Views");
            $this->makeControllerFolder($pluginName, $pathToPluginFolder);
            $this->makeRouteFile($pluginName, $pathToPluginFolder);
            $this->makePluginFile($pluginName, $pathToPluginFolder);
            exec('composer dump-autoload');
      }

      private function makeControllerFolder($pluginName, $pluginFolder)
      {
            $controllersFolder = "$pluginFolder/Controllers";
            mkdir($controllersFolder);
            $controllerFile = fopen("$controllersFolder/$pluginName" . "Controller" . ".php", "w") or die("Unable to open file!");
            $controllerClassTemplate = "<?php
          namespace App\\Plugins\\$pluginName\\Controllers;
          
          use App\Http\Controllers\Controller;
          use Illuminate\Support\Facades\Request;

          class {$pluginName}Controller extends Controller
          {
              public function index(){
                    return 'Hello I am {$pluginName}!';
              }
          }
          ";

            fwrite($controllerFile, $controllerClassTemplate);
            fclose($controllerFile);
      }

      private function makeRouteFile($pluginName, $pluginFolder)
      {
            $routeFile = fopen("$pluginFolder/routes.php", "w") or die("Unable to open file!");
            $routeTemplate = "<?php
      use Illuminate\Support\Facades\Route;
      
      Route::group(['namespace'=>'App\\Plugins\\$pluginName\\Controllers', 'prefix'=>'{$pluginName}'], function(){
            Route::get('/test', '{$pluginName}Controller@index');
      });
      ";

            fwrite($routeFile, $routeTemplate);
            fclose($routeFile);
      }

      private function makePluginFile($pluginName, $pluginFolder)
      {
            $baseFile = fopen("$pluginFolder/{$pluginName}.php", "w") or die("Unable to open file!");
            $pluginFileTemplate = "<?php
          namespace App\Plugins;

          use App\Plugins\BasePlugin;
          
          class $pluginName extends BasePlugin{
          
                public function __construct()
                {
                      " . '$this->imagePlugin' . " = asset('/img/imagenull.png');     
                }
          
          }";

            fwrite($baseFile, $pluginFileTemplate);
            fclose($baseFile);
      }
}
