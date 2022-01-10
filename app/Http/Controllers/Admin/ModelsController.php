<?php

namespace App\Http\Controllers\Admin;


use App\Altrp\Accessor;
use App\Altrp\Builders\QueryBuilder;
use App\Altrp\Controller;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Query;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Altrp\Table;
use App\Altrp\Relationship;
use App\Altrp\Source;
use App\Altrp\ValidationField;
use App\Altrp\ValidationRule;
use App\Http\Controllers\Controller as HttpController;
use App\Http\Requests\Admin\ModelRequest;
use App\Permission;
use App\Role;
use App\SQLEditor;
use App\CategoryObject;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class ModelsController extends HttpController
{
    /**
     * @return JsonResponse
     */
    public function models_list()
    {
        return response()->json(Model::getModelsForEditor());
    }

    /**
     * @return JsonResponse
     */
    public function models_list_for_query()
    {
        return response()->json(Model::getModelsForEditor());
    }

    /**
     * Получить модели без родительской модели
     *
     * @return JsonResponse
     */
    public function getModelsWithoutParent()
    {
        $models = Model::select(['id as value', 'title as label'])
            ->whereNull('parent_model_id')
            ->get();
        return response()->json($models, 200);
    }

    /**
     * Получить модели, которые не являются предустановленными
     *
     * @return JsonResponse
     */
    public function getModelsWithoutPreset()
    {
        $models = Model::select(['id as value', 'title as label'])
            ->where('preset', 0)
            ->get();
        return response()->json([
            'options' => $models,
            'pageCount' => 0
        ], 200);
    }

  /**
   * @param Request $request
   * @return JsonResponse
   */
    public function models_options( Request $request )
    {
      $search_text = $request->get( 's' );
      if( ! $request->get( 'with_sql_queries' ) ){
        return response()->json(
          Model::getModelsOptions(
            $request->get( 'with_names' ),
            $request->get( 'not_plural' ),
            $request->get( 's' )
          ));
      } else {
        $data_sources = [];
        $model_data_sources = [];
        foreach ( Model::getModelsOptions(
          $request->get( 'with_names' ),
          $request->get( 'not_plural' ),
          $request->get( 's' )
        ) as $modelsOption ) {
          if( $modelsOption['value'] === 'user' ){
            continue;
          }
          $model_data_sources[] = [
            'label' => $modelsOption['label'],
            'value' => $modelsOption['value'],
            'type' => 'model_query'
          ];
        }

        if( count( $model_data_sources ) ){
          $data_sources[] = [
            'label' => 'Models',
            'options' => $model_data_sources,
            'type' => 'models query'
          ];
        }
        /**
         * Добавляем варианты с SQL-editors
         */
        $sql_editors_data_sources = [];

        $_sqls = SQLEditor::where( 'title', 'LIKE', '%' . $search_text . '%' )->get();

        foreach ( $_sqls as $sql ) {
          $sql_editors_data_sources[] = [
            'label' => $sql->model->title . ': ' . $sql->title,
            'value' => '/ajax/models/queries/' . $sql->model->altrp_table->name . '/' . $sql->name,
            'sql_name' => $sql->name,
            'type' => 'sql_datasource'
          ];
        }

        if( count( $sql_editors_data_sources ) ){
          $data_sources[] = [
            'label' => 'Data from SQLEditors',
            'options' => $sql_editors_data_sources,
          ];
        }

        return response()->json( $data_sources, 200, [],JSON_UNESCAPED_UNICODE );
      }
    }

    /**
     * обработка запроса на получение списка моделей с полями для динаимического контента и т. д.
     * @return JsonResponse
     */
    public function models_with_fields_options()
    {
        return response()->json(Model::getModelsWithFieldsOptions(), 200, [], JSON_UNESCAPED_UNICODE);
    }
  /**
   * Источники данных для QueryController
   */
    public function data_sources_for_query(){
      $data_sources = [];
      $models = Model::all( );
      $model_data_sources = [];
      foreach ( $models as $model ) {
        if( $model->name === 'user' ){
          continue;
        }
        $model_data_sources[] = [
          'label' => $model->title,
          'value' => $model->altrp_table->name,
          'type' => 'model_query'
        ];
      }

      if( count( $model_data_sources ) ){
        $data_sources[] = [
          'label' => 'Models',
          'options' => $model_data_sources,
          'type' => 'models query'
        ];
      }

      $relationships = Relationship::where( 'type', 'hasMany' )->get();
      $relationship_data_sources = [];
      foreach ( $relationships as $relationship ) {
        $relationship_data_sources[] = [
          'label' => $relationship->altrp_model->title . ': ' . $relationship->title,
          'value' => $relationship->name,
          'model_name' =>  $relationship->altrp_model->altrp_table->name,
          'type' => 'has_many_relation'
        ];
      }
      if( count( $relationship_data_sources ) ){
        $data_sources[] = [
          'label' => 'Relationships from Models',
          'options' => $relationship_data_sources,
        ];
      }

      /**
       * Добавляем варианты с SQL-editors
       */
      $sql_editors_data_sources = [];

      $_sqls = SQLEditor::all();

      foreach ( $_sqls as $sql ) {
        $sql_editors_data_sources[] = [
          'label' => $sql->model->title . ': ' . $sql->title,
          'value' => '/ajax/models/queries/' . $sql->model->altrp_table->name . '/' . $sql->name,
          'sql_name' => $sql->name,
          'type' => 'sql_datasource'
        ];
      }

      if( count( $sql_editors_data_sources ) ){
        $data_sources[] = [
          'label' => 'Data from SQLEditors',
          'options' => $sql_editors_data_sources,
        ];
      }
      return response()->json( $data_sources, 200, [], JSON_UNESCAPED_UNICODE);
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
        $categories = $request->get('categories');
        $page = $request->get('page');
        $orderColumn = $request->get('order_by') ?? 'title';
        $orderColumn = 'altrp_models.' . $orderColumn;
        $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
        if (! $page) {
            $pageCount = 0;
            //$sortType = 'sortBy' . ($orderType == 'Asc' ? '' : $orderType);
            $models = $search
                ? Model::getBySearch($search, $orderColumn, $orderType, $categories)
                //: Model::all()->$sortType( $orderColumn )->values();
                : Model::select('altrp_models.*')->with('categories.category')
                    ->when($categories, function ($query, $categories) {
                        if (is_string($categories)) {
                            $categories = explode(",", $categories);
                            $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
                                  ->whereIn('altrp_category_objects.category_guid', $categories);
                        }
                    })
                    //->$sortType( $orderColumn )->values();
                    ->orderBy($orderColumn, $orderType)
                    ->get();

        } else {
            $modelsCount = $search || $categories ? Model::getCountWithSearch($search, $categories) : Model::getCount();
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($modelsCount / $limit);
            $offset = $limit * ($page - 1);
            $models = $search
                ? Model::getBySearchWithPaginate($search, $offset, $limit, $request, $orderColumn, $orderType, $categories)
                : Model::getWithPaginate($offset, $limit, $request, $orderColumn, $orderType, $categories);

          $models = $models->get();
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

        $model = Model::find($request->model_id);
        $ns = '\\' . $model->namespace;
        $count = $model->altrp_table->columns->count();
        /**
         * @var $model \Illuminate\Database\Eloquent\Model
         */
        $model = new $ns;

        if (! $page && $count > 1) {
            $pageCount = 0;
            $fields = $search
                ? Column::getBySearch($search, $request->model_id)
                : Column::where('model_id', $request->model_id)->get();
        } elseif ($page && $count > 1) {
            $fieldsCount = $search
                ? Column::getCountWithSearch($search, $request->model_id)
                : Column::getCount($request->model_id);
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($fieldsCount / $limit);
            $offset = $limit * ($page - 1);
            $fields = $search
                ? Column::getBySearchWithPaginate($search, $request->model_id, $offset, $limit)
                : Column::getWithPaginate($request->model_id, $offset, $limit);
        } else {
            $fields = $model->getFillable();
            $pageCount = 0;
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

    /**
     * Получить источники данных и кол-во страниц
     *
     * @param ApiRequest $request
     * @return array
     */
    private function getDataSourcesAndPageCount(ApiRequest $request)
    {
        $search = $request->get('s');
        $page = $request->get('page');
        if (Str::contains($request->order_by, '.')) {
            $parts = explode('.', $request->order_by);
            $request->order_by = 'altrp_' . Str::plural($parts[0]) . '.' . $parts[1];
        }
        $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Asc';
        //$orderColumn = $request->order_by ? $request->order_by : 'id';
        $orderColumn = $request->order_by ? $request->order_by : 'title';
        $sortType = 'sortBy' . ($orderType == 'Asc' ? '' : $orderType);
        if (! $page) {
            $pageCount = 0;
            $data_sources = $search
                ? Source::getBySearch($search, 'name', ['model'], $orderColumn, $orderType)
                : Source::with('model')->get()->$sortType($orderColumn)->values();
        } else {
            $dataSourcesCount = $search
                ? Source::getCountWithSearch($search)
                : Source::getCount();
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($dataSourcesCount / $limit);
            $offset = $limit * ($page - 1);
            $data_sources = $search
                ? Source::getBySearchWithPaginate($search,  $offset, $limit, 'name', $orderColumn, $orderType, ['model'])
                : Source::getWithPaginate($offset, $limit, $orderColumn, $orderType, ['model']);
        }
      $data_sources->map( function ( $data_source ){
        $data_source->web_url = $data_source->web_url;
        return $data_source;
      } );
        return compact('pageCount', 'data_sources');
    }

    /**
     * Получение списка сгенерированных моделей
     *
     * @param ApiRequest $request
     * @return JsonResponse
     */
    public function getModels(ApiRequest $request)
    {
        $result = $this->getModelsAndPageCount($request);
        return response()->json($result, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить модели для списка опций: id, name
     *
     * @param ApiRequest $request
     * @return JsonResponse
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
     * Создание модели
     *
     * @param ApiRequest $request
     * @return JsonResponse
     */
  function storeModel(ApiRequest $request)
  {
    $request->validate([
      'title' => 'required|max:32',
      'name' => 'required|max:32'
    ]);

    if ($request->user_id) {
        $request->merge(['user_id' => Auth::user()->id]);
    }

    $model = new Model($request->all());
    $model->guid = (string)Str::uuid();
    $result = $model->save();
    if ($result) {

      $categories = $request->get( '_categories' );
      if( is_array($categories) && count($categories) > 0 && $model->guid){
        $insert = [];
        foreach($categories as $key => $category){
          $insert[$key] = [
            "category_guid" => $category['value'],
            "object_guid" => $model->guid,
            "object_type" => "Model"
          ];
        }
        CategoryObject::insert($insert);
      }

      return response()->json( [ 'success' => true ], 200, [], JSON_UNESCAPED_UNICODE );
    }
    return response()->json([
      'success' => false,
      'message' => 'Failed to store model'
    ], 500, [], JSON_UNESCAPED_UNICODE);
  }

    /**
     * Обновить модель
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return JsonResponse
     */
    public function updateModel(ApiRequest $request, $model_id)
    {
        $request->validate([
            'title' => 'required|max:32',
            'name' => 'required|max:32'
        ]);
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }

        if ($request->user_id) {
            $request->merge(['user_id' => Auth::user()->id]);
        } else {
            $request->merge(['user_id' => null]);
        }

        $result = $model->update($request->all());
        if ($result) {

            CategoryObject::where("object_guid", $model->guid)->delete();
            $categories = $request->get( '_categories' );
            if( is_array($categories) && count($categories) > 0 && $model->guid){
              $insert = [];
              foreach($categories as $key => $category){
                $insert[$key] = [
                  "category_guid" => $category['value'],
                  "object_guid" => $model->guid,
                  "object_type" => "Model"
                ];
              }
              CategoryObject::insert($insert);
            }

            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to update model'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить модель по ID
     *
     * @param $model_id
     * @return JsonResponse
     */
    public function showModel($model_id)
    {
        $model = Model::find($model_id);

        if ($model) {
            $model->categories = $model->categoryOptions();
            return response()->json($model, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Model not found'
        ], 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить модель
     *
     * @param $model_id
     * @return JsonResponse
     */
    public function destroyModel($model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $model->delete();
        if ($result) {

            CategoryObject::where("object_guid", $model->guid)->delete();

            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete model'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
 * Проверить, свободно ли имя модели
 *
 * @param ApiRequest $request
 * @return JsonResponse
 */
    public function modelNameIsFree(ApiRequest $request)
    {
        $name = (string) $request->get('name');
        if (!$name)
            return response()->json([
                'success' => false,
                'message' => 'Name not specified'
            ], 500, [], JSON_UNESCAPED_UNICODE);
        $model = Model::where('name', $name)->first();
        return response()->json([
            'taken' => !$model,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    // Fields
    /**
     * Получить поля модели
     *
     * @param $model_id
     * @return JsonResponse
     */
    public function getModelFields($model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $fields = $model->table->columns;
        return response()->json($fields, 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function getOnlyModelFields($model_id)
    {
        /**
         * @var $model Model
         */
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $fields = $model->table->onlyColumns();
        $relFields = [];
        $relations = $model->altrp_relationships;
        foreach ($relations as $relation) {
            $relFields = array_merge($relFields, $relation->altrp_target_model->table->columns->each(function ($column) use ($relation){
                $column->name = $relation->altrp_target_model->table->name . '.' . $column->name;
                $column->title = $relation->altrp_target_model->table->name . '.' . $column->title;
            })->toArray());
        }
        $fields = array_merge($fields->toArray(), $relFields);
        return response()->json($fields, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить поля для списка опций
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return JsonResponse
     */
    public function getModelFieldOptions(ApiRequest $request, $model_id)
    {

      $model = Model::find($model_id);
      if (! $model) {
          return response()->json([
              'success' => false,
              'message' => 'Model not found'
          ], 404, [], JSON_UNESCAPED_UNICODE);
      }
      $result = $this->getModelFieldsAndPageCount($request);
      $options = [];
      foreach ($result['fields'] as $field) {
          $options[] = [
              'value' => $field->id ?? $field,
              'label' => $field->title ?? $field,
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
     * @return JsonResponse
     */
    public function storeModelField(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        if ($request->get('type') !== 'calculated') {
            $field = new Column($request->all());
            $field->user_id = auth()->user()->id;
            $field->table_id = $model->altrp_table->id;
            $field->model_id = $model->id;
            $result = $field->save();
        } else {
            $accessor = new Accessor($request->all());
            if ($request->has('calculation_logic'))
                $accessor->calculation_logic = json_encode($accessor->calculation_logic);
            $accessor->user_id = auth()->user()->id;
            $accessor->model_id = $model->id;
            $result = $accessor->save();

            $field = new Column([
                'name' => $request->name,
                'title' => $request->title,
                'description' => $request->description,
                'type' => $request->type,
            ]);
            $field->user_id = auth()->user()->id;
            $field->table_id = $model->altrp_table->id;
            $field->model_id = $model->id;
            Column::withoutEvents(function () use ($field) {
                $field->save();
            });
        }

        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to create field'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить поле
     *
     * @param ApiRequest $request
     * @param $model_id
     * @param $field_id
     * @return JsonResponse
     */
    public function updateModelField(ApiRequest $request, $model_id, $field_id)
    {
        $data = $request->all();

        /**
         * @var $field Column
         */
        $field = Column::where([['model_id', $model_id], ['id', $field_id]])->first();

        if ($field->getOriginal() == 'calculated' && $field->getOriginal() != $data['type']) {
            $accessor = Accessor::where([['model_id', $model_id], ['name', $field->name]])->first();
            $accessor->delete();
        }

        if (isset($data['type']) && $data['type'] === 'calculated') {
            $field = Accessor::where([['model_id', $model_id], ['name', $field->name]])->first();
            if (isset($data['calculation_logic'])) {
                $data['calculation_logic'] = json_encode($data['calculation_logic']);
                $data['calculation'] = null;
            } else {
                $data['calculation_logic'] = null;
            }
        }

        if (! $field) {
            return response()->json([
                'success' => false,
                'message' => 'Field not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }

        $result = $field->update($data);

        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to update model field'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить поле по ID
     *
     * @param $model_id
     * @param $field_id
     * @return JsonResponse
     */
    public function showModelField($model_id, $field_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $field = Column::where([['id', $field_id]])->first();
        $column = $field;

        if ($field->type === 'calculated') {
            $field = Accessor::where([['model_id',$model_id],['name',$field->name]])->first();
            $field->type = $column->type;
            if (!$field->calculation) $field->calculation = '';
            if (!$field->calculation_logic) $field->calculation_logic = [];
        }

        if ($field) {
            return response()->json($field, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Field not found'
        ], 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить поле
     *
     * @param $model_id
     * @param $field_id
     * @return JsonResponse
     */
    public function destroyModelField($model_id, $field_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $field = Column::where([['model_id', $model_id], ['id', $field_id]])->first();
        if (! $field) {
            return response()->json([
                'success' => false,
                'message' => 'Field not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        if ($field->type !== 'calculated') {
            $result = $field->delete();
        } else {
            Column::withoutEvents(function () use ($field) {
                $field->delete();
            });
            $accessor = Accessor::where([['model_id', $model_id], ['name', $field->name]])->first();
            $result = $accessor->delete();
        }

        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete field'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Проверить, свободно ли имя поля
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return JsonResponse
     */
    public function fieldNameIsFree(ApiRequest $request, $model_id)
    {
        $name = (string) $request->get('name');
        if (!$name)
            return response()->json([
                'success' => false,
                'message' => 'Name not specified'
            ], 500, [], JSON_UNESCAPED_UNICODE);
        $field = Column::where([['model_id', $model_id], ['name', $name]])->first();
        return response()->json([
            'taken' => !$field,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    // Relations

    /**
     * Получить связи медели
     *
     * @param $model_id
     * @return JsonResponse
     */
    public function getModelRelations($model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $relations = $model->altrp_relationships;
        return response()->json($relations, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить связи модели для списка опций
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return JsonResponse
     */
    public function getModelRelationOptions(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);
        if (! $model) {
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $this->getModelRelationsAndPageCount($request);
        $options = [];
        foreach ($result['relations'] as $relation) {
            $options[] = [
                'value' => $relation->id,
                'label' => $relation->title,
            ];
        }
//        $options = [
//            'options' => $options,
//            'pageCount' => $result['pageCount']
//        ];
        return response()->json($options, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Добавить новоую связь с моделью
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return JsonResponse
     */
    public function storeModelRelation( ApiRequest $request, $model_id )
    {
      $relation = new Relationship($request->toArray());
      $relation->model_id = $model_id;
      $model = Model::find( $request->get( 'target_model_id' ) );
      if( $model->name !== 'user' ){
        $model_class = '\App\AltrpModels\\' . $model->name ;
      } else {
        $model_class = '\App\\User' ;
      }
      $relation->model_class = $model_class;
      $result = $relation->save();
      if ($result) {
        return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
      }
      return response()->json([
          'success' => false,
          'message' => 'Failed to create relation'
      ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить связь модели
     *
     * @param ApiRequest $request
     * @param $model_id
     * @param $field_id
     * @return JsonResponse
     */
    public function updateModelRelation(ApiRequest $request, $model_id, $field_id)
    {
        $relation = Relationship::where([['model_id', $model_id], ['id', $field_id]])->first();
        if (! $relation) {
            return response()->json([
                'success' => false,
                'message' => 'Relation not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $relation->update($request->all());
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to update relation'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить связь по ID
     *
     * @param $model_id
     * @param $field_id
     * @return JsonResponse
     */
    public function showModelRelation($model_id, $field_id)
    {
        $relation = Relationship::where([['model_id', $model_id], ['id', $field_id]])->first();
        if ($relation) {
            return response()->json($relation, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Relation not found'
        ], 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить связь с моделью
     *
     * @param $model_id
     * @param $field_id
     * @return JsonResponse
     */
    public function destroyModelRelation($model_id, $field_id)
    {
        $relation = Relationship::where([['model_id', $model_id], ['id', $field_id]])->first();
        if (! $relation) {
            return response()->json([
                'success' => false,
                'message' => 'Relation not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $relation->delete();
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete relation'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Проверить, свободно ли имя связи
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return JsonResponse
     */
    public function relationNameIsFree(ApiRequest $request, $model_id)
    {
        $name = (string) $request->get('name');
        if (!$name)
            return response()->json([
                'success' => false,
                'message' => 'Name not specified'
            ], 500, [], JSON_UNESCAPED_UNICODE);
        $relation = Relationship::where([['model_id', $model_id], ['name', $name]])->first();
        return response()->json([
            'taken' => !$relation,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    // Data Sources

    /**
     * Получить источники данных
     *
     * @param ApiRequest $request
     * @return JsonResponse
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
     * @return JsonResponse
     */
    public function getDataSourceOptions(ApiRequest $request)
    {
        $result = $this->getDataSourcesAndPageCount($request);
        $options = [];
        foreach ($result['data_sources'] as $source) {
            $options[] = [
                'value' => $source->id,
                'label' => $source->name,
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
     * @return JsonResponse
     */
    public function storeDataSource(ApiRequest $request)
    {
        $request->validate([
            'title' => 'required|max:32',
            'name' => 'required|max:32'
        ]);
        $dataSource = new Source($request->all());
        $result = $dataSource->save();
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to create data source'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить источник данных
     *
     * @param ApiRequest $request
     * @param $source_id
     * @return JsonResponse
     */
    public function updateDataSource(ApiRequest $request, $source_id)
    {
        $request->validate([
            'title' => 'required|max:32',
            'name' => 'required|max:32'
        ]);
        $dataSource = Source::find($source_id);
        $data = $request->all();
        $data['updated_at'] = Carbon::now();
        if (! $dataSource) {
            return response()->json([
                'success' => false,
                'message' => 'Data source not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }

        if (count($data['access']['roles']) <= 1) {
            $data['need_all_roles'] = 0;
        }

        $result = $dataSource->update($data);
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to update data source'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить источник данных по ID
     *
     * @param $source_id
     * @return JsonResponse
     */
    public function showDataSource($source_id)
    {
        $dataSource = Source::where('id', $source_id)
            ->with(['source_roles.role:id', 'source_permissions.permission:id'])
            ->first()
            ->toArray();
        $dataSource['access'] = ['roles' => [], 'permissions' => []];
        $sourceRoles = $dataSource['source_roles'];
        $sourcePermissions = $dataSource['source_permissions'];
        unset($dataSource['source_roles']);
        unset($dataSource['source_permissions']);
        if ($sourceRoles) {
            foreach ($sourceRoles as $sourceRole) {
                $dataSource['access']['roles'][] = $sourceRole['role']['id'];
            }
        }
        if ($sourcePermissions) {
            foreach ($sourcePermissions as $sourcePermission) {
                $dataSource['access']['permissions'][] = $sourcePermission['permission']['id'];
            }
        }
        if ($dataSource) {
            return response()->json($dataSource, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Data source not found'
        ], 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить источник данных
     *
     * @param $source_id
     * @return JsonResponse
     */
    public function destroyDataSource($source_id)
    {
        $dataSource = Source::find($source_id);
        if (! $dataSource) {
            return response()->json([
                'success' => false,
                'message' => 'Data source not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $dataSource->delete();
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete data source'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Создать контроллер
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return JsonResponse
     * @throws \App\Exceptions\CommandFailedException
     * @throws \App\Exceptions\ControllerNotWrittenException
     * @throws \App\Exceptions\RouteGenerateFailedException
     * @throws \App\Exceptions\ModelNotWrittenException
     */
    public function storeController(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);
        if (! $model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);

        $controller = new Controller($request->all());
        $controller->model_id = $model_id;
        $result = $controller->save();
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to create controller'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить контроллер
     *
     * @param ApiRequest $request
     * @param $model_id
     * @param $controller_id
     * @return JsonResponse
     */
    public function updateController(ApiRequest $request, $model_id, $controller_id)
    {
        $model = Model::find($model_id);
        if (! $model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);

        $controller = Controller::find($controller_id);
        if (! $controller)
            return response()->json([
                'success' => false,
                'message' => 'Controller not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);

        $result = $controller->update($request->all());
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to update controller'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить контроллер
     *
     * @param $model_id
     * @param $controller_id
     * @return JsonResponse
     */
    public function destroyController($model_id, $controller_id)
    {
        $model = Model::find($model_id);
        if (! $model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);

        $controller = Controller::find($controller_id);
        if (! $controller)
            return response()->json([
                'success' => false,
                'message' => 'Controller not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);

        $result = $controller->delete();
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete controller'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить все SQL запросы
     *
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllQueries($model_id)
    {
        $queries = Query::where('model_id',$model_id)->get();
        return response()->json($queries, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить SQL запрос
     *
     * @param ApiRequest $request
     * @param $query_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getQuery(ApiRequest $request, $query_id)
    {
      $queries = Query::find( $request->query_id );
      return response()->json( $queries, 200, [], JSON_UNESCAPED_UNICODE );
    }
  /**
   * Проверить, свободно ли имя запроса для sql_builder
   *
   * @param ApiRequest $request
   * @param $model_id
   * @return JsonResponse
   */
    public function queryNameIsFree(ApiRequest $request, $model_id)
    {
        $name = (string) $request->get('name');
        if (!$name)
            return response()->json([
                'success' => false,
                'message' => 'Name not specified'
            ], 500, [], JSON_UNESCAPED_UNICODE);
        $query = Query::where([['model_id', $model_id], ['name', $name]])->first();
        return response()->json([
            'taken' => !$query,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Добавить SQl запрос
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return JsonResponse
     * @throws \App\Exceptions\Controller\ControllerFileException
     * @throws \App\Exceptions\Repository\RepositoryFileException
     */
    public function storeQuery(ApiRequest $request, $model_id)
    {
        $model = Model::find($model_id);
        if (! $model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $query = new Query($request->all());
        $query->model_id = $model->id;
        $result = $query->save();
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Query ' . $query->name . ' already exists'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить SQl запрос
     *
     * @param ApiRequest $request
     * @param $model_id
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\Controller\ControllerFileException
     * @throws \App\Exceptions\Repository\RepositoryFileException
     */
    public function updateQuery(ApiRequest $request, $model_id, $query_id)
    {
        $model = Model::find($model_id);
        if (! $model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $query = Query::find($query_id);
        $result = $query->update($request->all());
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to update query'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить SQl запрос
     *
     * @param $model_id
     * @param $query_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyQuery($model_id, $query_id)
    {
        $model = Model::find($model_id);
        if (! $model){
          return response()->json([
            'success' => false,
            'message' => 'Model not found'
          ], 404, [], JSON_UNESCAPED_UNICODE);
        }

        $query = Query::find($query_id);
        if (! $query){
          return response()->json([
            'success' => false,
            'message' => 'Query not found'
          ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $query->delete();

        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete query'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    public function getModelAccessors($model_id)
    {
        $accessors = Accessor::where('model_id',$model_id)->get();
        return response()->json($accessors, 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function showAccessor($model_id, $accessor_id)
    {
        $accessor = Accessor::find($accessor_id);
        if (! $accessor){
            return response()->json([
                'success' => false,
                'message' => 'Accessor not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json($accessor, 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function storeAccessor(ApiRequest $request, $model_id)
    {
        $accessor = new Accessor($request->all());
        $accessor->calculation_logic = json_encode($accessor->calculation_logic);
        $accessor->user_id = auth()->user()->id;
        $accessor->model_id = $model_id;
        $result = $accessor->save();

        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to create field'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    public function updateAccessor(ApiRequest $request, $model_id, $accessor_id)
    {
        $data = $request->all();

        $accessor = Accessor::where([['model_id', $model_id], ['id', $accessor_id]])->first();

        if(isset($data['calculation_logic'])) {
            $data['calculation_logic'] = json_encode($data['calculation_logic']);
        }

        if (! $accessor) {
            return response()->json([
                'success' => false,
                'message' => 'Accessor not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }

        $result = $accessor->update($data);

        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to update model accessor'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить аксессор
     *
     * @param $model_id
     * @param $accessor_id
     * @return JsonResponse
     */
    public function destroyAccessor($model_id, $accessor_id)
    {
        $accessor = Accessor::where([['model_id', $model_id], ['id', $accessor_id]])->first();
        if (! $accessor) {
            return response()->json([
                'success' => false,
                'message' => 'Accessor not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        $result = $accessor->delete();
        if ($result) {
            return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete accessor'
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }

    public function getValidationFields($model_id)
    {
        $validations = ValidationField::where('model_id',$model_id)->with('column','rules')->get();
        return response()->json($validations, 200);
    }

    public function showValidationField($model_id, $validation_field_id)
    {
        $validationField = ValidationField::where('id',$validation_field_id)->with('column','rules')->first();
        if (! $validationField){
            return response()->json([
                'success' => false,
                'message' => 'Validation field not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json($validationField, 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function storeValidationField(Request $request, $model_id)
    {
        $data = $request->all();
        $data['model_id'] = $model_id;
        $validationField = new ValidationField($data);
        $result = $validationField->save();
        if (!$result)
            return response()->json([
                'success' => false,
                'message' => 'Failed to store validation field'
            ], 500, [], JSON_UNESCAPED_UNICODE);

        return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function updateValidationField(Request $request, $model_id, $validation_field_id)
    {
        $data = $request->all();
        $data['model_id'] = $model_id;
        $validationField = ValidationField::find($validation_field_id);
        if (!$validationField)
            return response()->json([
                'success' => false,
                'message' => 'Validation field not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $result = $validationField->update($data);
        if (!$result)
            return response()->json([
                'success' => false,
                'message' => 'Failed to update validation field'
            ], 500, [], JSON_UNESCAPED_UNICODE);

        return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function destroyValidationField($model_id, $validation_field_id)
    {
        $validationRules = ValidationRule::where([['validation_field_id',$validation_field_id]])->delete();
        $validationField = ValidationField::find($validation_field_id);
        if (!$validationField)
            return response()->json([
                'success' => false,
                'message' => 'Validation field not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $result = $validationField->delete();
        if (!$result)
            return response()->json([
                'success' => false,
                'message' => 'Failed to destroy validation field'
            ], 500, [], JSON_UNESCAPED_UNICODE);

        return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function getValidationRules()
    {
        $validations = ValidationRule::all();
        return response()->json($validations, 200);
    }

    public function showValidationRule($model_id, $validation_field_id, $rule_id)
    {
        $validationField = ValidationRule::where('id',$rule_id)->first();
        if (! $validationField){
            return response()->json([
                'success' => false,
                'message' => 'Validation rule not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json($validationField, 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function storeValidationRule(Request $request, $model_id, $validation_field_id)
    {
        $data = $request->all();
        $data['validation_field_id'] = $validation_field_id;
        $validationRule = new ValidationRule($data);
        $result = $validationRule->save();
        if (!$result)
            return response()->json([
                'success' => false,
                'message' => 'Failed to store validation rule'
            ], 500, [], JSON_UNESCAPED_UNICODE);

        return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function updateValidationRule(Request $request, $model_id, $validation_field_id, $rule_id)
    {
        $data = $request->all();
        $validationRule = ValidationRule::find($rule_id);
        if (!$validationRule)
            return response()->json([
                'success' => false,
                'message' => 'Validation rule not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $result = $validationRule->update($data);
        if (!$result)
            return response()->json([
                'success' => false,
                'message' => 'Failed to update validation rule'
            ], 500, [], JSON_UNESCAPED_UNICODE);

        return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function destroyValidationRule($model_id, $validation_field_id, $rule_id)
    {
        $validationRule = ValidationRule::find($rule_id);
        if (!$validationRule)
            return response()->json([
                'success' => false,
                'message' => 'Validation rule not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $result = $validationRule->delete();
        if (!$result)
            return response()->json([
                'success' => false,
                'message' => 'Failed to destroy validation rule'
            ], 500, [], JSON_UNESCAPED_UNICODE);

        return response()->json(['success' => true], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function getDataSourcesByModel($model_id)
    {
        $data_sources = Source::select(['title as label', 'id as value'])->where('model_id',$model_id)->get();
        return response()->json($data_sources, 200, [], JSON_UNESCAPED_UNICODE);
    }

    // Custom models dashboard

    /**
     * Получить все записи модели
     * @param $model_id
     * @return JsonResponse
     */
    public function getCustomModelRecords($model_id)
    {
        $model = Model::where([['id', $model_id], ['preset', 0]])->first();
        if (!$model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $columns = explode(',', $model->table->columns->where('type', '!=', 'calculated')->implode('name', ','));
        $url = config('app.url') . "/ajax/models/" . $model->table->name;
        $response = \Curl::to($url)
            ->withData(request()->all())
            ->asJson()
            ->get();

        foreach ($response->data as $record) {
            foreach ($record as $key => $value) {
                if (!in_array($key, $columns)) {
                    unset($record->$key);
                }
            }
        }
        return response()->json($response, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить запись модели по ID
     * @param $model_id
     * @param $record_id
     * @return JsonResponse
     */
    public function getCustomModelRecord($model_id, $record_id)
    {
        $model = Model::where([['id', $model_id], ['preset', 0]])->first();
        if (!$model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $columns = explode(',', $model->table->columns->where('type', '!=', 'calculated')->implode('name', ','));
        $url = config('app.url') . "/ajax/models/" . $model->table->name . '/' . $record_id;
        $response = \Curl::to($url)
            ->withData(request()->all())
            ->asJson()
            ->get();

        foreach ($response as $key => $value) {
            if (!in_array($key, $columns)) {
                unset($response->$key);
            }
        }
        return response()->json($response, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Сохранить запись модели
     * @param $model_id
     * @return JsonResponse
     */
    public function storeCustomModelRecord($model_id)
    {
        $model = Model::where([['id', $model_id], ['preset', 0]])->first();
        if (!$model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $columns = explode(',', $model->table->columns->where('type', '!=', 'calculated')->implode('name', ','));
        $data = request()->all();
        foreach ($data as $key => $item) {
            if (!in_array($key, $columns)) {
                unset($data[$key]);
            }
        }
        $record = new $model->namespace($data);
        $response = $record->save();
        return response()->json(['success' => $response], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновить запись модели
     * @param $model_id
     * @param $record_id
     * @return JsonResponse
     */
    public function editCustomModelRecord($model_id, $record_id)
    {
        $model = Model::where([['id', $model_id], ['preset', 0]])->first();
        if (!$model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $columns = explode(',', $model->table->columns->where('type', '!=', 'calculated')->implode('name', ','));
        $data = request()->all();
        foreach ($data as $key => $item) {
            if (!in_array($key, $columns)) {
                unset($data[$key]);
            }
        }
        $record = $model->namespace::find($record_id);
        if (!$record)
            return response()->json([
                'success' => false,
                'message' => 'Record not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $response = $record->update($data);
        return response()->json(['success' => $response], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить запись модели
     * @param $model_id
     * @param $record_id
     * @return JsonResponse
     */
    public function destroyCustomModelRecord($model_id, $record_id)
    {
        $model = Model::where([['id', $model_id], ['preset', 0]])->first();
        if (!$model)
            return response()->json([
                'success' => false,
                'message' => 'Model not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $record = $model->namespace::find($record_id);
        if (!$record)
            return response()->json([
                'success' => false,
                'message' => 'Record not found'
            ], 404, [], JSON_UNESCAPED_UNICODE);
        $response = $record->delete();
        return response()->json(['success' => $response], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение записей по ID модели
     * @param $model_id
     * @return mixed
     */
    public function getRecordsByModel($model_id)
    {
        $model = Model::find($model_id);
        $modelClass = $model->parent
            ? '\\' . $model->parent->namespace
            :  '\\' . $model->namespace;
        return $modelClass::all();
    }

    /**
     * Получить записи для списка опций: id, name
     * @param $model_id
     * @return mixed
     */
    public function getRecordsByModelOptions($model_id)
    {
        $records = $this->getRecordsByModel($model_id);

        $options = [];
        foreach ($records as $record) {
            $options[] = [
                'value' => $record->id,
                'label' => $record->id,
            ];
        }
        return response()->json($options, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
