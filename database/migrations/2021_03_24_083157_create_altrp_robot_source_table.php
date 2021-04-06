<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpRobotSourceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_robot_source', function (Blueprint $table) {
            $table->bigInteger('robot_id')->unsigned();
            $table->bigInteger('source_id')->unsigned();
            $table->string('source_type')->nullable();
            $table->text('parameters')->nullable();

            $table->primary([
                'robot_id',
                'source_id'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_robot_source');
    }
}
