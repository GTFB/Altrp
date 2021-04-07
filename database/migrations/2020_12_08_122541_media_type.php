<?php

use App\Media;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MediaType extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table('altrp_media', function (Blueprint $table) {
      $table->string('type', 50)->nullable()->index();
    });

    Media::all()->each(function (Media $media) {
      $media->type = 'image';
      $media->save();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    //
    Schema::table('altrp_media', function (Blueprint $table) {
      $table->dropColumn('type');
    });
  }
}
