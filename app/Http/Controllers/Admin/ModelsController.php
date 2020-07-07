<?php

namespace App\Http\Controllers\Admin;


use App\Altrp\Model;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ApiRequest;


class ModelsController extends Controller
{
  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function models_list()
  {
    $test_res = [

      [
        'name' => 'post',
        'title' => 'Post',
        'ordering_fields' => [
          ['title' => 'Title',],
          ['date' => 'Date',],
          ['random' => 'Random',],
        ],
      ],
      [
        'name' => 'model1',
        'title' => 'Model 1',
        'ordering_fields' => [
          ['name' => 'Name',],
          ['date' => 'Date',],
          ['random' => 'Random',],
        ],
      ],
    ];

    return response()->json( Model::getModelsForEditor() );
  }
  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function models_list_for_query()
  {
    return response()->json( Model::getModelsForEditor() );
  }

  /**
   * @return \Illuminate\Http\JsonResponse
   */
  public function models_options()
  {
    return response()->json( Model::getModelsOptions() );
  }
  
    /**
     * Получение списка сгенерированных моделей
     * @return type
     */
    function getModels(ApiRequest $request) {
        $models = Model::all();
        return response()->json($models, 200, [],JSON_UNESCAPED_UNICODE);
    }
}