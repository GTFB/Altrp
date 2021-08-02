<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Altrp\Table;
use App\Altrp\Model;
use App\Altrp\Column;

class AddUserMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Table::where([['name','user_metas'], ['preset',1]])->first()) {
            return;
        }

        $table = new Table([
            'name' => 'user_metas',
            'title' => 'UserMeta',
            'preset' => 1
        ]);
        Table::withoutEvents(function () use ($table) {
            $table->save();
        });


        $model = new Model([
            'name' => 'user_meta',
            'title' => 'UserMeta',
            'namespace' => 'App\UserMeta',
            'table_id' => $table->id,
            'soft_deletes' => 0,
            'time_stamps' => 0,
            'pk' => 'id',
            'preset' => 1,
        ]);
        Model::withoutEvents(function () use ($model) {
            $model->save();
        });

        $column = new Column([
            'name' => 'id',
            'title' => 'ID',
            'type' => 'bigInteger',
            'preset' => 1,
            'table_id' => $table->id,
            'indexed' => 1,
        ]);
        Column::withoutEvents(function () use ($column) {
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
