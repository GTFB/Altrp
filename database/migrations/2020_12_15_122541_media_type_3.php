<?php

use App\Media;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MediaType3 extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {

    Schema::table( 'altrp_media', function ( Blueprint $table ){
      $table->text( 'caption' )->nullable()->change();
      $table->text( 'description' )->nullable()->change();
    } );


  }
  public function down(){

  }
}
