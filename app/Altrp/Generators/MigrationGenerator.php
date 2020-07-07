<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Altrp\Generators;

use App\Exceptions\TableNotFoundException;
use App\Exceptions\AltrpMigrationNotWrittenException;
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
     * ModelGenerator constructor.
     * @param $data
     * 
     * @throws AltrpMigrationNotWrittenException
     */
    public function __construct($data)
    {
        parent::__construct($data);
        
        $this->table = $this->getTable();
        $this->current_migration = $this->saveCurrentMigration();
        
        if(!$this->current_migration) {
            throw new AltrpMigrationNotWrittenException("Failed to write migration to the database", 500);
        }
        
        $this->previous_migration = $this->getPreviousMigration();
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
     *
     * @return App/Altrp/Migration
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
        
        return $migration->save();
    }
    
    /**
     * Получение информации о таблице
     *
     * @return App/Altrp/Table
     * @throws TableNotFoundException
     */
    protected function getTable()
    {
        $table = Table::find($this->data->table);
        
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
        if($this->getMigrationType() === 'create') {
            return app_path().'/Altrp/stubs/migrations/create_migration.stub';
        }
        else if($this->getMigrationType() === 'update') {
            return app_path().'/Altrp/stubs/migrations/update_migration.stub';
        }
    }
    
    
    

}
