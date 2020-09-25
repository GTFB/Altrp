<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpSourcesTableV2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('altrp_sources', function (Blueprint $table) {
            $table->string('title')->after('name');
            $table->string('request_type')->after('type');
        });

        $sources = \App\Altrp\Source::all();

        foreach ($sources as $source) {
          if( ! $source->model ){
            continue;
          }
          switch ($source->type) {
            case 'get':
            case 'show':
            case 'options':
            case 'filters':
                $requestType = 'get';
                break;
            case 'add':
                $requestType = 'post';
                break;
            case 'update':
            case 'update_column':
                $requestType = 'put';
                break;
            case 'delete':
                $requestType = 'delete';
                break;
            default:
                $requestType = 'get';
          }
          $source->update(['request_type' => $requestType, 'title' => $source->name]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //

      Schema::table('altrp_sources', function (Blueprint $table) {
        $table->dropColumn('title');
        $table->dropColumn('request_type');
      });
    }
}
