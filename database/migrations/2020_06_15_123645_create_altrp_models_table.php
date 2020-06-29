<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_models', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();

            $table->string('name')->unique();
            $table->string('soft_deletes')->default('no');
            $table->string('fillable_cols')->nullable();
            $table->string('path');

            $table->bigInteger('table_id')->unsigned();

            $table->text('description')->nullable();

            $table->foreign('table_id')->references('id')->on('tables');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_models');
    }
}
