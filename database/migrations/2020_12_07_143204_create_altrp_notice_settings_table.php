<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpNoticeSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_notice_settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('notice_name');
            $table->string('model_name');
            $table->bigInteger('noticed_id');
            $table->string('noticed_type');
            $table->json('notice_settings')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_notice_settings');
    }
}
