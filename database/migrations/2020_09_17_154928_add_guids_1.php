<?php

use Faker\Provider\Uuid;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGuids1 extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */

  public function up()
  {
    //
    Schema::table( 'pages_templates', function ( Blueprint $table ){
      $table->uuid('page_guid')->nullable();
      $table->uuid('template_guid')->nullable();
    //  $table->dropIndex( DB::getTablePrefix() . 'pages_templates_main_key' );
      $table->unique( ['template_guid', 'page_guid', 'template_type', 'condition_type'],
        DB::getTablePrefix() . 'pages_templates_main_key' );
    } );
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
