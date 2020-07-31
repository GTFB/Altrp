<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_sources', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('model_id')->unsigned();
            $table->bigInteger('controller_id')->unsigned();

            $table->string('url');
            $table->string('api_url');
            $table->string('type');
            $table->string('name');

            $table->foreign('model_id')
                ->references('id')
                ->on('altrp_models');
            $table->foreign('controller_id')
                ->references('id')
                ->on('altrp_controllers');

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
        Schema::dropIfExists('altrp_sources');
    }
}
