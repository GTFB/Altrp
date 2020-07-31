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
    return response()->json( Model::getModelsWithFieldsOptions(), 200, [],JSON_UNESCAPED_UNICODE );
  }

  /**
   * Получение списка сгенерированных моделей
   * @return \Illuminate\Http\JsonResponse
   */
  function getModels(ApiRequest $request) {
      $models = Model::all();
      return response()->json($models, 200, [],JSON_UNESCAPED_UNICODE);
  }
}