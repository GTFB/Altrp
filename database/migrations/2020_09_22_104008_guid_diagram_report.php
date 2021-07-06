<?php

use App\Altrp\AltrpDiagram;
use App\Dashboards;
use App\Reports;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class GuidDiagramReport extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'altrp_diagrams', function ( Blueprint $table ) {
      $table->uuid( 'guid' )->nullable()->index( 'guid' )->unique();
    } );
    Schema::table( 'reports', function ( Blueprint $table ) {
      $table->uuid( 'guid' )->nullable()->index( 'guid' )->unique();
    } );
    Schema::table( 'dashboards', function ( Blueprint $table ) {
      $table->uuid( 'guid' )->nullable()->index( 'guid' )->unique();
    } );
    $reports = Reports::all();
    $reports->each( function ( Reports $report ) {
      $report->guid = (string)Str::uuid();
      $report->save();
    } );
    $diagrams = AltrpDiagram::all();
    $diagrams->each( function ( AltrpDiagram $diagram ) {
      $diagram->guid = (string)Str::uuid();
      $diagram->save();
    } );
    $dashboards = Dashboards::all();
    $dashboards->each( function ( Dashboards $dashboard ) {
      $dashboard->guid = (string)Str::uuid();
      $dashboard->save();
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

    Schema::table( 'altrp_diagrams', function ( Blueprint $table ) {
      $table->dropColumn( 'guid' );
    } );
    Schema::table( 'reports', function ( Blueprint $table ) {
      $table->dropColumn( 'guid' );
    } );
  }
}
