<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModelsGuid extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
      Schema::table('altrp_models', function (Blueprint $table) {
        $table->uuid('guid')->index()->nullable()->unique();
      });

      $models = \App\Altrp\Model::all();
      $models->each(function (\App\Altrp\Model $model){
        $model->guid = (string)Str::uuid();
        $model->save();
      });

      Schema::table('altrp_customizers', function (Blueprint $table) {
        $table->uuid('model_guid')->index()->nullable();
      });

      $customizers = \App\Altrp\Customizer::withTrashed()->get();
      $customizers->each(function (\App\Altrp\Customizer $customizer){
        if($customizer->altrp_model){
          $customizer->model_guid = $customizer->altrp_model->guid;
          $customizer->save();
        }
      });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
      Schema::table('altrp_models', function (Blueprint $table) {
        $table->dropColumn('guid');
      });
      Schema::table('altrp_customizers', function (Blueprint $table) {
        $table->dropColumn('model_guid');
      });
    }
}
