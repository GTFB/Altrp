<?php


namespace App\Services\ImportExport;


use App\Services\ImportExport\Files\AccessorsFile;
use App\Services\ImportExport\Files\ColumnsFile;
use App\Services\ImportExport\Files\CustomizerFile;
use App\Services\ImportExport\Files\DashboardsFile;
use App\Services\ImportExport\Files\DiagramsFile;
use App\Services\ImportExport\Files\IImportExportFile;
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
use App\Services\ImportExport\Files\DataSourcesPermissionsFile;
use App\Services\ImportExport\Files\DataSourcesRolesFile;
use App\Services\ImportExport\Files\ReportsFile;
use App\Services\ImportExport\Files\RolesFile;
use App\Services\ImportExport\Files\SettingsFile;
use App\Services\ImportExport\Files\SQLEditorsFile;
use App\Services\ImportExport\Files\TablesFile;
use App\Services\ImportExport\Files\TemplateSettingsFile;
use App\Services\ImportExport\Files\TemplatesFile;
use App\Services\ImportExport\Files\ValidationFieldsFile;
use App\Services\ImportExport\Files\ValidationRulesFile;
use App\Services\ImportExport\Writers\IWriter;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Media;
use Illuminate\Http\Request;
use ZipArchive;

/**
 * Сервис экспорта
 * Class ExportService
 * @package App\Services\ImportExport
 */
class ExportService
{

    /**
     * Путь к папке в которой создается архив
     */
    private const ARCHIVE_FOLDER = "tmp";

    /**
     * Путь к папке в которой создаются файлы для экспорта
     */
    private const EXPORT_PATH = "tmp/altrp-settings";

    /**
     * Выбранный метод записи в файл
     * @var IWriter
     */
    private $writer;

    /**
     * Массив всех файлов экспорта
     * @var array
     */
    private $files;

    /**
     * ExportService constructor.
     * @param IWriter $writer
     */
    public function __construct(IWriter $writer)
    {
        $this->writer = $writer;
        $this->files = [];
    }

    /**
     * Функция экспорта всех данных
     * @return string
     */
    public function exportAll() {

        $this->exportTemplates()
            ->exportPages()
            ->exportMedia()
            ->exportPageTemplates()
            ->exportTemplateSettings()
            ->exportSettings()
            ->exportDiagrams()
            ->exportDashboards()
            ->exportReports()
            ->exportTables()
            ->exportModels()
            ->exportColumns()
            ->exportAccessors()
            ->exportPageDatasources()
            ->exportSQLEditors()
            ->exportRelationships()
            ->exportQueries()
            ->exportRoles()
            ->exportPageRoles()
            ->exportPermissionRoles()
            ->exportRemoteData()
            ->exportRemoteDataSources()
            ->exportDataSourcesRoles()
            ->exportDataSourcesPremissions()
            ->exportValidationFields()
            ->exportValidationRules()
            ->exportCustomizers();

        return $this->createArchive([]);
    }

    /**
     * Функция экспорта всех данных
     * @return string
     */
    public function exportFilteredAll($params) {

      if (isset($params['exportPages']) && !empty($params['exportPages'])) {
        $this->exportPages($params['exportPages'])
          ->exportPageTemplates($params['exportPages'])
          ->exportPageDatasources($params['exportPages'])
          ->exportPageRoles($params['exportPages']);
      }
      if (isset($params['exportTemplates']) && !empty($params['exportTemplates'])) {
        $this->exportTemplates($params['exportTemplates'])
          ->exportTemplateSettings($params['exportTemplates']);
      }
      if (isset($params['exportMedia']) && !empty($params['exportMedia'])) {
        $this->exportMedia($params['exportMedia']);
      }
      if (isset($params['exportSettings']) && !empty($params['exportSettings'])) {
        $this->exportSettings($params['exportSettings']);
      }
      if (isset($params['exportDiagrams']) && !empty($params['exportDiagrams'])) {
        $this->exportDiagrams($params['exportDiagrams']);
      }
      if (isset($params['exportCustomizers']) && !empty($params['exportCustomizers'])) {
        $this->exportCustomizers($params['exportCustomizers']);
      }
      if (isset($params['exportReports']) && !empty($params['exportReports'])) {
        $this->exportReports($params['exportReports']);
      }
      if (isset($params['exportTables']) && !empty($params['exportTables'])) {
        $this->exportTables($params['exportTables'])
          ->exportColumns($params['exportTables']);
      }
      if (isset($params['exportModels']) && !empty($params['exportModels'])) {
        $this->exportModels($params['exportModels'])
          ->exportAccessors($params['exportModels'])
          ->exportRelationships($params['exportModels'])
          ->exportQueries($params['exportModels']);
      }
      if (isset($params['exportSQLEditors']) && !empty($params['exportSQLEditors'])) {
        $this->exportSQLEditors($params['exportSQLEditors']);
      }
      if (isset($params['exportRemoteDataSources']) && !empty($params['exportRemoteDataSources'])) {
        $this->exportRemoteDataSources($params['exportRemoteDataSources'])
          ->exportDataSourcesRoles($params['exportRemoteDataSources'])
          ->exportDataSourcesPremissions($params['exportRemoteDataSources']);
      }

      $this//->exportTemplates()
        //->exportPages()
        //->exportMedia()
        //->exportPageTemplates()
        //->exportTemplateSettings()
        //->exportSettings()
        ->exportDiagrams()
        ->exportDashboards()
        ->exportReports()
        //->exportTables()
        //->exportModels()
        //->exportColumns()
        //->exportAccessors()
        //->exportPageDatasources()
        //->exportSQLEditors()
        //->exportRelationships()
        //->exportQueries()
        ->exportRoles()
        //->exportPageRoles()
        ->exportPermissionRoles()
        ->exportRemoteData()
        ->exportRemoteDataSources()
        //->exportDataSourcesRoles()
        //->exportDataSourcesPremissions()
        ->exportValidationFields()
        ->exportValidationRules();

      return $this->createArchive($params);
    }

    /**
     * Функция создания архива с файлами
     * @return string
     */
    public function createArchive($params) {
        $zip = new ZipArchive();
        $file_path =  $this->getFilename();
        $open_result = $zip->open( $file_path, ZipArchive::CREATE );
        if ( $open_result !== TRUE ) {
            $exception = new Exception( $zip->getStatusString() . 'ZipArchive::open() error code:' . $open_result );
            throw( $exception );
        }
        $this->archiveFiles( $zip );
        $this->archiveMedia( $zip, $params );

        $zip->close();
        $this->deleteFiles();
        return $this->getFilename();
    }

    /**
     * Экспорт данных о правилах валидации
     * @return $this
     */
    public function exportValidationRules(array $params = []) {
        $rules = new ValidationRulesFile();
        $this->addFile($rules->export($this->writer, self::EXPORT_PATH));
        return $this;
    }

    /**
     * Экспорт данных о колонках валидации
     * @return $this
     */
    public function exportValidationFields(array $params = []) {
        $fields = new ValidationFieldsFile();
        $this->addFile($fields->export($this->writer, self::EXPORT_PATH));
        return $this;
    }

    /**
     * Экспорт данных о удаленных справочниках
     * @return $this
     */
    public function exportRemoteData(array $params = []) {
        $remote_data = new RemoteDataFile();
        $this->addFile($remote_data->export($this->writer, self::EXPORT_PATH));
        return $this;
    }

    /**
     * Экспорт данных о удаленных источниках данных
     * @return $this
     */
    public function exportRemoteDataSources(array $params = []) {
      $remote_datasource = new RemoteDataSourcesFile();
      $this->addFile($remote_datasource->export($this->writer, self::EXPORT_PATH, $params));
      return $this;
    }

    /**
     * Экспорт данных о правах для удаленных источников данных
     * @return $this
     */
    public function exportDataSourcesRoles(array $params = []) {
      $datasource_roles = new DataSourcesRolesFile();
      $this->addFile($datasource_roles->export($this->writer, self::EXPORT_PATH, $params));
      return $this;
    }

    /**
     * Экспорт данных о разрешениях для удаленных источников данных
     * @return $this
     */
    public function exportDataSourcesPremissions(array $params = []) {
      $datasource_permissions = new DataSourcesPermissionsFile();
      $this->addFile($datasource_permissions->export($this->writer, self::EXPORT_PATH, $params));
      return $this;
    }

    /**
     * Экспорт данных о шаблонах
     * @return $this
     */
    public function exportTemplates(array $params = []) {
        $templates = new TemplatesFile();
        $this->addFile($templates->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о страницах
     * @return $this
     */
    public function exportPages(array $params = []) {
        $pages = new PagesFile();
        $this->addFile($pages->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о кастомайзере
     * @return $this
     */
    public function exportCustomizers(array $params = []) {
        $сustomizer = new CustomizerFile();
        $this->addFile($сustomizer->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о медиа
     * @return $this
     */
    public function exportMedia(array $params = []) {
        $media = new MediaFile();

        //dd($params);
        $this->addFile($media->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о подключенных к странице шаблонах
     * @return $this
     */
    public function exportPageTemplates(array $params = []) {
        $page_templates = new PageTemplatesFile();
        $this->addFile($page_templates->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о настройках шаблонов
     * @return $this
     */
    public function exportTemplateSettings(array $params = []) {
        $template_settings = new TemplateSettingsFile();
        $this->addFile($template_settings->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о настройках
     * @return $this
     */
    public function exportSettings() {
        $settings = new SettingsFile();
        $this->addFile($settings->export($this->writer, self::EXPORT_PATH));
        return $this;
    }

    /**
     * Экспорт данных о диаграммах
     * @return $this
     */
    public function exportDiagrams(array $params = []) {
        $diagrams = new DiagramsFile();
        $this->addFile($diagrams->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о дашбордах
     * @return $this
     */
    public function exportDashboards() {
        $dashboards = new DashboardsFile();
        $this->addFile($dashboards->export($this->writer, self::EXPORT_PATH));
        return $this;
    }

    /**
     * Экспорт данных о отчетах
     * @return $this
     */
    public function exportReports(array $params = []) {
        $reports = new ReportsFile();
        $this->addFile($reports->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о таблицах
     * @return $this
     */
    public function exportTables(array $params = []) {
        $tables = new TablesFile();
        $this->addFile($tables->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о моделях
     * @return $this
     */
    public function exportModels(array $params = []) {
        $models = new ModelsFile();
        $this->addFile($models->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о колонах
     * @return $this
     */
    public function exportColumns(array $params = []) {
        $columns = new ColumnsFile();
        $this->addFile($columns->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о аксессорах
     * @return $this
     */
    public function exportAccessors(array $params = []) {
        $accessors = new AccessorsFile();
        $this->addFile($accessors->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о подключенных к странице источниках данных
     * @return $this
     */
    public function exportPageDatasources(array $params = []) {
        $page_datasources = new PageDatasourcesFile();
        $this->addFile($page_datasources->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о sql запросах
     * @return $this
     */
    public function exportSQLEditors(array $params = []) {
        $sql_editors = new SQLEditorsFile();
        $this->addFile($sql_editors->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о связях
     * @return $this
     */
    public function exportRelationships(array $params = []) {
        $relationships = new RelationshipsFile();
        $this->addFile($relationships->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о sql builder
     * @return $this
     */
    public function exportQueries(array $params = []) {
        $queries = new QueriesFile();
        $this->addFile($queries->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о ролях
     * @return $this
     */
    public function exportRoles() {
        $roles = new RolesFile();
        $this->addFile($roles->export($this->writer, self::EXPORT_PATH));
        return $this;
    }

    /**
     * Экспорт данных о доступных для страниц ролях
     * @return $this
     */
    public function exportPageRoles(array $params = []) {
        $page_roles = new PageRolesFile();
        $this->addFile($page_roles->export($this->writer, self::EXPORT_PATH, $params));
        return $this;
    }

    /**
     * Экспорт данных о доступных для ролей действиях
     * @return $this
     */
    public function exportPermissionRoles() {
        $permission_roles = new PermissionRolesFile();
        $this->addFile($permission_roles->export($this->writer, self::EXPORT_PATH));
        return $this;
    }

    /**
     * Добавляем в архив все импортируемые файлы
     * @param ZipArchive $zip
     * @return ZipArchive
     */
    private function archiveFiles( ZipArchive $zip )
    {
        foreach ($this->files as $file) {
            $zip->addFile( storage_path(self::EXPORT_PATH."/".$file->getFilename()), $file->getArchivePath()."/".$file->getFilename() );
        }
        return $zip;
    }

    /**
     * Добавляем в архив все медиа файлы
     * @param ZipArchive $zip
     * @return ZipArchive
     */
    private function archiveMedia(ZipArchive $zip, $params) {

        if (isset($params['exportMedia']) && count($params['exportMedia']) > 0) {
            $media = Media::whereIn('id', $params['exportMedia'])->get();
            foreach ( $media as $file ) {
                $zip->addFile( storage_path( 'app/public/' . $file->filename ),
                    str_replace( 'public/', '', $file->filename ) );
            }
        } else {
            $all_media = Storage::allFiles( '/public/media' );
            foreach ( $all_media as $file ) {
                $zip->addFile( storage_path( 'app/' . $file ),
                    str_replace( 'public/', '', $file ) );
            }
        }

        return $zip;
    }

    /**
     * Получить имя файла
     * @return string
     */
    private function getFilename() {
        File::ensureDirectoryExists( storage_path( 'tmp' ) );
        return storage_path( self::ARCHIVE_FOLDER . '/' . request()->server->get( 'SERVER_NAME' ) . '.zip'  );
    }

    /**
     * Метод добавления экспортируемого файла
     * @param IImportExportFile $file
     */
    private function addFile(IImportExportFile $file) {
        $this->files[] = $file;
    }

    /**
     * Метод удаления временных файлов
     */
    private function deleteFiles() {
        File::deleteDirectory( storage_path( self::EXPORT_PATH ) );
    }
}
