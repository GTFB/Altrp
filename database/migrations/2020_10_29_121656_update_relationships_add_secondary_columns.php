<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateRelationshipsAddSecondaryColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_relationships', function (Blueprint $table){
            $table->bigInteger('secondary_model_id')->unsigned()->nullable();
            $table->string('secondary_foreign_key')->nullable();
            $table->string('secondary_local_key')->nullable();
            $table->foreign('secondary_model_id')->references('id')->on('altrp_models');
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
