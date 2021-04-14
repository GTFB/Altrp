<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Altrp\Model as AltrpModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class Query extends EloquentModel
{
    protected $table = 'altrp_queries';

    protected $fillable = [
        'name',
        'title',
        'joins',
        'columns',
        'aggregates',
        'conditions',
        'relations',
        'order_by',
        'group_by',
        'access',
        'offset',
        'limit',
        'user_id',
        'source_id',
        'updated_at'
    ];

    public function remote_data()
    {
        return $this->morphMany('App\Altrp\RemoteData', 'remotable');
    }

  /**
   * @deprecated
   * ИМпортируем данные sql-buidler
   * @param array $imported_queries
   */
  public static function import( $imported_queries = [] )
  {
    foreach ( $imported_queries as $imported_query ) {
      $model = AltrpModel::where( 'name', Arr::get( $imported_query, 'model_name' ) )->first();
      if( ! $model ){
        continue;
      }
      foreach ( $model->altrp_queries as $altrp_query ) {
        if( $imported_query['name'] === $altrp_query->name ){
          if( date( $imported_query['updated_at'] ) > date( $altrp_query->updated_at ) ) {
            $altrp_query->fill( $imported_query );
            $altrp_query->model_id = $model->id;
            try {
              $altrp_query->save();
            } catch (\Exception $e){
              Log::error( $e->getMessage(), $imported_query ); //
              continue;
            }
          }
          continue 2;
        }
      }
      $new_query = new self( $imported_query );
      $new_query->model_id = $model->id;
      $new_query->user_id = auth()->user()->id;
      try {
        $new_query->save();
      } catch (\Exception $e){
        Log::error( $e->getMessage(), $imported_query ); //
        continue;
      }
    }
  }

  public function altrp_source()
    {
        return $this->morphOne(Source::class, 'sourceable');
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function model()
    {
        return $this->belongsTo(Model::class);
    }

    public function setJoinsAttribute($value)
    {
        $this->attributes['joins'] = json_encode($value);
    }

    public function setColumnsAttribute($value)
    {
        $this->attributes['columns'] = json_encode($value);
    }

    public function setAggregatesAttribute($value)
    {
        $this->attributes['aggregates'] = json_encode($value);
    }

    public function setConditionsAttribute($value)
    {
        $this->attributes['conditions'] = json_encode($value);
    }

    public function setRelationsAttribute($value)
    {
        $this->attributes['relations'] = json_encode($value);
    }

    public function setOrderByAttribute($value)
    {
        $this->attributes['order_by'] = json_encode($value);
    }

    public function setGroupByAttribute($value)
    {
        $this->attributes['group_by'] = json_encode($value);
    }

    public function setAccessAttribute($value)
    {
        $this->attributes['access'] = json_encode($value);
    }

    public function getJoinsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getColumnsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getAggregatesAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getConditionsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getRelationsAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getOrderByAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getGroupByAttribute($value)
    {
        return json_decode($value, true);
    }

    public function getAccessAttribute($value)
    {
        return json_decode($value, true);
    }

}
