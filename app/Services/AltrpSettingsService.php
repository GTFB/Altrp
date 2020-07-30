<?php

namespace App\Services;


use GuzzleHttp\Client;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;
use Mockery\Exception;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use ZipArchive;

class AltrpSettingsService{

  /**
   * @param string $setting_name
   * @param string $default
   * @return string
   */
  public function get_setting_value( $setting_name = '', $default = '' )
  {
    $value = $default;
    if( ! $setting_name ){
      return $value;
    }
    $settings_key = $this->get_setting_key( $setting_name );

    if( DotenvEditor::keyExists( $settings_key ) ){
      $value = DotenvEditor::getValue( $settings_key );
    }

    return $value ? $value : $default;
  }

  /**
   * @param string $setting_name
   * @return string
   */
  private function get_setting_key( $setting_name ){
    return 'ALTRP_SETTING_' . strtoupper( $setting_name );
  }

  /**
   * Сохраняет настройку
   * @param string $setting_name
   * @param string $value
   * @return bool
   */
  public function set_setting_value( $setting_name = '', $value = '' )
  {
    $settings_key = $this->get_setting_key( $setting_name );
    if( ! $setting_name ){
      return false;
    }
    try{
      DotenvEditor::setKey( $settings_key, $value );
      DotenvEditor::save();

    } catch (Exception $e){
      return false;
    }
    return true;
  }

}