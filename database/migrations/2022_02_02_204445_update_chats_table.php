<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_chats', function (Blueprint $table) {
            $table->renameColumn('chart_id', 'node_id');
            $table->renameColumn('telegram_chat_id', 'chat_id');
            $table->json('data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_chats', function (Blueprint $table) {
            $table->renameColumn('node_id', 'chart_id');
            $table->renameColumn('chat_id', 'telegram_chat_id');
            $table->dropColumn('data');
        });
    }
}
