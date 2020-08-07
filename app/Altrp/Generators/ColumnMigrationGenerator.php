<?php
namespace App\Altrp\Generators;

use App\Altrp\Column;
use Illuminate\Support\Str;
use App\Altrp\Generators\NewMigrationGenerator;
use App\Altrp\Generators\Migration\MigrationFieldFactory;

class ColumnMigrationGenerator extends NewMigrationGenerator{

    public function __construct($data) {
        parent::__construct($data);
    }

    public function createColumnGenerate() {

        $this->is_created = true;
        $name = $this->getMigrationName();
        $className = Str::studly($name);
        $factory = new MigrationFieldFactory();
        $table_name = $this->data->altrp_table->name;


        $obj = $factory->getField($this->data, false);
        $field = $obj->up();

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $table_name, $template);
        $template = str_replace('{{field}}', $field, $template);

        $fileName = date('Y_m_d_His').'_'.strtolower($name).'.php';
        $full_path = $this->getPath().$fileName;

        //5. создаем файл
        $d = file_put_contents($full_path, $template);

        if($d !== false) return $full_path;
        else return false;
    }

    public function updateColumnGenerate($old_column) {

        $this->is_updated = true;

        $name = $this->getMigrationName();

        $className = Str::studly($name);

        $factory = new MigrationFieldFactory();
        $table_name = $this->data->altrp_table->name;
        $obj = $factory->getField($this->data, $old_column);
        $field = $obj->up();

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{old_column}}', $old_column->name, $template);
        $template = str_replace('{{column}}', $this->data->name, $template);
        $template = str_replace('{{table}}', $table_name, $template);
        $template = str_replace('{{field}}', $field, $template);

        $fileName = date('Y_m_d_His').'_'.strtolower($name).'.php';
        $full_path = $this->getPath().$fileName;

        //5. создаем файл
        $d = file_put_contents($full_path, $template);

        if($d !== false) return $full_path;
        else return false;
    }

    public function deleteColumnGenerate() {

        $this->is_deleted = true;

        $name = $this->getMigrationName();

        $className = Str::studly($name);
        $factory = new MigrationFieldFactory();
        $table_name = $this->data->altrp_table->name;


        $obj = $factory->getOldField($this->data);
        $field = $obj->up();

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $table_name, $template);
        $template = str_replace('{{delete_field}}', $field, $template);

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
        $table_name = $this->data->altrp_table->name;

        if($this->is_created) {
           $name = "update_".$table_name."_table_insert_".$this->data->name."_field";
        }
        if($this->is_updated) {
           $name = "update_".$table_name."_table_change_".$this->data->name."_field";
        }
        if($this->is_deleted) {
           $name = "update_".$table_name."_table_delete_".$this->data->name."_field";
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
            return app_path().'/Altrp/Commands/stubs/migrations/create_field_migration.stub';
        }
        else if($this->is_updated) {
            return app_path().'/Altrp/Commands/stubs/migrations/update_field_migration.stub';
        }
        else if($this->is_deleted) {
            return app_path().'/Altrp/Commands/stubs/migrations/delete_field_migration.stub';
        }

        return parent::getStub();
    }
}
