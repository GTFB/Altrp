<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $table = new \App\Altrp\Table([
            'name' => 'altrp_media',
            'title' => 'Media',
            'preset' => 1
        ]);
        \App\Altrp\Table::withoutEvents(function () use ($table) {
            $table->save();
        });


        $model = new \App\Altrp\Model([
            'name' => 'media',
            'title' => 'Media',
            'namespace' => 'App\Media',
            'table_id' => $table->id,
            'soft_deletes' => 0,
            'time_stamps' => 0,
            'pk' => 'id',
            'preset' => 1,
        ]);
        \App\Altrp\Model::withoutEvents(function () use ($model) {
            $model->save();
        });

        $column = new \App\Altrp\Column([
            'name' => 'id',
            'title' => 'ID',
            'type' => 'bigInteger',
            'preset' => 1,
            'table_id' => $table->id,
            'indexed' => true,
        ]);
        \App\Altrp\Column::withoutEvents(function () use ($column) {
            $column->save();
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
    }
}
