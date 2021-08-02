<?php

use Faker\Provider\Uuid;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GenerateGuids1 extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */

  public function up()
  {
    //
    Schema::table( 'pages', function ( Blueprint $table ){
      $table->unique( 'guid', 'guid' );
    } );
    Schema::table( 'templates', function ( Blueprint $table ){
      $table->unique( 'guid', 'template_guid_field' );
    } );
    Schema::table( 'pages_templates', function ( Blueprint $table ){
      $table->foreign( 'page_guid', 'page' )
        ->references('guid')
        ->on('pages')
        ->onDelete('cascade');

      $table->foreign( 'template_guid', 'template' )
        ->references('guid')
        ->on('templates')
        ->onDelete('cascade');
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
  }
}
