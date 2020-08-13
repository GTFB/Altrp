<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use Mockery\Exception;

use App\Altrp\Model;

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
    ];

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
        return $this->belongsTo(Model::class, 'model_id');
    }

    public function altrp_target_model()
    {
        return $this->belongsTo(Model::class, 'target_model_id');
    }

    public static function getBySearch($search, $modelId)
    {
        return self::where('model_id', $modelId)
            ->where('title','like', "%{$search}%")
            ->orWhere('id', $search)
            ->get();
    }

    public static function getBySearchWithPaginate($search, $modelId, $offset, $limit)
    {
        return self::where('model_id', $modelId)
            ->where(function ($query) use ($search) {
                $query->where('title','like', "%{$search}%")
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
                $query->where('title','like', "%{$search}%")
                    ->orWhere('id', $search);
            })
            ->toBase()
            ->count();
    }
}
