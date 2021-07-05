<?php

use App\Constructor\Template;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class HeaderFooterAllSite extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    $templates = Template::join( 'areas', 'areas.id', '=', 'templates.area' )
      ->whereIn( 'areas.name', ['header', 'footer'] );
    //
    $templates->update( ['all_site' => 1]);
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
