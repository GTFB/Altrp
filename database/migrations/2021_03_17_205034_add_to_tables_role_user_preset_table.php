<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddToTablesRoleUserPresetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('role_user', function (Blueprint $table) {
            $table->dropPrimary([
                'role_id',
                'user_id',
                'user_type'
            ]);
        });

        Schema::table('role_user', function (Blueprint $table) {
            $table->bigInteger('id');
        });

        Schema::table('role_user', function (Blueprint $table) {
            $table->primary([
                'id',
                'role_id',
                'user_id',
                'user_type'
            ]);
        });

        Schema::table('role_user', function (Blueprint $table) {
            //$table->bigIncrements('id')->change();
        });

        Schema::table('role_user', function (Blueprint $table) {
            $table->bigInteger('user_id')
                ->unsigned()
                ->change();
        });

        Schema::table('role_user', function (Blueprint $table) {
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });

        $table = new \App\Altrp\Table([
            'name' => 'role_user',
            'title' => 'Role User',
            'preset' => 1
        ]);
        \App\Altrp\Table::withoutEvents(function () use ($table) {
            $table->save();
        });

        $model = new \App\Altrp\Model([
            'name' => 'role_user',
            'title' => 'Role User',
            'namespace' => 'App\RoleUser',
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

    }
}
