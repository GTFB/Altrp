<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpRelationshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_relationships', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->unique()->nullable();
            $table->string('type');
            $table->string('model_class');
            $table->string('foreign_key');
            $table->string('local_key');
            $table->bigInteger('table_id')->unsigned();

            $table->foreign('table_id')->references('id')->on('tables');
        });

        Schema::table('altrp_keys', function (Blueprint $table) {
            $table->dropColumn('type_of_relation');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_relationships');
    }
}
