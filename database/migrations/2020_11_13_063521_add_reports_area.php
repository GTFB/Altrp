<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReportsArea extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       DB::table('areas')->insert([
        'created_at'=>Carbon::now(),
        'updated_at'=>Carbon::now(),
        'name'=>'reports',
        'settings'=>json_encode('[]'),
        'title'=> 'Reports'
       ]);  
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('areas')->where('name','=','reports')->delete();
    }
}
