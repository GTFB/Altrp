<?php
namespace App\Altrp\Generators;

use App\Altrp\Model;
use App\Altrp\Table;
use Illuminate\Support\Str;
use App\Altrp\Generators\NewMigrationGenerator;
use App\Altrp\Generators\Migration\MigrationKey;

class KeyMigrationGenerator extends NewMigrationGenerator{

    public function __construct($data) {
        parent::__construct($data);
    }

    public function createKeyGenerate() {

        $this->is_created = true;
        $name = $this->getMigrationName();
        $className = Str::studly($name);

        $table_name = $this->data->altrp_model->altrp_table->name;
      /**
       * для 'belongsTo', 'hasMany ключи создаем в связанной модели
       */
        if( !$this->checkRelation() ){
          $table_name = Table::join('altrp_models', 'altrp_models.table_id', '=', 'tables.id')
            ->where( 'altrp_models.id',$this->data->target_model_id )->get( 'tables.name' )->first()->name;
        }

        $key = new MigrationKey($this->data, false);
        $key = $key->up();

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $table_name, $template);
        $template = str_replace('{{key}}', $key, $template);

        $fileName = date('Y_m_d_His').'_'.strtolower($name).'.php';
        $full_path = $this->getPath().$fileName;

        //5. создаем файл

        $d = file_put_contents($full_path, $template);


        if($d !== false) return $full_path;
        else return false;
    }

    public function updateKeyGenerate($old_key) {

        $this->is_updated = true;

        $name = $this->getMigrationName();

        $className = Str::studly($name);

        $table_name = $this->data->altrp_model->altrp_table->name;
        $drop_table_name = Model::find($old_key->model_id)->altrp_table->name;

        /**
         * для 'belongsTo', 'hasMany ключи создаем в связанной модели
         */
        if( !$this->checkRelation() ){
          $table_name = Table::join('altrp_models', 'altrp_models.table_id', '=', 'tables.id')
            ->where( 'altrp_models.id',$this->data->target_model_id )->get( 'tables.name' )->first()->name;
          $drop_table_name = Table::join('altrp_models', 'altrp_models.table_id', '=', 'tables.id')
              ->where( 'altrp_models.id',$old_key->target_model_id )->get( 'tables.name' )->first()->name;
        }

        $key = new MigrationKey($this->data, false);
        $drop_key = new MigrationKey(false, $old_key);

        $dropForeign = $drop_key->dropForeign();
        $key = $key->up();

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $table_name, $template);
        $template = str_replace('{{drop_table}}', $drop_table_name, $template);
        $template = str_replace('{{key}}', $key, $template);
        $template = str_replace('{{dropForeign}}', $dropForeign, $template);

        $fileName = date('Y_m_d_His').'_'.strtolower($name).'.php';
        $full_path = $this->getPath().$fileName;

        //5. создаем файл
        $d = file_put_contents($full_path, $template);

        if($d !== false) return $full_path;
        else return false;
    }

    public function deleteKeyGenerate() {
        $this->is_deleted = true;
        $name = $this->getMigrationName();
        $className = Str::studly($name);


        $table_name = $this->data->altrp_model->altrp_table->name;
        /**
         * для 'belongsTo', 'hasMany ключи создаем в связанной модели
         */
        if( !$this->checkRelation() ){
          $table_name = Table::join('altrp_models', 'altrp_models.table_id', '=', 'tables.id')
            ->where( 'altrp_models.id',$this->data->target_model_id )->get( 'tables.name' )->first()->name;
        }

        $key = new MigrationKey(false, $this->data);
        $key = $key->up();

        $template = file_get_contents($this->getStub());

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $table_name, $template);
        $template = str_replace('{{delete_key}}', $key, $template);

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
        $table_name = $this->data->altrp_model->altrp_table->name;

        if($this->is_created) {
           $name = "update_".$table_name."_table_insert_".$this->data->name."_key";
        }
        if($this->is_updated) {
           $name = "update_".$table_name."_table_change_".$this->data->name."_key";
        }
        if($this->is_deleted) {
           $name = "update_".$table_name."_table_delete_".$this->data->name."_key";
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
            return app_path().'/Altrp/Commands/stubs/migrations/create_key_migration.stub';
        }
        else if($this->is_updated) {
            return app_path().'/Altrp/Commands/stubs/migrations/update_key_migration.stub';
        }
        else if($this->is_deleted) {
            return app_path().'/Altrp/Commands/stubs/migrations/delete_key_migration.stub';
        }

        return parent::getStub();
    }

    protected function checkRelation() {
        if($this->data->type == 'hasOne' || $this->data->type == 'hasMany'){
            return false;
        }
        return true;
    }


}
