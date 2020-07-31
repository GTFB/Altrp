<?php

namespace App\Http\Controllers\Admin;


use App\Altrp\Builders\QueryBuilder;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Table;
use App\Altrp\Relationship;
use App\Altrp\Source;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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

        return response()->json(Model::getModelsForEditor());
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function models_list_for_query()
    {
        return response()->json(Model::getModelsForEditor());
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function models_options()
    {
        return response()->json(Model::getModelsOptions());
    }

    /**
     * обработка запроса на получение списка моделей с полями для динаимического контента и т. д.
     * @return \Illuminate\Http\JsonResponse
     */
    public function models_with_fields_options()
    {
        return response()->json(Model::getModelsWithFieldsOptions(), 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Создание модели
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\CommandFailedException
     * @throws \App\Exceptions\ModelNotWrittenException
     * @throws \App\Exceptions\PermissionNotWrittenException
     * @throws \App\Exceptions\RelationshipNotInsertedException
     * @throws \App\Exceptions\TableNotFoundException
     */
    function storeModel(ApiRequest $request)
    {
        if (! $request->table_id) {
            $table = new Table();
            $table->name = strtolower(\Str::plural($request->name));
            $table->title = ucfirst(\Str::plural($request->name));
            $table->user_id = auth()->user()->id;
            try {
                $table->save();
            } catch (\Exception $e) {
                return response()->json(
                    'Table already exists!',
                    200,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            }
        } else {
            $table = Table::find($request->table_id);
            if(! $table) {
                return response()->json('Table not found!', 404, [],JSON_UNESCAPED_UNICODE);
            }
        }

        $generator = new ModelGenerator(
            array_merge($request->all(), ['table_id' => $table->id])
        );

        $result = $generator->generate();

        if ($result) {
            return response()->json('Successfully generated!', 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Error', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Создать контроллер
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\CommandFailedException
     * @throws \App\Exceptions\ControllerNotWrittenException
     * @throws \App\Exceptions\RouteGenerateFailedException
     * @throws \App\Exceptions\ModelNotWrittenException
     */
    public function storeController(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);

        if (! $model)
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);

        $generator = new ControllerGenerator(
            array_merge($request->all(), ['model_id' => $model_id])
        );

        $result = $generator->generate();

        if ($result) {
            return response()->json('Success', 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Error', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param ApiRequest $request
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\Controller\ControllerFileException
     * @throws \App\Exceptions\Repository\RepositoryFileException
     */
    public function addQuery(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);

        if (! $model)
            return response()->json('Model not found!', 404, [], JSON_UNESCAPED_UNICODE);

        $builder = new QueryBuilder(
            array_merge($request->all(), ['model' => $model])
        );
        $result = $builder->build();

        if ($result) {
            return response()->json('Successfully added!', 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Error!', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
    * Получение списка сгенерированных моделей
    * @return \Illuminate\Http\JsonResponse
    */
    function getModels(ApiRequest $request)
    {
      $models = Model::all();
      return response()->json($models, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
