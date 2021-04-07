<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpSourcesPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_sources_permissions', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('source_id')->unsigned();
            $table->integer('permission_id')->unsigned();

            $table->string('type')->nullable();

            $table->foreign('source_id')->references('id')->on('altrp_sources');
            $table->foreign('permission_id')->references('id')->on('permissions');

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
        Schema::dropIfExists('altrp_sources_permissions');
    }
}
