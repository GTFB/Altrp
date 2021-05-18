<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\Plugin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Nwidart\Modules\Facades\Module;


class PluginController extends Controller
{
    /**
     * Главная страница со всеми плагинами
     * @return \Illuminate\Http\JsonResponse
     */
      public function index()
      {
          $modules = Module::all();
          $modulesStatusesFile = base_path('modules_statuses.json');
          if (!file_exists($modulesStatusesFile)) {
              $content = '';
              $plugins = Plugin::all();
              foreach ($plugins as $plugin) {
                  $enabled = $plugin->enabled ? 'true' : 'false';
                  $content .= '"' . $plugin->name . '": ' . $enabled . ',';
              }
              file_put_contents($modulesStatusesFile, '{' . trim($content, ',') . '}');
          }
          $modulesStatusesConfig = json_decode(file_get_contents($modulesStatusesFile), true);
          $modulesArr = [];
          if ($modules) {
              foreach ($modules as $module) {
                  if (!isset($modulesStatusesConfig[$module->getName()])) {
                      $modulesStatusesConfig[$module->getName()] = false;
                      file_put_contents($modulesStatusesFile, json_encode($modulesStatusesConfig));
                  }
                  $enabled = $module->isEnabled();
                  $modulesArr[] = [
                      'name' => $module->getName(),
                      'enabled' => $enabled,
                      'image' => $module->json()->image,
                      'url' => '/plugins/' . strtolower($module->getName())
                  ];
              }
          }
          return response()->json($modulesArr);
      }

    /**
     * Переключатель состояния плагина (вкл./выкл.)
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
      public function switch(Request $request)
      {
          $moduleName = $request->name;
          $value = $request->value;
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

          $plugin = Plugin::where('name', ucfirst($moduleName))->first();
          if (!$plugin) {
              $plugin = new Plugin();
          }
          $plugin->fill([
              'enabled' => $value,
              'name' => ucfirst($moduleName)
          ]);
          $plugin->save();

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

    /**
     * Установить плагин
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function install(Request $request)
    {
        \Validator::make($request->all(), [
            'name' => 'required',
            'version' => 'required'
        ]);
        $moduleName = $request->get('name');
        $moduleVersion = $request->get('version');
        $success = Module::install($moduleName, $moduleVersion);
        $exitCode = Artisan::call('migrate', ['--force' => true]);
        if ($success)
            return response()->json('Successfully installed!', 200);

        return response()->json('Failed of installation!', 500);
    }
}
