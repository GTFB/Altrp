<?php

namespace App\Http\Controllers;

use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Relationship;
use App\Http\Controllers\Controller;
use App\Http\Requests\ApiRequest;
use App\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
//        $parts = explode('\\', $this->modelClass);
//        $modelName = array_pop($parts);
//        $event = '\\App\\Events\\AltrpEvents\\' . $modelName . 'Event';
//        broadcast(new $event($resources['data'][0]));
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
        $resource = Str::lower(Str::plural($modelName));
        $order_method = 'orderByDesc';
        $order_column = $request->get( 'order_by', 'id' );
        $filters = [];
        if( $request->get( 'filters') ){
          $_filters = json_decode( $request->get( 'filters' ), true );
          foreach ( $_filters as $key => $value ) {
            $filters[$key] = $value;
          }
        }
        if( $request->get( 'order' ) === 'ASC'){
          $order_method = 'orderBy';
        }
        if ($page && $limit) {
            $modelsCount = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)->whereLikeMany( $filters )->toBase()->count()
                : $this->modelClass::toBase()->whereLikeMany( $filters )->count();
            $pageCount = ceil($modelsCount / $limit);
            $offset = $limit * ($page - 1);
            $$resource = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)
                    ->whereLikeMany( $filters )
                    ->$order_method( $order_column )
                    ->skip($offset)
                    ->take($limit)
                    ->get()
                : $this->modelClass::$order_method( $order_column )
                    ->whereLikeMany( $filters )
                    ->skip($offset)
                    ->take($limit)
                    ->get();
        } else {
            $pageCount = 0;
            $$resource = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)
                    ->whereLikeMany( $filters )
                    ->$order_method( $order_column )
                    ->get()
                : $this->modelClass::whereLikeMany( $filters )
                    ->$order_method( $order_column )
                    ->get();
        }
        $hasMore = $pageCount > $page;

        $model = Model::where('name', $modelName)->first();
        $relations = Relationship::where([['model_id',$model->id],['always_with',1]])->get()->implode('name',',');
        $relations = $relations ? explode(',',$relations) : false;
        if ($relations) {
            $$resource = $$resource->load($relations);
        }

        $res = compact('pageCount' ,'hasMore');
        $res['data'] = $$resource;
        if( isset( $modelsCount ) ){
          $res['modelsCount'] = $modelsCount;
        }

        return $res;
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
     * Получить ассоциативный массив параметров запроса
     *
     * @param $url
     * @return array
     */
    protected function getRequestParamsAssoc($url)
    {
        $parts = explode('?', $url);
        $uri = $parts[1] ?? '';
        if (!$uri) return [];
        $requestParamsAssoc = [];
        $params = explode('&', $uri);
        foreach ($params as $param) {
            $param = explode('=', $param);
            $requestParamsAssoc[$param[0]] = $param[1];
        }
        return $requestParamsAssoc;
    }

    /**
     * Получить URL без параметров
     *
     * @param $url
     * @return mixed|string
     */
    protected function getOnlyUrl($url)
    {
        $parts = explode('?', $url);
        return $parts[0];
    }

    /**
     * Проверяем, пришел ли файл в запросе и возвращаем его
     * @param Request $request
     * @return array|bool
     */
    protected function hasFileInRequest(Request $request)
    {
        $requestKeys = collect($request->all())->keys()->toArray();
        $model = new $this->modelClass();
        $relations = $model->relationships();
        if (!$relations) return false;
        foreach ($relations as $relation => $info) {
            if (in_array($relation, $requestKeys) && isset($request->$relation[0]) && is_file($request->$relation[0])) return [
                'relation' => $relation,
                'foreign_key' => $info['foreignKey']
            ];
        }
        return false;
    }

    /**
     * Сохраняем медиа в БД и возвращаем их
     * @param Request $request
     * @param $mediaName
     * @return array
     */
    protected function saveMedias(Request $request, $mediaName)
    {
        $_files = $request->file($mediaName);
        if (!is_array($_files)) $_files = [$_files];
        $res = [];
        $files = [];
        foreach ($_files as $file) {
            if($file->getSize() < config( 'filesystems.max_file_size')) {
                $files[] = $file;
            }
        }
        foreach ($files as $file) {
            $media = new Media();
            $media->media_type = $file->getClientMimeType();
            $media->author = auth()->user()->id;
            $media->filename =  $file->store('media/' . date("Y") . '/' . date("m" ),
                ['disk' => 'public'] );
            $media->url =  Storage::url($media->filename);
            $media->save();
            $res[] = $media;
        }
        return array_reverse($res);
    }

  /**
   * Список опций для селекта
   * @param ApiRequest $request
   */
  public function options( ApiRequest $request )
  {

    $filters = [];
    if( $request->get( 'filters') ){
      $_filters = json_decode( $request->get( 'filters' ), true );
      foreach ( $_filters as $key => $value ) {
        $filters[$key] = $value;
      }
    }
    /**
     * @var \App\AltrpModels\test $model
     */
    $model = new $this->modelClass();
    $label_name = $model->getLabelColumnName();
    $title_name = $model->getTitleColumnName();
    if( ! $request->get( 's' ) ){
      if( ! count( $filters ) ){
        $options = $model->all();
      } else {
        $options = $model->whereLikeMany( $filters );
      }
    } else {
      $options = $model->where( 'id', 'like', '%' . $request->get( 's' ) . '%' );

      if( $title_name !== 'id' ){
        $options->orWhere( $title_name, 'like', '%' . $request->get( 's' ) . '%' );
      }
      if( $title_name !== $label_name ){
        $options->orWhere( $label_name, 'like', '%' . $request->get( 's' ) . '%' );
      }
      $options = $options->whereLikeMany( $filters );
//      echo '<pre style="padding-left: 200px;">';
//      var_dump( $filters );
//      echo '</pre>';

      $options = $options->get();
    }
    $_options = [];

    foreach ( $options as $option ) {

      $_options[] = [
        'value' => $option->id,
        'label' => $option->$label_name ? $option->$label_name : $option->id,
      ];
    }
    return response()->json( $_options, 200, [], JSON_UNESCAPED_UNICODE );
  }
}
