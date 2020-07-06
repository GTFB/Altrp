<?php


namespace App\Altrp\Generators;


use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Relationship;
use App\Altrp\Table;
use App\Exceptions\CommandFailedException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\RelationshipNotInsertedException;
use App\Exceptions\TableNotFoundException;

class ModelGenerator extends AppGenerator
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * Данные, необходимые для генерации/изменения модели
     *
     * @var object
     */
    protected $data;

    /**
     * Связи с таблицами
     *
     * @var array
     */
    private $relationships;

    /**
     * Имя файла модели
     *
     * @var string
     */
    private $modelFilename;

    /**
     * Файл модели
     *
     * @var string
     */
    private $modelFile;

    /**
     * ModelGenerator constructor.
     * @param $data
     */
    public function __construct($data)
    {
        $this->model = new Model();
        parent::__construct($data);
    }

    /**
     * Изменить текущую модель
     *
     * @param Model $model
     *
     * @return void
     */
    public function setModel(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Получить данные из полей
     *
     * @return object
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Сгенерировать модель
     *
     * @return bool
     * @throws CommandFailedException
     * @throws ModelNotWrittenException
     * @throws RelationshipNotInsertedException
     * @throws TableNotFoundException
     */
    public function generate()
    {
        $model = $this->getModelFromDb($this->data->table_id);

        if ($model) {
            $this->setModel($model);
            $this->modelFilename = $this->getFormedFileName($this->model->path, $this->model->name);
            $this->modelFile = $this->getModelFile();

            if (! $this->writeModelToDb()) {
                throw new ModelNotWrittenException('Failed to write model to the database', 500);
            }
            if (! $this->updateModelFile()) {
                throw new CommandFailedException('Failed to update model file', 500);
            }
        } else {
            if (! $this->writeModelToDb()) {
                throw new ModelNotWrittenException('Failed to write model to the database', 500);
            }
            if (! $this->createModelFile()) {
                throw new CommandFailedException('Failed to create model file', 500);
            }
        }

        return true;
    }

    /**
     * Сохранить модель в базе данных
     *
     * @return bool
     * @throws RelationshipNotInsertedException
     * @throws TableNotFoundException
     */
    protected function writeModelToDb()
    {
        $attributes = json_decode(json_encode($this->data), true);
        $this->model->fill($attributes);
        $this->getAndWriteRelationships();

        try {
            $this->model->save();
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    /**
     * @throws \Exception
     */
    protected function updateModelFile()
    {
        return $this->createModelFile();
    }

    /**
     * Запустить команду создания модели
     *
     * @return bool
     * @throws \Exception
     */
    private function createModelFile()
    {
        $relationships = $this->screenBacklashes($this->relationshipsToString());
        $fullModelName = $this->getFormedFileName($this->data->path, $this->data->name);
        $fillableColumns = $this->getFillableColumns();
        $softDeletes = $this->isSoftDeletes();
        $createdAt = $this->getCreatedAt();
        $updatedAt = $this->getUpdatedAt();
        $primaryKey = $this->getPrimaryKey();
        $customCode = $this->getCustomCode($this->modelFile);

        try {
            \Artisan::call('crud:model', [
                'name' => "{$fullModelName}",
                '--table' => "{$this->model->table()->first()->name}",
                '--fillable' => "[{$fillableColumns}]",
                '--pk' => "$primaryKey",
                '--soft-deletes' => "{$softDeletes}",
                '--timestamps' => $this->model->time_stamps,
                '--created-at' => $createdAt,
                '--updated-at' => $updatedAt,
                '--relationships' => "{$relationships}",
                '--custom-namespaces' => $customCode['custom_namespaces'],
                '--custom-traits' => $customCode['custom_traits'],
                '--custom-properties' => $customCode['custom_properties'],
                '--custom-methods' => $customCode['custom_methods']
            ]);
        } catch(\Exception $e) {
            if(file_exists($this->modelFile . '.bak'))
                rename($this->modelFile . '.bak', $this->modelFile);
            return false;
        }
        if(file_exists($this->modelFile . '.bak'))
            unlink($this->modelFile . '.bak');
        return true;
    }

    /**
     * Получить первичный ключ
     *
     * @return string
     */
    protected function getPrimaryKey()
    {
        return $this->data->pk ?? 'id';
    }

    /**
     * Получить значение поля времени создания
     *
     * @return string|null
     */
    protected function getCreatedAt()
    {
        if ($this->model->time_stamps === true) {
            $createdAt = $this->data->created_at ?? 'created_at';
        } else {
            $createdAt = null;
        }
        return $createdAt;
    }

    /**
     * Получить значение поля времени обновления
     *
     * @return string|null
     */
    protected function getUpdatedAt()
    {
        if ($this->model->time_stamps === true) {
            $updatedAt = $this->data->updated_at ?? 'updated_at';
        } else {
            $updatedAt = null;
        }
        return $updatedAt;
    }

    /**
     * Получить и записать в БД связи модели с другими таблицами
     *
     * @throws RelationshipNotInsertedException
     * @throws TableNotFoundException
     */
    protected function getAndWriteRelationships()
    {
        if (isset($this->data->relationships)) {

            if (count($this->getRelationships($this->data->table_id)) > 0) {
                $this->deleteRelationships($this->data->table_id);
            }

            $this->relationships = $this->data->relationships;

            if (! $this->writeRelationships()) {
                throw new RelationshipNotInsertedException("Ошибка добавления связей", 500);
            }
        }
    }

    /**
     * Получить связи по указанному ID таблицы из БД
     *
     * @param $tableId
     * @return mixed
     */
    protected function getRelationships($tableId)
    {
        $relationships = Relationship::where('table_id', $tableId)->get();
        return $relationships;
    }

    /**
     * Удалить связи по указанному ID таблицы из БД
     *
     * @param $tableId
     * @return mixed
     */
    protected function deleteRelationships($tableId)
    {
        return Relationship::where('table_id', $tableId)->delete();
    }

    /**
     * Конвертировать связи в строку.
     * Необходимо для выполнения artisan команды.
     *
     * @return string|null
     */
    protected function relationshipsToString()
    {
        if (! $this->relationships) return null;

        $relArr = [];

        foreach ($this->relationships as $rel) {

            $relItem = $rel->name . '#' . $rel->type . '#'
                . trim($this->screenBacklashes($rel->model_class), '\\');

            if (isset($rel->foreign_key)) {

                $relItem .= "|{$rel->foreign_key}";

                if (isset($rel->local_key)) {
                    $relItem .= "|{$rel->local_key}";
                }
            }

            $relArr[] = $relItem;
        }

        return implode(';', $relArr);
    }

    /**
     * Добавить связи в таблицу связей
     *
     * @return bool
     * @throws TableNotFoundException
     */
    protected function writeRelationships()
    {
        if (! $this->getTableById($this->model->table_id)) {
            throw new TableNotFoundException('Table not found', 404);
        }

        $relationshipsData = $this->prepareRelationsData();

        try {
            Relationship::insert($relationshipsData);
        } catch (RelationshipNotInsertedException $e) {
            return false;
        }

        return true;
    }

    /**
     * Подготовить и получить данные для связей
     *
     * @return array
     */
    protected function prepareRelationsData()
    {
        $relData = [];

        foreach ($this->relationships as $rel) {
            $relData[] = [
                'table_id' => $this->model->table_id,
                'name' => $rel->name,
                'type' => $rel->type,
                'model_class' => $this->screenBacklashes($rel->model_class),
                'foreign_key' => $rel->foreign_key ?? '',
                'local_key' => $rel->local_key ?? ''
            ];
        }

        return $relData;
    }

    /**
     * Проверить, существует ли модель
     *
     * @param $tableId
     * @return mixed
     */
    protected function getModelFromDb($tableId)
    {
        // Получаем модель в таблице моделей для обновления
        $model = Model::where('table_id', $tableId)->first();
        return $model;
    }

    /**
     * Получить заполняемые поля в модели
     *
     * @return string
     * @throws TableNotFoundException
     */
    protected function getFillableColumns()
    {
        if (!isset($this->data->fillable_cols)) return '';

        $table = $this->getTableById($this->model->table_id);

        if (!$table) {
            throw new TableNotFoundException("Table not found", 500);
        }

        $columns = $this->getColumns($table);

        if ($columns->isEmpty()) return '';

        $columnsList = $this->getColumnsList($columns);

        return '\'' . implode("','", $columnsList) . '\'';
    }

    /**
     * Получить таблицу по id
     *
     * @param $tableId
     * @return mixed
     */
    protected function getTableById($tableId)
    {
        $table = Table::find($tableId);
        return $table;
    }

    /**
     * Получить колонки в таблице
     *
     * @param $table
     * @return mixed
     */
    protected function getColumns($table)
    {
        $last_migration = $table->actual_migration();

        $columns = Column::where([
            ['table_id', $this->model->table_id],
            ['altrp_migration_id', $last_migration->id]
        ])
            ->whereIn('name', (array) $this->data->fillable_cols)
            ->get();

        return $columns;
    }

    /**
     * Получить список колонок
     *
     * @param $columns
     * @return array
     */
    protected function getColumnsList($columns)
    {
        $columnsList = [];
        foreach ($columns as $column) {
            $columnsList[] = $column->name;
        }
        return $columnsList;
    }

    /**
     * Проверить, будет ли использоваться Soft Deletes
     * Необходимо для выполнения artisan команды
     *
     * @return string
     */
    protected function isSoftDeletes()
    {
        return ($this->model->soft_deletes) ? 'yes' : 'no';
    }

    /**
     * Получить сформированное имя файла
     *
     * @param string $modelPath Абсолютный путь к файлу
     * @param string $modelName Имя файла
     * @return string
     */
    protected function getFormedFileName($modelPath, $modelName)
    {

        $fullModelFilename = isset($modelPath)
            ? trim(config('crudgenerator.user_models_folder') . "/{$modelPath}/{$modelName}", '/')
            : trim(config('crudgenerator.user_models_folder') . "/{$modelName}", '/');

        return $fullModelFilename;
    }

    /**
     * Получить файл модели
     *
     * @return string
     */
    protected function getModelFile()
    {
        return base_path('app/' . "{$this->modelFilename}.php");
    }
}
