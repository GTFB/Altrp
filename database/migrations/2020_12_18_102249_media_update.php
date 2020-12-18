<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MediaUpdate extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::rename('media', 'altrp_media');
    Schema::table( 'altrp_media', function ( Blueprint $table ){
      $table->string( 'title', 50 )->index()->nullable();
      $table->string( 'alternate_text', 100 )->index()->nullable();
      $table->text( 'caption' );
      $table->text( 'description' );
    } );
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    //
    Schema::table( 'altrp_media', function ( Blueprint $table ){
      $table->dropColumn( 'title' );
      $table->dropColumn( 'alternate_text' );
      $table->dropColumn( 'caption' );
      $table->dropColumn( 'description' );
    } );
  }
}
