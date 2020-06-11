<?php

namespace App\Services;


use GuzzleHttp\Client;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use ZipArchive;

class AltrpUpdateService
{
//  const UPDATE_DOMAIN = 'https://up.altrp.com/';
  const UPDATE_DOMAIN = 'http://altrp-servise.nz/';
  const PRODUCT_NAME = 'altrp';
  private $client;

  public function __construct()
  {
    $this->client = new Client();
  }


  /**
   * @return string
   * @throws NotFoundHttpException
   */
  public function get_version()
  {
    $res = $this->client->post( self::UPDATE_DOMAIN . 'version/' . self::PRODUCT_NAME )->getBody()->getContents();
    $res = json_decode( $res, true );
    if ( ! isset( $res['product_version'] ) ) {
      throw new NotFoundHttpException( 'Не возможно прочитать версию с сервиса обновления Альтерпи' );
    }
    return $res['product_version'];
  }

  /**
   * @return string
   * @throws \HttpException
   * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
   */
  public function update()
  {
    set_time_limit( 0 );
    $version = $this->get_version();

    $file = $this->client->get( self::UPDATE_DOMAIN . 'download/' . self::PRODUCT_NAME . '/' . $version )->getBody()->getContents();

    if( ! $this->save_archive( $file ) ){
      throw new \HttpException( 'Не удалось сохранить архив' );
    }
    if( ! $this->update_files() ){
      throw new \HttpException( 'Не удалось обновить файлы' );
    }
    if( ! $this->delete_archive() ){
      throw new \HttpException( 'Не удалось удалить архив' );
    }

    return true;
  }

  /**
   * @param string $file_content
   * @return bool
   */
  private function save_archive( $file_content )
  {
    return Storage::disk( 'local' )->put( self::PRODUCT_NAME . '.zip', $file_content );
  }

  /**
   * @return bool
   */
  private function update_files(){
    if( env( 'APP_ENV', 'local' ) === 'local' ){
      return true;
    }
    $file_path = storage_path( 'app/' . self::PRODUCT_NAME . '.zip' );

    $archive = new ZipArchive();

    if ( ! $archive->open( $file_path ) ) {
      return false;
    }

    return $archive->extractTo( base_path() );
  }

  /**
   * @return bool
   */
  private function delete_archive()
  {
    return Storage::disk( 'local' )->delete( self::PRODUCT_NAME . '.zip' );
  }
}