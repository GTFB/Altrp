<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpDiagramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_diagrams', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->longText('settings');
            $table->bigInteger('author')->unsigned();
            $table->string('title')->index();

            $table->foreign('author')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_diagrams');
    }
}
