<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpModelsTableV4 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_models', function (Blueprint $table) {
            $table->string('title')->nullable()->after('name');
            $table->string('bounded_model')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_models', function (Blueprint $table) {
            $table->dropColumn('title');
            $table->dropColumn('bounded_model');
        });
    }
}
