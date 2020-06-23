<?php


namespace App\Altrp\Generators;

use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Relationship;
use Artisan;

class ModelGenerator extends AppGenerator
{
    /**
     * @var Model
     */
    private $model;

    /**
     * Данные, необходимые для генерации модели
     *
     * @var object
     */
    private $data;

    /**
     * Связи с таблицами
     *
     * @var array
     */
    private $relationships;

    public function __construct(Model $model, $data)
    {
        $this->model = $model;

        if (is_array($data)) {
            $obj = new \stdClass;
            $this->data = $this->convertToObject($data, $obj);
            
        } else {
            $this->data = json_decode($data);
        }
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
     * Сгенерировать новую модель
     *
     * @return bool
     */
    public function generate()
    {

        // Записать модель в таблицу
        if(! $this->writeModel()) return false;

        // Сгенерировать новую модель
        if (! $this->runCreateCommand()) return false;

        return true;
    }

    /**
     * Добавить модель в таблицу
     *
     * @return mixed
     */
    private function writeModel()
    {
        // Получаем модель в таблице моделей для обновления
        $model = Model::where('table_id', $this->data->model->table_id)->first();

        // Проверяем, существует ли модель в бд
        if ($model) {

            // Формируем имя файла (абсолютный путь + имя модели)
            $modelFileName = $this->getFormedFileName($model->path, $model->name);

            $modelFile = base_path('app/' . "{$modelFileName}.php");

            if (file_exists($modelFile)) {
                // Удаляем файл модели
                unlink($modelFile);
            }

            $this->setModel($model);
        }

        $this->model->name = trim($this->data->model->name, '/');
        $this->model->table_id = $this->data->model->table_id;
        $this->model->path = isset($this->data->model->path) ? trim($this->data->model->path, '/') : "";
        $this->model->description = $this->data->model->description ?? "";
        $this->model->soft_deletes = $this->data->model->soft_deletes ?? false;
        $this->model->timestamps = $this->data->model->timestamps ?? false;
        $this->model->time_stamps = $this->model->timestamps;
        $this->model->fillable_cols = isset($this->data->model->fillable)
            ? implode(',', (array) $this->data->model->fillable)
            : null;

        if (isset($this->data->model->pk)) {
            $this->model->setKeyName($this->data->model->pk);
        }

        // Получаем связи и записываем их
        if (isset($this->data->model->relationships)) {
            $this->relationships = $this->data->model->relationships;
            if (! $this->writeRelationships()) return false;
        } else {
            $this->relationships = Relationship::where('table_id', $this->data->model->table_id)->get();
        }

        return $this->model->save();
    }

    /**
     * Получить заполняемые поля
     *
     * @return string
     */
    private function getFillableColumns()
    {
        if (!isset($this->data->model->fillable)) return '';

        $columns = Column::where('table_id', $this->model->table_id)
            ->whereIn('name', (array)$this->data->model->fillable)
            ->get();

        if ($columns->isEmpty()) return '';

        $columnsArr = [];

        foreach ($columns as $column) {
            $columnsArr[] = $column->name;
        }

        return '\'' . implode("','", $columnsArr) . '\'';
    }

    /**
     * Запустить команду создания модели
     *
     * @return bool
     */
    private function runCreateCommand()
    {
        $relationships = $this->screenBacklashes($this->relationshipsToString());

        $fullModelName = $this->getFormedFileName($this->data->model->path, $this->data->model->name);

        $fillableColumns = $this->getFillableColumns();

        $softDeletes = $this->isSoftDeletes();

        if ($this->model->timestamps === true) {
            $createdAt = $this->data->model->created_at ?? 'created_at';
            $updatedAt = $this->data->model->updated_at ?? 'updated_at';
        } else {
            $createdAt = null;
            $updatedAt = null;
        }

        try {
            Artisan::call("crud:model", [
                'name' => "{$fullModelName}",
                '--table' => "{$this->model->table()->first()->name}",
                '--fillable' => "[{$fillableColumns}]",
                '--pk' => "{$this->model->getKeyName()}",
                '--soft-deletes' => "{$softDeletes}",
                '--timestamps' => $this->model->timestamps,
                '--created-at' => $createdAt,
                '--updated-at' => $updatedAt,
                '--relationships' => "{$relationships}"
            ]);
            return true;
        } catch(\Exception $e) {
            return false;
        }
    }

    /**
     * Конвертировать связи в строку
     *
     * @param array $relationships
     * @return string
     */
    private function relationshipsToString()
    {
        $relArr = [];

        if (! $this->relationships) return null;

        foreach ($this->relationships as $rel) {

            $relItem = $rel->name . '#' . $rel->type . '#App\\'
                . trim(config('crudgenerator.user_models_folder') . '\\'
                    . trim($this->screenBacklashes($rel->model_class), '\\'), '\\');

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
     */
    protected function writeRelationships()
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

        return Relationship::insert($relData);
    }

    /**
     * Проверить, будет ли использоваться Soft Deletes
     * Необходимо для artisan команды
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
        $fullModelFileName = isset($modelPath)
            ? trim(config('crudgenerator.user_models_folder') . "/{$modelPath}/{$modelName}", '/')
            : trim(config('crudgenerator.user_models_folder') . "/{$modelName}", '/');

        return $fullModelFileName;
    }

    /**
     * Получить список связей
     *
     * @return array|null
     */
    public function getRelationships()
    {
        return $this->relationships;
    }
}
