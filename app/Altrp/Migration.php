<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use App\Altrp\Column;

class Migration extends Model
{
    
    protected $table = 'altrp_migrations';
    
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
        return true;
    }
    
    /**
     * Выполнение миграции
     */
    public function run() {
        
        //1 Записать колонки
        if(!$this->writeColumns()) return false;
        
        //2. Записать ключи
        if(!$this->writeKeys()) return false;
        
        //3. Создать файл
        if(!$this->createFile()) return false;
        
        //4. Запустить миграцию
        if(!$this->migrationRun()) return false;
        
        //5. Обновить статус.
        $this->status = "complete";
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
            $column->null = $value->null;
            $column->default = $value->default;
            $column->primary = $value->primary;
            $column->unique = $value->unique;
            
            
            
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
            $key->target_table_id = $value->target_table_id;
            
            $key->source_column_id = $value->source_column_id;
            $key->target_column_id = $value->target_column_id;
            
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
        //Artisan::call('migrate');
        return true;
    }
}
