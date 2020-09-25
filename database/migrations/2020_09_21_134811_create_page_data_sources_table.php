<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePageDataSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_data_sources', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('page_id')->unsigned();
            $table->bigInteger('source_id')->unsigned();
            $table->text('alias');
            $table->bigInteger('priority');
            $table->text('parameters');

            $table->foreign('page_id')->references('id')->on('pages');
            $table->foreign('source_id')->references('id')->on('altrp_sources');

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
        Schema::dropIfExists('page_data_sources');
    }
}
