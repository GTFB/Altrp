<?php


namespace App\Altrp\Generators;

use App\Altrp\Key;
use App\Altrp\Model;
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
     * Сгенерировать новую модель
     *
     * @return bool
     */
    public function generate()
    {
        // Записать модель в таблицу
        if(! $this->writeModel()) return false;

        // Записать ключи
        /*if(! $this->writeKeys()) return false;*/

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
        $this->model->name = $this->data->model->name;
        $this->model->table_id = $this->data->model->table_id;
        $this->model->path = isset($this->data->model->path) ? $this->data->model->path . '/' : "";
        $this->model->description = $this->data->model->description ?? "";
        $this->model->soft_deletes = $this->data->model->soft_deletes ?? "no";
        $this->model->fillable_cols = "'" . implode("','", (array) $this->data->model->fillable) . "'";

        if (file_exists(base_path("app/{$this->model->path}{$this->model->name}.php"))) {
            return false;
        }

        if (isset($this->data->model->pk)) {
            $this->model->setKeyName($this->data->model->pk);
        }

        if (isset($this->data->model->relationships)) {
            $this->relationships = $this->data->model->relationships;
        }

        return $this->model->save();
    }

    /**
     * Запустить команду создания модели
     *
     * @return bool
     */
    private function runCreateCommand()
    {
        $relationships = $this->screenBacklashes($this->relationshipsToString($this->relationships));

        $fullModelName = ($this->model->path) ? "{$this->model->path}{$this->model->name}" : "{$this->model->name}";

        Artisan::call("crud:model {$fullModelName}
            --table={$this->model->table()->first()->name}
            --fillable=\"[{$this->model->fillable_cols}]\"
            --pk={$this->model->getKeyName()}
            --soft-deletes={$this->model->soft_deletes}
            --relationships={$relationships}"
        );

        return true;
    }

    /**
     * Конвертировать связи в строку
     *
     * @param array $relationships
     * @return string
     */
    private function relationshipsToString($relationships)
    {
        $relArr = [];

        foreach ($relationships as $rel) {

            $relItem = $rel->name . '#' . $rel->type . '#' . $rel->model_class;

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
     * Записать ключи связующих таблиц
     *
     * @return bool
     */
    private function writeKeys()
    {
        foreach ($this->relationships as $rel) {
            $key = new Key();
            $key->onDelete = '';
            $key->onUpdate = '';

            $key->type_of_relation = $rel->type;

            $key->source_table = $this->model->table()->first()->name;
            $key->target_table = 1;

            $key->source_column_id = 1;
            $key->target_column_id = 1;

            // auth()->user()->id
            $key->user_id = 1;
            // $this->model->table()->migrations()->first()->id
            $key->altrp_migration_id = 1;

            if(! $key->save()) return false;
        }

        return true;
    }
}
