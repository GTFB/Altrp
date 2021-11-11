<?php

namespace App\Http\Controllers;

use App\Altrp\Column;
use App\Altrp\Model;
use App\Altrp\Relationship;
use App\Http\Controllers\Controller;
use App\Http\Requests\ApiRequest;
use App\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
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
        $order_column = $request->get('order_by', 'id');
        $filters = [];
        if ($request->get('filters')) {
            $_filters = json_decode($request->get('filters'), true);
            foreach ($_filters as $key => $value) {
                $filters[$key] = $value;
            }
        }
        if ($request->get('order') === 'ASC') {
            $order_method = 'orderBy';
        }
        if ($page && $limit) {
            $modelsCount = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)->whereLikeMany($filters)->toBase()->count()
                : $this->modelClass::toBase()->whereLikeMany($filters)->count();
            $pageCount = ceil($modelsCount / $limit);
            $offset = $limit * ($page - 1);
            $$resource = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)
                ->whereLikeMany($filters)
                ->$order_method($order_column)
                ->skip($offset)
                ->take($limit)
                ->get()
                : $this->modelClass::$order_method($order_column)
                ->whereLikeMany($filters)
                ->skip($offset)
                ->take($limit)
                ->get();
        } else {
            $pageCount = 0;
            $$resource = $search
                ? $this->modelClass::whereLike($indexedColumns, $search)
                ->whereLikeMany($filters)
                ->$order_method($order_column)
                ->get()
                : $this->modelClass::whereLikeMany($filters)
                ->$order_method($order_column)
                ->get();
        }
        $hasMore = $pageCount > $page;

        $model = Model::where('name', $modelName)->first();
        $relations = Relationship::where([['model_id', $model->id], ['always_with', 1]])->get()->implode('name', ',');
        $relations = $relations ? explode(',', $relations) : false;
        if ($relations) {
            $$resource = $$resource->load($relations);
        }

        $res = compact('pageCount', 'hasMore');
        $res['data'] = $$resource;
        if (isset($modelsCount)) {
            $res['modelsCount'] = $modelsCount;
        }

        $res['data'] = $this->getRemoteData($model, $res);

        return $res;
    }

    /**
     * Получить удаленные данные
     * @param $entity
     * @param $result
     * @param bool $is_object
     * @return array|\Illuminate\Database\Eloquent\Model|Collection
     */
    protected function getRemoteData($entity, $result, $is_object = false)
    {
        //dd($entity);
        $records = $result['data'] ?? $result;
        $countOfRemoteData = $entity->remote_data->count();
        if ($countOfRemoteData) {
            foreach ($entity->remote_data as $remote) {
                $url = $is_object ? $remote->single_source->url : $remote->list_source->url;
                $requestMethod = $remote->list_source->request_type;
                $column = isset($remote->column) ? $remote->column->name : $remote->column_name;

                if (is_object($records) && !$records instanceof Collection) {
                    $url = $this->replaceUrlDynamicParams($url, ['id' => $records->$column]);
                }

                $response = $this->sendCurlRequest($url, $requestMethod);

                $response = $response->status != 404 && $response->status != 500 ? $response->content : null;

                $arrIds = [];
                $res = $response->data ?? $response;
                $col = $remote->remote_find_column;

                if (is_array($res)) {
                    foreach ($res as $item) {
                        $arrIds[] = $item->$col;
                    }
                } else {
                    $res = [$res];
                    $arrIds[] = $records->$column;
                }

                $resCollection = collect($res);
                if (is_object($records) && !$records instanceof Collection) {
                    $newRec = $this->addRemoteColumns($remote, $records, $arrIds, $resCollection);
                    $records = $newRec;
                } else {
                    foreach ($records as $index => $record) {
                        $newRec = $this->addRemoteColumns($remote, $record, $arrIds, $resCollection);
                        $records[$index] = $newRec;
                    }
                }
            }
        }
        return $records;
    }

    /**
     *
     * @param $url
     * @param $params
     * @return string|string[]|null
     */
    public function replaceUrlDynamicParams($url, $params)
    {
        return preg_replace_callback('/\{(.*?)\}/', function ($matches) use ($params) {
            return $params[trim($matches[0], '{}')];
        }, $url);
    }

    /**
     * Отправить Curl запрос для получения удалённых данных
     * @param $url
     * @param $method
     * @return mixed
     */
    protected function sendCurlRequest($url, $method)
    {
        return \Curl::to($url)
            ->asJson()
            ->returnResponseObject()
            ->$method();
    }

    /**
     * Добавить удаленные колонки в результирующую выборку
     * @param $remote
     * @param $record
     * @param $arrIds
     * @param $collection
     * @return object
     */
    protected function addRemoteColumns($remote, $record, array $arrIds, Collection $collection)
    {
        $column = isset($remote->column) ? $remote->column->name : $remote->column_name;
        $col = $remote->remote_find_column;
        $needColumn = $remote->remote_need_column;
        $name = $remote->name;
        if (in_array($record->$column, $arrIds)) {
            $value = $collection->where($col, $record->$column)->first();
            if (!$remote->as_object) {
                $value = $value ? $value->$needColumn : $value;
            }
            if ($remote->enabled) {
                if ($record instanceof \Illuminate\Database\Eloquent\Model) {
                    $record->setAttribute($name, $value);
                } else {
                    $record->$name = $value;
                }
            }
        } else {
            $record->$name = null;
        }
        return $record;
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
            if ($file->getSize() < config('filesystems.max_file_size')) {
                $files[] = $file;
            }
        }
        foreach ($files as $file) {
            $media = new Media();
            $media->media_type = $file->getClientMimeType();
            $media->author = auth()->user()->id ?? null;
            $media->filename =  $file->store(
                'media/' . date("Y") . '/' . date("m"),
                ['disk' => 'public']
            );
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
    public function options(ApiRequest $request)
    {

        $filters = [];
        if ($request->get('filters')) {
            $_filters = json_decode($request->get('filters'), true);
            foreach ($_filters as $key => $value) {
                $filters[$key] = $value;
            }
        }
        /**
         * @var \App\AltrpModels\test $model
         */
        $model = new $this->modelClass();
        $label_name = $model->getLabelColumnName();
        $title_name = $model->getTitleColumnName();
        if (!$request->get('s')) {
            if (!count($filters)) {
                $options = $model->all();
            } else {
                $options = $model->whereLikeMany($filters);
            }
        } else {
            $options = $model->where('id', 'like', '%' . $request->get('s') . '%');

            if ($title_name !== 'id') {
                $options->orWhere($title_name, 'like', '%' . $request->get('s') . '%');
            }
            if ($title_name !== $label_name) {
                $options->orWhere($label_name, 'like', '%' . $request->get('s') . '%');
            }
            $options = $options->whereLikeMany($filters);
            //      echo '<pre style="padding-left: 200px;">';
            //      var_dump( $filters );
            //      echo '</pre>';

            $options = $options->get();
        }
        $_options = [];

        foreach ($options as $option) {

            $_options[] = [
                'value' => $option->id,
                'label' => $option->$label_name ? $option->$label_name : $option->id,
            ];
        }
        return response()->json($_options, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Захэшировать пароль, если он существует в атрибутах
     * @param $table
     * @param array $attributes
     * @return array
     */
    protected function hashPasswordAttributeIfExists($table, array $attributes)
    {
        if (isset($attributes['password']) && $table == 'users') {
            $attributes['password'] = Hash::make($attributes['password']);
        }
        return $attributes;
    }

  /**
   * Возвращает данные по динамическому запросу
   * 0 - тип данных
   * 1 - url запроса
   * 2 - параметры для запроса
   * 3 - переменная для ответа
   * @param array $headers
   * @return array
   */
    public function getDinamicDataSource($headers) {
      if (!empty($headers)) {
        foreach ($headers as $key => $header) {
          if (Str::contains($header, 'REMOTE_DATA')) {
            $trimedMatch = trim($header, '{}');
            $params = explode(':', $trimedMatch);

            $parts = explode('\\', $this->modelClass);
            $modelName = array_pop($parts);
            $indexedColumns = $this->getIndexedColumns($modelName);
            $resource = Str::lower(Str::plural($modelName));

            if (isset($params[3])) {
              $search = $params[3];
              $filters = [];
              parse_str($params[2], $output);
              if (!empty($output)) {
                foreach ($output as $key => $value) {
                  $filters[$key] = $value;
                }
              }
            } else {
              $search = $params[2];
            }

            $model = Model::where('name', $params[1])->first();
            $relations = Relationship::where([['model_id',$model->id],['always_with',1]])->get()->implode('name',',');
            $relations = $relations ? explode(',',$relations) : false;

            //$currentModel = {$params[1]}::find($id)

            /*
            $test222 = test222::find($id);

            if ($relations) {
              $test222 = $test222->load($relations);
            }

            $test222 = $this->getRemoteData($model, $test222, true);

            return response()->json($test222, 200, [], JSON_UNESCAPED_UNICODE);
            */
            //dd($model);

            //$search = 'name';

            $result = $this->getRemoteData($model, []);



            //$result = $this->modelClass::whereLikeMany($filters)->get();


            dd($result);
            /*
            $url = $this->replaceUrlDynamicParams($params[1], $params[2]);
            $response = \Curl::to($url)
              //->withHeaders($this->getDinamicDataSource(["_token" => "{{REMOTE_DATA:test555:id=7&b=3:data.sucesss.token}}"]))
              ->withData($data)
              ->asJson()
              ->get();
            dd($response);
            */
            return response()->json($response, 200, [], JSON_UNESCAPED_UNICODE);
          }
        }
      }
      dd('00000000000000');
    }
}
