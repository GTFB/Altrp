<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRecordsToAltrpSourceParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $params = [];

        $pageSources = \App\PageDatasource::all();

        foreach ($pageSources as $pageSource) {
            if ($this->isJson($pageSource->parameters)) {
                $parameters = json_decode($pageSource->parameters);
                foreach ($parameters as $parameter) {
                    $param = [
                        'page_source_id' => $pageSource->id,
                        'name' => $parameter->paramName,
                        'pattern' => $parameter->paramValue,
                        'is_required' => $parameter->required,
                    ];
                    $params[] = $param;
                }
            } else {
                $parameters = explode(PHP_EOL, $pageSource->parameters);
                foreach ($parameters as $parameter) {
                    $parameter = explode('|', $parameter);
                    $param = [
                        'page_source_id' => $pageSource->id,
                        'name' => trim($parameter[0], ' '),
                        'pattern' => trim($parameter[1], ' ')
                    ];
                    $params[] = $param;
                }
            }
        }

        $result = \App\Altrp\PageSourceParameter::insert($params);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }

    /**
     * @param $string
     * @return bool
     */
    protected function isJson($string)
    {
        json_decode($string);
        return (json_last_error() == 0);
    }
}
