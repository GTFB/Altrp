<?php

namespace App\Altrp\Relationships;

use App\Altrp\Relationship;
use App\Altrp\Relationships\IRelationship;

use App\Exceptions\AltrpMigrationCreateFileExceptions;
use App\Exceptions\Migration\AltrpForeignKeyChildRowsException;
use App\Exceptions\Migration\AltrpForeignKeyColumnsCompareException;
use App\Exceptions\Migration\AltrpMigrationKeyIncorrectModifierValueException;
use App\Exceptions\ModelNotFoundException;
use App\Exceptions\TableNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Altrp\Migration;

class BelongsToMany extends MigratoryRelationship implements IRelationship
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

        $target_table = $this->relationship->altrp_target_model->altrp_table;
        $secondary_table = $this->relationship->altrp_secondary_model->altrp_table;
        $table = $this->relationship->altrp_model->altrp_table;

        $secondary_local_column = $secondary_table->getDBColumnByName($this->relationship->secondary_local_key);
        $secondary_foreign_column = $secondary_table->getDBColumnByName($this->relationship->secondary_foreign_key);
        $local_column = $table->getDBColumnByName($this->relationship->local_key);
        $target_column = $target_table->getDBColumnByName($this->relationship->foreign_key);

        $local_key = $this->getForeignDBALKey($table, $this->relationship->secondary_local_key, $this->relationship->local_key);
        $target_key = $this->getForeignDBALKey($target_table, $this->relationship->secondary_foreign_key, $this->relationship->foreign_key);
        //Если оба ключа уже существуют, прекращаем выполнение функции
        if( $local_key && $target_key ) {
            return true;
        }

        if(!$this->checkColumnsType($secondary_local_column, $local_column)) {
            throw new AltrpForeignKeyColumnsCompareException("Local columns has different type", 500);
        }

        if(!$this->checkColumnsType($secondary_foreign_column, $target_column)) {
            throw new AltrpForeignKeyColumnsCompareException("Target columns has different type", 500);
        }

        if(!$this->checkNullable($secondary_local_column)) {
            throw new AltrpForeignKeyColumnsCompareException("Secondary local column is not nullable", 500);
        }

        if(!$this->checkNullable($secondary_foreign_column)) {
            throw new AltrpForeignKeyColumnsCompareException("Secondary target column is not nullable", 500);
        }

        if(!$this->checkDBRowsConstraint($table, $this->relationship->secondary_local_key, $this->relationship->local_key)) {
            throw new AltrpForeignKeyChildRowsException("Cannot add or update a child row in local table: a foreign key constraint fails", 500);
        }

        if(!$this->checkDBRowsConstraint($target_table, $this->relationship->secondary_foreign_key, $this->relationship->foreign_key)) {
            throw new AltrpForeignKeyChildRowsException("Cannot add or update a child row in target table: a foreign key constraint fails", 500);
        }

        if(!$this->checkModifierValue($this->relationship->onUpdate)) {
            throw new AltrpMigrationKeyIncorrectModifierValueException("Incorrect onUpdate value", 500);
        }

        if(!$this->checkModifierValue($this->relationship->onDelete)) {
            throw new AltrpMigrationKeyIncorrectModifierValueException("Incorrect onDelete value", 500);
        }

        $onUpdate = $this->getUpdateModifierText();
        $onDelete = $this->getDeleteModifierText();


        $mas = [];
        if(!$local_key) {
            $mas[] = "\$table->foreign('".$this->relationship->secondary_local_key."')->references('".$this->relationship->local_key."')->on('".$table->name."')".$onUpdate.$onDelete.";";
        }

        if(!$target_key) {
            $mas[] = "\$table->foreign('".$this->relationship->secondary_foreign_key."')->references('".$this->relationship->foreign_key."')->on('".$target_table->name."')".$onUpdate.$onDelete.";";
        }

        $text = implode(PHP_EOL."\t\t\t", $mas);

        $stub_path = $this->getCreateStubPath();
        $template = file_get_contents($stub_path);

        $name = "update_".$secondary_table->name."_table_insert_".$this->relationship->name."_key";
        $className = Str::studly($name);

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $secondary_table->name, $template);
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

        $target_table = $this->relationship->altrp_target_model->altrp_table;
        $secondary_table = $this->relationship->altrp_secondary_model->altrp_table;
        $table = $this->relationship->altrp_model->altrp_table;

        $local_key = $this->getForeignDBALKey($table, $this->relationship->secondary_local_key, $this->relationship->local_key);
        $target_key = $this->getForeignDBALKey($target_table, $this->relationship->secondary_foreign_key, $this->relationship->foreign_key);

        //Если нет ни одного ключа, прекращаем выполнение функции
        if(!$local_key && !$target_key) {
            return true;
        }

        //Если существует обратная связь, оставляем ограничение ключа
        if($this->getInverseRelationship()) {
            return true;
        }

        $name = $name = "update_".$secondary_table->name."_table_delete_".$this->relationship->name."_key";
        $className = Str::studly($name);

        $mas = [];

        if($local_key) {
            $mas[] = "\$table->dropForeign('".$local_key->getName()."');";;
        }

        if($target_key) {
            $mas[] = "\$table->dropForeign('".$target_key->getName()."');";;
        }

        $text = implode(PHP_EOL."\t\t\t", $mas);

        $stub_path = $this->getDeleteStubPath();
        $template = file_get_contents($stub_path);

        $template = str_replace('{{className}}', $className, $template);
        $template = str_replace('{{table}}', $secondary_table->name, $template);
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
        return new BelongsToMany($original);
    }

    /**
     * Метод проверки, запускается перед созданием миграции
     * Проверяет наличие моделей и таблиц
     * @throws ModelNotFoundException
     * @throws TableNotFoundException
     */
    protected function beforeMigrationCheck() {
        parent::beforeMigrationCheck();

        if(!$this->checkModel($this->relationship->altrp_secondary_model)) {
            throw new ModelNotFoundException("Secondary model not found",500);
        }

        if(!$this->relationship->altrp_secondary_model->altrp_table) {
            throw new TableNotFoundException("Secondary table not found",500);
        }

        if(!$this->relationship->altrp_secondary_model->altrp_table->is_db_exist()) {
            throw new TableNotFoundException("Secondary table does not exist",500);
        }
    }

    /**
     * Функция проверки колонок на аттрибут NULL
     * @param null $column
     * @return bool
     */
    protected function checkNullable($column = null) {

        if($this->relationship->onUpdate != "set null" || $this->relationship->onDelete != "set null") {
            return true;
        }

        if($column->getNotNull()) {
            return false;
        }

        return true;
    }

    /**
     * Функция проверки колонок на тип столбца
     * @param null $secondary_column
     * @param null $column
     * @return bool
     */
    protected function checkColumnsType($secondary_column = null, $column = null) {

        if($secondary_column->getType() !== $column->getType()) {
            return false;
        }

        return true;
    }

    /**
     * Функция поиска внешнего ключа к текущей модели в таблице
     * @param null $table
     * @param null $secondary_key
     * @param null $key
     * @return bool
     */
    public function getForeignDBALKey($table = null, $secondary_key = null, $key = null) {
        $prefix = env('DB_TABLES_PREFIX', '');

        $secondary_table = $this->relationship->altrp_secondary_model->altrp_table;
        $keys = $secondary_table->getDBForeignKeys();

        foreach ($keys as $value) {

            if($value->getForeignTableName() === $prefix.$table->name
                && array_search($secondary_key, $value->getLocalColumns()) !== false
                && array_search($key, $value->getForeignColumns()) !== false
            ) {
                return $value;
            }
        }

        return false;
    }

    /**
     * Проверяем на ошибку в данных
     * Cannot add or update a child row: a foreign key constraint fails
     * @param null $table
     * @param null $secondary_key
     * @param null $key
     * @return bool
     */
    public function checkDBRowsConstraint($table = null, $secondary_key = null, $key = null) {
        $secondary_table = $this->relationship->altrp_secondary_model->altrp_table;

        $prefix = env('DB_TABLES_PREFIX', '');

        $result = DB::table($secondary_table->name)
            ->leftJoin($table->name, $secondary_table->name.".".$secondary_key, '=', $table->name.".".$key)
            ->whereNotNull($secondary_table->name.".".$secondary_key)
            ->havingRaw($prefix.$table->name.".".$key." IS NULL")
            ->get();

        return count($result) > 0 ? false : true;
    }

    /**
     * Фугкция получения обратной связи belongsTo
     * @return mixed
     */
    public function getInverseRelationship() {

        $result = Relationship::where([
            ["type","=","belongsToMany"],
            ["target_model_id","=",$this->relationship->model_id],
            ["model_id","=",$this->relationship->target_model_id],
            ["foreign_key","=",$this->relationship->local_key],
            ["local_key","=",$this->relationship->foreign_key],
            ["secondary_model_id","=",$this->relationship->secondary_model_id],
            ["secondary_local_key","=",$this->relationship->secondary_foreign_key],
            ["secondary_foreign_key","=",$this->relationship->secondary_local_key],
        ]);

        return $result->first();
    }
}
