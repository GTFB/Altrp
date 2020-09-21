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

  public static function import( $media )
  {
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
