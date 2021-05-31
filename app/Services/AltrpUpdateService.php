<?php

namespace App\Services;


use App\Altrp\Controller;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\Schedule\ScheduleFileWriter;
use App\Altrp\Model;
use App\Altrp\Robot;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Exceptions\CommandFailedException;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use ZipArchive;

class AltrpUpdateService
{
  const UPDATE_DOMAIN = 'https://up.altrp.com/';
  //  const UPDATE_DOMAIN = 'http://altrp-servise.nz/';
  const PRODUCT_NAME = 'altrp';
  const TEST_PRODUCT_NAME = 'altrp-test';
  private $client;

  public function __construct()
  {
    $this->client = new Client();
  }

  /**
   * @param bool $test - если true, то устанавливает тестовую версию
   * @return string
   * @throws \HttpException
   */
  public function update( $test = false)
  {
    if ( env( 'APP_ENV', 'local' ) === 'local' ) {
      return true;
    }
    set_time_limit( 0 );
    $version = $this->get_version( $test );

    $url = self::UPDATE_DOMAIN . 'download/' . ( $test ? self::TEST_PRODUCT_NAME : self::PRODUCT_NAME ) . '/' . $version;
    try {
      $file = $this->client->get( $url )->getBody()->getContents();
    } catch (\Exception $e){
      return false;
    }

    if ( ! $this->write_public_permissions() ) {
      throw new \HttpException( 'Не удалось обновить режим чтения файлов' );
    }

    if ( ! $this->save_archive( $file ) ) {
      throw new \HttpException( 'Не удалось сохранить архив' );
    }
    if ( ! $this->update_files() ) {
      throw new \HttpException( 'Не удалось обновить файлы' );
    }
    if ( ! $this->write_public_permissions( 'public' ) ) {
      throw new \HttpException( 'Не удалось обновить режим чтения файлов' );
    }
    if ( ! $this->delete_archive() ) {
      throw new \HttpException( 'Не удалось удалить архив' );
    }
    if( File::exists( base_path( 'routes/page_routes.php' ) ) ){
      File::delete( base_path( 'routes/page_routes.php') );
    }

    /**
     * Проверяем нужно ли производить агрейд
     */
    $this->checkVersion( $version );

    // Lunch the installation if the /.env file doesn't exists
    if ( ! File::exists( base_path( '.env' ) ) ) {
      return redirect( '/install' );
    }


    // Get eventual new version value & the current (installed) version value
    Artisan::call( 'config:clear' );
    // Clear all the cache
    $this->clearCache();

    // Upgrade the Database
    $res = $this->upgradeDatabase();
    if ( $res === false ) {
      dd( 'ERROR' );
    }

    // Write providers
    $this->writeProviders();

    // Update modules statuses
    $this->updateModulesStatuses();

    // Update the current version to last version
    $this->setCurrentVersion( $version );

    // Clear all the cache
    $this->clearCache();

    return true;
  }

  /**
   * @param bool $test
   * @return string
   */
  public function get_version( $test = false )
  {
    $url = self::UPDATE_DOMAIN . 'version/' . ( $test ? self::TEST_PRODUCT_NAME : self::PRODUCT_NAME );


    $res = $this->client->post( $url )->getBody()->getContents();
    $res = json_decode( $res, true );
    if ( ! isset( $res['product_version'] ) ) {
      throw new NotFoundHttpException( 'Не возможно прочитать версию с сервиса обновления Альтерпи' );
    }
    return $res['product_version'];
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
  private function update_files()
  {
    Artisan::call( 'config:cache' );
    $file_path = storage_path( 'app/' . self::PRODUCT_NAME . '.zip' );

    $archive = new ZipArchive();

    if ( ! $archive->open( $file_path ) ) {
      return false;
    }
    if( File::exists( public_path( 'modules' ) ) ){
      File::cleanDirectory( public_path( 'modules' ) );
    }
    clearAllCache();
    return $archive->extractTo( base_path() );
  }

  /**
   * Записываем права для папки public
   * @param string $path
   * @return bool
   */
  private function write_public_permissions( $path = '')
  {
    try{
      exec("chmod -R 0775  " . base_path( $path ) );
      return true;
    } catch (\Exception $e){
      return false;
    }
  }

  /**
   * @return bool
   */
  private function delete_archive()
  {
    return Storage::disk( 'local' )->delete( self::PRODUCT_NAME . '.zip' );
  }

  /**
   * @param string $new_version
   */
  private function checkVersion( $new_version )
  {
    $old_version = env( 'APP_VERSION' );
    /**
     * Если версия меньше либо равна 0.6.1 вызываем апгредйер
     */
    if ( version_compare( $old_version, '0.6.1', '>=' ) ) {
      $this->upgrade_0_6_1();
    }
  }

  /**
   * Запись пользовательских роутов
   */

  private function upgrade_user_routes()
  {

  }

  private function upgrade_0_6_1()
  {
    $this->upgrade_user_routes();
  }

  /**
   * Clear all the cache
   */
  private function clearCache()
  {
    $this->removeRobotsTxtFile();
    $exitCode = Artisan::call( 'cache:clear' );
    sleep( 2 );
    $exitCode = Artisan::call( 'view:clear' );
    sleep( 1 );
    Artisan::call( 'storage:link' );
    File::delete( File::glob( storage_path( 'logs' ) . DIRECTORY_SEPARATOR . 'laravel*.log' ) );
  }

  /**
   * Remove the robots.txt file (It will be re-generated automatically)
   */
  private function removeRobotsTxtFile()
  {
    $robotsFile = public_path( 'robots.txt' );
    if ( File::exists( $robotsFile ) ) {
      File::delete( $robotsFile );
    }
  }

  /**
   * Upgrade the Database & Apply actions
   *
   * @return bool
   */
  private function upgradeDatabase()
  {
    Artisan::call( 'config:clear' );
    Artisan::call( 'migrate', [ '--force' => true ] );
    return true;
  }

  /**
   * Update the current version to last version
   *
   * @param $last
   */
  private function setCurrentVersion( $last )
  {
    if ( ! DotenvEditor::keyExists( 'APP_VERSION' ) ) {
      DotenvEditor::addEmpty();
    }
    DotenvEditor::setKey( 'APP_VERSION', $last );
    DotenvEditor::save();
  }

  /**
   * Remove all index methods from Altrp controllers
   *
   * @return bool
   */
  public function removeIndexMethods()
  {
    $files = \File::allFiles( app_path( 'Http/Controllers/AltrpControllers' ) );
    if ( ! $files ) return true;
    foreach ( $files as $file ) {
      $oldContent = $file->getContents();
      $content = preg_replace(
        "#/\*\*(.*?)public function index\(\)(.*?)}#ism",
        '',
        $oldContent
      );
      \File::put( $file->getRealPath(), $content );
    }
    return true;
  }

  /**
   * Update all altrp controllers files
   *
   * @throws CommandFailedException
   */
  public function updateAllControllers()
  {
    $controllers = Controller::all();
    if ( ! $controllers ) return true;
    foreach ( $controllers as $controller ) {
      $generator = new ControllerGenerator( $controller );
      if ( ! $generator->updateControllerFile() ) {
        throw new CommandFailedException( 'Failed to update ' . $controller->name . ' file.' );
      }
    }
    return true;
  }

  /**
   * Upgrade all resources entities (models, controllers, routes)
   *
   * @return bool
   */
  public function upgradeAllResources()
  {
    $this->updateAllModels();
    $this->updateAllRobotsSchedules();
    return true;
  }

  protected function updateAllModels()
  {
      $models = Model::all();
      if (! $models) return true;
      foreach ($models as $model) {
          $model->update(['last_upgrade' => Carbon::now()]);
      }
      return true;
  }

  protected function updateAllRobotsSchedules()
  {
      $robots = Robot::all();
      $writer = new ScheduleFileWriter(app_path('Console/Kernel.php'));

      foreach ($robots as $robot) {
          $command = 'robot:run ' . $robot->id;
          if ($writer->scheduleExists($command)) {
              $writer->removeSchedule($command);
          }

          if ($robot->start_condition == 'cron') {
              $config = is_string($robot->start_config)
                  ? json_decode($robot->start_config)
                  : json_decode(json_encode($robot->start_config));
              $writer->write(
                  'robot:run ' . $robot->id,
                  $config->period,
                  $config->restrictions
              );
          }
      }
  }

    /**
     * @return false|int
     */
    public function updateModulesStatuses()
    {
        try {
            $exitCode = Artisan::call('modules-statuses:write');
        } catch (\Exception $e) {
            Log::debug($e->getMessage());
            return false;
        }
        return true;
    }

    /**\
     * Записать все необходимые провайдеры в файл app.php
     * @return bool
     */
    protected function writeProviders()
    {
        Artisan::call('provider:write App/Providers/AltrpProviders/AppServiceProvider');
        Artisan::call('provider:write App/Providers/AltrpRepositoryServiceProvider');
        return true;
    }
}
