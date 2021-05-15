<?php

namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use App\Altrp\Model as AltrpModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class Column extends Model
{
    protected $table = 'altrp_columns';
    public $timestamps = false;

    public $fillable = [
      "name",
      "title",
      "description",
      "type",
      "size",
      "null",
      "default",
      "primary",
      "unique",
      "user_id",
      "table_id",
      "altrp_migration_id",
      "is_label",
      "is_title",
      "is_auth",
      "attribute",
      "input_type",
      "options",
      "indexed",
      "editable",
      'calculation',
      'calculation_logic',
      "hidden",
      "model_id",
      "preset"
    ];

  /**
   * @deprecated
   * Импотритруем колонки
   * @param array $imported_columns
   */
  public static function import( $imported_columns = [])
  {
    foreach ( $imported_columns as $imported_column ) {
      $model = AltrpModel::where( 'name', Arr::get( $imported_column, 'model_name' ) )->first();
      if( ! $model ){
        continue;
      }
      $table = Table::where( 'name', Arr::get( $imported_column, 'table_name' ) )->first();
      if( ! $table ){
        continue;
      }
      foreach ( $model->altrp_columns as $altrp_column ) {
        if( $imported_column['name'] === $altrp_column->name ){
          continue 2;
        }
      }
      $new_column = new self( $imported_column );
      $new_column->model_id = $model->id;
      $new_column->user_id = auth()->user()->id;
      $new_column->table_id = $table->id;
      try {
        $new_column->save();
      } catch (\Exception $e){
        Log::error( $e->getMessage(), [$e->getFile()] );
        continue;
      }
//      if( $existed_column )
    }
  }

  public function getNullAttribute($value) {
        return (bool) $value;
    }

    public function getUniqueAttribute($value) {
        return (bool) $value;
    }


    public function altrp_table(){
        return $this->hasOne('App\Altrp\Table', 'id', 'table_id');
    }

    public function altrp_model(){
        return $this->hasOne('App\Altrp\Model', 'id', 'model_id');
    }

    public function altrp_remote_data()
    {
        return $this->hasMany('App\Altrp\RemoteData');
    }


    /**
     * Проверяем является ли колонка, колонкой с размером
     *
     * @return string
     */
    public function isSizeColumn()
    {
        $types = ['char', 'dateTime', 'dateTimeTz', 'decimal', 'double', 'float', 'string', 'time', 'timeTz','unsignedDecimal'];
        return array_search($this->type, $types);
    }

    public function fromObject($obj) {
        //$this->id = $obj->id;
        $this->name = $obj->name;
        $this->title = $obj->title;
        $this->description = $obj->description;
        $this->type = $obj->type;
        $this->size = $obj->size;
        $this->null = (bool) $obj->null;
        $this->default = $obj->default;
        $this->primary = isset($obj->primary) ? $obj->primary : false ;
        $this->unique = (bool) $obj->unique;
        //$this->table_id = $obj->table_id;
        //$this->user_id = $obj->user_id;
        //$this->altrp_migration_id = $obj->altrp_migration_id;
        return $this;
    }

    public static function getBySearch($search, $modelId)
    {

        return self::where('model_id', $modelId)
            ->where('title','like', "%{$search}%")
            ->orWhere('name','like', "%{$search}%")
            ->orWhere('id','like', "%{$search}%")
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
        return self::where('model_id', $modelId)
            ->toBase()
            ->count();
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
