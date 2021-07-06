<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDashboardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dashboards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->enum('type', [
                'CHART/BAR',
                'CHART/PIE',
                'CHART/DONUT',
                'CHART/AREA',
                'CHART/LINE',
                'CHART/TABLE'
            ]);
            $table->string('source');
            $table->json('options')->nullable();
            $table->json('filter')->nullable();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete( 'cascade' );
            $table->string('widget_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dashboards');
    }
}