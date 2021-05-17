<?php


namespace App\Altrp;

use Illuminate\Database\Eloquent\Model;
use App\Altrp\Model as AltrpModel;
use Illuminate\Support\Facades\Log;
class Accessor extends Model
{
    protected $table = 'altrp_accessors';

    protected $fillable = [
        'name',
        'title',
        'calculation',
        'calculation_logic',
        'model_id',
        'description',
        'user_id',
        'status'
    ];

  /**
   * @deprecated
   * Импортируем аксесоры
   * @param array $imported_accessors
   */
  public static function import( $imported_accessors = [] )
  {
    foreach ( $imported_accessors as $imported_accessor ) {
      $model = AltrpModel::where( 'name', data_get( $imported_accessor, 'model_name' ) )->first();
      if( ! $model ){
        continue;
      }
      foreach ( $model->altrp_accessors as $altrp_accessor ) {
        if( $imported_accessor['name'] === $altrp_accessor->name ){
          /**
           * @var self $altrp_accessor
           */
          $altrp_accessor->fill( $imported_accessor );
          $altrp_accessor->model_id = $model->id;
          $altrp_accessor->user_id = auth()->user()->id;
          try {
            $altrp_accessor->save();
          } catch (\Exception $e){
            Log::error( $e->getMessage(), [$e->getFile()] );
            continue;
          }
          continue 2;
        }
      }
      $new_accessor = new self( $imported_accessor );
      $new_accessor->model_id = $model->id;
      $new_accessor->user_id = auth()->user()->id;
      try {
        $new_accessor->save();
      } catch (\Exception $e){
        Log::error( $e->getMessage(), [$e->getFile()] );
        continue;
      }
    }
  }

  public function model()
  {
    return $this->belongsTo( AltrpModel::class );
  }
}
