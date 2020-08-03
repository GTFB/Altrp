<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PageRoles extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::create( 'page_role', function ( Blueprint $table){

      $table->unsignedInteger('role_id');
      $table->unsignedInteger('page_id');

      $table->foreign('role_id')->references('id')->on('roles')
        ->onUpdate('cascade')->onDelete('cascade');

      $table->primary(['page_id', 'role_id']);
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
    Schema::drop( 'page_role' );
  }
}
