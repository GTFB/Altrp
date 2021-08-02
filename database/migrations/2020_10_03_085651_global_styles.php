<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GlobalStyles extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {

    Schema::create( 'altrp_global_styles', function ( Blueprint $table ) {
      $table->timestamps();
      $table->bigIncrements( 'id' );
      $table->string( 'title' );
      $table->longText( 'data' )->nullable();
      $table->bigInteger( 'user_id' )->unsigned();
      $table->unique( 'title', 'title_index' );
      $table->foreign( 'user_id', 'user' )->references( 'id' )->on( 'users' );
    } );
    //
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    //

    Schema::dropIfExists( 'altrp_global_styles' );
  }
}
