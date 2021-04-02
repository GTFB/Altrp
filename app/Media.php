<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;


class Media extends Model
{
  use SoftDeletes;
  protected $table = 'altrp_media';

  protected $fillable = [
    'author',
    'filename',
    'media_type',
    'url',
    'type',
    'caption',
    'title',
    'description',
    'alternate_text',
    'width',
    'height',
  ];

  /**
   * Импортирует медиа
   * @param array $imported_media
   */
  public static function import( $imported_media = [] )
  {
    foreach ( $imported_media as $_media ){
      if( self::where( 'url', $_media['url'] )->first() ){
        continue;
      }
      $new_media = new self( $_media );
      $new_media->author = Auth::user()->id;
      $new_media->save();
    }
  }
}
