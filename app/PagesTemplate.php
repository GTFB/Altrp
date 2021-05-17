<?php

namespace App;

use App\Constructor\Template;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class PagesTemplate extends Model
{
    //
  protected $fillable = [
    'page_id',
    'page_guid',
    'template_id',
    'template_guid',
    'template_type',
    'condition_type',
  ];

  /**
   * @deprecated
   * Импортируем данный для таблицы связей страниц с шаблонами
   * @param array $imported_data
   */
  public static function import( $imported_data = [] )
  {
    foreach ( self::all() as $item ) {
      try {
        $item->delete();
      } catch (\Exception $e){
        Log::error( $e->getMessage() );
        continue;//
      }
    }
    foreach ( $imported_data as $imported_datum ) {
      $new_data =  new self( $imported_datum );
      $template = Template::where( 'guid', $imported_datum['template_guid'] )->first();
      $page = Page::where( 'guid', $imported_datum['page_guid'] )->first();
      if( ! ( $page && $template ) ){
        continue;
      }
      $area = Area::find( $template->area );
      if( ! ( $area && $page && $template ) ){
        continue;
      }
      $new_data->template_type = $area->name;
      $new_data->template_id = $template->id;
      $new_data->page_id = $page->id;
      try {
        $new_data->save();
      } catch (\Exception $e){
        Log::error( $e->getMessage(), $imported_datum );
        continue;//
      }
    }
  }

  public function template(){
    return $this->belongsTo( Template::class, 'template_guid', 'guid' );
  }
  public function template_trough_id(){
    return $this->belongsTo( Template::class, 'template_id' );
  }
  public function page(){
    return $this->belongsTo( Page::class, 'page_guid', 'guid' );
  }
  public function page_trough_id(){
    return $this->belongsTo( Page::class, 'page_id' );
  }


}
