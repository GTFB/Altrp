<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\MigrationFieldInterface;

/**
 * Description of newPHPClass
 *
 * @author aco
 */
class MigrationFieldString  extends MigrationField implements MigrationFieldInterface {
    
    protected $length = 191;
    
    public function __construct($column, $old_column) {
        $this->type = "string";
        parent::__construct($column, $old_column);
    }
    
    public function create() {
        
        $length = $this->getLength();
        
        $this->text = "\$table->string('".$this->column->name."', ".$length.")";
        $this->text .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
        return $this->text;
    }
    
    public function update() {
        
        
        
        $this->text = "\$table->bigIncrements('".$this->column->name."')->change()";
        $this->text .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
        return $this->text;
    }
    
    /**
     * Получение длины строки
     * @return integer
     */
    public function getLength() {
        
        if(isset($this->column->length) && !empty($this->column->length)) {
            return $this->column->length;
        }
        
        return $this->length;
    }
}
