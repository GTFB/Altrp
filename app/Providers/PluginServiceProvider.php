<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class PluginServiceProvider extends ServiceProvider
{

      public function boot()
      {

            $this->bootPluginFile();

            $this->indexInstalledPlugins();

            $this->activateEnabledPlugins();
      }

      private function indexInstalledPlugins(): void
      {
            //check plugins folder for installed projects
            $pluginsInstalled = glob(app_path() . "/Plugins/*", GLOB_ONLYDIR);

            $pluginsFile = app_path() . "/Plugins/plugins.json";

            $pluginsFileStream = file_get_contents($pluginsFile);

            $pluginsJsonDecode = json_decode($pluginsFileStream, true);

            foreach ($pluginsInstalled as $plugin) {
                  $path = explode('/', $plugin);
                  $pluginName = $path[sizeof($path) - 1];
                  if (is_file("$plugin/$pluginName.php")) {
                        if (isset($pluginsJsonDecode['installed']) && !in_array($pluginName, $pluginsJsonDecode['installed'])) {
                              $pluginsJsonDecode['installed'][] = $pluginName;
                        }
                  }
            }

            $pluginsJsonResult = json_encode($pluginsJsonDecode);
            file_put_contents($pluginsFile,  $pluginsJsonResult);
      }

      private function activateEnabledPlugins(): void
      {
            $plugins = json_decode(file_get_contents(app_path() . "/Plugins/plugins.json"), true);
        $enabled = data_get($plugins, 'enabled', [] );
            foreach ($enabled as $plugin) {

                  $pluginNamespace = "App\\Plugins\\$plugin";

                  $routesFile = app_path() . "/Plugins/$plugin/routes.php";
                  $viewsFolder = app_path() . "/Plugins/$plugin/Views";
                  $migrationsFolder = app_path() . "/Plugins/$plugin/Migrations";

                  if (file_exists($routesFile)) {
                        $this->loadRoutesFrom($routesFile);
                  }

                  if (is_dir($viewsFolder)) {
                        $this->loadViewsFrom($viewsFolder, $pluginNamespace);
                  }

                  if (is_dir($migrationsFolder)) {
                        $this->loadMigrationsFrom($migrationsFolder, $pluginNamespace);
                  }
            }
      }

      private function bootPluginFile()
      {
            $pluginsFile = app_path() . "/Plugins/plugins.json";

            if (!is_file($pluginsFile)) {
                  //make empty json config file
                  file_put_contents(app_path() . "/Plugins/plugins.json", '{"installed":[], "enabled":[]}');
            }
      }
}
