<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateSQLEditorTableAddAsObject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('s_q_l_editors', function (Blueprint $table) {
            $table->boolean( 'is_object' )->default(0);
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
            $table->dropColumn('is_object');
        });
    }
}
