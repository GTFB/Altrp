<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PagesTemplatesUpdateKeys extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'pages_templates', function ( Blueprint $table ) {

     // $table->dropIndex( 'pages_templates_template_id_page_id_unique' );
      $table->string( 'condition_type', 50 )->default( 'include' );
      /*$table->unique( ['template_id', 'page_id', 'template_type', 'condition_type'],
        DB::getTablePrefix() . 'pages_templates_main_key' );
*/
    } );
    Schema::table( 'templates', function ( Blueprint $table ) {

      $table->boolean( 'all_site' )->default( 0 )->index();

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

    Schema::table( 'pages_templates', function ( Blueprint $table ) {

    //  $table->dropIndex(  DB::getTablePrefix() . 'pages_templates_main_key' );
      $table->dropColumn( 'condition_type' );
    } );
    Schema::table( 'templates', function ( Blueprint $table ) {

      $table->dropColumn( 'all_site' );
    } );
  }
}
