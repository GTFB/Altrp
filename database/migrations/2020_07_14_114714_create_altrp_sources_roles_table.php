<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpSourcesRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_sources_roles', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('source_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->string('type')->nullable();

            $table->foreign('source_id')->references('id')->on('altrp_sources');
            $table->foreign('role_id')->references('id')->on('roles');

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
        Schema::dropIfExists('altrp_sources_roles');
    }
}
