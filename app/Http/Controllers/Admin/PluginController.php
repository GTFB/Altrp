<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Nwidart\Modules\Facades\Module;


class PluginController extends Controller
{

      public function index(Request $request)
      {
          $modules = Module::all();
          $modulesArr = [];
          if ($modules) {
              foreach ($modules as $module) {
                  $modulesArr[] = [
                      'name' => $module->getName(),
                      'enabled' => $module->isEnabled(),
                      'image' => $module->json()->image
                  ];
              }
          }
          return response()->json($modulesArr);
//            $pluginsConfig = json_decode(file_get_contents(app_path() . "/Plugins/plugins.json"), true);
//
//            $pluginsInstalled = $pluginsConfig['installed'];

//            $plugins = [];

//            foreach ($pluginsInstalled as $plugin) {
//                  $pluginFile = app_path() . "/Plugins/$plugin/$plugin.php";
//                  $pluginClass = "App\\Plugins\\$plugin\\$plugin";
//                  //Проверяем, есть ли основной класс
//                  if (is_file($pluginFile)) {
//                        $pluginInstance = new $pluginClass();
//                        $plugins[] = [
//                              'name' => $pluginInstance->getPluginName(),
//                              'enabled' => $pluginInstance->pluginEnabled(),
//                              'image' => $pluginInstance->getImage()
//                        ];
//                  }
//            }

//            return response()->json($plugins);
      }

      public function switch(Request $request)
      {
            $moduleName = $request->name;
            $value = $request->value;
//            $pluginClass = "App\\Plugins\\$pluginName\\$pluginName";
//            $pluginInstance = new $pluginClass();
          $module = Module::has(ucfirst($moduleName));
          if (! $module)
              return response()->json('Module no found', 404);
          $isEnabled = Module::isEnabled(ucfirst($moduleName));
          $moduleInstance = Module::find(ucfirst($moduleName));
          if ($isEnabled) {
              $moduleInstance->disable();
          } else {
              $moduleInstance->enable();
          }

            if ($value) {
                  return response()->json([
                      'message' => Module::isEnabled(ucfirst($moduleName))
                          ? "Plugin activated successfully"
                          : "Plugin already activated"
                  ]);
            }
            return response()->json([
                'message' => Module::isDisabled(ucfirst($moduleName))
                    ? "Plugin deactivated successfully"
                    : "Plugin already deactivated"
            ]);
      }
}
