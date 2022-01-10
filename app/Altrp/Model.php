<?php


namespace App\Altrp;

use App\Http\Requests\ApiRequest;
use App\SQLEditor;
use App\CategoryObject;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

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
        'last_upgrade',
        'preset',
        'guid',
    ];

    protected $hidden = [
        'relationships'
    ];

    public function remote_data()
    {
        return $this->morphMany('App\Altrp\RemoteData', 'remotable');
    }

    public function altrp_robots()
    {
        return $this->hasMany(Robot::class);
    }

    public function categories()
    {
        return $this->hasMany(CategoryObject::class, 'object_guid', 'guid');
    }

    public function categoryOptions()
    {
        return CategoryObject::select('altrp_categories.guid as value', 'altrp_categories.title as label')->leftJoin('altrp_categories', 'altrp_categories.guid', '=', 'altrp_category_objects.category_guid')
            ->where('altrp_category_objects.object_guid', $this->guid)->get();
    }

  /**
   * @deprecated
   * Импортируем модели
   * @param array $imported_models
   */
  public static function import( $imported_models = [] )
  {
    foreach ( $imported_models as $imported_model ) {
      $old_model = self::where( 'name', $imported_model['name'] )->first();
      if( $old_model ){
        $table = Table::where( 'name', data_get( $imported_model, 'table_name') )->first();
        if( ! $table ){
          continue;
        }
        $old_model->table_id = $table->id;
        try {
          $old_model->save();
        } catch (\Exception $e){
          Log::error( $e->getMessage(), [$e->getFile()] ); //
          continue;
        }
        continue;
      }

      $new_model = new self( $imported_model );
      $table = Table::where( 'name', data_get( $imported_model, 'table_name') )->first();
      if( $table ){
        $new_model->table_id = $table->id;
      } else {
        $new_model->table_id = null;
      }
      try {
        $new_model->save();
      } catch (\Exception $e){
        Log::error( $e->getMessage(), [$e->getFile()] ); //
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
        return $this->hasMany( Accessor::class, 'model_id', 'id' );
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

    public function getOnlyUserAttribute($value)
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
            if ($model->altrp_table->columns->count() > 1) {
                foreach ($model->altrp_table->columns as $column) {
                    $fields[] = [
                        'fieldName' => $column->name,
                        'title' => $column->title ? $column->title : $column->name,
                    ];
                }
            } else {
                $columns = array_keys($model->getAttributes());
                foreach ($columns as $column) {
                    $fields[] = [
                        'fieldName' => $column,
                        'title' => $column,
                    ];
                }
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

    public static function getBySearch($search, $orderColumn = 'title', $orderType = 'Desc', $categories=null)
    {
        $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);
         return self::select('altrp_models.*')->with('categories.category')
            ->when($categories, function ($query, $categories) {
                if (is_string($categories)) {
                    $categories = explode(",", $categories);
                    $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
                          ->whereIn('altrp_category_objects.category_guid', $categories);
                }
            })
            ->where(function ($query) use ($search) {
                $query->where('altrp_models.title','like', "%{$search}%")
                      ->orWhere('altrp_models.id', 'like', "%{$search}%");
            })
            ->$sortType($orderColumn)
            ->get();
    }

  /**
   * @param $search
   * @param $offset
   * @param $limit
   * @param ApiRequest $request
   * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder
   */
  public static function getBySearchWithPaginate( $search, $offset, $limit, ApiRequest $request, $orderColumn = 'altrp_models.id', $orderType = 'Desc', $categories=null)
    {
      $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);
      if( $request->has( 'preset' ) ) {
        return self::select('altrp_models.*')->with('categories.category')
          ->where('title','like', "%{$search}%")
          ->where( 'preset', $request->get( 'preset' ) )
          // ->orWhere('id', "%$search%")
          // ->orWhere('id', "%$category%")
          ->where(function ($query) use ($search, $category) {
              $query->where('id', "%$search%")
                    ->orWhere('id', "%$category%");
          })
          ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
          ->skip($offset)
          ->$sortType($orderColumn)
          ->take($limit);
      } else {
        return self::select('altrp_models.*')->with('categories.category')
          // ->where('title','like', "%{$search}%")
          // ->orWhere('id', "%$search%")
          ->where(function ($query) use ($search) {
              $query->where('altrp_models.title','like', "%{$search}%")
                    ->orWhere('altrp_models.id', "%$search%");
          })
          ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
          ->skip($offset)
          ->$sortType($orderColumn)
          ->take($limit);
      }
    }

    /**
     * @param $offset
     * @param $limit
     * @param ApiRequest $request
     * @param string $orderColumn
     * @param string $orderType
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder
     */
  public static function getWithPaginate( $offset, $limit , ApiRequest $request, $orderColumn = 'id', $orderType = 'Desc', $categories=null)
    {
        $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);
      if( $request->has( 'preset' ) ) {
        return self::select('altrp_models.*')->with('categories.category')
          ->where('preset', $request->get( 'preset' ) )
          ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
          ->skip($offset)
          ->take($limit)
          ->$sortType($orderColumn);
      } else {
        return self::select('altrp_models.*')->with('categories.category')
          ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
          ->skip($offset)
          ->take($limit)
          ->$sortType($orderColumn);
      }
    }

    public static function getCount()
    {
        return self::toBase()->count();
    }

    public static function getCountWithSearch($search, $categories=null)
    {
      return self::where(function ($query) use ($search) {
            $query->where('altrp_models.title','like', "%{$search}%")
            ->orWhere('altrp_models.id', $search);
        })
        ->when($categories, function ($query, $categories) {
            if (is_string($categories)) {
                $categories = explode(",", $categories);
                $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
                      ->whereIn('altrp_category_objects.category_guid', $categories);
            }
        })
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

    /**
     * Проверить, имеются ли в модели (таблице) created_at и updated_at поля
     * @return bool
     */
  public function hasTimestamps()
  {
      $columns = $this->altrp_table->columns->implode('name', ',');
      $columns = explode(',', $columns);
      if (in_array('created_at', $columns) || in_array('updated_at', $columns)) {
          return true;
      }
      return false;
  }

    /**
     * Проверить, имеются ли в модели (таблице) deleted_at поле
     * @return bool
     */
    public function hasSoftDeletes()
    {
        $columns = $this->altrp_table->columns->implode('name', ',');
        $columns = explode(',', $columns);
        if (in_array('deleted_at', $columns)) {
            return true;
        }
        return false;
    }

    public function validations()
    {
        return $this->hasMany(ValidationField::class);
    }
}

