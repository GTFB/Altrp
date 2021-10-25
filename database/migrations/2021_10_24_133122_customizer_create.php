<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CustomizerCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
      Schema::create( 'altrp_customizers' , function ( Blueprint $table ) {
        $table->bigIncrements('id');
        $table->timestamps();
        $table->softDeletes();
        $table->string( 'name' )->index();
        $table->string( 'title' )->index();
        $table->string( 'type', 50 )->index()->nullable();
        $table->uuid( 'guid' )->unique();
        $table->json( 'data')->nullable();
        $table->unsignedBigInteger( 'model_id' )->nullable()->index();

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
      Schema::drop('altrp_customizers');
    }
}
