<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateRelationshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_relationships', function (Blueprint $table) {

            $table->string("title")->nullable();
            $table->text("description")->nullable();
            $table->bigInteger('model_id')->unsigned()->nullable();
            $table->bigInteger('target_model_id')->unsigned()->nullable();
            $table->bigInteger('altrp_migration_id')->unsigned()->nullable();
            $table->boolean("add_belong_to")->default(false);
            $table->string("onDelete")->nullable()->default("restrict");
            $table->string("onUpdate")->nullable()->default("restrict");

            $table->foreign('model_id')->references('id')->on('altrp_models');
            $table->foreign('target_model_id')->references('id')->on('altrp_models');
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
        //
    }
}
