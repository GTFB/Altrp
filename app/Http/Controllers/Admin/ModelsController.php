<?php

namespace App\Http\Controllers\Admin;


use App\Altrp\Model;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


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
   * обработка запроса на получение списка моделей с полями для динаимического контента и т. д.
   * @return \Illuminate\Http\JsonResponse
   */
  public function models_with_fields_options()
  {
    return response()->json( Model::getModelsWithFieldsOptions() );
  }
}