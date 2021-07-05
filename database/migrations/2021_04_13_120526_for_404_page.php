<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class For404Page extends Migration
{

  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'pages', function ( Blueprint $table ) {
      $table->boolean( 'not_found' )->nullable();
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
    Schema::table( 'pages', function ( Blueprint $table ) {
      $table->dropColumn( 'not_found' );
    } );


  }
}
