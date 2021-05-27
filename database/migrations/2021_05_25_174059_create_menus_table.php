<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('menus', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->softDeletes();
      $table->uuid('guid')->index();
      $table->timestamps();
      $table->longText('children')->nullable();
      $table->string('name', 100)->index()->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('menus');
  }
}
