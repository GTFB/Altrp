<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;


class PluginController extends Controller{

      public function index(Request $request){
            $pluginsInstalled = glob(app_path()."/Plugins/*", GLOB_ONLYDIR);

            $plugins = [];

            foreach($pluginsInstalled as $plugin){
                  $path = explode('/',$plugin);
                  $pluginName = $path[sizeof($path) - 1];
                  $pluginClass = "App\\Plugins\\$pluginName";
                  //Проверяем, есть ли основной класс
                  if(is_file("$plugin/$pluginName.php")){
                        $pluginInstance = new $pluginClass();
                        $plugins[] = [
                              'name'=>$pluginInstance->getPluginName(),
                              'enabled'=>$pluginInstance->pluginEnabled(),
                              'image'=>$pluginInstance->getImage()
                        ];
                  }
            }

            return response()->json($plugins);
      }

      public function switch(Request $request){
            $pluginName = $request->name;
            $value = $request->value;

            $pluginClass = "App\\Plugins\\$pluginName";
            $pluginInstance = new $pluginClass();
            
            if($value){
                  return response()->json(['message'=>$pluginInstance->enable()]);
            }
            return response()->json(['message'=>$pluginInstance->disable()]);
            
      }

}