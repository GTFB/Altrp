<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string( 'name' )->index();
            $table->longText( 'settings' );
        });
        $areas = [
          [
            'name' => 'content',
            'settings' => json_encode( [] ),
          ],
          [
            'name' => 'header',
            'settings' => json_encode( [] ),
          ],
          [
            'name' => 'footer',
            'settings' => json_encode( [] ),
          ],
        ];

      foreach ( $areas as $_area ) {
        $area = new \App\Area($_area);
        $area->save();
      }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('areas');
    }
}
