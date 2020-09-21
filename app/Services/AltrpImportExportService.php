<?php

namespace App\Services;

use App\Constructor\Template;
use App\Helpers\Classes\AltrpZip;
use App\Media;
use App\Page;
use App\PagesTemplate;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class AltrpImportExportService
{
  const ARCHIVE_NAME = 'altrp-settings.zip';

  /**
   * @return string
   * @throws Exception
   */
  public function exportAltrpSettings( ){
    $this->createArchive();

    return $this->getFilename();
  }

  /**
   * Создаем архив
   * @throws Exception
   */
  private function createArchive(){

    $zip = new ZipArchive();
    $file_path =  $this->getFilename();
    $open_result = $zip->open( $file_path, ZipArchive::CREATE );
    if ( $open_result !== TRUE ) {
      $exception = new Exception( $zip->getStatusString() . 'ZipArchive::open() error code:' . $open_result );
      throw( $exception );
    }
    $this->createFiles();
    $this->archiveFiles( $zip );
    $zip->close();
    $this->deleteFiles();
  }
  /**
   * Создаем временные файлы
   * @throws Exception
   */
  private function createFiles(){
    File::ensureDirectoryExists( storage_path( 'tmp/altrp-settings' ) );
    $this->createJSONDataFile();
  }
  /**
   * Удаляем временные файлы
   * @throws Exception
   */
  private function deleteFiles(){
    File::deleteDirectory( storage_path( 'tmp/altrp-settings' ) );
  }
  /**
   * Создаем json-файл данных
   * @throws Exception
   */
  private function createJSONDataFile(){
    $data = [];
    $data['templates'] = Template::all()->toArray();
    $data['pages'] = Page::all()->toArray();
    foreach ( $data['pages'] as $key => $page ) {
      $_page = Page::find( $page['id'] );
      if( $_page->model ){
        $data['pages'][$key]['model_name'] = $_page->model->name ;
      }
    }
    $data['media'] = Media::all()->toArray();
    $data['pages_templates'] = PagesTemplate::all()->toArray();
    $data['admin_logo'] = json_decode( env( 'ALTRP_SETTING_ADMIN_LOGO' ), true );
    $content = json_encode( $data );
    File::put( storage_path( 'tmp/altrp-settings/altrp-data.json' ), $content);
  }

  /**
   * Получить имя файла
   * @return string
   */
  private function getFilename() {
    File::ensureDirectoryExists( storage_path( 'tmp' ) );
    return storage_path( 'tmp/' . self::ARCHIVE_NAME  );
  }

  /**
   * @param ZipArchive $zip
   */
  private function archiveFiles( ZipArchive $zip )
  {
    $zip->addFile( storage_path( 'tmp/altrp-settings/altrp-data.json' ),
      'altrp-settings/altrp-data.json' );
    $all_media = Storage::allFiles( '/public/media' );

    foreach ( $all_media as $file ) {
      $zip->addFile( storage_path( 'app/' . $file ),
        str_replace( 'public/', '', $file ) );
    }
  }


  /**
   * @param Request $request
   * @throws Exception
   */
  public function importAltrpSettings( Request $request ){
    $filename = $this->saveFileTmp( $request->file( 'files' )[0], 'altrp-settings.zip' );
    $zip = new AltrpZip();
    if( $zip->open( $filename ) !== true ){
      return;
    }

    /**
     * Извлекаем медиа
     */
    File::ensureDirectoryExists( storage_path( 'app/public/media' ) );
    $zip->extractSubdirTo( storage_path( 'app/public/media' ), 'media' );

//     ;echo '<pre style="padding-left: 200px;">';
//     var_dump( $zip->error );
//     echo '</pre>';


    File::ensureDirectoryExists( storage_path( 'tmp/imports' ) );
    $zip->extractTo( storage_path( 'tmp/imports'), 'altrp-settings/altrp-data.json' );
    $data = File::get( storage_path( 'tmp/imports/altrp-settings/altrp-data.json') );
    $data = json_decode( $data, true );
    $this->deleteFileTmp( 'imports' );
    /**
     * импортируем настройки фронт приложения
     */
    Template::import( Arr::get( $data, 'templates', [] ) );
    Media::import( Arr::get( $data, 'media', [] ) );
    Page::import( Arr::get( $data, 'pages', [] ) );
    PagesTemplate::import( Arr::get( $data, 'pages_templates', [] ) );
    /**
     * импортируем настройки моделей
     */

    /**
     * Удаляем архив
     */
    $zip->close();
    $filename = $this->deleteFileTmp( 'altrp-settings.zip' );


  }

  /**
   * @param UploadedFile $archive
   * @param $filename
   * @return string
   * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
   */
  private function saveFileTmp( UploadedFile $archive, $filename )
  {
    $filename = storage_path( 'tmp/') . $filename;
    File::ensureDirectoryExists( storage_path( 'tmp' ) );
    File::put( $filename, $archive->get() );
    return $filename;
  }

  /**
   * @param $filename
   * @return boolean
   */
  private function deleteFileTmp( $filename )
  {
    $filename = storage_path( 'tmp/') . $filename;
    if( File::isDirectory( $filename ) ){
      $result = File::deleteDirectory( $filename );
    } elseif( File::isFile( $filename ) ){
      $result = File::delete( $filename );
    } else {
      $result = true;
    }
    return $result;
  }
}
