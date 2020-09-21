<?php

namespace App;

use App\Altrp\Source;
use Illuminate\Database\Eloquent\Model;
use App\Altrp\Model as AltrpModel;
use Illuminate\Support\Arr;

class SQLEditor extends Model
{
    //
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
   * @param array $imported_editors
   */
  public static function import( $imported_editors = [] )
  {
    foreach ( $imported_editors as $imported_editor ) {
      $model = AltrpModel::where( 'name', Arr::get( $imported_editor, 'model_name' ) )->first();
      if( ! $model ){
        continue;
      }
      foreach ( $model->altrp_sql_editors as $sql_editor ) {
        if( $sql_editor['name'] === $sql_editor->name ){
          continue 2;
        }
      }
      $new_editor = new self( $imported_editor );
      $new_editor->model_id = $model->id;

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
}
