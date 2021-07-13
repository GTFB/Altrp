<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create( 'pages', function ( Blueprint $table ) {
      $table->bigIncrements( 'id' );
      $table->timestamps();
      $table->softDeletes();
      $table->string( 'title', 191 )->index();
      $table->bigInteger( 'author' )->index();
      $table->longText( 'content' );
      $table->string( 'path' );//->unique();

    } );
    Schema::create( 'pages_templates', function ( Blueprint $table ) {
      $table->bigIncrements( 'id' );
      $table->timestamps();
      $table->bigInteger( 'page_id' )->index();
      $table->bigInteger( 'template_id' )->index();
     // $table->unique( ['template_id', 'page_id'] );
      $table->string( 'template_type' )->index();
    } );
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists( 'pages' );
    Schema::dropIfExists( 'pages_templates' );
  }
}
