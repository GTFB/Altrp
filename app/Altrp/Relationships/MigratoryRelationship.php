<?php


namespace App\Altrp\Relationships;

use App\Altrp\Migration;

use App\Altrp\Relationship;
use App\Exceptions\ModelNotFoundException;
use App\Exceptions\TableNotFoundException;
use Illuminate\Support\Facades\DB;

/**
 * Базовый класс декоратор для класса Relationship
 * Class MigratoryRelationship
 * @package App\Altrp\Relationships
 */
class MigratoryRelationship implements IRelationship
{
    protected $relationship;

    /**
     * MigratoryRelationship constructor.
     * @param IRelationship $relationship
     */
    public function __construct(IRelationship $relationship)
    {
        $this->relationship = $relationship;
    }

    /**
     * Возвращаем объект Relationship
     * @return IRelationship
     */
    public function getRelationship(): IRelationship
    {
        return $this->relationship;
    }

    /**
     * IRelationships
     */
    public function createForeignKeyMigration() {
        return;
    }

    /**
     * IRelationships
     */
    public function updateForeignKeyMigration() {
        return;
    }

    /**
     * IRelationships
     */
    public function deleteForeignKeyMigration() {
        return;
    }

    /**
     * Проверяем существование модели
     * @param $model
     * @return bool
     */
    protected function checkModel($model) {
        if(!$model) {
            return false;
        }
        return true;
    }

    /**
     * Проверяем существование таблицы
     * @param $table
     * @return bool
     */
    protected function checkTable($table) {
        if(!$table) {
            return false;
        }
        return true;
    }

    /**
     * Проверяем существование таблицы в БД
     * @param $table
     * @return bool
     */
    protected function checkDBTable($table) {
        if(!$table->is_db_exist()) {
            return false;
        }
        return true;
    }

    /**
     * Метод проверки, запускается перед созданием миграции
     * Проверяет наличие моделей и таблиц
     * @throws ModelNotFoundException
     * @throws TableNotFoundException
     */
    protected function beforeMigrationCheck() {

        if(!$this->checkModel($this->relationship->altrp_model)) {
            throw new ModelNotFoundException("Model not found",500);
        }
        if(!$this->checkModel($this->relationship->altrp_target_model)) {
            throw new ModelNotFoundException("Target model not found",500);
        }

        if(!$this->relationship->altrp_target_model->altrp_table) {
            throw new TableNotFoundException("Target table not found",500);
        }
        if(!$this->relationship->altrp_model->altrp_table) {
            throw new TableNotFoundException("Table not found",500);
        }

        if(!$this->relationship->altrp_target_model->altrp_table->is_db_exist()) {
            throw new TableNotFoundException("Target table does not exist",500);
        }
        if(!$this->relationship->altrp_model->altrp_table->is_db_exist()) {
            throw new TableNotFoundException("Table does not exist",500);
        }
    }

    /**
     * ПРоверка на соответстиве разрешенным модификаторам
     * @param $value
     * @return bool
     */
    protected function checkModifierValue($value) {
        if(array_search($value,RelationshipModifier::AVAILABLE_VALUES) !== false) {
            return true;
        }
        return false;
    }

    /**
     * Функция возвращает путь к stub файлу добавления ключа
     * @return string
     */
    protected function getCreateStubPath() {
        return app_path().'/Altrp/Commands/stubs/migrations/create_key_migration.stub';
    }

    /**
     * Функция возвращает путь к stub файлу обновления ключа
     * @return string
     */
    protected function getUpdateStubPath() {
        return app_path().'/Altrp/Commands/stubs/migrations/update_key_migration.stub';
    }

    /**
     * Функция возвращает путь к stub файлу удаления ключа
     * @return string
     */
    protected function getDeleteStubPath() {
        return app_path().'/Altrp/Commands/stubs/migrations/delete_key_migration.stub';
    }

    /**
     * Получаем текст для записи в файл миграции модификатора onUpdate
     * @return string
     */
    protected function getUpdateModifierText() {
        return "->onUpdate('".$this->relationship->onUpdate."')";
    }

    /**
     * Получаем текст для записи в файл миграции модификатора onDelete
     * @return string
     */
    protected function getDeleteModifierText() {
        return "->onDelete('".$this->relationship->onDelete."')";
    }

    /**
     * Функция, создает файл миграции
     * @param $name
     * @param $template
     * @return mixed
     */
    protected function createFile($name, $template) {
        return Migration::createFile($name, $template);
    }

    /**
     * Добавляем миграцию в БД
     * @param $name
     * @param $file_path
     * @param $table
     * @return Migration
     */
    protected function createMigration($name, $file_path, $table) {

        $migration = new Migration();
        $migration->name = $name;
        $migration->file_path = $file_path;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $table->id;
        $migration->status = "1";
        $migration->data = "";
        $migration->save();

        return $migration;
    }

    /**
     * Функция проверки колонок на тип столбца
     * @return bool
     */
    protected function checkColumnsType() {
        $target_column = $this->relationship->altrp_target_model->altrp_table->getDBColumnByName($this->relationship->foreign_key);
        $local_column = $this->relationship->altrp_model->altrp_table->getDBColumnByName($this->relationship->local_key);

        if($target_column->getType() !== $local_column->getType()) {
            return false;
        }

        return true;
    }

    /**
     * Функция проверки колонок на аттрибут NULL
     * @return bool
     */
    protected function checkNullable() {
        $target_column = $this->relationship->altrp_target_model->altrp_table->getDBColumnByName($this->relationship->foreign_key);

        if($this->relationship->onUpdate != "set null" || $this->relationship->onDelete != "set null") {
            return true;
        }

        if($target_column->getNotNull()) {
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

        $keys = $target_table->getDBForeignKeys();

        foreach ($keys as $value) {

            if($value->getForeignTableName() === $prefix.$table->name
                && array_search($this->relationship->foreign_key, $value->getLocalColumns()) !== false
                && array_search($this->relationship->local_key, $value->getForeignColumns()) !== false
            ) {
                return $value;
            }
        }

        return false;
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

        $result = DB::table($foreign_table->name)
            ->leftJoin($local_table->name, $foreign_table->name.".".$foreign_key, '=', $local_table->name.".".$local_key)
            ->whereNotNull($foreign_table->name.".".$foreign_key)
            ->havingRaw($prefix.$local_table->name.".".$local_key." IS NULL")
            ->get();

        return count($result) > 0 ? false : true;
    }

    /**
     * Фугкция получения обратной связи belongsTo
     * @return mixed
     */
    public function getInverseRelationship() {

        $result = Relationship::where([
            ["type","=","belongsTo"],
            ["target_model_id","=",$this->relationship->model_id],
            ["model_id","=",$this->relationship->target_model_id],
            ["foreign_key","=",$this->relationship->local_key],
            ["local_key","=",$this->relationship->foreign_key],
        ]);

        return $result->first();
    }

    /**
     * Функция получения оригинальной связи
     * @return HasOne
     */
    protected function getOriginalRelationship() {
        return Relationship::find($this->relationship->id);
    }
}
