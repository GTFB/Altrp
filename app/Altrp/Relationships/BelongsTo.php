<?php

namespace App\Altrp\Relationships;


use App\Altrp\Relationship;
use App\Exceptions\Migration\AltrpForeignKeyChildRowsException;
use App\Exceptions\Migration\AltrpForeignKeyColumnsCompareException;
use App\Exceptions\Migration\AltrpMigrationKeyIncorrectModifierValueException;
use App\Exceptions\ModelNotFoundException;
use App\Exceptions\TableNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BelongsTo extends MigratoryRelationship implements IRelationship
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

        $text = "\$table->foreign('".$this->relationship->local_key."')->references('".$this->relationship->foreign_key."')->on('".$target_table->name."')".$onUpdate.$onDelete.";";

        $stub_path = $this->getCreateStubPath();
        $template = file_get_contents($stub_path);

        $name = "update_".$target_table->name."_table_insert_".$this->relationship->name."_key";
        $className = Str::studly($name);

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $table->name, $template);
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

        $name = $name = "update_".$table->name."_table_delete_".$this->relationship->name."_key";
        $className = Str::studly($name);

        $key_name = $dbal_key->getName();
        $text = "\$table->dropForeign('".$key_name."');";

        $stub_path = $this->getDeleteStubPath();
        $template = file_get_contents($stub_path);

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $table->name, $template);
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
        return new BelongsTo($original);
    }

    /**
     * Фугкция получения обратной связи belongsTo
     * @return mixed
     */
    public function getInverseRelationship() {

        $result = Relationship::where([
            ["target_model_id","=",$this->relationship->model_id],
            ["model_id","=",$this->relationship->target_model_id],
            ["foreign_key","=",$this->relationship->local_key],
            ["local_key","=",$this->relationship->foreign_key],
        ])->whereIn('type', ["hasOne", "hasMany"]);;

        return $result->first();
    }

    /**
     * Проверяем на ошибку в данных
     * Cannot add or update a child row: a foreign key constraint fails
     * @return bool
     */
    public function checkDBRowsConstraint() {
        $foreign_table = $this->relationship->altrp_target_model->altrp_table;
        $local_table = $this->relationship->altrp_model->altrp_table;

        $local_key = $this->relationship->local_key;
        $foreign_key = $this->relationship->foreign_key;

        $prefix = env('DB_TABLES_PREFIX', '');

        $result = DB::table($local_table->name)
            ->leftJoin($foreign_table->name, $foreign_table->name.".".$foreign_key, '=', $local_table->name.".".$local_key)
            ->whereNotNull($local_table->name.".".$local_key)
            ->havingRaw($prefix.$foreign_table->name.".".$foreign_key." IS NULL")
            ->get();

        return count($result) > 0 ? false : true;
    }

    /**
     * Функция проверки колонок на аттрибут NULL
     * При связи belongsTo проверяем local_key
     * @return bool
     */
    protected function checkNullable() {
        $column = $this->relationship->altrp_model->altrp_table->getDBColumnByName($this->relationship->local_key);

        if($this->relationship->onUpdate != "set null" || $this->relationship->onDelete != "set null") {
            return true;
        }

        if($column->getNotNull()) {
            return false;
        }

        return true;
    }

    /**
     * Функция поиска внешнего ключа в таблице
     * @return bool
     */
    public function getForeignDBALKey() {

        $prefix = env('DB_TABLES_PREFIX', '');

        $table = $this->relationship->altrp_model->altrp_table;
        $target_table = $this->relationship->altrp_target_model->altrp_table;

        $keys = $table->getDBForeignKeys();

        foreach ($keys as $value) {

            if($value->getForeignTableName() === $prefix.$target_table->name
                && array_search($this->relationship->local_key, $value->getLocalColumns()) !== false
                && array_search($this->relationship->foreign_key, $value->getForeignColumns()) !== false
            ) {
                return $value;
            }
        }

        return false;
    }
}
