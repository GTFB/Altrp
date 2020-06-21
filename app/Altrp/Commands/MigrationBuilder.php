<?php
namespace App\Altrp\Commands;


use Illuminate\Support\Str;
use App\Altrp\Migration;
use App\Altrp\Table;
use App\Altrp\Column;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MigrationBuilder
 *
 * @author aco
 */
class MigrationBuilder {
    
    public $table;
    
    public $current_migration;
    
    public $previous_migration;
    
    
    
    
    public $fields;
    
    public $foreign_keys;
    
    public $softDeleted;
    
    public $timestamp;
    
    
    protected $tabIndent = '    ';
    
    public $column_types = [
        'id' => 'id',
        'foreignId' => 'foreignId',
        'boolean' => 'boolean',
        'char' => 'char',
        'date' => 'date',
        'datetime' => 'dateTime',
        'integer' => 'integer',
        'mediumtext' => 'mediumText',
        'longtext' => 'longText',
        'string' => 'string',
        'text' => 'text',
        'bigint' => 'bigInteger',
        'decimal' => 'decimal',
        /*
        'time' => 'time',
        'timestamp' => 'timestamp',
        
        
        'json' => 'json',
        'jsonb' => 'jsonb',
        'binary' => 'binary',
        'number' => 'integer',
        
        
        'mediumint' => 'mediumInteger',
        'tinyint' => 'tinyInteger',
        'smallint' => 'smallInteger',
        'boolean' => 'boolean',
        
        'double' => 'double',
        'float' => 'float',
        'enum' => 'enum',*/
    ];
    
    
    
    
    
    function __construct($table, $current_migration) {
        $this->table = $table;
        $this->current_migration = $this->setMigration($current_migration);
        
        $this->fields = [];
        $this->foreign_keys = [];
        
        $this->previous_migration = $this->setMigration($this->getPreviousMigration());
    }
    
    function addColumn($column) {
        $this->fields[] = $column;
    }
    
    function addForeignKey($key) {
        $this->foreign_keys[] = $key;
    }
    
    
    
    
    
    
    /**
     * Собираем необходимые данные
     *
     * @return string
     */
    public function build()
    {
        $className = Str::studly($this->current_migration->name);
        
        //1. Получаем шаблон
        $template = file_get_contents($this->getStub());
        
        //2. Получаем переменные
        $fields = $this->getFields();
        $foreign_keys = $this->getForeignKeys();
        
        
        //3. заносим переменные
        $template = str_replace('{{fields}}', $fields, $template);
        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $this->table, $template);
        $template = str_replace('{{foreign_keys}}', $foreign_keys, $template);
       
        if($this->getMigrationType() === "update") {
            $delete_fields = $this->getDeleteFields();
            $template = str_replace('{{delete_fields}}', $delete_fields, $template);
        }
        
        //4. Получаем имя файла
        $fileName = date('Y_m_d_His').'_'.strtolower($this->current_migration->name).'.php';
        $full_path = $this->getPath().$fileName;
        
        //5. создаем файл
        $d = file_put_contents($full_path, $template);
        //dd($d);
        
        if($d !== false) return true;
        else return true;
    }
    
    
    
    
    /**
     * Собираем строку по колонке
     *
     * @return string
     */
    protected function getField($column)
    {
        
        $post_data = "";
        
        $old_column = $this->findColumn($column);
        
        
        
        if($column->isSizeColumn() && !$this->checkColumnAttribute($column, $old_column, "size")) {
            $post_data .= ", ".$column->size;
        }
        
        $default = "";
        if($column->default && !$this->checkColumnAttribute($column, $old_column, "default")) {
            $default = "->default('".$column->default."')";
        }
        
        $unique = "";
        if($column->unique && !$this->checkColumnAttribute($column, $old_column, "unique")) {
            $unique = "->unique()";
        }
        
        $nullable = "";
        if($column->null && !$this->checkColumnAttribute($column, $old_column, "null")) {
            $nullable = "->nullable()";
            $default = "";
        }
        
        if($column->type == 'id' && $old_column === false) {
            $field = "\$table->bigIncrements('id')";
            $field .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
            return $field;
        }
        
        if($column->type == 'foreignId' && $old_column === false) {
            $field = "\$table->unsignedBigInteger('".$column->name."')";
            $field .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
            return $field;
        }
        
        $field = "\$table->".$column->type."('".$column->name."'".$post_data.")".$default.$unique.$nullable;
        
        
        if($this->checkColumnAttributes($column, $old_column)) {
            return "";
        }
        else if($this->getMigrationType() === "update" && $old_column !== false) {
            $field .= "->change()";
        }
        
        $field .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
        
        
        return $field;
    }
    
    
    /**
     * Собираем строку по колонке
     *
     * @return string
     */
    protected function getDeleteFields()
    {
        
        if($this->getMigrationType() === "create") {
            return "";
        }
        
        $fields = '';
        
        foreach ($this->previous_migration->full_data->columns as $value) {
            $res = $this->findColumn($value, $this->current_migration->full_data->columns);
            
            if($res === false) {
                $fields .= "\$table->dropColumn('".$value->name."')";
                $fields .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
            }
            
        }
        
        return $fields;
        
    }
    
    
    /**
     * Собираем необходимые данные
     *
     * @return string
     */
    public function getFields()
    {
        $fields = '';
        
        foreach ($this->current_migration->full_data->columns as $value) {
            $fields .= $this->getField($value);
        }
        
        return $fields;
    }
    
    /**
     * Собираем строку по колонке
     *
     * @return string
     */
    protected function getForeignKey($key)
    {
        
        $post_data = "";
        
        if($key->onUpdate) {
            $post_data .= "->onUpdate('".$key->onUpdate."')";
        }
        if($key->onDelete) {
            $post_data .= "->onDelete('".$key->onDelete."')";
        }
        
        $k = "\$table->foreign('".$key->source_column."')->references('".$key->target_column."')->on('".$key->target_table."')".$post_data.";";
        
        return $k;
    }
    
    /**
     * Собираем необходимые данные
     *
     * @return string
     */
    public function getForeignKeys()
    {
        $keys = '';
        
        foreach ($this->current_migration->full_data->keys as $value) {
            $keys .= $this->getForeignKey($value);
        }
        
        return $keys;
    }
    
    /**
     * Собираем необходимые данные
     *
     * @return string
     */
    protected function getSchemaDown()
    {
        
    }
    
    
    
    
    
    
    /**
     * Сравниваем атрибуты у колонок
     *
     * @return string
     */
    protected function checkColumnAttributes($column, $old_column)
    {
        if($this->getMigrationType() == 'create') return false;
        
        if($old_column === false) return false;
        var_dump($column->getAttributes());
        foreach($column->getAttributes() as $key => $value) {
            var_dump($key." ".$value." - ".$old_column->{$key});
            if($value != $old_column->{$key}) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Сравниваем атрибута у колонок
     *
     * @return string
     */
    protected function checkColumnAttribute($column, $old_column, $attribute)
    {
        if($this->getMigrationType() == 'create') return false;
        
        if($old_column === false) return false;
        
        if($column->{$attribute} == $old_column->{$attribute}) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Ищем колонку в предыдущей миграции
     *
     * @return string
     */
    protected function findColumn($column, $array = null)
    {
        if($this->getMigrationType() == 'create') return false;
        
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
     * Получаем файл шаблона
     *
     * @return string
     */
    protected function getStub()
    {
        if($this->getMigrationType() === 'create') {
            return __DIR__ . '/stubs/migrations/create_migration.stub';
        }
        else if($this->getMigrationType() === 'update') {
            return __DIR__ . '/stubs/migrations/update_migration.stub';
        }
    }
    
    /**
     * Получаем путь до папки миграций
     *
     * @return string
     */
    protected function getPath()
    {
        return database_path('/migrations/');
    }
    
    /**
     * Получаем тип миграции
     *
     * @return string
     */
    protected function getMigrationType()
    {
        if(!$this->previous_migration) {
            return 'create';
        }
        return 'update';
    }
    
    
    /**
     * Получаем предыдущаю миграцию
     *
     * @return string
     */
    protected function getPreviousMigration()
    {
        $table_id = $this->current_migration->table()->first()->id;
        return Migration::where([['table_id', $table_id],['id','<',$this->current_migration->id]])->orderBy('id','DESC')->first();
    }
    
    /**
     * Получаем предыдущаю миграцию
     *
     * @return string
     */
    protected function setMigration($migration)
    {
        if(is_null($migration)) return false;
        
        return $migration;
    }
}
