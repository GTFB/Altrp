<?php

use App\Media;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class MediaDimensions extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table( 'altrp_media', function ( Blueprint $table ){
      $table->integer( 'width' )->default( 0 );
      $table->integer( 'height' )->default( 0 );
    } );
    $media = Media::all();

    foreach ( $media as $statics ) {

      $path = Storage::path( 'public/' . $statics->filename );
      $ext = pathinfo( $path, PATHINFO_EXTENSION );
      if( $ext === 'svg' ){
        $svg = file_get_contents( $path );
        $svg = simplexml_load_string( $svg );
        $statics->width = ( string ) data_get( $svg->attributes(), 'width', 150 );
        $statics->height = ( string ) data_get( $svg->attributes(), 'height', 150 );
      } else {
        $size = getimagesize( $path );
        $statics->width = data_get( $size, '0', 0 );
        $statics->height = data_get( $size, '1', 0 );
      }
      $statics->save();
    }
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table( 'altrp_media', function ( Blueprint $table ){
      $table->dropColumn( 'width' );
      $table->dropColumn( 'height' );
    } );
  }
}
