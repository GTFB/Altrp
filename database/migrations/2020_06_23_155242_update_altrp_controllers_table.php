<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpControllersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_controllers', function (Blueprint $table) {
            $table->dropForeign(['model_id']);
            $table->renameColumn('model_id', 'table_id');
            $table->foreign('table_id')->references('id')->on('tables');
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
