<?php


namespace App\Altrp\Generators\Traits;
use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Table;
use Illuminate\Support\Str;

/**
 * Trait UserColumnsTrait
 * @package App\Altrp\Generators\Traits
 * @property $table_id
 * @self Model
 * @parent \Illuminate\Database\Eloquent\Builder
 */
trait UserColumnsTrait
{
    /**
     * Boot method
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            self::setAuthId($model);
        });
        /*
        static::updating(function($model) {
            self::setAuthId($model);
        });*/
    }

    /**
     * Установить колонкам значение id текущего пользователя
     *
     * @param $model
     */
    public static function setAuthId($model)
    {
        $_model = Table::where('name', $model->table)->first()->altrp_model;
        $columns = Column::where([['model_id',$_model->id],['is_auth',1]])->get();
        if ($columns) {
            foreach ($columns as $column) {
                $model->setAttribute($column->name, auth()->user()->id);
            }
        }
    }

    /**
     * Проверить, существует ли такие колонки в модели
     * и является ли они заполняемыми, вернуть их, если они
     * присутствуют в списке пользовательских колонок
     *
     * @param $model
     * @return array|bool
     */
    public static function columnsExists($model)
    {
        if (! isset(self::$userColumns) || empty(self::$userColumns)) return false;
        $columns = [];
        foreach (self::$userColumns as $column) {
            if (in_array($column, $model->getFillable())) $columns[] = $column;
        }
        return $columns;
    }

  /**
   * Получить имя колонки отмеченной как is_label, или id если нет
   * @return string
   */
  public function getLabelColumnName(){

    $parts = explode('\\', self::class);
    $modelName = array_pop($parts);

    $name = Model::where( 'altrp_models.name', $modelName )
      ->join( 'tables', 'tables.id', '=', 'altrp_models.table_id' )
      ->join( 'altrp_columns', 'tables.id', '=', 'altrp_columns.table_id' )
      ->where( 'altrp_columns.is_label', 1 )->get( 'altrp_columns.name' )->first();


    if( ! $name ){
      $name = Model::where( 'altrp_models.name', $modelName )
        ->join( 'tables', 'tables.id', '=', 'altrp_models.table_id' )
        ->join( 'altrp_columns', 'tables.id', '=', 'altrp_columns.table_id' )
        ->where( 'altrp_columns.is_title', 1 )->get( 'altrp_columns.name' )->first();
    }
    if( ! $name ){
      return 'id';
    }

    return $name->name;
  }
  /**
   * Получить имя колонки отмеченной как is_title, или id если нет
   * @return string
   */
  public function getTitleColumnName(){
    $parts = explode('\\', $this->modelClass);
    $modelName = array_pop($parts);

    $name = Model::where( 'altrp_models.name', $modelName )
      ->join( 'tables', 'tables.id', '=', 'altrp_models.table_id' )
      ->join( 'altrp_columns', 'tables.id', '=', 'altrp_columns.table_id' )
      ->where( 'altrp_columns.is_title', 1 )->get( 'altrp_columns.name' );
    if( ! $name->count() ){
      $name = Model::where( 'altrp_models.name', $modelName )
        ->join( 'tables', 'tables.id', '=', 'altrp_models.table_id' )
        ->join( 'altrp_columns', 'tables.id', '=', 'altrp_columns.table_id' )
        ->where( 'altrp_columns.is_label', 1 )->get( 'altrp_columns.name' );
    }
    if( ! $name->count() ){
      return 'id';
    }
    return $name->name;
  }

  /**
   * Обновление с учетом связанных моделей
   * @param array $attributes
   * @param array $options
   * @return boolean
   */
  public function update(array $attributes = [], array $options = []){
    $result = parent::update( $attributes, $options );
    if( ! $result ){
      return $result;
    }
    $with_values = [];
    if( ! isset( $this->altrp_with ) ){
      return true;
    }
    foreach ( $this->altrp_with as $with_relation_name ) {
      foreach ( $attributes as $key => $value ) {
        $name_pairs = explode( '.', $key );
        if( ( count( $name_pairs ) === 2 ) && $name_pairs[0] === $with_relation_name ){
          $with_values[$with_relation_name][$name_pairs[1]] = $value;
        }
      }
    }
    foreach ( $with_values as $with_relation_name => $values ) {
      $result = $this->$with_relation_name->update( $values );
      if( ! $result ){
        return $result;
      }
    }
    return $result;
  }
}
