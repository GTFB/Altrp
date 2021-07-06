<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpValidationFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_validation_fields', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->bigInteger('source_id')->unsigned();
            $table->foreign('source_id')->references('id')->on('altrp_sources');
            $table->bigInteger('model_id')->unsigned();
            $table->foreign('model_id')->references('id')->on('altrp_models');
            $table->bigInteger('column_id')->unsigned()->nullable();
            $table->foreign('column_id')->references('id')->on('altrp_columns');
            $table->string('column_name')->nullable();
            $table->boolean('is_created')->nullable();
            $table->boolean('is_updated')->nullable();
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
        Schema::dropIfExists('altrp_validation_fields');
    }
}
