<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMediaTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('altrp_media', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->timestamps();
      $table->softDeletes();
      $table->bigInteger('author')->nullable()->index();
      $table->string('filename');
      $table->string('url');
      $table->string('media_type', 55)->index()->default('image');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('altrp_media');
  }
}
