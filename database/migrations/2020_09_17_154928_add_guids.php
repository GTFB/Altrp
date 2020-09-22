<?php

use Faker\Provider\Uuid;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGuids extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'templates', function ( Blueprint $table ){
      $table->uuid('guid')->nullable();
    });
    Schema::table( 'pages', function ( Blueprint $table ){
      $table->uuid('guid')->nullable();
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
  }
}
