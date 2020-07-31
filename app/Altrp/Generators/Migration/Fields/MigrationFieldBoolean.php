<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

use App\Exceptions\Migration\AltrpMigrationFieldIncorrectDefaultException;

/**
 * Поле с типом Boolean
 *
 */
class MigrationFieldBoolean  extends MigrationField implements IMigrationField {
    
    public function __construct($column, $old_column) {
        $this->type = "boolean";
        parent::__construct($column, $old_column);
    }
    
    /**
     * Переопределяем метод формирования строки для создания или обновления колонки 
     * @return string
     */
    protected function setText() {
        
        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();
        
        $text = "\$table->boolean('".$this->column->name."')".$modifiers.$index_modifiers;
        
        return $text;
    }
    
    /**
     * Переопределяем метод получения значение default
     * @return string
     * @throws AltrpMigrationFieldIncorrectDefaultException
     */
    protected function getDefault() {
        
        if(!$this->checkDefault()) {
            throw new AltrpMigrationFieldIncorrectDefaultException("Incorrect default value for boolean field", 500);
        }
        
        $this->column->default = filter_var($this->column->default, FILTER_VALIDATE_BOOLEAN);
         
        return parent::getDefault();
    }
    
    /**
     * Проверяем является ли значение по умолчанию подходящим
     * @return boolean
     */
    protected function checkDefault() {
        
        if($this->column->null && $this->column->default == "NULL") return true;
        
        if($this->column->default == "NULL") return true;
        
        if(is_bool(filter_var($this->column->default, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE))) return true;
        
        return false;
    }
}
