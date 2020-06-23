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

    public function table()
    {
        return $this->belongsTo(Table::class);
    }
    public function altrp_table()
    {
        return $this->belongsTo(Table::class, 'table_id');
    }

/**
 * Список моделей для редактора
 */
  public static function getModelsForEditor(){
    $models = [ ];
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


  public function get_ordering_fields() {
    return $this->altrp_table->actual_columns;
  }

}
