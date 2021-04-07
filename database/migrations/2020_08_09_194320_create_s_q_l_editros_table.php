<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSQLEditrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_q_l_editors', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string( 'title', 50 )->index();
            $table->string( 'name', 50 )->index();
            $table->longText( 'sql' );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('s_q_l_editors');
    }
}
