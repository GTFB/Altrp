<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PageDatasourceUpdate extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'page_data_sources', function ( Blueprint $table ){
      $table->boolean( 'autoload' )->default( true );
    } );
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table( 'page_data_sources', function ( Blueprint $table ){
      $table->boolean( 'autoload' );
    } );
  }
}
