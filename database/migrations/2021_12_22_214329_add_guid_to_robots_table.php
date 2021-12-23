<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGuidToRobotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_robots', function (Blueprint $table) {
            $table->uuid('guid')->index()->nullable()->unique();
        });

        $models = \App\Altrp\Robot::all();
        $models->each(function (\App\Altrp\Robot $model){
          $model->guid = (string)Str::uuid();
          $model->save();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_robots', function (Blueprint $table) {
            $table->dropColumn('guid');
        });
    }
}
