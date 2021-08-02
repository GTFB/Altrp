<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpValidationRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_validation_rules', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('validation_field_id')->unsigned();
            $table->foreign('validation_field_id')->references('id')->on('altrp_validation_fields');
            $table->string('rule');
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
        Schema::dropIfExists('altrp_validation_rules');
    }
}
