<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

/**
 * Поле с типом ForeignID 
 *
 */
class MigrationFieldForeignId extends MigrationField implements IMigrationField{
    
    public function __construct($column, $old_column) {
        $this->type = "foreignId";
        parent::__construct($column, $old_column);
    }
    
    protected function setText() {
        
        $modifiers = $this->getColumnModifiers();
        
        $text = "\$table->unsignedBigInteger('".$this->column->name."')".$modifiers;
        return $text;
    }
    
}
