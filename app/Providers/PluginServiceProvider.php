<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class PluginServiceProvider extends ServiceProvider{
      
      public function boot(){

            $plugins = config('plugins');

            foreach($plugins as $plugin){
                  
                  $pluginNamespace = "App\\Plugins\\$plugin";

                  $routesFile = app_path()."/Plugins/$plugin/routes.php";
                  $viewsFolder = app_path()."/Plugins/$plugin/Views";
                  $migrationsFolder = app_path()."/Plugins/$plugin/Migrations";
                  
                  // $pluginInstanceFile = app_path()."/Plugins/$plugin/$plugin.php";

                  if(file_exists($routesFile)){
                        $this->loadRoutesFrom($routesFile);
                  }

                  if (is_dir($viewsFolder)) {
                        $this->loadViewsFrom($viewsFolder, $pluginNamespace);
                  }

                  if(is_dir($migrationsFolder)){
                        $this->loadMigrationsFrom($migrationsFolder, $pluginNamespace);
                  }
            }

      }

}