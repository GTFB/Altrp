<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGuidToMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_media', function (Blueprint $table) {
            $table->uuid('guid')->index()->nullable()->unique();
        });

        $models = \App\Media::withTrashed();
        $models->each(function (\App\Media $model){
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
        Schema::table('altrp_media', function (Blueprint $table) {
            $table->dropColumn('guid');
        });
    }
}
