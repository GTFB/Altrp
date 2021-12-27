<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CustomizersSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
      Schema::table('altrp_customizers', function (Blueprint $table) {
        $table->json('settings')->nullable();
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
      Schema::table('altrp_customizers', function (Blueprint $table) {
        $table->dropColumn('settings');
      });
    }
}
