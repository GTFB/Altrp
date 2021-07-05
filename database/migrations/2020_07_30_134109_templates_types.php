<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TemplatesTypes extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //

    Schema::table('areas', function (Blueprint $table) {
      $table->string( 'title' )->index()->default( '' );
      });
    $areas = [
      [
        'name' => 'card',
        'title' => 'Card',
        'settings' => json_encode( [] ),
      ],
      [
        'name' => 'popup',
        'title' => 'Popup',
        'settings' => json_encode( [] ),
      ],
    ];


    foreach ( $areas as $_area ) {
      $area = new \App\Area($_area);
      $area->save();
    }
    $areas = [
      [
        'name' => 'content',
        'title' => 'Content',
        'settings' => json_encode( [] ),
      ],
      [
        'name' => 'header',
        'title' => 'Header',
        'settings' => json_encode( [] ),
      ],
      [
        'name' => 'footer',
        'title' => 'Footer',
        'settings' => json_encode( [] ),
      ],
    ];
    foreach ( $areas as $_area ) {
      $area = new \App\Area();
      $area = $area->where( 'name', $_area['name'] )->get()->first();
      $area->title = $_area['title'];

      $area->save();
    }

  }

  /**
   * Reverse the migrations.
   *
   * @return void
   * @throws Exception
   */
  public function down()
  {
    //

    Schema::table('areas', function (Blueprint $table) {
      $table->dropColumn( 'title' );
    });

    $areas = [
      [
        'name' => 'card',
        'title' => 'Card',
        'settings' => json_encode( [] ),
      ],
      [
        'name' => 'popup',
        'title' => 'Popup',
        'settings' => json_encode( [] ),
      ],
    ];

    foreach ( $areas as $_area ) {
      $area = new \App\Area();
      $area->where( 'name', $_area['name'] )->get()->first();
      $area->delete();
    }
  }
}
