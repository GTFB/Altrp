<?php

namespace App\Http\Controllers;

use App\Altrp\Column;
use App\Altrp\Model;
use App\Http\Controllers\Controller;
use App\Http\Requests\ApiRequest;
use Illuminate\Http\Request;

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
        return compact('pageCount', $resource);
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
}
