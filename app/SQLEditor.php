<?php

namespace App;

use App\Altrp\Source;
use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;
use App\Altrp\Model as AltrpModel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class SQLEditor extends Model
{
    use Searchable;

  protected $fillable = [
    'name',
    'sql',
    'title',
    'model_id',
    'description',
    'updated_at',
    'is_object',
  ];

  /**
   * @deprecated
   * @param array $imported_editors
   */
  public static function import( $imported_editors = [] )
  {
    foreach ( $imported_editors as $imported_editor ) {
      $model = AltrpModel::where( 'name', Arr::get( $imported_editor, 'model_name' ) )->first();
      if( ! $model ){
        continue;
      }

      foreach ( $model->altrp_sql_editors as $old_editor ) {
        /**
         * @var self $old_editor
         */
        if( $imported_editor['name'] === $old_editor->name ){
        if( date( $imported_editor['updated_at'] ) > date( $old_editor->updated_at ) ){
          $old_editor->fill( $imported_editor );
          $old_editor->model_id = $model->id;
          try {
            $old_editor->save();
          } catch (\Exception $e){
            Log::error( $e->getMessage(), $imported_editor ); //
            continue;
          }
        }
          continue 2;
        }
      }

      $new_editor = new self( $imported_editor );
      $new_editor->model_id = $model->id;

      try {
        $new_editor->save();
      } catch (\Exception $e){
        Log::error( $e->getMessage(), $imported_editor ); //
        continue;
      }
      $new_editor->save();
    }
  }

  public function altrp_source()
    {
        return $this->morphOne(Source::class, 'sourceable');
    }

    public function model()
    {
        return $this->belongsTo(\App\Altrp\Model::class);
    }

    public function remote_data()
    {
        return $this->morphMany('App\Altrp\RemoteData', 'remotable');
    }
}
