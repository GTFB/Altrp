<?php

namespace App\Services;


use GuzzleHttp\Client;
use Illuminate\Contracts\Encryption\DecryptException;
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
   * @param boolean $decrypt
   * @return string
   * @throws \Jackiedo\DotenvEditor\Exceptions\KeyNotFoundException
   */
  public function get_setting_value( $setting_name = '', $default = '',  $decrypt= false )
  {
    $value = $default;
    if( ! $setting_name ){
      return $value;
    }
    $settings_key = $this->get_setting_key( $setting_name );

    if( DotenvEditor::keyExists( $settings_key ) ){
      $value = DotenvEditor::getValue( $settings_key );
    }

    if( $decrypt ){
      try {
        $value = decrypt( $value );
      } catch( DecryptException $e){
        $value = '';
      }
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
   * @param bool $encrypt
   * @return bool
   */
  public function set_setting_value( $setting_name = '', $value = '', $encrypt = false )
  {
    $settings_key = $this->get_setting_key( $setting_name );

    if( ! $setting_name ) return false;

    if( $encrypt ) $value = encrypt( $value );

    try{
      DotenvEditor::setKey( $settings_key, $value );
      DotenvEditor::save();

    } catch (Exception $e){
      return false;
    }
    return true;
  }

}
