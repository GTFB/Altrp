<?php

namespace App;

use App\Constructor\Template;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    //
  use SoftDeletes;
  protected $fillable = [
    'title',
    'author',
    'content',
    'path',
  ];


  function user(){
    return $this->belongsTo( User::class, 'author' );
  }

  /**
   * @return \Illuminate\Database\Eloquent\Builder|Model|null|Template
   */
  function get_content_template(){
    $pages_template = PagesTemplate::where( 'page_id', $this->id )
      ->where( 'template_type', 'content' )->first();
    if( ! $pages_template ){
      return null;
    }
    return $pages_template->template;
  }

  /**
   * @return array
   */
  static function get_frontend_routes(){
    $pages = self::all();
    $routes = [];
    foreach ( $pages as $page ) {
      $routes[] = $page->path;
    }
    return $routes;
  }
}
