<?php

namespace App\Plugins;

abstract class BasePlugin
{

      public $pluginImage;
      public $pluginName; //на будущее, возможность изменять имя плагина

//      public function __construct()
//      {
//            $this->pluginImage = asset('/img/plugin.png');
//      }

      public function getImage()
      {
            return $this->pluginImage != null ? $this->pluginImage : asset('/img/plugin.png');
      }

      public function getPluginName()
      {
            $path = explode('\\', get_called_class());
            return $path[sizeof($path) - 1];
      }

      public function pluginEnabled()
      {
            $pluginsConf = file_get_contents(app_path() . "/Plugins/plugins.json");
            $enabledPlugins = json_decode($pluginsConf, true)['enabled'];
            return in_array($this->getPluginName(), $enabledPlugins) ? true : false;
      }

      public function enable()
      {
            return !$this->pluginEnabled() ? $this->enablePlugin() : false;
      }

      public function disable()
      {
            return $this->pluginEnabled() ? $this->disablePlugin() : false;
      }

      private function disablePlugin()
      {
            $pluginsFile =  app_path() . "/Plugins/plugins.json";
            $pluginsFileStream = file_get_contents($pluginsFile);
            $plugins = json_decode($pluginsFileStream, true);

            if (in_array($this->getPluginName(), $plugins['enabled'])) {
                  $pluginKey = array_search($this->getPluginName(), $plugins['enabled']);
                  unset($plugins['enabled'][$pluginKey]);
            }

            $putData = json_encode($plugins);

            file_put_contents($pluginsFile, $putData);

            return true;
      }

      private function enablePlugin()
      {
            $pluginsFile =  app_path() . "/Plugins/plugins.json";
            $pluginsFileStream = file_get_contents($pluginsFile);
            $plugins = json_decode($pluginsFileStream, true);

            if (!in_array($this->getPluginName(), $plugins['enabled'])) {
                  $plugins['enabled'][] = $this->getPluginName();
            }

            $putData = json_encode($plugins);

            file_put_contents($pluginsFile, $putData);

            return true;
      }
}
