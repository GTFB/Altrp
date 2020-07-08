<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Altrp\Generators;

use App\Exceptions\TableNotFoundException;
use App\Exceptions\AltrpMigrationNotWrittenException;

use App\Altrp\Table;
use App\Altrp\Migration;

use Illuminate\Support\Str;
use App\Altrp\Generators\Migration\MigrationFieldFactory;

/**
 * Description of MigrationGenerator
 *
 * @author aco
 */
class MigrationGenerator extends AppGenerator{
    
    /**
     * Данные текущей миграции
     * @var array
     */
    public $data;
    
    /**
     * Данные таблицы
     * @var App\Altrp\Table
     */
    public $table;
    
    /**
     * Текущая миграция
     * @var App\Altrp\Migration 
     */
    public $current_migration;
    
    /**
     * Данные предыдущей миграции
     * @var App\Altrp\Migration 
     */
    public $previous_migration;
    
    /**
     * Масссив колонок
     * @var array 
     */
    public $fields;
    
    /**
     * Масссив внешних ключей
     * @var array 
     */
    public $foreign_keys;
    
    /**
     * Знак табуляции
     * @var string
     */
    protected $tabIndent = '    ';
    
    /**
     * MigrationGenerator constructor.
     * @param $data
     * 
     */
    public function __construct($data)
    {
        parent::__construct($data);
        
        $this->table = $this->getTable();
        $this->current_migration = $this->saveCurrentMigration();
        $this->previous_migration = $this->getPreviousMigration();
        
    }
    
    public function generate()
    {
        
        $className = Str::studly($this->current_migration->name);
        
        //1. Получаем шаблон
        $template = file_get_contents($this->getStub());
        
        //2. Получаем переменные
        $fields = $this->getFields();
        
        dd($fields);
        /*$foreign_keys = $this->getForeignKeys();
        
        
        //3. заносим переменные
        $template = str_replace('{{fields}}', $fields, $template);
        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $this->table, $template);
        $template = str_replace('{{foreign_keys}}', $foreign_keys, $template);
       
        if($this->getMigrationType() === "update") {
            $delete_fields = $this->getDeleteFields();
            $template = str_replace('{{delete_fields}}', $delete_fields, $template);
            $delete_keys = $this->getDeleteKeys();
            $template = str_replace('{{delete_keys}}', $delete_keys, $template);
        }
        
        //4. Получаем имя файла
        $fileName = date('Y_m_d_His').'_'.strtolower($this->current_migration->name).'.php';
        $full_path = $this->getPath().$fileName;
        
        //5. создаем файл
        $d = file_put_contents($full_path, $template);
        //dd($d);
        
        if($d !== false) return $full_path;
        else return false;*/
        
    }
    
    
    
    public function getFields()
    {
        $fields = '';
        
        $factory = new MigrationFieldFactory();
        
        foreach ($this->current_migration->full_data->columns as $value) {
            
            $old_column = $this->findColumn($value);
            
            $obj = $factory->getField($value, $old_column);
            $fields .= $obj->up();
        }
        
        return $fields;
    }
    
    /**
     * Ищем колонку в предыдущей миграции
     *
     * @return string
     */
    protected function findColumn($column, $array = null)
    {
        if($this->isCreateMigration()) return false;
        
        if(is_null($array)) {
            $array = $this->previous_migration->full_data->columns;
        }
        
        $key = array_search($column->name, array_column($array, 'name'));
        
        if($key !== false) {
            return $this->previous_migration->full_data->columns[$key];
        }
        
        return false;
    }
    
    /**
     * Получаем предыдущую миграцию
     *
     * @return App/Altrp/Migration
     */
    protected function getPreviousMigration()
    {
        return Migration::where([
            ['table_id', $this->table->id],
            ['id','<',$this->current_migration->id]
        ])->orderBy('id','DESC')->first();
    }
    
    /**
     * Сохранение текущей миграции
     * @return Migration
     * @throws AltrpMigrationNotWrittenException
     */
    protected function saveCurrentMigration()
    {
        $migration = new Migration();
        $migration->name = $this->data->name;
        $migration->file_path = "";
        $migration->status = 1;
        $migration->data = $this->data->data;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $this->table->id;
        
        if(!$migration->save()) {
            throw new AltrpMigrationNotWrittenException("Failed to write migration to the database", 500);
        }
        
        return $migration;
    }
    
    /**
     * Получение информации о таблице
     *
     * @return App/Altrp/Table
     * @throws TableNotFoundException
     */
    protected function getTable()
    {
        $table = Table::find($this->data->table_id);
        
        if(!$table) {
            throw new TableNotFoundException("Table not found.", 404);
        }
        
        return $table;
    }
    
    /**
     * Миграция для создания таблицы?
     *
     * @return boolean
     */
    protected function isCreateMigration()
    {
        if(!$this->previous_migration) {
            return true;
        }
        return false;
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
        if($this->isCreateMigration()) {
            return app_path().'/Altrp/Commands/stubs/migrations/create_migration.stub';
        }
        else {
            return app_path().'/Altrp/Commands/stubs/migrations/update_migration.stub';
        }
    }
    
    
    

}
