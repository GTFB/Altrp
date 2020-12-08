<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TemplateContent extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'templates', function ( Blueprint $table ){
      $table->longText( 'html_content' )->nullable();
      $table->longText( 'styles' )->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    //
    Schema::table( 'templates', function ( Blueprint $table ){
      $table->dropColumn( 'html_content' );
      $table->dropColumn( 'styles' );
    });
  }
}
