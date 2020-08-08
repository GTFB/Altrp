<?php


namespace App\Altrp\Generators;


use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Relationship;
use App\Altrp\Table;
use App\Exceptions\CommandFailedException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\PermissionNotWrittenException;
use App\Exceptions\RelationshipNotInsertedException;
use App\Exceptions\TableNotFoundException;
use App\Permission;
use Illuminate\Support\Carbon;

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
     * @param Model | array $model
     * @param array $data
     */
    public function __construct( $model, $data = [])
    {
        $this->model = $model;
        $this->modelFilename = $this->getFormedFileName(
            $this->model->path,
            $this->model->name
        );
        $this->modelFile = $this->getModelFile();
        $this->relationships = $model->altrp_relationships;
        parent::__construct($model);
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
     * @throws PermissionNotWrittenException
     * @throws \Exception
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
     * @throws PermissionNotWrittenException
     */
    protected function writeModelToDb()
    {
        $attributes = json_decode(json_encode($this->data), true);
        $this->model->fill($attributes);

        try {
            $this->model->save();
        } catch (\Exception $e) {
            return false;
        }

        if (! $this->getAndWriteRelationships()) {
            throw new RelationshipNotInsertedException("Failed to write relationships", 500);
        }

        if (! $this->writePermissions()) {
            throw new PermissionNotWrittenException("Failed to write permissions", 500);
        }

        return true;
    }

    /**
     * @throws \Exception
     */
    public function updateModelFile()
    {

        return $this->createModelFile();
    }

    /**
     * Запустить команду создания модели
     *
     * @return bool
     * @throws \Exception
     */
    public function createModelFile()
    {
        $relationships = $this->screenBacklashes($this->relationshipsToString());
        $fullModelName = $this->modelFilename;
        $fillableColumns = $this->getFillableColumns();
        $softDeletes = $this->isSoftDeletes();
        $createdAt = $this->getCreatedAt();
        $updatedAt = $this->getUpdatedAt();
        $primaryKey = $this->getPrimaryKey();
        $oldModelFile = $this->getOldModelFile();
        $customCode = $this->getCustomCode($oldModelFile);
        $userColumns = $this->getUserColumns();
        if(file_exists($oldModelFile)) unlink($oldModelFile);
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
                '--user-columns' => "[{$userColumns}]",
                '--accessors' => $this->getCustomCodeBlock($customCode,'accessors'),
                '--custom-namespaces' => $this->getCustomCodeBlock($customCode,'custom_namespaces'),
                '--custom-traits' => $this->getCustomCodeBlock($customCode,'custom_traits'),
                '--custom-properties' => $this->getCustomCodeBlock($customCode,'custom_properties'),
                '--custom-methods' => $this->getCustomCodeBlock($customCode,'custom_methods')
            ]);
        } catch(\Exception $e) {
            if(file_exists($this->modelFile . '.bak'))
                rename($this->modelFile . '.bak', $this->modelFile);
            return false;
        }
        if(file_exists($this->modelFile . '.bak'))
            unlink($this->modelFile . '.bak');
        if(file_exists($oldModelFile . '.bak'))
            unlink($oldModelFile . '.bak');
        return true;
    }

    /**
     * Удалить файл модели
     *
     * @return bool
     */
    public function deleteModelFile()
    {
        if (file_exists($this->modelFile)) {
            return unlink($this->modelFile);
        }
        return true;
    }

    /**
     * Получить первичный ключ
     *
     * @return string
     */
    protected function getPrimaryKey()
    {
        return $this->model->pk ?? 'id';
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
     * @throws TableNotFoundException
     */
    public function getAndWriteRelationships()
    {
        if ($this->model->altrp_relationships && $this->model->altrp_relationships->isNotEmpty()) {
            $this->relationships = $this->model->altrp_relationships;
            if (count($this->model->altrp_relationships) > 0) {
                $this->deleteRelationships($this->model->id);
            }
            return $this->writeRelationships();
        }
        return true;
    }

    /**
     * Получить связи по указанному ID модели из БД
     *
     * @param $modelId
     * @return mixed
     */
    protected function getRelationships($modelId)
    {
        $relationships = Relationship::where('model_id', $modelId)->get();
        return $relationships;
    }

    /**
     * Удалить связи по указанному ID модели из БД
     *
     * @param $modelId
     * @return mixed
     */
    protected function deleteRelationships($modelId)
    {
        return Relationship::where('model_id', $modelId)->delete();
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
        if (! $this->model->table) {
            throw new TableNotFoundException('Table not found', 404);
        }

        $relationshipsData = $this->prepareRelationsData();

        try {
            Relationship::insert($relationshipsData);
        } catch (\Exception $e) {
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
                'model_id' => $this->model->id,
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
     * Записать permissions в БД
     *
     * @return bool
     */
    protected function writePermissions()
    {
        $permissions = $this->preparePermissions();
        try {
            Permission::insertOrIgnore($permissions);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    /**
     * Подготовить permissions к записи в БД
     *
     * @return array
     */
    protected function preparePermissions()
    {
        $permissions = [];
        $actions = ['create', 'read', 'update', 'delete', 'all'];
        $nowTime = Carbon::now();

        foreach ($actions as $action) {
            $permissions[] = [
                'name' => $action . '-' . strtolower($this->model->name),
                'display_name' => ucfirst($action) . ' ' . \Str::plural($this->model->name),
                'created_at' => $nowTime,
                'updated_at' => $nowTime,
            ];
        }

        return $permissions;
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
        $table = $this->model->table;
        if (!$table) {
            throw new TableNotFoundException("Table not found", 500);
        }
        $columns = $this->getColumns($table);
        if (!$columns || $columns->isEmpty()) return null;
        $relations = $this->getRelations();
        $columnsList = $this->getColumnsList($columns);
//        $relationsList = $this->getColumnsList($relations, 'foreign_key');
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
        $columns = Column::where([['table_id', $table->id],['editable',1]])->get();
        return $columns;
    }

    protected function getRelations()
    {
        $relations = Relationship::where([['model_id', $this->model->id], ['add_belong_to', 1]])->get();
        return $relations;
    }

    /**
     * Получить список колонок
     *
     * @param $columns
     * @param string $columnName
     * @return array
     */
    protected function getColumnsList($columns, $columnName = 'name')
    {
        $columnsList = [];
        foreach ($columns as $column) {
            $columnsList[] = $column->$columnName;
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

    protected function getOldModelFile()
    {
        $modelFilename = $this->getFormedFileName(
            $this->model->getOriginal('path'),
            $this->model->getOriginal('name')
        );
        return app_path("{$modelFilename}.php");
    }

    /**
     * Получить пользовательские колонки в таблице модели
     *
     * @return string|null
     */
    protected function getUserColumns()
    {
        if (! isset($this->model->user_cols) || empty($this->model->user_cols)) return null;
        return '\'' . implode("','",explode(",", $this->model->user_cols)) . '\'';
    }
}
