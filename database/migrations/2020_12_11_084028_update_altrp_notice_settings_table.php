<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpNoticeSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_notice_settings', function (Blueprint $table) {
            $table->dropColumn('model_name');
        });

        Schema::create('altrp_notice_setting_source', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('notice_setting_id');
            $table->unsignedBigInteger('source_id');

            $table->foreign('notice_setting_id')
                ->references('id')
                ->on('altrp_notice_settings')
                ->onDelete('cascade');

            $table->foreign('source_id')
                ->references('id')
                ->on('altrp_sources')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_notice_setting_source');
    }
}
