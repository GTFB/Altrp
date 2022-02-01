<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_chats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('telegram_chat_id');
            $table->unsignedBigInteger('robot_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('chart_id')->nullable();

            $table->foreign('robot_id')->references('id')->on('altrp_robots')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_chats');
    }
}
