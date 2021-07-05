<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpColumnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_columns', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('title');
            $table->string('description');
            $table->string('type');
            $table->integer('size');
            $table->boolean('null');
            $table->string('default');
            $table->boolean('primary');
            $table->boolean('unique');
            
            $table->bigInteger('table_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('altrp_migration_id')->unsigned();
            
            $table->foreign('table_id')->references('id')->on('tables');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('altrp_migration_id')->references('id')->on('altrp_migrations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('columns');
    }
}
