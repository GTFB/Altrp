<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use App\Altrp\Column;
use App\Altrp\Relationship;
use App\Altrp\Key;

use App\Altrp\Generators\MigrationGenerator;


use App\Exceptions\AltrpMigrationWriteColumnsExceptions;
use App\Exceptions\AltrpMigrationWriteKeysExceptions;
use App\Exceptions\AltrpMigrationCreateFileExceptions;
use App\Exceptions\AltrpMigrationRunExceptions;

use Artisan;
use Illuminate\Support\Arr;

/**
 * Class Migration
 * @package App\Altrp
 * @property mixed $data
 * @property mixed $full_data
 */
class Migration extends Model
{

    protected $table = 'altrp_migrations';

    protected $appends = ['full_data'];

    public function table(){
        return $this->belongsTo('App\Altrp\Table');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    /**
     * Создание файла миграции
     */
    public function createFile() {
        $migration = new MigrationGenerator($this);
        return $migration->generate();
    }

    /**
     * Выполнение миграции
     */
    public function run() {
        $data = json_decode($this->data);

        //1 Записать колонки
        if(!$this->writeColumns()) {
            $this->clearMigration();
            throw new AltrpMigrationWriteColumnsExceptions("Failed to write migration columns to the database");
        }

        //2. Записать ключи
        if(!$this->writeKeys()) {
            $this->clearMigration();
            throw new AltrpMigrationWriteKeysExceptions("Failed to write migration keys to the database");
        }

        //3. Создать файл
        $file = $this->createFile();

        if(!$file) {
            $this->clearMigration();
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        //4. Запустить миграцию
        if(!$this->migrationRun()) {

            $this->clearMigration($file);
            throw new AltrpMigrationRunExceptions("Failed to run migration file");
        }

        //5. Обновить статус.
        $this->status = "complete";
        $this->file_path = $file;

        return $this->save();

    }

    /**
     * Перезаписываем колонки на основании миграции
     */
    public function writeColumns() {

        $data = json_decode($this->data);

        foreach ($data->columns as $key => $value) {

            $column = new Column();
            $column->name = $value->name;
            $column->title = $value->title;
            $column->description = $value->description;
            $column->type = $value->type;
            $column->size = $value->size;
            $column->null = (bool) $value->null;
            $column->default = $value->default;
            $column->primary = false;
            $column->unique = (bool) $value->unique;

            $column->table_id = $this->table()->first()->id;
            $column->user_id = auth()->user()->id;
            $column->altrp_migration_id = $this->id;

            if(!$column->save()) return false;
        }

        return true;

    }

    /**
     * Перезаписываем ключи на основании миграции
     */
    public function writeKeys() {

        $data = json_decode($this->data);

        foreach ($data->keys as $key => $value) {

            $key = new Key();

            $key->onDelete = $value->onDelete;
            $key->onUpdate = $value->onUpdate;

            $key->source_table_id = $this->table()->first()->id;
            $key->target_table = $value->target_table;

            $key->source_column = $value->source_column;
            $key->target_column = $value->target_column;

            $key->user_id = auth()->user()->id;
            $key->altrp_migration_id = $this->id;

            if(!$key->save()) return false;

        }

        return true;

    }

    /**
     * Запустить файл миграции
     */
    public function migrationRun() {

        $folder_name = config('altrp.admin.migrations_folder_name');
        try {
            Artisan::call('migrate', array('--force' => true, '--path' => "database/".$folder_name."/",));
        }
        catch (\Exception $e) {
            return false;
        }
        return true;
    }

    /**
     * Запустить файл миграции
     */
    protected function clearMigration($file_path = null) {

        Column::where('altrp_migration_id', $this->id)->delete();
        Key::where('altrp_migration_id', $this->id)->delete();

        /*if(!is_null($file_path)) {
            unlink($file_path);
        }*/

        return $this->delete();

    }


    /**
     * Получаем предыдущаю миграцию
     *
     * @return string
     */
    public function getFullDataAttribute($value)
    {
        //dd($value);
        $data = json_decode($this->data);

        foreach (data_get($data,'columns', []) as &$value) {
            $column = new Column();
            $column->fromObject($value);

            $value = $column;
        }

        foreach (data_get($data,'keys', []) as &$value) {
            $key = new Key();
            $key->fromObject($value);

            $value = $key;
        }

        //$this->attributes['full'] = $data;
        return $data;
    }
}
