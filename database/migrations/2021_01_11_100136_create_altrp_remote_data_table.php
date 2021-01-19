<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpRemoteDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_remote_data', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->bigInteger('column_id')->unsigned()->nullable();
            $table->string('column_name')->nullable();
            $table->string('remote_find_column');
            $table->string('remote_need_column');
            $table->boolean('as_object')->default(0);
            $table->bigInteger('single_source_id')->unsigned();
            $table->bigInteger('list_source_id')->unsigned();
            $table->bigInteger('remotable_id')->unsigned();
            $table->string('remotable_type');
            $table->boolean('enabled')->default(1);


            $table->timestamps();

            $table->foreign('column_id')->references('id')->on('altrp_columns');
            $table->foreign('single_source_id')->references('id')->on('altrp_sources');
            $table->foreign('list_source_id')->references('id')->on('altrp_sources');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_remote_data');
    }
}
