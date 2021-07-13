<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MailUdate extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'altrp_feedback_mails', function ( Blueprint $table ){
      $table->longText( 'html' )->nullable();
      $table->longText( 'attachments' )->nullable();
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
    Schema::table( 'altrp_feedback_mails', function ( Blueprint $table ){
      $table->dropColumn( 'html' );
      $table->dropColumn( 'attachments' );
    } );
  }
}
