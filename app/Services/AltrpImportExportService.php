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
    $this->createJSONTemplatesFile();
    $this->createJSONPagesFile();
    $this->createJSONMediaFile();
    $this->createJSONPageTemplatesFile();
    $this->createJSONTemplateSettingsFile();
    $this->createJSONSettingsFile();
    $this->createJSONDiagramsFile();
    $this->createJSONDashboardsFile();
    $this->createJSONReportsFile();
    $this->createJSONTablesFile();
    $this->createJSONModelsFile();
    $this->createJSONColumnsFile();;
    $this->createJSONAccessorsFile();
    $this->createJSONPageDatasourcesFile();
    $this->createJSONSQLEditorsFile();
    $this->createJSONRelationshipsFile();
    $this->createJSONQueriesFile();
    $this->createJSONRolesFile();
    $this->createJSONPageRolesFile();
    $this->createJSONPermissionRolesFile();

    //$this->createJSONDataFile();
  }
  /**
   * Удаляем временные файлы
   * @throws Exception
   */
  private function deleteFiles(){
    File::deleteDirectory( storage_path( 'tmp/altrp-settings' ) );
  }

    /**
     * Создаем json файл
     * @param $path
     * @param $data
     */
  private function createJsonFile($path, $data) {

    $fp = fopen(storage_path( $path ), 'wb');
    $encoder = new \Violet\StreamingJsonEncoder\StreamJsonEncoder(
        $data,
        function ($json) use ($fp) {
            fwrite($fp, $json);
        }
    );

    $encoder->encode();
    fclose($fp);
  }

    /**
     * Читаем json файл
     * @param $path
     * @param $data
     */
    private function readJsonFile($path) {

        $listener = new \JsonStreamingParser\Listener\InMemoryListener();
        $stream = fopen(storage_path( $path), 'r');
        try {
            $parser = new \JsonStreamingParser\Parser($stream, $listener);
            $parser->parse();
            fclose($stream);
        } catch (Exception $e) {
            fclose($stream);
            throw $e;
        }

        return $listener->getJson();
    }

    /**
     * Создаем json-файл шаблонов
     * @throws Exception
     */
    private function createJSONTemplatesFile()
    {

        $data = Template::all()->map(function ($template, $key) {
            $_area = Area::find($template->area);
            if ($template->area) {
                $template->area_name = $_area->name;
            }
            return $template->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-templates.json", $data->toArray());
    }

    /**
     * Создаем json-файл страниц
     * @throws Exception
     */
    private function createJSONPagesFile()
    {

        $data = Page::all()->map(function ($page, $key) {
            if( $page->model ){
                $page->model_name = $page->model->name ;
            }
            return $page->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-pages.json", $data->toArray());
    }

    /**
     * Создаем json-файл медиа
     * @throws Exception
     */
    private function createJSONMediaFile()
    {
        $this->createJsonFile("tmp/altrp-settings/altrp-media.json", Media::all()->toArray());
    }

    /**
     * Создаем json-файл связи страниц с шаблонами
     * @throws Exception
     */
    private function createJSONPageTemplatesFile()
    {
        $this->createJsonFile("tmp/altrp-settings/altrp-page_templates.json", PagesTemplate::all()->toArray());
    }

    /**
     * Создаем json-файл основных настроек
     * @throws Exception
     */
    private function createJSONSettingsFile()
    {
        $data['admin_logo'] = env( 'ALTRP_SETTING_ADMIN_LOGO', null );
        $data['container_width'] = env( 'ALTRP_SETTING_CONTAINER_WIDTH', null );

        $this->createJsonFile("tmp/altrp-settings/altrp-settings.json", $data);
    }

    /**
     * Создаем json-файл настройки шаблонов
     * @throws Exception
     */
    private function createJSONTemplateSettingsFile()
    {

        $data = TemplateSetting::all()->map(function ($template_setting, $key) {
            if( $template_setting->template ){
                $template_setting->template_guid = $template_setting->template->guid;
            }
            return $template_setting->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-template_settings.json", $data->toArray());
    }

    /**
     * Создаем json-файл диаграмм
     * @throws Exception
     */
    private function createJSONDiagramsFile()
    {
        $this->createJsonFile("tmp/altrp-settings/altrp-diagrams.json", AltrpDiagram::all()->toArray());
    }

    /**
     * Создаем json-файл дашбордов
     * @throws Exception
     */
    private function createJSONDashboardsFile()
    {
        $this->createJsonFile("tmp/altrp-settings/altrp-dashboards.json", Dashboards::all()->toArray());
    }

    /**
     * Создаем json-файл отчетов
     * @throws Exception
     */
    private function createJSONReportsFile()
    {
        $this->createJsonFile("tmp/altrp-settings/altrp-reports.json", Reports::all()->toArray());
    }

    /**
     * Создаем json-файл таблиц
     * @throws Exception
     */
    private function createJSONTablesFile()
    {
        $this->createJsonFile("tmp/altrp-settings/altrp-tables.json", Table::all()->toArray());
    }

    /**
     * Создаем json-файл моделей
     * @throws Exception
     */
    private function createJSONModelsFile()
    {
        $data = Model::all()->filter(function($model_row) {
            if(!$model_row->altrp_table) return false;
            return $model_row->name !== 'user';
        })->values()->map(function ($model, $key) {
            $model->table_name = $model->altrp_table->name;
            return $model->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-models.json", $data->toArray());
    }
    /**
     * Создаем json-файл полей
     * @throws Exception
     */
    private function createJSONColumnsFile()
    {

        $data = Column::all()->filter(function($column_row) {
            if(!$column_row->altrp_model) return false;
            if(!$column_row->altrp_table) return false;
            return true;
        })->values()->map(function ($column, $key) {
            $column->table_name = $column->altrp_table->name;
            $column->model_name = $column->altrp_model->name;
            return $column->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-columns.json", $data->toArray());
    }

    /**
     * Создаем json-файл аксессоров
     * @throws Exception
     */
    private function createJSONAccessorsFile()
    {
        $data = Accessor::all()->filter(function($accessor_row) {
            if(!$accessor_row->model) return false;
            return true;
        })->values()->map(function ($accessor, $key) {
            $accessor->model_name = $accessor->model->name;
            return $accessor->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-accessors.json", $data->toArray());
    }

    /**
     * Создаем json-файл подключенных к странице источников данных
     * @throws Exception
     */
    private function createJSONPageDatasourcesFile()
    {
        $data = PageDatasource::all()->filter(function($datasource_row) {
            if(!$datasource_row->source) return false;
            return true;
        })->values()->map(function ($datasource, $key) {
            $datasource->source_url = $datasource->source->url;
            $datasource->source_type = $datasource->source->type;
            return $datasource->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-page_datasources.json", $data->toArray());
    }

    /**
     * Создаем json-файл sql запросов
     * @throws Exception
     */
    private function createJSONSQLEditorsFile()
    {
        $data = SQLEditor::all()->filter(function($editor_row) {
            if(!$editor_row->model) return false;
            return true;
        })->values()->map(function ($editor, $key) {
            $editor->model_name = $editor->model->name;
            return $editor->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-s_q_l_editors.json", $data->toArray());
    }

    /**
     * Создаем json-файл связей
     * @throws Exception
     */
    private function createJSONRelationshipsFile()
    {
        $data = Relationship::all()->filter(function($relationship) {
            if(!$relationship->altrp_model) return false;
            if(!$relationship->altrp_target_model) return false;
            return true;
        })->values()->map(function ($relationship, $key) {
            $relationship->model_name = $relationship->altrp_model->name;
            $relationship->target_model_name = $relationship->altrp_target_model->name;
            return $relationship->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-relationships.json", $data->toArray());
    }

    /**
     * Создаем json-файл запросов
     * @throws Exception
     */
    private function createJSONQueriesFile()
    {
        $data = Query::all()->filter(function($query_row) {
            if(!$query_row->model) return false;
            return true;
        })->values()->map(function ($query, $key) {
            $query->model_name = $query->model->name;
            return $query->withoutRelations();
        });

        $this->createJsonFile("tmp/altrp-settings/altrp-queries.json", $data->toArray());
    }

    /**
     * Создаем json-файл ролей
     * @throws Exception
     */
    private function createJSONRolesFile()
    {
        $this->createJsonFile("tmp/altrp-settings/altrp-roles.json", Role::all()->toArray());
    }

    /**
     * Создаем json-файл ролей привязанных к страницам
     * @throws Exception
     */
    private function createJSONPageRolesFile()
    {
        $data = DB::table( 'page_role' )
            ->select('page_role.*', 'pages.guid as page_guid', 'roles.name as role_name')
            ->join('pages', 'page_role.page_id', '=', 'pages.id')
            ->join('roles', 'page_role.role_id', '=', 'roles.id')
            ->get();

        $this->createJsonFile("tmp/altrp-settings/altrp-page_roles.json", $data->toArray());
    }

    /**
     * Создаем json-файл прав доступа привязанных к ролям
     * @throws Exception
     */
    private function createJSONPermissionRolesFile()
    {
        $data = DB::table( 'permission_role' )
            ->select('permission_role.*', 'permissions.name as permission_name', 'roles.name as role_name')
            ->join('permissions', 'permission_role.permission_id', '=', 'permissions.id')
            ->join('roles', 'permission_role.role_id', '=', 'roles.id')
            ->get();


        $this->createJsonFile("tmp/altrp-settings/altrp-permissions_roles.json", $data->toArray());
    }

  /**
   * Получить имя файла
   * @return string
   */
  private function getFilename() {
    File::ensureDirectoryExists( storage_path( 'tmp' ) );
    return storage_path( 'tmp/' . request()->server->get( 'SERVER_NAME' ) . '.zip'  );
  }

  /**
   * @param ZipArchive $zip
   */
  private function archiveFiles( ZipArchive $zip )
  {

      $all_files = Storage::disk("tmp")->allFiles("altrp-settings");

      foreach ( $all_files as $file ) {
          $zip->addFile( storage_path( 'tmp/' . $file ), $file );
      }

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

    File::ensureDirectoryExists( storage_path( 'tmp/imports/altrp-settings' ) );
    $zip->extractSubdirTo( storage_path( 'tmp/imports/altrp-settings' ), 'altrp-settings' );
    $zip->close();
    //dd();
    //$zip->extractTo( storage_path( 'tmp/imports'), 'altrp-settings/altrp-data.json' );

    /*$data = File::get( storage_path( 'tmp/imports/altrp-settings/altrp-data.json') );
    $data = json_decode( $data, true );
    $this->deleteFileTmp( 'imports' );*/
    /**
     * @var AltrpSettingsService $altrp_settings
     */
    $altrp_settings = app()->make( AltrpSettingsService::class );

    $import_setting = $this->readJsonFile("tmp/imports/altrp-settings/altrp-settings.json");
    $this->deleteFileTmp( 'imports/altrp-settings/altrp-settings.json"' );

    if( Arr::get( $import_setting, 'container_width' ) ){
      $altrp_settings->set_setting_value( 'container_width', Arr::get( $import_setting, 'container_width' ) );
    }
    if( Arr::get( $import_setting, 'admin_logo' ) ){
      $altrp_settings->set_setting_value( 'admin_logo', Arr::get( $import_setting, 'admin_logo' ) );
    }
    /**
     * импортируем настройки доступов
     */

    $import_roles = $this->readJsonFile("tmp/imports/altrp-settings/altrp-roles.json");
    $this->deleteFileTmp( 'imports/altrp-settings/altrp-roles.json"' );
    Role::import($import_roles);

    /**
     * импортируем настройки моделей
     */
      //    Table::import( Arr::get( $data, 'tables', [] ) );

      $import_models = $this->readJsonFile("tmp/imports/altrp-settings/altrp-models.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-models.json"' );
      AltrpModel::import($import_models);

      $import_columns = $this->readJsonFile("tmp/imports/altrp-settings/altrp-columns.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-columns.json"' );
      Column::import($import_columns);

      $import_accessors = $this->readJsonFile("tmp/imports/altrp-settings/altrp-accessors.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-accessors.json"' );
      Accessor::import($import_accessors);

      $import_relationships = $this->readJsonFile("tmp/imports/altrp-settings/altrp-relationships.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-relationships.json"' );
      Relationship::import($import_relationships);

      $import_SQLEditors = $this->readJsonFile("tmp/imports/altrp-settings/altrp-s_q_l_editors.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-s_q_l_editors.json"' );
      SQLEditor::import($import_SQLEditors);

      $import_queries = $this->readJsonFile("tmp/imports/altrp-settings/altrp-queries.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-queries.json"' );
      Query::import($import_queries);



    /**
     * импортируем настройки фронт приложения
     */

      $import_templates = $this->readJsonFile("tmp/imports/altrp-settings/altrp-templates.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-templates.json"' );
      Template::import($import_templates);

      $import_templates_settings = $this->readJsonFile("tmp/imports/altrp-settings/altrp-template_settings.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-template_settings.json"' );
      TemplateSetting::import($import_templates_settings);

      $import_media = $this->readJsonFile("tmp/imports/altrp-settings/altrp-media.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-media.json"' );
      Media::import($import_media);

      $import_pages = $this->readJsonFile("tmp/imports/altrp-settings/altrp-pages.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-pages.json"' );
      Page::import($import_pages);

      $import_page_templates = $this->readJsonFile("tmp/imports/altrp-settings/altrp-page_templates.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-page_templates.json"' );
      PagesTemplate::import($import_page_templates);

      $import_page_datasources = $this->readJsonFile("tmp/imports/altrp-settings/altrp-page_datasources.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-page_datasources.json"' );
      PageDatasource::import($import_page_datasources);

    /**
     * импортируем настройки доступов
     */

      $import_page_roles = $this->readJsonFile("tmp/imports/altrp-settings/altrp-page_roles.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-page_roles.json"' );
      Page::importPageRoles($import_page_roles);

      $import_permission_roles = $this->readJsonFile("tmp/imports/altrp-settings/altrp-permissions_roles.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-permissions_roles.json"' );
      Role::importPermissionRole($import_permission_roles);

    /**
     * импортируем диграммы и пр.
     */

      $import_diagrams = $this->readJsonFile("tmp/imports/altrp-settings/altrp-diagrams.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-diagrams.json"' );
      AltrpDiagram::import($import_diagrams );

      $import_dashboards = $this->readJsonFile("tmp/imports/altrp-settings/altrp-dashboards.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-dashboards.json"' );
      Dashboards::import($import_dashboards);

      $import_reports = $this->readJsonFile("tmp/imports/altrp-settings/altrp-reports.json");
      $this->deleteFileTmp( 'imports/altrp-settings/altrp-reports.json"' );
      Reports::import($import_reports);

    /**
     * Удаляем архив
     */
    $this->deleteFileTmp( 'imports' );
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
