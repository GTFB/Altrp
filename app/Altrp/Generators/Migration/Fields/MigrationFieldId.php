<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\MigrationFieldInterface;

/**
 * Поле с типом ID 
 *
 */
class MigrationFieldId extends MigrationField implements MigrationFieldInterface{
    
    public function __construct($column, $old_column) {
        $this->type = "id";
        parent::__construct($column, $old_column);
    }
    
    public function create() {
        $this->text = "\$table->bigIncrements('".$this->column->name."')";
        $this->text .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
        return $this->text;
    }
    
    public function update() {
        $this->text = "\$table->bigIncrements('".$this->column->name."')->change()";
        $this->text .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
        return $this->text;
    }
    
}
