<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpAccessorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_accessors', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('formula');
            $table->text('description')->nullable();

            $table->bigInteger('model_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();

            $table->string('status')->default('created');

            $table->foreign('model_id')->references('id')->on('altrp_models');
            $table->foreign('user_id')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_accessors');
    }
}
