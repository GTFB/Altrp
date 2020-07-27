<?php

namespace App\Http\Controllers\Admin;


use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Relationship;
use App\Altrp\Source;
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
     * Получить модель и кол-во страниц
     *
     * @param ApiRequest $request
     * @return array
     */
    private function getModelsAndPageCount(ApiRequest $request)
    {
        $search = $request->get('s');
        $page = $request->get('page');
        if (! $page) {
            $pageCount = 0;
            $models = $search
                ? Model::getBySearch($search)
                : Model::all();
        } else {
            $modelsCount = $search ? Model::getCountWithSearch($search) : Model::getCount();
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($modelsCount / $limit);
            $offset = $limit * ($page - 1);
            $models = $search
                ? Model::getBySearchWithPaginate($search, $offset, $limit)
                : Model::getWithPaginate($offset, $limit);
        }
        return compact('pageCount', 'models');
    }

    /**
     * Получить поля модели и кол-во страниц
     *
     * @param ApiRequest $request
     * @return array
     */
    private function getModelFieldsAndPageCount(ApiRequest $request)
    {
        $search = $request->get('s');
        $page = $request->get('page');
        if (! $page) {
            $pageCount = 0;
            $fields = $search
                ? Column::getBySearch($search, $request->model_id)
                : Column::where('model_id', $request->model_id)->get();
        } else {
            $fieldsCount = $search
                ? Column::getCountWithSearch($search, $request->model_id)
                : Column::getCount($request->model_id);
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($fieldsCount / $limit);
            $offset = $limit * ($page - 1);
            $fields = $search
                ? Column::getBySearchWithPaginate($search, $request->model_id, $offset, $limit)
                : Column::getWithPaginate($request->model_id, $offset, $limit);
        }
        return compact('pageCount', 'fields');
    }

    /**
     * Получить связи модели и кол-во страниц
     *
     * @param ApiRequest $request
     * @return array
     */
    private function getModelRelationsAndPageCount(ApiRequest $request)
    {
        $search = $request->get('s');
        $page = $request->get('page');
        if (! $page) {
            $pageCount = 0;
            $relations = $search
                ? Relationship::getBySearch($search, $request->model_id)
                : Relationship::where('model_id', $request->model_id)->get();
        } else {
            $relationsCount = $search
                ? Relationship::getCountWithSearch($search, $request->model_id)
                : Relationship::getCount($request->model_id);
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($relationsCount / $limit);
            $offset = $limit * ($page - 1);
            $relations = $search
                ? Relationship::getBySearchWithPaginate($search, $request->model_id, $offset, $limit)
                : Relationship::getWithPaginate($request->model_id, $offset, $limit);
        }
        return compact('pageCount', 'relations');
    }

    private function getDataSourcesAndPageCount(ApiRequest $request)
    {
        $search = $request->get('s');
        $page = $request->get('page');
        if (! $page) {
            $pageCount = 0;
            $data_sources = $search
                ? Source::getBySearch($search)
                : Source::all();
        } else {
            $dataSourcesCount = $search
                ? Source::getCountWithSearch($search)
                : Source::getCount();
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($dataSourcesCount / $limit);
            $offset = $limit * ($page - 1);
            $data_sources = $search
                ? Source::getBySearchWithPaginate($search,  $offset, $limit)
                : Source::getWithPaginate($offset, $limit);
        }
        return compact('pageCount', 'data_sources');
    }

    /**
     * Получение списка сгенерированных моделей
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getModels(ApiRequest $request)
    {
        $result = $this->getModelsAndPageCount($request);
        $models = [
            'models' => $result['models'],
            'pageCount' => $result['pageCount']
        ];
        return response()->json($models, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить модели для списка опций: id, name
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getModelOptions(ApiRequest $request)
    {
        $result = $this->getModelsAndPageCount($request);
        $options = [];
        foreach ($result['models'] as $model) {
            $options[] = [
                'value' => $model->id,
                'label' => $model->title,
            ];
        }
        $models = [
            'options' => $options,
            'pageCount' => $result['pageCount']
        ];
        return response()->json($models, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Добавить новую модель
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeModel(ApiRequest $request)
    {
        $model = new Model($request->all());
        $result = $model->save();
        if ($result) {
            return response()->json($model, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to create model', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить модель
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateModel(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $model->update($request->all());
        if ($result) {
            return response()->json($model, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to update model', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить модель по ID
     *
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showModel($model_id)
    {
        $model = Model::find($model_id);
        if ($model) {
            return response()->json($model, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить модель
     *
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyModel($model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $model->delete();
        if ($result) {
            return response()->json($model, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to delete model', 500, [], JSON_UNESCAPED_UNICODE);
    }

    // Fields

    /**
     * Получить поля медели
     *
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getModelFields($model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $fields = $model->table->actual_columns;
        return response()->json($fields, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить поля для списка опций
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getModelFieldOptions(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $this->getModelFieldsAndPageCount($request);
        $options = [];
        foreach ($result['fields'] as $field) {
            $options[] = [
                'value' => $field->id,
                'label' => $field->title,
            ];
        }
        $options = [
            'options' => $options,
            'pageCount' => $result['pageCount']
        ];
        return response()->json($options, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Добавить новое поле
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeModelField(ApiRequest $request, $model_id)
    {
        $field = new Column($request->all());
        $result = $field->save();
        if ($result) {
            return response()->json($field, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to create field', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить поле
     *
     * @param ApiRequest $request
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateModelField(ApiRequest $request, $model_id, $field_id)
    {
        $field = Column::where([['model_id', $model_id], ['id', $field_id]])->first();
        if (! $field) {
            return response()->json('Field not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $field->update($request->all());
        if ($result) {
            return response()->json($field, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to create model', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить поле по ID
     *
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showModelField($model_id, $field_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $field = Column::where([['model_id', $model_id], ['id', $field_id]])->first();
        if ($field) {
            return response()->json($field, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Field not found', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить поле
     *
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyModelField($model_id, $field_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $field = Column::where([['model_id', $model_id], ['id', $field_id]])->first();
        if (! $field) {
            return response()->json('Field not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $field->delete();
        if ($result) {
            return response()->json($field, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to delete field', 500, [], JSON_UNESCAPED_UNICODE);
    }

    // Relations

    /**
     * Получить связи медели
     *
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getModelRelations($model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $relations = $model->table->relationships;
        return response()->json($relations, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить связи модели для списка опций
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getModelRelationOptions(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $this->getModelRelationsAndPageCount($request);
        $options = [];
        foreach ($result['relations'] as $relation) {
            $options[] = [
                'value' => $relation->id,
                'label' => $relation->title,
            ];
        }
        $options = [
            'options' => $options,
            'pageCount' => $result['pageCount']
        ];
        return response()->json($options, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Добавить новоую связь с моделью
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeModelRelation(ApiRequest $request)
    {
        $relation = new Relationship($request->all());
        $result = $relation->save();
        if ($result) {
            return response()->json($relation, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to create relation', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить связь модели
     *
     * @param ApiRequest $request
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateModelRelation(ApiRequest $request, $model_id, $field_id)
    {
        $relation = Relationship::where([['model_id', $model_id], ['id', $field_id]])->first();
        if (! $relation) {
            return response()->json('Relation not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $relation->update($request->all());
        if ($result) {
            return response()->json($relation, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to update relation', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить связь по ID
     *
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showModelRelation($model_id, $field_id)
    {
        $relation = Relationship::where([['model_id', $model_id], ['id', $field_id]])->first();
        if ($relation) {
            return response()->json($relation, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Relation not found', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить связь с моделью
     *
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyModelRelation($model_id, $field_id)
    {
        $relation = Relationship::where([['model_id', $model_id], ['id', $field_id]])->first();
        if (! $relation) {
            return response()->json('Relation not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $relation->delete();
        if ($result) {
            return response()->json($relation, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to delete relation', 500, [], JSON_UNESCAPED_UNICODE);
    }

    // Data Sources

    /**
     * Получить источники данных
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDataSources(ApiRequest $request)
    {
        $dataSources = $this->getDataSourcesAndPageCount($request);
        return response()->json($dataSources, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить источники данных для списка опций
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDataSourceOptions(ApiRequest $request)
    {
        $result = $this->getDataSourcesAndPageCount($request);
        $options = [];
        foreach ($result['data_sources'] as $source) {
            $options[] = [
                'value' => $source->id,
                'label' => $source->title,
            ];
        }
        $options = [
            'options' => $options,
            'pageCount' => $result['pageCount']
        ];
        return response()->json($options, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Добавить новый источник данных
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeDataSource(ApiRequest $request)
    {
        $dataSource = new Source($request->all());
        $result = $dataSource->save();
        if ($result) {
            return response()->json($dataSource, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to create data source', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить источник данных
     *
     * @param ApiRequest $request
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateDataSource(ApiRequest $request, $model_id)
    {
        $dataSource = Source::where([['model_id', $model_id]])->first();
        if (! $dataSource) {
            return response()->json('Data source not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $dataSource->update($request->all());
        if ($result) {
            return response()->json($dataSource, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to update data source', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить источник данных по ID
     *
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showDataSource($model_id)
    {
        $dataSource = Source::where([['model_id', $model_id]])->first();
        if ($dataSource) {
            return response()->json($dataSource, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Data source not found', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить источник данных
     *
     * @param $model_id
     * @param $field_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyDataSource($model_id)
    {
        $dataSource = Source::where([['model_id', $model_id]])->first();
        if (! $dataSource) {
            return response()->json('Data source not found', 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $dataSource->delete();
        if ($result) {
            return response()->json($dataSource, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json('Failed to delete data source', 500, [], JSON_UNESCAPED_UNICODE);
    }
}
