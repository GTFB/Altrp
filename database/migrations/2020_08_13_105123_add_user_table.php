<?php

use App\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    //
    Schema::table( 'tables', function ( Blueprint $table ){
      $table->bigInteger( 'user_id' )->unsigned()->nullable()->change();
      $table->boolean( 'preset' )->default( false );
    });
    Schema::table( 'altrp_models', function ( Blueprint $table ){
      $table->boolean( 'preset' )->default( false );
    });
    Schema::table( 'altrp_columns', function ( Blueprint $table ){
      $table->bigInteger( 'user_id' )->unsigned()->nullable()->change();
      $table->bigInteger( 'altrp_migration_id' )->unsigned()->nullable()->change();
      $table->boolean( 'preset' )->default( false );
    });
    $table_id = DB::table('tables')->insertGetId( [
      'name' => 'users',
      'title' => 'Users',
      'preset' => true,
    ] );
    $model_id = DB::table( 'altrp_models'   )->insertGetId( [
      'name' => 'user',
      'title' => 'User',
      'table_id' => $table_id,
      'soft_deletes' => 0,
      'time_stamps' => 0,
      'pk' => 'id',
      'preset' => true,
    ] );
    $column_id = DB::table( 'altrp_columns' )->insertGetId( [
      'name' => 'id',
      'title' => 'ID',
      'type' => 'bigInteger',
      'preset' => true,
      'table_id' => $table_id,
      'indexed' => true,
    ] );
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    //
    Schema::table( 'tables', function ( Blueprint $table ){
      $table->dropColumn( 'preset' );
    });
    Schema::table( 'altrp_models', function ( Blueprint $table ){
      $table->dropColumn( 'preset' );
    });
    Schema::table( 'altrp_columns', function ( Blueprint $table ){
      $table->dropColumn( 'preset' );
    });
  }
}
