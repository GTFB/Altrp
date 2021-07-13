<?php

use App\Constructor\Template;
use App\Constructor\TemplateSetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TemplateSettingsUpdate extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'template_settings', function ( Blueprint $table ){
      $table->uuid( 'template_guid' )->nullable()->index();
    } );
    $settings = TemplateSetting::all();
    $settings->each( function ( TemplateSetting $setting ) {
      $template = Template::find( $setting->template_id );
      if( ! $template ){
        $setting->delete();
      }
      $setting->template_guid = $template->guid ?? null;
      $setting->save();
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
    Schema::table( 'template_settings', function ( Blueprint $table ){
      $table->dropColumn( 'template_guid' );
    } );
  }
}
