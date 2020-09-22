<?php


namespace App\Altrp;

use App\Http\Requests\ApiRequest;
use App\SQLEditor;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        'namespace',
        'parent_model_id',
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

  /**
   * Импортируем модели
   * @param array $imported_models
   */
  public static function import( $imported_models = [] )
  {
    foreach ( $imported_models as $imported_model ) {
      if( self::where( 'name', $imported_model['name'] )->first() ){
        continue;
      }
//      $table = Table::where( 'name',  Arr::get( $imported_model, 'table_name' ) )->first();
//      if( ! $table ){
//        error_log( 'Не удалось сохранить модель ' . $imported_model['name'] .
//          ' таблица ' . $imported_model['table_name'] . ' не найдена!' );
//        continue;
//      }
      $new_model = new self( $imported_model );
//      $new_model->table_id = $table->id;
      try {
        $new_model->save();
      } catch (\Exception $e){
        Log::error( $e->getMessage(), $e->getFile() ); //
        continue;
      }
    } 
  }

  public function parent()
    {
        return $this->belongsTo(self::class, 'parent_model_id');
    }

//    public function setNameAttribute($value)
//    {
//        $this->attributes['name'] = Str::studly($value);
//    }

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

    public function altrp_sources()
    {
        return $this->hasMany(Source::class, 'model_id');
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

    public function altrp_relationships_always_with()
    {
        return $this->altrp_relationships()->where( 'always_with', 1 )->get( '*' );
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

    /**
     * Получить сортируемые колонки (поля)
     *
     * @return mixed
     */
    public function get_ordering_fields()
    {
        return $this->altrp_table->actual_columns;
    }

    /**
     * Список моделей для select
     * @param bool $with_names
     * @param bool $not_plural
     * @param bool $search
     * @return array
     */
    public static function getModelsOptions( $with_names = false, $not_plural = false, $search = false)
    {
        $models = [];
        $_models = $search ? self::getBySearch($search) : self::all();
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
            foreach ($model->altrp_table->columns as $column) {
                $fields[] = [
                    'fieldName' => $column->name,
                    'title' => $column->title ? $column->title : $column->name,
                ];
            }

            foreach ($model->altrp_relationships_always_with() as $relationship) {
                /**
                 * @var Relationship $relationship
                 */
                $fields = array_merge($fields, $relationship->get_related_field_options());
            }
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
            ->orWhere('id', 'like', "%{$search}%")
          ->orderByDesc('id')
          ->get();
    }

  /**
   * @param $search
   * @param $offset
   * @param $limit
   * @param ApiRequest $request
   * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder
   */
  public static function getBySearchWithPaginate( $search, $offset, $limit, ApiRequest $request)
    {
      if( $request->has( 'preset' ) ) {
        return self::where('title','like', "%{$search}%")
          ->where( 'preset', $request->get( 'preset' ) )
          ->orWhere('id', "%$search%")
          ->skip($offset)
          ->orderByDesc('id')
          ->take($limit);
      } else {
        return self::where('title','like', "%{$search}%")
          ->orWhere('id', "%$search%")
          ->skip($offset)
          ->orderByDesc('id')
          ->take($limit);
      }
    }

  /**
   * @param $offset
   * @param $limit
   * @param ApiRequest $request
   * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder
   */
  public static function getWithPaginate( $offset, $limit , ApiRequest $request)
    {
      if( $request->has( 'preset' ) ) {
        return self::where('preset', $request->get( 'preset' ) )
          ->skip($offset)
          ->take($limit)
          ->orderByDesc('id');
      } else {

        return self::skip($offset)
          ->take($limit)
          ->orderByDesc('id');
      }
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
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function altrp_columns(){
      return $this->hasMany( Column::class, 'model_id', 'id' );
  }
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function altrp_sql_editors(){
      return $this->hasMany( SQLEditor::class, 'model_id', 'id' );
  }
  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function altrp_queries(){
      return $this->hasMany( Query::class, 'model_id', 'id' );
  }
}
