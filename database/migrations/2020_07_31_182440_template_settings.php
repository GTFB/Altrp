<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TemplateSettings extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::create( 'template_settings', function ( Blueprint $table ){
      $table->bigIncrements( 'id' );
      $table->timestamps();
      $table->bigInteger( 'template_id' )->unsigned();
      $table->string( 'setting_name', '25' )->index();
      $table->json( 'data' );
      $table->unique( ['template_id', 'setting_name'] );
      $table->foreign( ['template_id'] )->references( 'id' )->on( 'templates' );
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
    Schema::drop( 'template_settings' );
  }
}
