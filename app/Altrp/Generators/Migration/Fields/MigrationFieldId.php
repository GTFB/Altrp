<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

/**
 * Поле с типом ID 
 *
 */
class MigrationFieldId extends MigrationField implements IMigrationField{
    
    public function __construct($column, $old_column) {
        $this->type = "id";
        parent::__construct($column, $old_column);
    }
    
    protected function setText() {
        $text = "\$table->bigIncrements('".$this->column->name."')";
        return $text;
    }
}
