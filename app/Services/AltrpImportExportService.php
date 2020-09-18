<?php

namespace App\Services;

use App\Constructor\Template;
use App\Page;
use App\PagesTemplate;
use Exception;
use Illuminate\Support\Facades\File;
use ZipArchive;

class AltrpImportExportService
{
  const ARCHIVE_NAME = 'altrp-settings.zip';

  /**
   * @throws Exception
   * @return string
   */
  public function exportAltrpSettings(){
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
    $zip->addFile( storage_path( 'tmp/altrp-settings/altrp-data.json' ),'altrp-settings/altrp-data.json' );
  }
}
