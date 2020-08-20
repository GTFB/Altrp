<?php

namespace App\Http\Controllers;

use App\Altrp\Column;
use App\Altrp\Model;
use App\Http\Controllers\Controller;
use App\Http\Requests\ApiRequest;
use Illuminate\Http\Request;

/**
 * Class ApiController
 * @package App\Http\Controllers
 * @property string $modelClass
 */
class ApiController extends Controller
{
    /**
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ApiRequest $request)
    {
        $resources = $this->getModelsAndPageCount($request);
        return response()->json($resources, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить список ресурсов и количество страниц
     *
     * @param ApiRequest $request
     * @return array
     */
    private function getModelsAndPageCount(ApiRequest $request)
    {
        $search = $request->get('s');
        $page = $request->get('page');
        $limit = $request->get('pageSize');
        $parts = explode('\\', $this->modelClass);
        $modelName = array_pop($parts);
        $indexedColumns = $this->getIndexedColumns($modelName);
        $resource = \Str::lower(\Str::plural($modelName));
        if ($page && $limit) {
            $modelsCount = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)->toBase()->count()
                : $this->modelClass::toBase()->count();
            $pageCount = ceil($modelsCount / $limit);
            $offset = $limit * ($page - 1);
            $$resource = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)
                    ->orderByDesc('id')
                    ->skip($offset)
                    ->take($limit)
                    ->get()
                : $this->modelClass::orderByDesc('id')
                    ->skip($offset)
                    ->take($limit)
                    ->get();
        } else {
            $pageCount = 0;
            $$resource = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)->orderByDesc('id')->get()
                : $this->modelClass::orderByDesc('id')->get();
        }
        $hasMore = $pageCount > $page;
        return compact('pageCount', $resource ,'hasMore');
    }

    /**
     * Получить список индексируемых полей
     *
     * @param $modelName
     * @return array
     */
    private function getIndexedColumns($modelName)
    {
        $table = Model::where('name', $modelName)->first()->table;
        $columns = Column::where([['indexed', 1], ['table_id', $table->id]])->get();
        $columnsList = ['id'];
        for ($i = 0; $i < count($columns); $i++) {
            $columnsList[] = $columns[$i]->name;
        }
        return $columnsList;
    }

  /**
   * Список опций для селекта
   * @param ApiRequest $request
   */
  public function options( ApiRequest $request )
  {
    /**
     * @var \App\AltrpModels\test $model
     */
    $model = new $this->modelClass();
    $label_name = $model->getLabelColumnName();
    $title_name = $model->getTitleColumnName();
    if( ! $request->get( 's' ) ){
      $options = $model->all();
    } else {
      $options = $model->where( 'id', 'like', '%' . $request->get( 's' ) . '%' );

      if( $title_name !== 'id' ){
        $options->orWhere( $title_name, 'like', '%' . $request->get( 's' ) . '%' );
      }
      if( $title_name !== $label_name ){
        $options->orWhere( $label_name, 'like', '%' . $request->get( 's' ) . '%' );
      }
      $options = $options->get();
    }
    $_options = [];

    foreach ( $options as $option ) {

      $_options[] = [
        'value' => $option->id,
        'label' => $option->$label_name,
      ];
    }
    return response()->json( $_options, 200, [], JSON_UNESCAPED_UNICODE );
  }
}
