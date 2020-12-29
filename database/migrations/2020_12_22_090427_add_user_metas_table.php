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
        $table = Table::where([['name','user_metas']])->orWhere('name', 'usermeta')->first();
        if (! $table) {
            $table = new Table([
                'name' => 'user_metas',
                'title' => 'UserMeta',
                'preset' => 1
            ]);
            Table::withoutEvents(function () use ($table) {
                $table->save();
            });
        } else {
            $table->update(['preset' => 1]);
        }

        $model = Model::where([['name','user_meta']])->first();
        if (! $model) {
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
        } else {
            $model->update(['preset' => 1]);
        }

        $column = Column::where([['name', 'id'], ['table_id', $table->id]])->first();
        if (! $column) {
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
        } else {
            $column->update(['preset' => 1]);
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
