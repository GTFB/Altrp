<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MediaGuestToken extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table( 'altrp_media', function ( Blueprint $table ) {

      $table->string( 'guest_token', 40 )->index()->nullable();

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
    Schema::table( 'altrp_media', function ( Blueprint $table ) {

      $table->dropColumn( 'guest_token' );

    } );
  }
}
