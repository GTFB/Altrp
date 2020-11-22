<?php

namespace App\Altrp\Relationships;

use App\Exceptions\Migration\AltrpForeignKeyChildRowsException;
use App\Exceptions\Migration\AltrpForeignKeyColumnsCompareException;
use App\Exceptions\Migration\AltrpMigrationKeyIncorrectModifierValueException;
use App\Exceptions\ModelNotFoundException;
use App\Exceptions\TableNotFoundException;
use Illuminate\Support\Str;

class HasMany extends MigratoryRelationship implements IRelationship
{
    /**
     * Функция создания внешнего ключа при миграции добавления связи
     * @return bool
     * @throws AltrpForeignKeyChildRowsException
     * @throws AltrpForeignKeyColumnsCompareException
     * @throws AltrpMigrationKeyIncorrectModifierValueException
     * @throws ModelNotFoundException
     * @throws TableNotFoundException
     */
    public function createForeignKeyMigration() {

        $this->beforeMigrationCheck();

        //Если такой ключ уже существует, прекращаем выполнение функции
        if($this->getForeignDBALKey()) {
            return true;
        }

        if(!$this->checkColumnsType()) {
            throw new AltrpForeignKeyColumnsCompareException("Columns has different type", 500);
        }

        if(!$this->checkNullable()) {
            throw new AltrpForeignKeyColumnsCompareException("Target column is not nullable", 500);
        }

        if(!$this->checkDBRowsConstraint()) {
            throw new AltrpForeignKeyChildRowsException("Cannot add or update a child row: a foreign key constraint fails", 500);
        }

        if(!$this->checkModifierValue($this->relationship->onUpdate)) {
            throw new AltrpMigrationKeyIncorrectModifierValueException("Incorrect onUpdate value", 500);
        }

        if(!$this->checkModifierValue($this->relationship->onDelete)) {
            throw new AltrpMigrationKeyIncorrectModifierValueException("Incorrect onDelete value", 500);
        }

        $table = $this->relationship->altrp_model->altrp_table;
        $target_table = $this->relationship->altrp_target_model->altrp_table;

        $onUpdate = $this->getUpdateModifierText();
        $onDelete = $this->getDeleteModifierText();

        $text = "\$table->foreign('".$this->relationship->foreign_key."')->references('".$this->relationship->local_key."')->on('".$table->name."')".$onUpdate.$onDelete.";";

        $stub_path = $this->getCreateStubPath();
        $template = file_get_contents($stub_path);

        $name = "update_".$target_table->name."_table_insert_".$this->relationship->name."_key";
        $className = Str::studly($name);

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $target_table->name, $template);
        $template = str_replace('{{key}}', $text, $template);

        $file = $this->createFile($name, $template);

        if($file === false) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = $this->createMigration($name, $file, $target_table);

        $this->relationship->altrp_migration_id = $migration->id;

        return true;
    }

    /**
     * Функция обновления внешнего ключа при миграции обновления связи
     * Удаляет старый ключ, создает новый.
     * @return bool
     * @throws AltrpForeignKeyChildRowsException
     * @throws AltrpForeignKeyColumnsCompareException
     * @throws AltrpMigrationKeyIncorrectModifierValueException
     * @throws ModelNotFoundException
     * @throws TableNotFoundException
     */
    public function updateForeignKeyMigration() {
        $original = $this->getOriginal();
        $original->deleteForeignKeyMigration();
        return $this->createForeignKeyMigration();
    }

    /**
     * Функция удаления внешнего ключа при миграции удаления связи
     * @return bool
     * @throws ModelNotFoundException
     * @throws TableNotFoundException
     */
    public function deleteForeignKeyMigration() {

        $this->beforeMigrationCheck();

        $dbal_key = $this->getForeignDBALKey();
        //Если такой ключа нет, прекращаем выполнение функции
        if(!$dbal_key) {
            return true;
        }

        //Если существует обратная связь, оставляем ограничение ключа
        if($this->getInverseRelationship()) {
            return true;
        }

        $table = $this->relationship->altrp_model->altrp_table;
        $target_table = $this->relationship->altrp_target_model->altrp_table;

        $name = $name = "update_".$target_table->name."_table_delete_".$this->relationship->name."_key";
        $className = Str::studly($name);

        $key_name = $dbal_key->getName();
        $text = "\$table->dropForeign('".$key_name."');";

        $stub_path = $this->getDeleteStubPath();
        $template = file_get_contents($stub_path);

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $target_table->name, $template);
        $template = str_replace('{{delete_key}}', $text, $template);

        $file = $this->createFile($name, $template);

        if($file === false) {
            throw new AltrpMigrationCreateFileExceptions("Failed to create migration file");
        }

        $migration = $this->createMigration($name, $file, $target_table);

        return true;
    }

    /**
     * Функция получения оригинальной связи для миграций обновления
     * @return HasMany
     */
    public function getOriginal() {
        $original = $this->getOriginalRelationship();
        return new HasMany($original);
    }
}
