<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class PluginController extends Controller
{

      public function index(Request $request)
      {
            $pluginsConfig = json_decode(file_get_contents(app_path() . "/Plugins/plugins.json"), true);

            $pluginsInstalled = $pluginsConfig['installed'];

            $plugins = [];

            foreach ($pluginsInstalled as $plugin) {
                  $pluginFile = app_path() . "/Plugins/$plugin/$plugin.php";
                  $pluginClass = "App\\Plugins\\$plugin\\$plugin";
                  //Проверяем, есть ли основной класс
                  if (is_file($pluginFile)) {
                        $pluginInstance = new $pluginClass();
                        $plugins[] = [
                              'name' => $pluginInstance->getPluginName(),
                              'enabled' => $pluginInstance->pluginEnabled(),
                              'image' => $pluginInstance->getImage()
                        ];
                  }
            }

            return response()->json($plugins);
      }

      public function switch(Request $request)
      {
            $pluginName = $request->name;
            $value = $request->value;

            $pluginClass = "App\\Plugins\\$pluginName\\$pluginName";
            $pluginInstance = new $pluginClass();

            if ($value) {
                  return response()->json(['message' => $pluginInstance->enable() ? "Plugin activated successfully" : "Plugin already activated"]);
            }
            return response()->json(['message' => $pluginInstance->disable() ? "Plugin deactivated successfully" : "Plugin already deactivated"]);
      }
}
