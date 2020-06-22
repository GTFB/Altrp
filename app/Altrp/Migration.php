<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use App\Altrp\Column;
use App\Altrp\Relationship;
use App\Altrp\Key;

use App\Altrp\Commands\MigrationBuilder;

use Artisan;

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
        $migration = new MigrationBuilder($this->table()->first()->name, $this);
        return $migration->build();
    }
    
    /**
     * Выполнение миграции
     */
    public function run() {
        $data = json_decode($this->data);
        
        //1 Записать колонки
        if(!$this->writeColumns()) {
            $this->clearMigration();
            return false;
        }
        var_dump(1);
        //2. Записать ключи
        if(!$this->writeKeys()) {
            $this->clearMigration();
            return false;
        }
        var_dump(2);
        //3. Создать файл
        $file = $this->createFile();
        if(!$file) return false;
        var_dump(3);
        //4. Запустить миграцию
        if(!$this->migrationRun()) {
            $this->clearMigration();
            return false;
        }
        var_dump(4);
        //5. Обновить статус.
        $this->status = "complete";
        $this->file_path = $file;
        //dd($this->save());
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
            
            $key->source_table = $this->table()->first()->name;
            $key->target_table = $value->target_table;
            
            $key->source_column = $value->source_column;
            $key->target_column = $value->target_column;
            
            $key->user_id = auth()->user()->id;
            $key->altrp_migration_id = $this->id;
            
            if(!$key->save()) return false;
            
            $this->writeRelation($value->target_column, $value->source_column);
            
        }
        
        return true;
        
    }
    
    
    /**
     * Добавляем запись связи
     */
    public function writeRelation($foreign, $local) {
        
        $relationship = new Relationship();
        $relationship->name = null;
        $relationship->type = "hasMany";
        $relationship->table_id = $this->table()->first()->id;
        $relationship->model_class = "App\\Class";
        $relationship->foreign_key = $foreign;
        $relationship->local_key = $local;

        return $relationship->save();
        
    }
    
    /**
     * Запустить файл миграции
     */
    public function migrationRun() {
        try {
            Artisan::call('migrate', array('--force' => true));
        }
        catch (\Exception $e) {
            dd($e);
            return false;
        }
        return true;
    }
    
    /**
     * Запустить файл миграции
     */
    protected function clearMigration() {
        
        Column::where('altrp_migration_id', $this->id)->delete();
        Key::where('altrp_migration_id', $this->id)->delete();
        
        return true;
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
        
        foreach ($data->columns as &$value) {
            $column = new Column();
            $column->fromObject($value);
            
            $value = $column;
        }
        
        //$this->attributes['full'] = $data;
        return $data;
    }
}
