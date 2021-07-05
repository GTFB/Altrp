<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AltrpMetaMigration extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::create( 'altrp_meta', function ( Blueprint $table ){
      $table->timestamps();
      $table->softDeletes();
      $table->string( 'meta_name', 50 )->unique()->index();
      $table->longText( 'meta_value' );
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
    Schema::dropIfExists( 'altrp_meta' );
  }
}
