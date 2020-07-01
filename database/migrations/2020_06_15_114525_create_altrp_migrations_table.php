<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpMigrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_migrations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('file_path');
            $table->string('status');
            $table->longText('data');
            $table->timestamps();
            
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('table_id')->unsigned();
            
            $table->foreign('table_id')->references('id')->on('tables');
            $table->foreign('user_id')->references('id')->on('users');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_migrations');
    }
}
