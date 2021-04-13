<?php

use App\Media;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\ColorExtractor\Color;
use League\ColorExtractor\ColorExtractor;
use League\ColorExtractor\Palette;

class UpdateMediaTable1 extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table( 'altrp_media', function ( Blueprint $table) {
      $table->string( 'main_color', 10 )->nullable();
    } );

    $media = Media::all();
    $media->each( function ( $media ) {
      $media->main_color = getMainColor( Storage::path( 'public/' . $media->filename ) );
      $media->save();
    } );
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table( 'altrp_media', function ( Blueprint $table) {
      $table->dropColumn( 'main_color' );
    } );
  }
}

/**
 * @param $path
 * @param int $count
 * @return string
 */
if( ! function_exists( 'getMainColor' ) ){
  function getMainColor( $path, $count = 1 ){

    try{
      $palette = Palette::fromFilename($path);
      $extractor = new ColorExtractor($palette);
      $colors = $extractor->extract($count);
      $color = $colors[0];
      $color = Color::fromIntToHex($color);
      return $color;
    } catch (\Exception $e){
      Log::debug($e);
      return '';
    }

  }
}
