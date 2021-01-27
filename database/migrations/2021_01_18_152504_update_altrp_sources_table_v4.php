<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAltrpSourcesTableV4 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
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

            $data = ['request_type' => $requestType, 'title' => $source->name];

            switch ($source->type) {
                case 'add':
                case 'update':
                case 'delete':
                case 'update_column':
                    $data['auth'] = 1;
            }


            $source->update($data);
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
    }
}
