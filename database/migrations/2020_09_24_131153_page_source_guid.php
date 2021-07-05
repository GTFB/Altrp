<?php

use App\PageDatasource;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PageSourceGuid extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'page_data_sources', function ( Blueprint $table ){
      $table->uuid( 'page_guid' )->nullable();
      $table->foreign( 'page_guid' )->references( 'guid' )->on( 'pages' )->onDelete( 'cascade' );
    } );
    $page_data_sources = PageDatasource::all();
    $page_data_sources->each( function( $page_data_source ){
      /**
       * @var PageDatasource $page_data_source
       */
      $page = $page_data_source->page_trough_id;
      if( ! $page ){
        $page_data_source->delete();
        return;
      }
      $page_data_source->page_guid = $page->guid;
      $page_data_source->save();
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
    Schema::table( 'page_data_sources', function ( Blueprint $table ){
      $table->dropColumn('page_guid' );
    } );
  }
}
