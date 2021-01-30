<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;

class AreaMail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

      DB::table('areas')->insert([
        'created_at'=>Carbon::now(),
        'updated_at'=>Carbon::now(),
        'name'=>'email',
        'settings'=>'[]',
        'title'=> 'Email Templates'
      ]);
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
