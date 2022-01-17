<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddConditionsToSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_sources', function (Blueprint $table) {
            $table->boolean('need_all_roles')->default(0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_sources', function (Blueprint $table) {
            $table->dropColumn('need_all_roles');
        });
    }
}
