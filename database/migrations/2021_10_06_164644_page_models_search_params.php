<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PageModelsSearchParams extends Migration
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
        $table->string( 'param_name', 50 )->nullable();
        $table->string( 'model_column', 50 )->nullable();
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
        $table->dropColumn( 'param_name' );
        $table->dropColumn( 'model_column' );
      } );
    }
}
