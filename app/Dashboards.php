<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dashboards extends Model
{
    //protected $primaryKey = 'id';
    //protected $keyType = 'string';
    //public $incrementing = false;
    protected $fillable = [
      'title',
      'type',
      'source',
      'options',
      'filter',
      'widget_id',
      'guid',
      'user_id'
    ];
    public $timestamps = false;

  /**
   * @deprecated
   * Импортируем
   * @param array $imported_dashboards
   */
  public static function import( $imported_dashboards = [] )
  {
    foreach ( $imported_dashboards as $imported_dashboard ) {
      $old_dashboard = self::where( 'guid', $imported_dashboard['guid'] )->first();
      if( $old_dashboard ){
        $old_dashboard->type = $imported_dashboard['type'];
        $old_dashboard->title = $imported_dashboard['title'];
        $old_dashboard->options = $imported_dashboard['options'];
        $old_dashboard->filter = $imported_dashboard['filter'];
        $old_dashboard->widget_id = $imported_dashboard['widget_id'];
        $old_dashboard->source = $imported_dashboard['source'];
        $old_dashboard->user_id = auth()->user()->id;
        $old_dashboard->save();
        continue;
      }
      $new_dashboard = new self( $imported_dashboard );
      $new_dashboard->user_id = auth()->user()->id;
      $new_dashboard->save();
    }
  }
}
