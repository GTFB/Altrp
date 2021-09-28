<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Mockery\Exception;
use App\Altrp\Model as AltrpModel;

/**
 * Class Relationship
 * @package App\Altrp
 * @property Table $altrp_table
 */
class Relationship extends EloquentModel
{

    protected $table = 'altrp_relationships';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'title',
        'description',
        'type',
        'model_class',
        'foreign_key',
        'local_key',
        'model_id',
        'target_model_id',
        'add_belong_to',
        'onDelete',
        'onUpdate',
        'always_with',
        'editable'
    ];

    /**
     * @deprecated
     * Импортируем связи
     * @param array $imported_relations
     */
    public static function import($imported_relations = [])
    {
        foreach ($imported_relations as $imported_relation) {
            $model = AltrpModel::where('name', Arr::get($imported_relation, 'model_name'))->first();
            if (!$model) {
                continue;
            }
            $target_model = AltrpModel::where('name', Arr::get($imported_relation, 'target_model_name'))->first();
            if (!$target_model) {
                continue;
            }
            foreach ($model->altrp_relationships as $altrp_relation) {
                if ($imported_relation['name'] === $altrp_relation->name) {
                    $altrp_relation->always_with = $imported_relation['always_with'];
                    $altrp_relation->onDelete = $imported_relation['onDelete'];
                    $altrp_relation->onUpdate = $imported_relation['onUpdate'];
                    $altrp_relation->title = $imported_relation['title'];
                    $altrp_relation->target_model_id = $target_model->id;
                    try {
                        $altrp_relation->save();
                    } catch (\Exception $e) {
                        Log::error($e->getMessage(), [$e->getFile()]);
                        continue;
                    }
                    continue 2;
                }
            }
            $new_relation = new self($imported_relation);
            $new_relation->model_id = $model->id;
            $new_relation->target_model_id = $target_model->id;
            try {
                $new_relation->save();
            } catch (\Exception $e) {
                Log::error($e->getMessage(), [$e->getFile()]);
                continue;
            }
        }
    }

    /**
     * @return array | null
     */
    public function get_model_for_route()
    {
        $model = [];
        try {
            $instance = (new $this->model_class());
        } catch (Exception $e) {
            return null;
        }
        /**
         * @var \App\Altrp\Model $instance
         */
        $model['modelName'] = $instance->getTable();
        $model['related'] = 1;

        return $model;
    }

    /**
     * @return array | null
     */
    public function get_related_field_options()
    {
        $fields = [];
        try {
            $instance = (new $this->model_class());
        } catch (Exception $e) {
            return $fields;
        }
        /**
         * @var \App\Altrp\Model $instance
         */

        $table = Table::where('name', $instance->getTable())->first();
        if ($table) {
            foreach ($table->columns as $actual_column) {
                $fields[] = [
                    'fieldName' => $this->name . '.' . $actual_column->name,
                    'title' => ($this->title ? $this->title : '') . ' — ' . ($actual_column->title ? $actual_column->title : $actual_column->name),
                ];
            }
        }
        return $fields;
    }

    public function altrp_model()
    {
        return $this->belongsTo(\App\Altrp\Model::class, 'model_id');
    }

    public function altrp_target_model()
    {
        return $this->belongsTo(\App\Altrp\Model::class, 'target_model_id');
    }

    public static function getBySearch($search, $modelId)
    {
        return self::where('model_id', $modelId)
            ->where('title', 'like', "%{$search}%")
            ->orWhere('id', $search)
            ->get();
    }

    public static function getBySearchWithPaginate($search, $modelId, $offset, $limit)
    {
        return self::where('model_id', $modelId)
            ->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('id', $search);
            })
            ->skip($offset)
            ->take($limit)
            ->get();
    }

    public static function getWithPaginate($modelId, $offset, $limit)
    {
        return self::where('model_id', $modelId)
            ->skip($offset)
            ->take($limit)
            ->get();
    }

    public static function getCount($modelId)
    {
        return self::where('model_id', $modelId)->toBase()->count();
    }

    public static function getCountWithSearch($search, $modelId)
    {
        return self::where('model_id', $modelId)
            ->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('id', $search);
            })
            ->toBase()
            ->count();
    }


    public function checkForeignExist()
    {


        $conditions = [
            ["target_model_id", "=", $this->target_model_id],
            ["model_id", "=", $this->model_id],
            ["foreign_key", "=", $this->foreign_key],
            ["local_key", "=", $this->local_key]
        ];

        if (isset($this->id)) {
            $conditions[] = ["id", "!=", $this->id];
        }

        $current_result = Relationship::where($conditions)->get();

        $current_result_fields = Relationship::where([
            ["target_model_id", "=", $this->target_model_id],
            ["model_id", "=", $this->model_id],
            ["foreign_key", "=", $this->local_key],
            ["local_key", "=", $this->foreign_key]
        ])->get();

        $inverse_result = Relationship::where([
            ["target_model_id", "=", $this->model_id],
            ["model_id", "=", $this->target_model_id],
            ["foreign_key", "=", $this->foreign_key],
            ["local_key", "=", $this->local_key]
        ])->get();

        $inverse_result_fields = Relationship::where([
            ["target_model_id", "=", $this->model_id],
            ["model_id", "=", $this->target_model_id],
            ["foreign_key", "=", $this->local_key],
            ["local_key", "=", $this->foreign_key]
        ])->get();

        if (count($current_result) > 0 || count($inverse_result) > 0) {
            return false;
        }

        if (count($current_result_fields) > 0 || count($inverse_result_fields) > 0) {
            return false;
        }

        return true;
    }

    /**
     * Проверка на существование таблицы в БД
     * @return bool
     */
    public function is_db_exist()
    {
        $table = $this->altrp_model->altrp_table;
        $target_table = $this->altrp_target_model->altrp_table;
        $keys = $table->getDBForeignKeys();
        $prefix = env('DB_TABLES_PREFIX', '');
        $key = false;
        foreach ($keys as $value) {
            if (
                array_search($this->local_key, $value->getLocalColumns()) !== false
                && $value->getForeignTableName() == $prefix . $target_table->name
                && array_search($this->foreign_key, $value->getForeignColumns()) !== false
            ) {
                return $value;
            }
        }

        return false;
    }

    public function getDBKey($is_original = false)
    {

        $foreign_table = $this->getTableToDBAL(false, $is_original);
        $local_table = $this->getTableToDBAL(true, $is_original);
        $local_key = $this->getColumnNameToDBAL(true, $is_original);
        $foreign_key = $this->getColumnNameToDBAL(false, $is_original);
        $prefix = env('DB_TABLES_PREFIX', '');

        if (!$foreign_table) {
            return false;
        }

        $keys = $foreign_table->getDBForeignKeys();

        foreach ($keys as $value) {
            if (
                array_search($local_key, $value->getLocalColumns()) !== false
                && $value->getForeignTableName() == $prefix . $local_table->name
                && array_search($foreign_key, $value->getForeignColumns()) !== false
            ) {
                return $value;
            }
        }

        return false;
    }

    /**
     * Получаем имя таблицы для проверки через DBAL
     * @param bool $is_local
     * @param bool $is_original
     * @return bool|string
     */
    public function getTableToDBAL($is_local = false, $is_original = false)
    {
        $table = $this->altrp_model->altrp_table;
        $target_table = $this->altrp_target_model->altrp_table;
        $type = $this->type;

        if ($is_original) {
            $table = Model::find($this->getOriginal("model_id"))->altrp_table;
            $target_table = Model::find($this->getOriginal("target_model_id"))->altrp_table;
            $type = $this->getOriginal("type");
        }

        $prefix = env('DB_TABLES_PREFIX', '');
        if ($type == "hasOne" || $type == "hasMany") {
            return $is_local ? $table : $target_table;
        } else if ($type == "belongsTo") {
            return $is_local ?  $target_table : $table;
        }
        return false;
    }

    /**
     * Получаем название колонки для проверки через DBAL
     * @param bool $is_local
     * @param bool $is_original
     * @return bool|mixed
     */
    public function getColumnNameToDBAL($is_local = false, $is_original = false)
    {

        $foreign_key = $is_original ? $this->getOriginal("foreign_key") : $this->foreign_key;
        $local_key = $is_original ? $this->getOriginal("local_key") : $this->local_key;
        $type = $is_original ? $this->getOriginal("type") : $this->type;

        if ($type == "hasOne" || $type == "hasMany") {
            return $is_local ? $foreign_key : $local_key;
        } else if ($type == "belongsTo") {
            return $is_local ? $local_key : $foreign_key;
        }
        return false;
    }

    /**
     * Сравнение аттрибутов колонок через DBAL
     * @return array
     */
    public function compareColumnsAttributes()
    {
        $table = $this->altrp_model->altrp_table;
        $target_table = $this->altrp_target_model->altrp_table;
        $target_column = $target_table->getDBColumnByName($this->foreign_key);
        $local_column = $table->getDBColumnByName($this->local_key);

        $errors = [];

        if ($target_column->getType() !== $local_column->getType()) {
            $errors[] = "Columns has different type";
        }

        if (!$this->checkNullable($target_column, $local_column)) {
            $errors[] = "Target column is not nullable";
        }

        return $errors;
    }

    /**
     * Проверка при указании SET NULL, что бы поле было nullable
     * @param $target_column
     * @param $local_column
     * @return bool
     */
    public function checkNullable($target_column, $local_column)
    {
        if ($this->onUpdate != "set null" || $this->onDelete != "set null") {
            return true;
        }

        if (($this->type == "hasOne" || $this->type == "hasMany") && $target_column->getNotNull()) {
            return false;
        }

        return true;
    }
    /**
     * Проверяем на ошибку в данных
     * Cannot add or update a child row: a foreign key constraint fails
     * @return bool
     */
    public function checkDBRowsConstraint()
    {
        $foreign_table = $this->getTableToDBAL();
        $local_table = $this->getTableToDBAL(true);
        $local_key = $this->getColumnNameToDBAL(true);
        $foreign_key = $this->getColumnNameToDBAL();
        $prefix = env('DB_TABLES_PREFIX', '');
        if (env('DB_CONNECTION') === 'pgsql') {
            $result = DB::table($foreign_table->name)
                ->leftJoin($local_table->name, $foreign_table->name . "." . $local_key, '=', $local_table->name . "." . $foreign_key)
                ->whereNotNull($foreign_table->name . "." . $local_key)
                ->get();
        } else {
            $result = DB::table($foreign_table->name)
                ->leftJoin($local_table->name, $foreign_table->name . "." . $local_key, '=', $local_table->name . "." . $foreign_key)
                ->whereNotNull($foreign_table->name . "." . $local_key)
                ->havingRaw($prefix . $local_table->name . "." . $foreign_key . " IS NULL")
                ->get();
        }

        return count($result) > 0 ? false : true;
    }

    /**
     * Получаем обратную связь
     */
    public function getInverseRelationship()
    {

        $conditions = [
            ["target_model_id", "=", $this->model_id],
            ["model_id", "=", $this->target_model_id],
            ["foreign_key", "=", $this->local_key],
            ["local_key", "=", $this->foreign_key],
        ];

        if ($this->type === "hasOne") {
            $conditions[] = ["type", "=", "belongsTo"];
        }

        if ($this->type === "hasMany") {
            $conditions[] = ["type", "=", "belongsTo"];
        }

        $result = Relationship::where($conditions);

        if ($this->type === "belongsTo") {
            $result->whereIn('type', ["hasOne", "hasMany"]);
        }

        return $result->first();
    }
}
