<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVariationsToMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_media', function (Blueprint $table) {
            $table->json('media_variation')->nullable();
        });
        }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_media', function (Blueprint $table) {
            $table->dropColumn('media_variation');
        });
    }
}
