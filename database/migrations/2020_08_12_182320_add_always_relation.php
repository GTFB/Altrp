<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAlwaysRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
      Schema::table( 'altrp_relationships', function ( Blueprint $table ){
        $table->boolean( 'always_with' )->default(false);
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
      Schema::table( 'altrp_relationships', function ( Blueprint $table ){
        $table->dropColumn( 'always_with' );
      });
    }
}
