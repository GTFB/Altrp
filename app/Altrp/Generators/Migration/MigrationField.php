<?php

namespace App\Altrp\Generators\Migration;

use App\Exceptions\AltrpMigrationIncorrectFieldTypeException;
/**
 * Description of Field
 *
 * @author aco
 */
class MigrationField{
    
    public $column;
    
    public $old_column;
    
    protected $tabIndent = '    ';
    
    protected $type;
    
    protected $text;
    
    /**
     * Construct
     * @param type $column
     * @param type $old_column
     * @throws AltrpMigrationIncorrectFieldTypeException
     */
    public function __construct($column, $old_column) {
        $this->column = $column;
        $this->old_column = $old_column;
        
        if(!$this->checkColumnType()) {
            throw new AltrpMigrationIncorrectFieldTypeException("Incorrect field type ".$this->column->type." expected ".$this->type, 500);
        }
    }
    
    /**
     * Добавление поля
     * @return string
     */
    public function up() {
        if(!$this->isNewColumn()) {
            return $this->update();
        }
        return $this->create();
    }
    
    /**
     * Откат поля в миграции
     * @return string
     */
    public function down() {
        return "";
    }
    
    /**
     * Создание поля
     * @return string
     */
    public function create() {
        
        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();
        
        $this->text = "\$table->".$this->column->type."('".$this->column->name."')".$modifiers.$index_modifiers;
        
        return $this->text;
    }
    
    /**
     * Обновление поля
     * @return string
     */
    public function update() {
        $this->text = $this->create()."->change()";
        return $this->text;
    }
    
    /**
     * Удаление поля
     * @return string
     */
    public function delete() {
        $this->text = "\$table->dropColumn('".$this->column->name."')";
        return $this->text;
    }
    
    /**
     * Добавление табуляций и символа переноса строки
     * @return string
     */
    protected function addTabIndent() {
        $this->text .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
        return $this->text;
    }
    
    /**
     * Является ли поле новой колонкой
     * @return boolean
     */
    protected function isNewColumn() {
        if(!$this->old_column) return true;
        else return false;
    }
    
    /**
     * Подходит ли колонка по типу
     * @return boolean
     */
    protected function checkColumnType() {
        if($this->column->type === $this->type) return true;
        else return false;
    }
    
    /**
     * Получаем значение default
     * @return string
     */
    protected function getDefault() {
        
        $default = "";
        
        if($this->column->default && $this->column->default !== $this->old_column->default) {
            $default = "->default('".$this->column->default."')";
        }
        
        return $default;
    }
    
    /**
     * Получаем значение unique
     * @return string
     */
    protected function getUnique() {
        
        $unique = "";
        
        if($this->column->unique && $this->column->unique !== $this->old_column->unique) {
            $unique = "->unique()";
        }
        
        return $unique;
    }
    
    /**
     * Получаем значение nullable
     * @return string
     */
    protected function getNullable() {
        
        $nullable = "";
        
        if($this->column->null && $this->column->null !== $this->old_column->null) {
            $nullable = "->nullable()";
        }
        
        return $nullable;
    }
    
    /**
     * Получаем все модификаторы столбца
     * @return type
     */
    protected function getColumnModifiers() {
        $text = "";
        $text .= $this->getNullable();
        $text .= $this->getDefault();
        return $text;
    }
    
    /**
     * Получаем все модификаторы индекса столбца
     * @return type
     */
    protected function getColumnIndexModifiers() {
        $text = $this->getUnique();
        return $text;
    }
}