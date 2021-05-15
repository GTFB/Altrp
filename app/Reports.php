<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Schema;
use Mockery\Exception;

/**
 * @todo Комплексно избавится от класса
 * Class Reports
 * @package App
 */
class Reports extends Model
{
  protected $fillable = [
    'name',
    'description',
    'html',
    'json',
    'guid',
    'user_id',
  ];

  /**
   * @deprecated
   * Импортируем отчеты
   * @param array $imported_reports
   */
  public static function import( $imported_reports = [] )
  {
    foreach ( $imported_reports as $imported_report ) {
      $old_report = self::where( 'guid', $imported_report['guid'] )->first();
      if( $old_report ){
        $old_report->name = $imported_report['name'];
        $old_report->description = $imported_report['description'];
        $old_report->html = $imported_report['html'];
        $old_report->json = $imported_report['json'];
        $old_report->user_id = auth()->user()->id;
        $old_report->save();
        continue;
      }
      $new_report = new self( $imported_report );
      $new_report->user_id = auth()->user()->id;
      $new_report->save();
    }
  }

  public function user(){
    return $this->hasOne( User::class, 'id', 'user_id' );
  }
}
