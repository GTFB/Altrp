<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGlobalElementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('global_elements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->string('title')->nullable();
            $table->text('data')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users');
            $table->index('name', 'global_element_name_index');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('global_elements');
    }
}
