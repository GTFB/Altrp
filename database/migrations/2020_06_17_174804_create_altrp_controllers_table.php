<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpControllersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_controllers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            
            $table->bigInteger('model_id')->unsigned();
            $table->text('description')->nullable();
            
            $table->foreign('model_id')->references('id')->on('altrp_models');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_controllers');
    }
}
