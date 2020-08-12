<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Class Model
 * @package App\Altrp
 * @property Table $altrp_table
 */
class Model extends EloquentModel
{
    protected $table = 'altrp_models';

    protected $fillable = [
        'description',
        'soft_deletes',
        'time_stamps',
        'fillable_cols',
        'user_cols',
        'path',
        'name',
        'title',
        'table_id',
        'pk',
        'last_upgrade'
    ];

    protected $hidden = [
        'relationships'
    ];

    public function setFillableColsAttribute($value)
    {
        $this->attributes['fillable_cols'] = isset($value)
            ? implode(',', (array)$value)
            : null;
    }

    public function setUserColsAttribute($value)
    {
        $this->attributes['user_cols'] = isset($value)
            ? implode(',', (array)$value)
            : null;
    }

    public function altrp_table()
    {
        return $this->belongsTo(Table::class, 'table_id');
    }

    public function altrp_controller()
    {
        return $this->hasOne(Controller::class);
    }

    public function altrp_accessors()
    {
        return $this->hasMany(Accessor::class);
    }

    public function altrp_relationships()
    {
        return $this->hasMany(Relationship::class, 'model_id', 'id');
    }

    public function getTimeStampsAttribute($value)
    {
        return (bool)$value;
    }

    public function getSoftDeletesAttribute($value)
    {
        return (bool)$value;
    }

    /**
     * Список моделей для редактора
     */
    public static function getModelsForEditor()
    {
        $models = [];
        $_models = self::all();
        foreach ($_models as $model) {
            /**
             * @var {Model} $model
             */
            $models[] = [
                'title' => $model->title,
                'name' => $model->altrp_table->name,
                'ordering_fields' => $model->get_ordering_fields()
            ];
        }
        return $models;
    }

    public function get_ordering_fields()
    {
        return $this->altrp_table->actual_columns;
    }

  /**
   * Список моделей для select
   * @param bool $with_names
   * @param bool $not_plural
   * @return array
   */
    public static function getModelsOptions( $with_names = false, $not_plural = false )
    {
        $models = [];
        $_models = self::all();
        foreach ($_models as $model) {
            /**
             * @var {Model} $model
             */
            if( $with_names ){
              $models[] = [
                'label' => $model->title,
                'value' => $not_plural ? $model->name : Str::plural( $model->name ),
              ];
            } else {
              $models[] = [
                'label' => $model->title,
                'value' => $model->id,
              ];
            }
        }
        return $models;
    }

    /**
     * Список моделей с полями для динаимического контента и т. д.
     */
    public static function getModelsWithFieldsOptions()
    {

        $models = [
            [
                'modelName' => 'page',
                'title' => 'Page',
                'fields' => [
                    [
                        'fieldName' => 'id',
                        'title' => 'ID',
                    ],
                    [
                        'fieldName' => 'path',
                        'title' => 'Path',
                    ],
                    [
                        'fieldName' => 'title',
                        'title' => 'Title',
                    ],
                    [
                        'fieldName' => 'content',
                        'title' => 'Content',
                    ],
                ]
            ]
        ];
        $_models = self::all();
        foreach ($_models as $model) {
            $fields = [];
            foreach ($model->altrp_table->actual_columns as $actual_column) {
                $fields[] = [
                    'fieldName' => $actual_column->name,
                    'title' => $actual_column->title ? $actual_column->title : $actual_column->name,
                ];
            }
//            foreach ($model->altrp_table->relationships as $relationship) {
//                /**
//                 * @var Relationship $relationship
//                 */
//                $fields = array_merge($fields, $relationship->get_related_field_options());
//            }
            $models[] = [
                'modelName' => $model->altrp_table->name,
                'title' => $model->title,
                'fields' => $fields,
            ];
        }
        return $models;
    }

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    /**
     * Возвращает полное название класса для модели по имени для фронтенда
     * @param string $model_name
     * @return string
     */
    public static function get_model_class_by_name($model_name)
    {
        $class_name = '\App\AltrpModels\\';

        $model = self::join('tables', 'altrp_models.table_id', '=', 'tables.id')
            ->where('tables.name', $model_name)->get('altrp_models.name')->first();


        return isset($model->toArray()['name']) ? $class_name . $model->toArray()['name'] : $class_name;
    }

    /**
     * Возвращает полное название класса для модели по имени для фронтенда
     * @param string $model_name
     * @return array
     */
    public static function get_relations_by_name($model_name)
    {
        $relations = [];

        $_relations = DB::table('tables')
            ->join('altrp_relationships', 'altrp_relationships.table_id', '=', 'tables.id')
            ->where('tables.name', $model_name)->get('altrp_relationships.name')->toArray();


        foreach ($_relations as $relation) {
            $relations[] = $relation->name;
        }
        return $relations;
    }

    public static function getBySearch($search)
    {
        return self::where('title','like', "%{$search}%")
            ->orWhere('id', $search)
          ->orderByDesc('id')
          ->get();
    }

    public static function getBySearchWithPaginate($search, $offset, $limit)
    {
        return self::where('title','like', "%{$search}%")
            ->orWhere('id', $search)
            ->skip($offset)
          ->orderByDesc('id')
            ->take($limit)
            ->get();
    }

    public static function getWithPaginate($offset, $limit)
    {
        return self::skip($offset)
            ->take($limit)
          ->orderByDesc('id')
            ->get();
    }

    public static function getCount()
    {
        return self::toBase()->count();
    }

    public static function getCountWithSearch($search)
    {
        return self::where('title','like', "%{$search}%")
            ->orWhere('id', $search)
            ->toBase()
            ->count();
    }

  public function getFieldsOptions(){
    return self::where( 'altrp_models.id', $this->id )
      ->join( 'tables', 'altrp_models.table_id', '=', 'tables.id' )
      ->join( 'altrp_columns', 'altrp_columns.table_id', '=', 'tables.id' )
      ->select( ['altrp_columns.id as value', 'altrp_columns.title as label'] )->get();
  }
//  public function getFieldsOptions(){
//    return self::where( 'altrp_columns.id', $this->id )
//      ->join( 'tables', 'altrp_models.table_id', '=', 'tables.id' )
//      ->join( 'altrp_columns', 'altrp_columns.table_id', '=', 'tables.id' )
//      ->select( ['altrp_columns.id as value', 'altrp_columns.title as label'] )->get();
//  }
}
