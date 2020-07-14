<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

/**
 * Поле с типом Timestamps
 *
 */
class MigrationFieldTimestamps  extends MigrationField implements IMigrationField {
    
    protected $precision = 0;
    
    public function __construct($column, $old_column) {
        $this->type = "timestamps";
        parent::__construct($column, $old_column);
    }
    
    protected function setText() {
        
        $precision = $this->getPrecision();
        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();
        
        $text = "\$table->timestamps('".$this->column->name."', ".$precision.")".$modifiers.$index_modifiers;
        
        return $text;
    }
    
    /**
     * Получение длины строки
     * @return integer
     */
    public function getPrecision() {
        
        if(isset($this->column->size) && !empty($this->column->size)) {
            return $this->column->size;
        }
        
        return $this->precision;
    }
}
