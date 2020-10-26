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
            'name' => 'media',
            'title' => 'Media',
            'preset' => true
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
            'preset' => true,
        ]);
        \App\Altrp\Model::withoutEvents(function () use ($model) {
            $model->save();
        });

        $column = new \App\Altrp\Column([
            'name' => 'id',
            'title' => 'ID',
            'type' => 'bigInteger',
            'preset' => true,
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
