<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

/**
 * Поле с типом Text
 *
 */
class MigrationFieldText  extends MigrationField implements IMigrationField {
    
    public function __construct($column, $old_column) {
        $this->type = "text";
        parent::__construct($column, $old_column);
    }
    
    protected function setText() {
        
        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();
        
        $text = "\$table->text('".$this->column->name."')".$modifiers.$index_modifiers;
        
        return $text;
    }
    
    /**
     * Переопределяем Получение всех модификаторов столбца
     * у колонок типа BLOB не может быть значения по умолчанию
     * @return type
     */
    protected function getColumnModifiers() {
        $text = "";
        $text .= $this->getNullable();
        return $text;
    }
}
