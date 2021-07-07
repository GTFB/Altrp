<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpQueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_queries', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');

            $table->longText('columns')->nullable();
            $table->longText('aggregates')->nullable();
            $table->longText('conditions')->nullable();
            $table->longText('relations')->nullable();
            $table->longText('order_by')->nullable();

            $table->text('group_by')->nullable();
            $table->text('access')->nullable();

            $table->bigInteger('offset')->nullable();
            $table->bigInteger('limit')->nullable();

            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('source_id')->unsigned()->index();

            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('altrp_queries');
    }
}
