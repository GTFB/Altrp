<?php

namespace App\Services;

use App\Altrp\Accessor;
use App\Altrp\AltrpDiagram;
use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Query;
use App\Altrp\Relationship;
use App\Altrp\Table;
use App\Altrp\Model as AltrpModel;
use App\Area;
use App\Constructor\Template;
use App\Constructor\TemplateSetting;
use App\Dashboards;
use App\Helpers\Classes\AltrpZip;
use App\Media;
use App\Page;
use App\PageDatasource;
use App\PagesTemplate;
use App\Permission;
use App\Reports;
use App\Role;
use App\SQLEditor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use TemplateSettings;
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
    foreach ( $data['templates'] as $key => $template ) {
      $_area = Area::find( $template['area'] );
      if( $_area ){
        $data['templates'][$key]['area_name'] = $_area->name;
      }
    }
    $data['pages'] = Page::all()->toArray();
    foreach ( $data['pages'] as $key => $page ) {
      $_page = Page::find( $page['id'] );
      if( $_page->model ){
        $data['pages'][$key]['model_name'] = $_page->model->name ;
      }
    }
    $data['media'] = Media::all()->toArray();

    $data['pages_templates'] = PagesTemplate::all()->toArray();
    $data['admin_logo'] = env( 'ALTRP_SETTING_ADMIN_LOGO', null );
    $data['container_width'] = env( 'ALTRP_SETTING_CONTAINER_WIDTH', null );

    $data['template_settings'] = TemplateSetting::all()->toArray();
    foreach ( $data['template_settings'] as $key => $template_setting ) {
      $_template = Template::find( $template_setting['template_id'] );
      if( $_template ){
        $data['template_settings'][$key]['template_guid'] = $_template->guid;
      }
    }

    /**
     * Данные отчетов, диаграмм и пр.
     */
    $data['altrp_diagrams'] = AltrpDiagram::all()->toArray();
    $data['dashboards'] = Dashboards::all()->toArray();
    $data['reports'] = Reports::all()->toArray();

    /**
     * Данные моделей
     */
    $data['tables'] = Table::all();

    $data['models'] = Model::all();
    foreach ( $data['models'] as $key => $model ) {
      $table = Table::find( $model['table_id'] );
      if( ! $table ){
        continue;
      }
      if( $model['name'] === 'user' ){
        continue;
      }
      $data['models'][$key]['table_name'] = $table->name;
    }

    $data['columns'] = Column::all();
    foreach ( $data['columns'] as $key => $column ) {
      $model = Model::find( $column['model_id'] );
      if( ! $model ){
        continue;
      }
      $table = Table::find( $column['table_id'] );
      if( ! $table ){
        continue;
      }
      $data['columns'][$key]['table_name'] = $table->name;
      $data['columns'][$key]['model_name'] = $model->name;
    }

    $data['altrp_accessors'] = Accessor::all();
    foreach ( $data['altrp_accessors'] as $key => $accessor ) {
      $model = Model::find( $accessor['model_id'] );
      if( ! $model ){
        continue;
      }
      $data['altrp_accessors'][$key]['model_name'] = $model->name;
    }

    $data['page_data_sources'] = PageDatasource::all();
    foreach ( $data['page_data_sources'] as $key => $page_data_source ) {
      if( ! $page_data_source->source ){
        continue;
      }
      $data['page_data_sources'][$key]['source_url'] = $page_data_source->source->url;
      $data['page_data_sources'][$key]['source_type'] = $page_data_source->source->type;
    }

    $data['s_q_l_editors'] = SQLEditor::all();
    foreach ( $data['s_q_l_editors'] as $key => $editor ) {
      $model = Model::find( $editor['model_id'] );
      if( ! $model ){
        continue;
      }
      $data['s_q_l_editors'][$key]['model_name'] = $model->name;
    }

    $data['relations'] = Relationship::all();
    foreach ( $data['relations'] as $key => $relation ) {
      $model = Model::find( $relation['model_id'] );
      if( ! $model ){
        continue;
      }
      $data['relations'][$key]['model_name'] = $model->name;
      $target_model = Model::find( $relation['target_model_id'] );
      if( ! $target_model ){
        continue;
      }
      $data['relations'][$key]['target_model_name'] = $target_model->name;
    }

    $data['queries'] = Query::all();
    foreach ( $data['queries'] as $key => $query ) {
      $model = Model::find( $query['model_id'] );
      if( ! $model ){
        continue;
      }
      $data['queries'][$key]['model_name'] = $model->name;

    }

    /**
     * Данные ролей и пр.
     */

    $data['roles'] = Role::all();
    $data['page_roles'] = DB::table( 'page_role' )->get()->toArray();
    foreach ( $data['page_roles'] as $key => $page_role ) {
      $role = Role::find( $page_role->role_id );
      $page = Page::find( $page_role->page_id );
      if( ! ( $page && $role ) ){
        continue;
      }
      $data['page_roles'][$key]->page_guid = $page->guid;
      $data['page_roles'][$key]->role_name = $role->name;
    }
    $data['permission_roles'] = DB::table( 'permission_role' )->get()->toArray();
    foreach ( $data['permission_roles'] as $key => $permission_role ) {
      $role = Role::find( $permission_role->role_id );
      $permission = Permission::find( $permission_role->permission_id );
      $data['permission_roles'][$key]->permission_name = $permission->name;
      $data['permission_roles'][$key]->role_name = $role->name;
    }
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

    File::ensureDirectoryExists( storage_path( 'tmp/imports' ) );
    $zip->extractTo( storage_path( 'tmp/imports'), 'altrp-settings/altrp-data.json' );
    $data = File::get( storage_path( 'tmp/imports/altrp-settings/altrp-data.json') );
    $data = json_decode( $data, true );
    $this->deleteFileTmp( 'imports' );
    /**
     * @var AltrpSettingsService $altrp_settings
     */
    $altrp_settings = app()->make( AltrpSettingsService::class );
    if( Arr::get( $data, 'container_width' ) ){
      $altrp_settings->set_setting_value( 'container_width', Arr::get( $data, 'container_width' ) );
    }
    if( Arr::get( $data, 'admin_logo' ) ){
      $altrp_settings->set_setting_value( 'admin_logo', Arr::get( $data, 'admin_logo' ) );
    }
    /**
     * импортируем настройки доступов
     */
    Role::import( Arr::get( $data, 'roles', [] ) );

    /**
     * импортируем настройки моделей
     */

//    Table::import( Arr::get( $data, 'tables', [] ) );
    AltrpModel::import( Arr::get( $data, 'models', [] ) );
    Column::import( Arr::get( $data, 'columns', [] ) );
    Accessor::import( Arr::get( $data, 'accessors', [] ) );
    Relationship::import( Arr::get( $data, 'relations', [] ) );
    SQLEditor::import( Arr::get( $data, 's_q_l_editors', [] ) );
    Query::import( Arr::get( $data, 'queries', [] ) );

    /**
     * импортируем настройки фронт приложения
     */
    Template::import( Arr::get( $data, 'templates', [] ) );
    TemplateSetting::import( Arr::get( $data, 'template_settings', [] ) );
    Media::import( Arr::get( $data, 'media', [] ) );
    Page::import( Arr::get( $data, 'pages', [] ) );
    PagesTemplate::import( Arr::get( $data, 'pages_templates', [] ) );
    PageDatasource::import( Arr::get( $data, 'page_data_sources', [] ) );
    /**
     * импортируем настройки доступов
     */
    Page::importPageRoles( Arr::get( $data, 'page_roles', [] ) );
    Role::importPermissionRole( Arr::get( $data, 'permission_roles', [] ) );
    /**
     * импортируем диграммы и пр.
     */
    AltrpDiagram::import( Arr::get( $data, 'altrp_diagrams', [] ) );
    Dashboards::import( Arr::get( $data, 'dashboards', [] ) );
    Reports::import( Arr::get( $data, 'reports', [] ) );
    /**
     * Удаляем архив
     */
    $zip->close();
    $this->deleteFileTmp( 'altrp-settings.zip' );
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
