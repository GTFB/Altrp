<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;

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
       'table_id',
    ];

  protected $hidden = [
    'relationships',
    'pk'
  ];

    public function setFillableColsAttribute($value)
    {
        $this->attributes['fillable_cols'] = isset($value)
            ? implode(',', (array) $value)
            : null;
    }

    public function setUserColsAttribute($value)
    {
        $this->attributes['user_cols'] = isset($value)
            ? implode(',', (array) $value)
            : null;
    }

    public function altrp_table()
    {
        return $this->belongsTo(Table::class, 'table_id');
    }

    public function altrp_accessors()
    {
        return $this->hasMany(Accessor::class);
    }

    public function getTimeStampsAttribute($value) {
        return (bool) $value;
    }

    public function getSoftDeletesAttribute($value) {
        return (bool) $value;
    }

  /**
   * Список моделей для редактора
   */
  public static function getModelsForEditor()
  {
    $models = [];
    $_models = self::all();
    foreach ( $_models as $model ) {
      /**
       * @var {Model} $model
       */
      $models[] = [
        'title' => $model->name,
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
   */
  public static function getModelsOptions()
  {
    $models = [];
    $_models = self::all();
    foreach ( $_models as $model ) {
      /**
       * @var {Model} $model
       */
      $models[] = [
        'label' => $model->name,
        'value' => $model->altrp_table->name,
      ];
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
    foreach ( $_models as $model ) {
      $fields = [];
      foreach ( $model->altrp_table->actual_columns as $actual_column ) {
        $fields[] = [
          'fieldName' => $actual_column->name,
          'title' => $actual_column->title ? $actual_column->title : $actual_column->name,
        ];
      }
      $models[] = [
        'modelName' => $model->altrp_table->name,
        'title' => $model->name,
        'fields' => $fields,
      ];
    }
    return $models;
  }

  public function table()
  {
    return $this->belongsTo( Table::class );
  }
}
