<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

/**
 * Поле с типом Decimal
 *
 */
class MigrationFieldDecimal  extends MigrationField implements IMigrationField {
    
    protected $total = 12;
    protected $places = 3;
    
    public function __construct($column, $old_column) {
        $this->type = "decimal";
        parent::__construct($column, $old_column);
    }
    
    protected function setText() {
        
        $total = $this->getTotal();
        $places = $this->getPlaces();
        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();
        
        $text = "\$table->decimal('".$this->column->name."', ".$total.", ".$places.")".$modifiers.$index_modifiers;
        
        return $text;
    }
    
    /**
     * Получение общего количества символов
     * @return integer
     */
    public function getTotal() {
        
        if(isset($this->column->size) && !empty($this->column->size)) {
            return $this->column->size;
        }
        
        return $this->total;
    }
    
    /**
     * Получение числа знаков после запятой
     * @return integer
     */
    public function getPlaces() {
        
        if(isset($this->column->places) && !empty($this->column->places)) {
            return $this->column->places;
        }
        
        return $this->places;
    }
}
