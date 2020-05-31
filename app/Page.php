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

  /**
   * @return array
   */
  static function get_frontend_routes()
  {
    return Page::all()->map->only( [ 'path' ] )->map( function ( $path ) {
      return $path['path'];
    } )->toArray();
  }

  /**
   * @return array
   */
  public static function get_pages_for_frontend()
  {
    $pages = [];

    $_pages = static::all();

    foreach ( $_pages as $page ) {
      $pages[] = [
        'path' => $page->path,
        'id' => $page->id,
        'areas' => self::get_areas_for_page( $page->id ),
      ];
    }

    return $pages;
  }

  /**
   * @param $page_id
   * @return array
   */
  public static function get_areas_for_page( $page_id ){
    $areas = [];

    $areas[] = [
      'area_name' => 'content',
      'id' => 'content',
      'settings' => [],
      'template' => PagesTemplate::where( 'page_id', $page_id )
        ->where( 'template_type', 'content' )->first()->template
    ];

    return $areas;
  }

  function user()
  {
    return $this->belongsTo( User::class, 'author' );
  }

  /**
   * @return \Illuminate\Database\Eloquent\Builder|Model|null|Template
   */
  function get_content_template()
  {
    $pages_template = PagesTemplate::where( 'page_id', $this->id )
      ->where( 'template_type', 'content' )->first();
    if ( ! $pages_template ) {
      return null;
    }
    return $pages_template->template;
  }

}
