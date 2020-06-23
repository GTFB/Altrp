<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;

use App\Altrp\Table;
use App\Altrp\Migration;
use App\Error;

use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\RouteGenerator;
use App\Altrp\Model;

class TableController extends ApiController
{
    
    /**
     * Получение списка сущностей
     * @return type
     */
    function getTables() {
        $modules = Table::all();
        return response()->json($modules, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Получение сущности по идентификатору
     * @param Request $request
     * @return type
     */
    function getTable(Request $request) {
        
        $id = $request->table;
        $table = Table::find($id);
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($table, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Добавление сущности
     * @param Request $request
     * @return type
     */
    function insert(ApiRequest $request) {
        
        $request->validate([
            "title" => ["string", "required", "unique:tables,title"],
            "name" => ["string", "required", "unique:tables,name"],
        ]);
        
        $table = new Table();
        $table->title = $request->title;
        $table->name = $request->name;
        $table->description = $request->description;
        $table->user_id = auth()->user()->id;
        
        if($table->save()){
            return response()->json($table, 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Обновление сущности
     * @param ApiRequest $request
     * @return type
     */
    function update(ApiRequest $request) {
        
        /*$request->validate([
            "name" => ["string","unique:tables,name,".$request->module],
            "title" => ["string","unique:tables,title,".$request->module]
        ]);*/
        
        $table = Table::find($request->table);
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        if($request->name) $table->name = $request->name;
        if($request->title) $table->title = $request->title;
        if($request->description) $table->description = $request->description;
        
        $table->user_id = auth()->user()->id;
        
        if($table->save()){
            return response()->json($table, 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Удаление сущности
     * @param ApiRequest $request
     * @return type
     */
    function delete(ApiRequest $request) {
        
        $table = Table::find($request->module);
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        if($table->delete()) {
            return response()->json(trans("responses.delete.table"), 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("deleteerror"), 400, [],JSON_UNESCAPED_UNICODE);
    }
    
    
    
    
    
    /**
     * Получение списка миграций
     * @return type
     */
    function getMigrations(ApiRequest $request) {
        
        $id = $request->table;
        $table = Table::find($id);
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($table->migrations, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Добавление сущности
     * @param Request $request
     * @return type
     */
    function insertMigration(ApiRequest $request) {
        
        $id = $request->table;
        $table = Table::find($id);
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $request->validate([
            "name" => ["string", "required"]
        ]);
        
        $migration = new Migration();
        $migration->name = $request->name;
        $migration->file_path = "";
        $migration->status = 1;
        $migration->data = $request->data;
        $migration->user_id = auth()->user()->id;
        $migration->table_id = $table->id;
        
        if($migration->save()){
            return response()->json($migration->run(), 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Запуск миграции
     * @return type
     */
    function runMigration(ApiRequest $request) {
        
        $id = $request->table;
        $table = Table::find($id);
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $migration_id = $request->migration;
        $migration = Migration::find($migration_id);
        
        if(!$migration) {
            return response()->json(trans("responses.not_found.migration"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($migration->run(), 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Получение актуального списка колонок
     * @return type
     */
    function getColumns(ApiRequest $request) {
        
        $id = $request->table;
        $table = Table::find($id);
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($table->actual_columns, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Получение актуального списка ключей
     * @return type
     */
    function getKeys(ApiRequest $request) {
        
        $id = $request->table;
        $table = Table::find($id);
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($table->actual_keys, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Получение актуального списка ключей
     * @return type
     */
    function saveModel(ApiRequest $request) {
        
        
        $table_id = $request->table;
        
        $model = new Model();
        $generator = new ModelGenerator($model, $request->all());
        
        $result = $generator->generate();
        
        if(!$result) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Получение актуального списка ключей
     * @return type
     */
    function getModel(ApiRequest $request) {

        $table_id = $request->table;
        
        $model = Model::where("table_id",$table_id)->with('table.relationships')->firstOrFail();
        
        if(!$model) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($model, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    
    
    
    
    /**
     * Получение актуального списка ключей
     * @return type
     */
    function test(ApiRequest $request) {
        
        //dd($request->all());
        $table_id = $request->table_id;
        
        $model = new Model();
        $generator = new ModelGenerator($model, $request->all());
        
        
        //dd($request->all());
        $controller = new \App\Altrp\Controller();
        $generator = new ControllerGenerator($controller, $request->all(), ["tableName" => "stores", "controllerName" => "StoreController"]);
        
        
        dd($generator->generate());
        
        if(!$table) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($table->actual_keys, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
}
