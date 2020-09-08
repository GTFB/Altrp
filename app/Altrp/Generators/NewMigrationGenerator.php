<?php


namespace App\Altrp\Generators;

use App\Altrp\Table;
use App\Altrp\Migration;

use Illuminate\Support\Str;
use App\Altrp\Generators\Migration\MigrationFieldFactory;
use App\Altrp\Generators\Migration\MigrationKey;
use File;
use Artisan;

class NewMigrationGenerator extends AppGenerator{

    public $is_created;
    public $is_updated;
    public $is_deleted;
    public $is_timestamped;

    public function __construct($data) {

        $this->data = $data;

        $this->is_created = false;
        $this->is_deleted = false;
        $this->is_updated = false;
        $this->is_timestamped = false;
    }

    public function generate($name, $template) {

        $fileName = date('Y_m_d_His').'_'.strtolower($name).'.php';
        $full_path = $this->getPath().$fileName;

        //5. создаем файл
        $d = file_put_contents($full_path, $template);

        if($d !== false) return $full_path;
        else return false;
    }

    /**
     * Получаем имя файла миграции
     *
     * @return string
     */
    public function getMigrationName($name)
    {
        $data = Migration::select("id", "name")->where("name","like","%$name%")->get();

        if(count($data) == 0) {
            return $name;
        }

        $version = count($data) + 1;

        return $name."_v".$version;
    }

    /**
     * Получаем путь до папки миграций
     *
     * @return string
     */
    protected function getPath()
    {
        $folder_name = config('altrp.admin.migrations_folder_name');
        $directory = database_path('/'.$folder_name.'/');

        if(!File::exists($directory)) {
            return $this->createMigrationFolder($directory);
        }

        return $directory;
    }

    /**
     * Добавляем папку для миграций
     *
     * @return string
     */
    protected function createMigrationFolder($directory)
    {

        if(File::makeDirectory($directory)) {
            return $directory;
        }

        return false;
    }

    /**
     * Получаем путь к файлу шаблона
     *
     * @return string
     */
    protected function getStub()
    {
        if($this->is_created) {
            return app_path().'/Altrp/Commands/stubs/migrations/create_migration.stub';
        }
        else {
            return app_path().'/Altrp/Commands/stubs/migrations/update_migration.stub';
        }
    }

    public static function runMigration() {

        $folder_name = config('altrp.admin.migrations_folder_name');

        try {
            Artisan::call('migrate', array('--force' => true, '--path' => "database/".$folder_name."/",));
        }
        catch (\Exception $e) {
            foreach ($e->getTrace() as $trace) {
                if(isset($trace['file']) && is_file($trace['file'])) {
                    if (file_exists($trace['file'])
                        && Str::contains($trace['file'], 'altrp_migrations')) {
                        unlink($trace['file']);
                    }
                }
            }
            return false;
        }
        return true;
    }

}
