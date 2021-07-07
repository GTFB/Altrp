<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_keys', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('onDelete');
            $table->string('onUpdate');
            $table->timestamps();
            
            $table->bigInteger('source_table_id')->unsigned();
            $table->bigInteger('target_table_id')->unsigned();
            $table->bigInteger('source_column_id')->unsigned();
            $table->bigInteger('target_column_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('altrp_migration_id')->unsigned();
            
            $table->foreign('source_table_id')->references('id')->on('tables');
            $table->foreign('target_table_id')->references('id')->on('tables');
            $table->foreign('source_column_id')->references('id')->on('tables');
            $table->foreign('target_column_id')->references('id')->on('tables');
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
        Schema::dropIfExists('altrp_keys');
    }
}
