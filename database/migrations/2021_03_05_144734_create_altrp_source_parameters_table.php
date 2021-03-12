<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAltrpSourceParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('altrp_page_source_parameters', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('page_source_id')->unsigned();
            $table->string('name');
            $table->string('pattern')->nullable();
            $table->boolean('is_required')->default(0);
            $table->string('default_value')->nullable();
            $table->timestamps();

            $table->foreign('page_source_id')
                ->references('id')
                ->on('page_data_sources');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('altrp_page_source_parameters');
    }
}
