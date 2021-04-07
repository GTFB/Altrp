<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePagesTemplatesIndexes extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table('altrp_media', function (Blueprint $table) {
      $table->unique(['url'], 'url');
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
    Schema::table('altrp_media', function (Blueprint $table) {
      $table->uuid('guid')->nullable();
    });
  }
}
