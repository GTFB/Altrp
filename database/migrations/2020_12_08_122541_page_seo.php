<?php

use App\Media;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PageSeo extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'pages', function ( Blueprint $table ){
      $table->text( 'seo_description' )->nullable();
      $table->text( 'seo_keywords' )->nullable();
      $table->text( 'seo_title' )->nullable();
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
    Schema::table( 'pages', function ( Blueprint $table ){
      $table->dropColumn( 'seo_description' );
      $table->dropColumn( 'seo_keywords' );
      $table->dropColumn( 'seo_title' );
    } );
  }
}
