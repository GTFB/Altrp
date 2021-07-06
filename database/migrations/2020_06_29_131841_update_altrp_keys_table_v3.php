<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpKeysTableV3 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
       // DB::table('altrp_keys')->join('tables','altrp_keys.source_table', '=', 'tables.name')->update(['altrp_keys.source_table' => 'tables.id']);
        
        Schema::table('altrp_keys', function ( Blueprint $table ) {
            
      //      $table->renameColumn('source_table','source_table_id');
            
        });
        
        Schema::table('altrp_keys', function ( Blueprint $table ) {
            
          //  $table->bigInteger('source_table_id')->unsigned()->change();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       /* Schema::table('altrp_keys', function ( Blueprint $table ) {
            
            $table->renameColumn('source_table_id','source_table');
            
        });
        Schema::table('altrp_keys', function ( Blueprint $table ) {
            
            $table->string('source_table')->change();
            
        });*/
    }
}
