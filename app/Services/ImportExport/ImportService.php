<?php


namespace App\Services\ImportExport;


use App\Reports;
use App\Services\ImportExport\Files\AccessorsFile;
use App\Services\ImportExport\Files\ColumnsFile;
use App\Services\ImportExport\Files\DashboardsFile;
use App\Services\ImportExport\Files\DiagramsFile;
use App\Services\ImportExport\Files\MediaFile;
use App\Services\ImportExport\Files\ModelsFile;
use App\Services\ImportExport\Files\PageDatasourcesFile;
use App\Services\ImportExport\Files\PageRolesFile;
use App\Services\ImportExport\Files\PagesFile;
use App\Services\ImportExport\Files\PageTemplatesFile;
use App\Services\ImportExport\Files\PermissionRolesFile;
use App\Services\ImportExport\Files\QueriesFile;
use App\Services\ImportExport\Files\RelationshipsFile;
use App\Services\ImportExport\Files\RemoteDataFile;
use App\Services\ImportExport\Files\RemoteDataSourcesFile;
use App\Services\ImportExport\Files\DataSourcesRolesFile;
use App\Services\ImportExport\Files\DataSourcesPermissionsFile;
use App\Services\ImportExport\Files\ReportsFile;
use App\Services\ImportExport\Files\RolesFile;
use App\Services\ImportExport\Files\SettingsFile;
use App\Services\ImportExport\Files\SQLEditorsFile;
use App\Services\ImportExport\Files\TablesFile;
use App\Services\ImportExport\Files\TemplateSettingsFile;
use App\Services\ImportExport\Files\TemplatesFile;
use App\Services\ImportExport\Files\ValidationFieldsFile;
use App\Services\ImportExport\Files\ValidationRulesFile;
use App\Services\ImportExport\Readers\IReader;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use ZipArchive;

class ImportService
{
    /**
     * Путь к папке в которой создается архив
     */
    private const ARCHIVE_FOLDER = "tmp";
    /**
     * Название файла архива
     */
    private const ARCHIVE_NAME = "altrp-settings.zip";

    /**
     * Путь для извлечения файлов в архиве
     */
    private const EXTRACT_PATH = "tmp/imports";

    /**
     * Путь для медиа файлов
     */
    private const MEDIA_DESTINATION_PATH = "app/public/media";

    public $reader;

    private $filename;

    private $with_delete;

    /**
     * ImportService constructor.
     * @param IReader $reader
     * @param UploadedFile $file
     * @param bool $with_delete
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function __construct(IReader $reader, UploadedFile $file, bool $with_delete = false)
    {
        $this->reader = $reader;
        $this->filename = $this->saveArchive($file);
        $this->with_delete = $with_delete;
    }

    /**
     * Функция импорта всех данных и настроек
     * @return bool
     * @throws BindingResolutionException
     */
    public function importAll() {
        $this->extractArchive();

        $this->importMedia()
            ->importSettings()
            ->importDiagrams()
            ->importDashboards()
            ->importReports()
            ->importTables()
            ->importModels()
            ->importColumns()
            ->importRelationships()
            ->importAccessors()
            ->importSQLEditors()
            ->importQueries()
            ->importRoles()
            ->importPages()
            ->importPageRoles()
            ->importPageDatasources()
            ->importPermissionRoles()
            ->importRemoteData()
            ->importRemoteDataSources()
            ->importRemoteDataSourcesRules()
            ->importRemoteDataSourcesPermissions()
            ->importTemplates()
            ->importPageTemplates()
            ->importTemplateSettings()
            ->importValidationFields()
            ->importValidationRules();

        $this->deleteTmpFiles();

        return true;
    }

    /**
     * Метод удаления временных файлов
     */
    private function deleteTmpFiles() {
        File::deleteDirectory( storage_path(self::EXTRACT_PATH) );
        File::delete( storage_path(self::ARCHIVE_FOLDER . "/" . self::ARCHIVE_NAME) );
    }


    /**
     * Импорт данных о правилах валидации
     * @return $this
     */
    public function importValidationRules() {
        $rules = new ValidationRulesFile();
        $rules->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $rules->getArchivePath() . "/" . $rules->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о колонках валидации
     * @return $this
     */
    public function importValidationFields() {
        $fields = new ValidationFieldsFile();
        $fields->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $fields->getArchivePath() . "/" . $fields->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о удаленных справочниках
     * @return $this
     */
    public function importRemoteData() {
        $remote_data = new RemoteDataFile();
        $remote_data->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $remote_data->getArchivePath() . "/" . $remote_data->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о удаленных источниках данных
     * @return $this
     */
    public function importRemoteDataSources() {
      $remote_datasource = new RemoteDataSourcesFile();
      $remote_datasource->import(
        $this->reader,
        storage_path(self::EXTRACT_PATH . "/" . $remote_datasource->getArchivePath() . "/" . $remote_datasource->getFileName()),
        $this->with_delete
      );
      return $this;
    }

      /**
       * Импорт данных о ролях для удаленных источников данных
       * @return $this
       */
      public function importRemoteDataSourcesRules() {
        $remote_datasource_role = new DataSourcesRolesFile();
        $remote_datasource_role->import(
          $this->reader,
          storage_path(self::EXTRACT_PATH . "/" . $remote_datasource_role->getArchivePath() . "/" . $remote_datasource_role->getFileName()),
          $this->with_delete
        );
        return $this;
      }

      /**
       * Импорт данных о разрешениях для удаленных источников данных
       * @return $this
       */
      public function importRemoteDataSourcesPermissions() {
        $remote_datasource_permission = new DataSourcesPermissionsFile();
        $remote_datasource_permission->import(
          $this->reader,
          storage_path(self::EXTRACT_PATH . "/" . $remote_datasource_permission->getArchivePath() . "/" . $remote_datasource_permission->getFileName()),
          $this->with_delete
        );
        return $this;
      }

    /**
     * Импорт данных о доступных для ролей действий
     * @return $this
     */
    public function importPermissionRoles() {
        $permission_roles = new PermissionRolesFile();
        $permission_roles->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $permission_roles->getArchivePath() . "/" . $permission_roles->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о доступных для страниц ролей
     * @return $this
     */
    public function importPageRoles() {
        $page_roles = new PageRolesFile();
        $page_roles->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $page_roles->getArchivePath() . "/" . $page_roles->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о ролях
     * @return $this
     */
    public function importRoles() {
        $roles = new RolesFile();
        $roles->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $roles->getArchivePath() . "/" . $roles->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о sql builder
     * @return $this
     */
    public function importQueries() {
        $queries = new QueriesFile();
        $queries->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $queries->getArchivePath() . "/" . $queries->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о связях
     * @return $this
     */
    public function importRelationships() {
        $relationships = new RelationshipsFile();
        $relationships->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $relationships->getArchivePath() . "/" . $relationships->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о sql запросах
     * @return $this
     */
    public function importSQLEditors() {
        $sql_editors = new SQLEditorsFile();
        $sql_editors->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $sql_editors->getArchivePath() . "/" . $sql_editors->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о подключенных к странице источниках данных
     * @return $this
     */
    public function importPageDatasources() {
        $page_datasources = new PageDatasourcesFile();
        $page_datasources->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $page_datasources->getArchivePath() . "/" . $page_datasources->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о аксессорах
     * @return $this
     */
    public function importAccessors() {
        $accessors = new AccessorsFile();
        $accessors->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $accessors->getArchivePath() . "/" . $accessors->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о колонках
     * @return $this
     */
    public function importColumns() {
        $columns = new ColumnsFile();
        $columns->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $columns->getArchivePath() . "/" . $columns->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о моделях
     * @return $this
     */
    public function importModels() {
        $models = new ModelsFile();
        $models->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $models->getArchivePath() . "/" . $models->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о таблицах
     * @return $this
     */
    public function importTables() {
        $tables = new TablesFile();
        $tables->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $tables->getArchivePath() . "/" . $tables->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о отчетах
     * @return $this
     */
    public function importReports() {
        $reports = new ReportsFile();
        $reports->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $reports->getArchivePath() . "/" . $reports->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о дашбордах
     * @return $this
     */
    public function importDashboards() {
        $dashboards = new DashboardsFile();
        $dashboards->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $dashboards->getArchivePath() . "/" . $dashboards->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о диагарммах
     * @return $this
     */
    public function importDiagrams() {
        $diagrams = new DiagramsFile();
        $diagrams->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $diagrams->getArchivePath() . "/" . $diagrams->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о основных настройках
     * @return $this
     * @throws BindingResolutionException
     */
    public function importSettings() {
        $settings = new SettingsFile();
        $settings->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $settings->getArchivePath() . "/" . $settings->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о настройках шаблонах
     * @return $this
     */
    public function importTemplateSettings() {
        $settings = new TemplateSettingsFile();
        $settings->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $settings->getArchivePath() . "/" . $settings->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о подключенных к странице шаблонах
     * @return $this
     */
    public function importPageTemplates() {
        $page_templates = new PageTemplatesFile();
        $page_templates->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $page_templates->getArchivePath() . "/" . $page_templates->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о страницах
     * @return $this
     */
    public function importPages() {
        $pages = new PagesFile();
        $pages->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $pages->getArchivePath() . "/" . $pages->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о шаблонах
     * @return $this
     */
    public function importTemplates() {
        $templates = new TemplatesFile();
        $templates->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $templates->getArchivePath() . "/" . $templates->getFileName()),
            $this->with_delete
        );
        return $this;
    }

    /**
     * Импорт данных о медиа файлах
     * @return $this
     */
    public function importMedia() {
        $media = new MediaFile();
        $media->import(
            $this->reader,
            storage_path(self::EXTRACT_PATH . "/" . $media->getArchivePath() . "/" . $media->getFileName()),
            $this->with_delete
        );
        File::copyDirectory(storage_path(self::EXTRACT_PATH . "/media"), storage_path(self::MEDIA_DESTINATION_PATH));
        return $this;
    }

    /**
     * Функция распаковки архива
     * @throws \Exception
     */
    private function extractArchive() {
        $zip = new ZipArchive();

        if( $zip->open( $this->filename ) !== true ){
            throw new \Exception('Failed to open Archive', 500);
        }
        $zip->extractTo(storage_path(self::EXTRACT_PATH));
        $zip->close();
    }

    /**
     * Функция сохранения файла архива
     * @param UploadedFile $file
     * @return string
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    private function saveArchive(UploadedFile $file) {
        $filename = storage_path( self::ARCHIVE_FOLDER . "/" . self::ARCHIVE_NAME);
        File::ensureDirectoryExists( storage_path( self::ARCHIVE_FOLDER ) );
        File::put( $filename, $file->get() );
        return $filename;
    }
}
