<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

/**
 * Поле с типом Date
 *
 */
class MigrationFieldDate  extends MigrationField implements IMigrationField {
    
    public function __construct($column, $old_column) {
        $this->type = "date";
        parent::__construct($column, $old_column);
    }
    
    
    protected function setText() {
        
        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();
        
        $text = "\$table->date('".$this->column->name."')".$modifiers.$index_modifiers;
        
        return $text;
    }
    
    /**
     * Переопределяем получения всех модификаторов столбца
     * @return string
     */
    protected function getColumnModifiers() {
        $text = parent::getColumnModifiers();
        $text .= $this->getUseCurrent();
        return $text;
    }
    
    /**
     * Переопределяем метод получения значение default
     * @return string
     */
    protected function getDefault() {
        
        //Если подходит под условия getUseCurrent, то пропускаем default
        if($this->getUseCurrent() !== "") {
            return "";
        }
        
        return parent::getDefault();
    }
    
    /**
     * Получаем значение по умолчанию
     * @return string
     */
    protected function getUseCurrent() {
        
        $use_current = "";
        
        if($this->column->default == "CURRENT_TIMESTAMP") {
            $use_current = "->useCurrent()";
        }
        
        return $use_current;
    }
}
