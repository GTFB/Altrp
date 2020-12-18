<?php

use App\Media;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MediaType2 extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Media::all()->each( function( Media $media ){
      if( ! $media->type ){
        $media->type = 'image';
        $media->save();
      }
    } );
  }

}
