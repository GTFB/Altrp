<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePagesTemplatesNullable extends Migration
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
      $table->bigInteger( 'page_id' )->unsigned()->nullable()->change();
      $table->bigInteger( 'template_id' )->unsigned()->nullable()->change();
      $table->dropUnique( ['template_id', 'page_id',  'template_type'] );
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
    Schema::table( 'pages_templates', function ( Blueprint $table ){
      $table->index( ['template_id', 'page_id',  'template_type'] );
      $table->bigInteger( 'page_id' )->change();
      $table->bigInteger( 'template_id' )->change();
    } );
  }
}
