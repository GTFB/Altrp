<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Class Media
 * @package App
 * @property string $author
 * @property string $guest_token
 */
class Media extends Model
{
  use SoftDeletes;

  protected $table = 'altrp_media';

  protected $fillable = [
    'author',
    'guest_token',
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
    'guid',
  ];

  /**
   * @param array $imported_media
   * @deprecated
   * Импортирует медиа
   */
  public static function import( $imported_media = [] )
  {
    foreach ( $imported_media as $_media ) {
      if ( self::withTrashed()->where( 'url', $_media['url'] )->first() ) {
        continue;
      }
      $new_media = new self( $_media );
      $new_media->author = Auth::user()->id;
      $new_media->save();
    }
  }

  /**
   * @param string $url
   * @return self | null
   */
  public static function createByUrl( string $url )
  {
    $media = new Media();
    try {
      $contents = file_get_contents( $url );
      $path = parse_url( $url, PHP_URL_PATH );       // get path from url
      $extension = pathinfo( $path, PATHINFO_EXTENSION );
      File::ensureDirectoryExists( storage_path( 'app/public/media' ) . date( "Y" ) . '/' . date( "m" ), 0775 );
      $new_filename = 'media/' . date( "Y" ) . '/' . date( "m" ) . '/' .
        Str::random( 40 ) . '.' . $extension;


      File::put( storage_path( 'app/public/' ) . $new_filename, $contents );
      $media->author = Auth::user()->id;
      $media->filename = $new_filename;
      $media->url = Storage::url( $media->filename );
      return $media;
    } catch ( \Exception $e ) {
      logger()->error( $e->getMessage() );
      return null;
    }
  }

  public function delete()
  {
    $result = parent::delete();
    try{
      Storage::delete( 'public/' . $this->filename );
    }catch ( \Throwable $e ){

    }
    return $result;
  }

  public function categories()
  {
      return $this->hasMany(CategoryObject::class, 'object_guid', 'guid');
  }

  public function categoryOptions()
  {
      return CategoryObject::select('altrp_categories.guid as value', 'altrp_categories.title as label')->leftJoin('altrp_categories', 'altrp_categories.guid', '=', 'altrp_category_objects.category_guid')
          ->where('altrp_category_objects.object_guid', $this->guid)->get();
  }
}
