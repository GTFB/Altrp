<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

/**
 * Поле с типом String
 *
 */
class MigrationFieldString  extends MigrationField implements IMigrationField {
    
    protected $length = 191;
    
    public function __construct($column, $old_column) {
        $this->type = "string";
        parent::__construct($column, $old_column);
    }
    
    protected function setText() {
        
        $length = $this->getLength();
        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();
        
        $text = "\$table->string('".$this->column->name."', ".$length.")".$modifiers.$index_modifiers;
        
        return $text;
    }
    
    /**
     * Получение длины строки
     * @return integer
     */
    public function getLength() {
        
        if(isset($this->column->size) && !empty($this->column->size)) {
            return $this->column->size;
        }
        
        return $this->length;
    }
}
