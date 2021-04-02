<?php

namespace App\Altrp\Generators\Migration;

use App\Exceptions\AltrpMigrationIncorrectFieldTypeException;
use App\Altrp\Generators\Migration\IMigrationField;
/**
 * Description of Field
 *
 * @author aco
 */
class MigrationField{

    public $column;

    public $old_column;

    protected $tabIndent = '    ';

    protected $type;

    protected $text;

    /**
     * Construct
     * @param type $column
     * @param type $old_column
     * @throws AltrpMigrationIncorrectFieldTypeException
     */
    public function __construct($column, $old_column) {
        $this->column = $column;
        $this->old_column = $old_column;

        /*if(!$this->checkColumnType()) {
            throw new AltrpMigrationIncorrectFieldTypeException("Incorrect field type ".$this->column->type." expected ".$this->type, 500);
        }*/
    }

    /**
     * Добавление поля
     * @return string
     */
    public function up() {

        if($this->isDeleteColumn()) {
            return $this->delete();
        }

        if(!$this->isNewColumn()) {
            return $this->update();
        }
        return $this->create();
    }

    /**
     * Откат поля в миграции
     * @return string
     */
    public function down() {
        return "";
    }

    /**
     * Создание поля
     * @return string
     */
    public function create() {

        $this->text = $this->setText();
        $this->addTabIndent();

        return $this->text;
    }

    /**
     * Обновление поля
     * @return string
     */
    public function update() {

        if(!$this->checkAllAttributes()) {
            $rename = null;
            if ($this->old_column->name !== $this->column->name) {
                $rename = "\$table->renameColumn('{$this->old_column->name}', '{$this->column->name}');\n\t\t\t";
            }

            $this->text = $this->setText() . "->change()";
            $this->addTabIndent();
        }
        return $this->text;
    }

    /**
     * Удаление поля
     * @return string
     */
    public function delete() {
        $this->text = "\$table->dropColumn('".$this->old_column->name."')";
        $this->addTabIndent();
        return $this->text;
    }

    /**
     * Формируем строку для создания или обновления колонки
     * @return string
     */
    protected function setText() {
        $modifiers = $this->getColumnModifiers();
        $index_modifiers = $this->getColumnIndexModifiers();
        $text = "\$table->".$this->column->type."('".$this->column->name."')".$modifiers.$index_modifiers;

        return $text;
    }

    /**
     * Добавление табуляций и символа переноса строки
     * @return string
     */
    protected function addTabIndent() {
        $this->text .= ";\n".$this->tabIndent.$this->tabIndent.$this->tabIndent;
        return $this->text;
    }

    /**
     * Является ли поле новой колонкой
     * @return boolean
     */
    protected function isNewColumn() {
        if(!$this->old_column) return true;
        else return false;
    }

    /**
     * Является ли поле удаленной колонкой
     * @return boolean
     */
    protected function isDeleteColumn() {
        if(!$this->column && $this->old_column) return true;
        else return false;
    }

    /**
     * Подходит ли колонка по типу
     * @return boolean
     */
    protected function checkColumnType() {
        if($this->column->type === $this->type) return true;
        else return false;
    }

    /**
     * Получаем значение default
     * @return string
     */
    protected function getDefault() {

        $default = "";


        if($this->column->default === '0' || $this->column->default && !$this->checkAttribute("default")) {
            $default = "->default('".$this->column->default."')";
        }

        //Если в default записан NULL, то делаем колонку nullable
        if($this->column->default === null && $this->getNullable() !== "") {
            $default = "";
        }
        else if($this->column->default === null && $this->getNullable() === "" && !$this->checkAttribute("default")) {
            $default = "->default(null)";
        }
        return $default;
    }

    /**
     * Получаем значение unique
     * @return string
     */
    protected function getUnique() {

        $unique = "";

        if($this->column->unique && !$this->checkAttribute("unique")) {
            $unique = "->unique()";
        }

        return $unique;
    }

    /**
     * Получаем значение index
     * @return string
     */
    protected function getIndex() {

        $index = "";

        if($this->column->indexed && !$this->checkAttribute("indexed")) {
            $index = "->index()";
        }

        return $index;
    }

    /**
     * Получаем значение nullable
     * @return string
     */
    protected function getNullable() {
        $nullable = "";
        if($this->column->null && !$this->checkAttribute("null")) {
            $nullable = "->nullable()";
        } elseif (!$this->column->null && $this->old_column && $this->column->null != $this->old_column->null) {
            $nullable = '->nullable(false)';
        }
        return $nullable;
    }

    /**
     * Получаем все модификаторы столбца
     * @return string
     */
    protected function getColumnModifiers() {
        $text = "";
        $text .= $this->getNullable();
        $text .= $this->getDefault();
        $text .= $this->getUnsigned();
        return $text;
    }
  /**
   * Получаем Unsigned-модификатор столбца
   */
  protected function getUnsigned(){
    $unsigned = '';
    if( ( $this->column->attribute === 'unsigned' ) /* && !$this->checkAttribute("attribute")*/) {
      $unsigned = '->unsigned()';
    }
    return $unsigned;
  }

    /**
     * Получаем все модификаторы индекса столбца
     * @return string
     */
    protected function getColumnIndexModifiers() {
        $text = '';
        $text .= $this->getUnique();
        $text .= $this->getIndex();
        return $text;
    }

    /**
     * Сравниваем атрибут у колонок
     *
     * @return string
     */
    protected function checkAttribute($attribute)
    {
        if($this->isNewColumn()) return false;

        if($this->column->{$attribute} == $this->old_column->{$attribute}) {
            return true;
        }

        return false;
    }

    /**
     * Сравниваем атрибуты у колонок
     *
     * @return string
     */
    protected function checkAllAttributes()
    {
        if($this->isNewColumn()) return false;

        foreach($this->column->getAttributes() as $key => $value) {
            if($value != $this->old_column->{$key}) {
                return false;
            }
        }

        return true;
    }
}
