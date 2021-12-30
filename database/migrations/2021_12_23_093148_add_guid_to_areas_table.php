<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGuidToAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('areas', function (Blueprint $table) {
            $table->uuid('guid')->index()->nullable()->unique();
        });

        $models = \App\Area::all();
        $models->each(function (\App\Area $model){
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
        Schema::table('areas', function (Blueprint $table) {
             $table->dropColumn('guid');
        });
    }
}
