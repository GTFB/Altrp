<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersAndMedia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $modelUser = \App\Altrp\Model::where('name', 'user')->first();
        $modelMedia = \App\Altrp\Model::where('name', 'media')->first();

        $tableUser = $modelUser->altrp_table;
        $tableMedia = $modelMedia->altrp_table;

        $columnUser = $tableUser->columns()->where('name','id')->first();
        $columnMedia = $tableMedia->columns()->where('name','id')->first();

        \App\Altrp\Table::withoutEvents(function () use ($tableUser, $tableMedia) {
            if ($tableUser) $tableUser->update(['preset' => 1]);
            if ($tableMedia) $tableMedia->update(['preset' => 1]);
        });

        \App\Altrp\Column::withoutEvents(function () use ($columnUser, $columnMedia) {
            if ($columnUser) $columnUser->update(['preset' => 1]);
            if ($columnMedia) $columnMedia->update(['preset' => 1]);
        });

        \App\Altrp\Model::withoutEvents(function () use ($modelUser, $modelMedia) {
            if ($modelUser) $modelUser->update(['preset' => 1]);
            if ($modelMedia) $modelMedia->update(['preset' => 1]);
        });

        $models = \App\Altrp\Model::all();

        foreach ($models as $model) {
            if (!$model->namespace) {
                if ($model->preset) {
                    $namespace = 'App\\' . ucfirst($model->name);
                } else {
                    $namespace = 'App\\AltrpModels\\' . $model->name;
                }
                \App\Altrp\Model::withoutEvents(function () use ($model, $namespace) {
                    $model->update(['namespace' => $namespace]);
                });
            }
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
