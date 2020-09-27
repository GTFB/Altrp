<?php
namespace App\Altrp\Generators;

use App\Altrp\Table;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use App\Altrp\Generators\NewMigrationGenerator;

use App\Exceptions\Migration\AltrpTableExistException;

class TableMigrationGenerator extends NewMigrationGenerator{

    public function __construct($data) {
        parent::__construct($data);
    }

    public function createTableGenerate() {

        $this->is_created = true;
        $name = $this->getMigrationName();

        $className = Str::studly($name);

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $this->data->name, $template);

        $fileName = date('Y_m_d_His').'_'.strtolower($name).'.php';
        $full_path = $this->getPath().$fileName;

        //5. создаем файл
        $d = file_put_contents($full_path, $template);

        if($d !== false) return $full_path;
        else return false;
    }

    public function updateTableGenerate($old_name) {

        $this->is_updated = true;

        $name = $this->getMigrationName();

        $className = Str::studly($name);

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{old_name}}', $old_name, $template);
        $template = str_replace('{{new_name}}', $this->data->name, $template);

        $fileName = date('Y_m_d_His').'_'.strtolower($name).'.php';
        $full_path = $this->getPath().$fileName;

        //5. создаем файл
        $d = file_put_contents($full_path, $template);

        if($d !== false) return $full_path;
        else return false;
    }

    public function updateTableTimestamps($timestamps, $soft_deletes) {

        $this->is_timestamped = true;

        if (!$timestamps) {
            $timestamps = 'false';
        }
        if (!$soft_deletes) {
            $soft_deletes = 'false';
        }

        $name = $this->getMigrationName();

        $className = Str::studly($name);

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $this->data->name, $template);
        $template = str_replace('{{timestamps}}', $timestamps, $template);
        $template = str_replace('{{soft_deletes}}', $soft_deletes, $template);

        $fileName = date('Y_m_d_His').'_'.strtolower($name).'.php';
        $full_path = $this->getPath().$fileName;

        //5. создаем файл
        $d = file_put_contents($full_path, $template);

        if($d !== false) return $full_path;
        else return false;
    }

    public function deleteTableGenerate() {

        $this->is_deleted = true;

        $name = $this->getMigrationName();

        $className = Str::studly($name);

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $this->data->name, $template);

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
    public function getMigrationName($name = "")
    {
        if($this->is_created) {
           $name = "create_".$this->data->name."_table";
        }
        if($this->is_updated) {
           $name = "rename_".$this->data->name."_table";
        }
        if($this->is_deleted) {
           $name = "delete_".$this->data->name."_table";
        }
        if($this->is_timestamped) {
           $name = "update_timestamps_".$this->data->name."_table";
        }

        return parent::getMigrationName($name);
    }

    /**
     * Получаем путь к файлу шаблона
     *
     * @return string
     */
    protected function getStub()
    {
        if($this->is_created) {
            return app_path().'/Altrp/Commands/stubs/migrations/create_table_migration.stub';
        }
        else if($this->is_updated) {
            return app_path().'/Altrp/Commands/stubs/migrations/update_table_migration.stub';
        }
        else if($this->is_deleted) {
            return app_path().'/Altrp/Commands/stubs/migrations/delete_table_migration.stub';
        }
        else if($this->is_timestamped) {
            return app_path().'/Altrp/Commands/stubs/migrations/update_table_timestamps_migration.stub';
        }

        return parent::getStub();
    }

    protected function is_exist() {
        return Schema::hasTable($this->data->name);
    }
}
