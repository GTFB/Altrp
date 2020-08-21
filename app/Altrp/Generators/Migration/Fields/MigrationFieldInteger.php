<?php
namespace App\Altrp\Generators\Migration\Fields;

use App\Altrp\Generators\Migration\MigrationField;
use App\Altrp\Generators\Migration\IMigrationField;

use App\Exceptions\Migration\AltrpMigrationFieldIncorrectDefaultException;
/**
 * Поле с типом Integer
 *
 */
class MigrationFieldInteger extends MigrationField implements IMigrationField {

    public function __construct($column, $old_column) {
        $this->type = "integer";
        parent::__construct($column, $old_column);
    }


    protected function setText() {

        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();

        $text = "\$table->integer('".$this->column->name."')".$modifiers.$index_modifiers;

        return $text;
    }

    /**
     * Переопределяем метод получения значение default
     * @return string
     */
    protected function getDefault() {
        if (!$this->column->null) {
            if(!$this->checkDefault()) {
                throw new AltrpMigrationFieldIncorrectDefaultException("Incorrect default value for integer field", 500);
            }
        }
        if ($this->column->default !== null)
            $this->column->default = (int) $this->column->default;
        else
            $this->column->default = null;

        return parent::getDefault();
    }

    /**
     * Проверяем является ли значение по умолчанию подходящим
     * @return boolean
     */
    protected function checkDefault() {
        if ($this->column->default === 0 || $this->column->default === null) return true;
        if ( filter_var( (int) $this->column->default, FILTER_VALIDATE_INT )) return true;
        return false;
    }
}
