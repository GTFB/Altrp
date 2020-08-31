<?php

namespace App\Plugins;

abstract class BasePlugin{

      public $pluginImage;
      public $pluginName; //на будущее, возможность изменять имя плагина
      private $pluginsFile;

      public function __construct()
      {
            $this->pluginImage = asset('/img/plugin.png');
            $this->pluginsFile = config_path('plugins');
      }

      public function getImage(){
            return $this->pluginImage!=null ? $this->pluginImage : asset('/img/plugin.png');
      }

      public function getPluginName(){
            $path = explode('\\',get_called_class());
            return $path[sizeof($path) - 1];
      }

      public function pluginEnabled(){
            return in_array($this->getPluginName(), config('plugins')) ? true : false;
      }

      public function enable(){
            return !$this->pluginEnabled() ? $this->enablePlugin() : 'Plugin is already activated';
      }

      public function disable(){
            return $this->pluginEnabled() ? $this->disablePlugin() : 'Plugin is already disabled';
      }

      private function disablePlugin(){
            $data = file_get_contents(config_path('plugins').'.php');
            
            $pluginName = $this->getPluginName();

            $str = str_replace("'$pluginName'," ?? "'$pluginName'", '',$data);
            
            file_put_contents(config_path('plugins').'.php',$str);

            return 'Plugin has been successful disabled';
      }

      private function enablePlugin(){
            $data = file_get_contents(config_path('plugins').'.php');
            $pos = strrpos($data, "\r\n");
            $pluginName = $this->getPluginName();
            
            if($pos !== false)
            {
                $str = substr_replace($data, "'$pluginName',\r\n", $pos, strlen("\r\n"));
            }

            file_put_contents(config_path('plugins').'.php',$str);

            return 'Plugin has been successful enabled';
      }


}