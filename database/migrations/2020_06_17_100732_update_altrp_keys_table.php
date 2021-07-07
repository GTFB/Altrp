<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_keys', function ( Blueprint $table ) {

      //    $table->dropForeign(['source_table_id']);
          $table->dropForeign(['target_table_id']);
          $table->dropForeign(['source_column_id']);
          $table->dropForeign(['target_column_id']);

        //  $table->renameColumn('source_table_id', 'source_table');
          $table->renameColumn('target_table_id', 'target_table');
          $table->renameColumn('source_column_id', 'source_column');
          $table->renameColumn('target_column_id', 'target_column');

        });
        
        Schema::table('altrp_keys', function ( Blueprint $table ) {
          //  $table->string("source_table")->change();
            $table->string("target_table")->change();
            $table->string("source_column")->change();
            $table->string("target_column")->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('altrp_keys', function ( Blueprint $table ) {
            //$table->renameColumn('source_table', 'source_table_id');
            $table->renameColumn('target_table', 'target_table_id');
            $table->renameColumn('source_column', 'source_column_id');
            $table->renameColumn('target_column', 'target_column_id');
            
           // $table->foreign('source_table_id')->references('id')->on('tables');
            $table->foreign('target_table_id')->references('id')->on('tables');
            $table->foreign('source_column_id')->references('id')->on('tables');
            $table->foreign('target_column_id')->references('id')->on('tables');
        });
        
        Schema::table('altrp_keys', function ( Blueprint $table ) {
           // $table->bigInteger('source_table_id')->unsigned()->change();
                $table->bigInteger('target_table_id')->unsigned()->change();
                $table->bigInteger('source_column_id')->unsigned()->change();
                $table->bigInteger('target_column_id')->unsigned()->change();
        });
    }
}
