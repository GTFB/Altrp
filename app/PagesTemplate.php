<?php

namespace App;

use App\Constructor\Template;
use Illuminate\Database\Eloquent\Model;

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
   * Импортируем данный для таблицы связей страниц с шаблонами
   * @param array $imported_data
   */
  public static function import( $imported_data = [] )
  {
    foreach ( $imported_data as $imported_datum ) {
      if( self::where([
        'page_guid' => $imported_datum['page_guid'],
        'template_guid' => $imported_datum['template_guid'],
        'condition_type' => $imported_datum['condition_type'],
      ])->first() ){
        continue;
      }
      $new_data =  new self( $imported_datum );
      $template = Template::where( 'guid', $imported_datum['template_guid'] )->first();
      $page = Page::where( 'guid', $imported_datum['page_guid'] )->first();

      $new_data->template_type = $template->area;
      $new_data->template_id = $template->id;
      $new_data->page_id = $page->id;
      $new_data->save();
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
