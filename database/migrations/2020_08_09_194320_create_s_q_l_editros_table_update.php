<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSQLEditrosTableUpdate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('s_q_l_editors', function (Blueprint $table) {
          $table->bigInteger('model_id')->unsigned();
          $table->foreign('model_id')->references('id')->on('altrp_models')->onDelete( 'cascade' );
          $table->text('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('s_q_l_editors', function (Blueprint $table) {
        $table->dropIndex(['model_id']);
        $table->dropColumn('model_id');
        $table->dropColumn('description');

      });
    }
}
