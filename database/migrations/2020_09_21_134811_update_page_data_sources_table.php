<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePageDataSourcesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table( 'page_data_sources', function ( Blueprint $table ) {
      $table->text( 'parameters' )->nullable()->change();
      $table->bigInteger('priority')->default( 100 )->change();

    } );
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists( 'page_data_sources' );
  }
}
