<?php

use App\Constructor\Template;
use App\Media;
use App\Page;
use App\PagesTemplate;
use Faker\Provider\Uuid;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class GenerateGuids extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {

    $templates = Template::where( 'type', 'template' )->get();

    $templates->each( function ( $template ) {
      $template->guid = (string)Str::uuid();
      $template->save();
    });

    $pages = Page::all();
    $pages->each( function ( $page ) {
      $page->guid = (string)Str::uuid();
      $page->save();
    });

    $templates->each( function ( $template ) {
      $template->pages_templates->each( function ( PagesTemplate $pages_template ) {
        $page = $pages_template->page_trough_id;
        $template = $pages_template->template_trough_id;

        if(!$page) {
          $pages_template->delete();
          return true;
        }

        $pages_template->page_guid = $page->guid;
        $pages_template->template_guid = $template->guid;


        $pages_template->save();
      } );
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
  }
}
