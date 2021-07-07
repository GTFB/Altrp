<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CalcFields extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'altrp_columns', function ( Blueprint $table ){
      $table->text( 'calculation_logic' )->nullable();
      $table->text( 'calculation' )->nullable();
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
    Schema::table( 'altrp_columns', function ( Blueprint $table ){
      $table->dropColumn( 'calculation_logic' );
      $table->dropColumn( 'calculation' );
    } );
  }
}
