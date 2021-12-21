<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoryObjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_category_objects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('category_guid')->index();
            $table->uuid('object_guid')->index();
            $table->string('object_type')->nullable();

            $table->foreign('category_guid')->references('guid')->on('altrp_categories')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category_objects');
    }
}
