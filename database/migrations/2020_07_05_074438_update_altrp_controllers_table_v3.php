<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpControllersTableV3 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_controllers', function (Blueprint $table) {
            $table->string('prefix')->nullable();
            $table->string('relations')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_controllers', function (Blueprint $table) {
            $table->dropColumn('prefix');
            $table->dropColumn('relations');
        });
    }
}
