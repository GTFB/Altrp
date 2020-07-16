<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\Accessor;
use App\Altrp\Builders\AccessorBuilder;
use App\Exceptions\TableNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;

use App\Altrp\Table;
use App\Altrp\Migration;
use App\Altrp\Controller as AltrpController;
use App\Error;

use App\Altrp\Generators\ModelGenerator;
use App\Altrp\Generators\ControllerGenerator;
use App\Altrp\Generators\RouteGenerator;
use App\Altrp\Model;

class TableController extends ApiController
{

    /**
     * Получение списка сущностей
     *
     * @return \Illuminate\Http\JsonResponse
     */
    function getTables() {
        $modules = Table::all();
        return response()->json($modules, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение сущности по идентификатору
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
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
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
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
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
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
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
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
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
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
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\AltrpMigrationCreateFileExceptions
     * @throws \App\Exceptions\AltrpMigrationRunExceptions
     * @throws \App\Exceptions\AltrpMigrationWriteColumnsExceptions
     * @throws \App\Exceptions\AltrpMigrationWriteKeysExceptions
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

        if(!$migration->save()){
            return response()->json('Ошибка генерации', 404, [], JSON_UNESCAPED_UNICODE);
        }

        if($migration->run()) {
            return response()->json('Успешно сгенерировано', 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Ошибка генерации', 404, [], JSON_UNESCAPED_UNICODE);

        /*$id = $request->table;
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

        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);*/

    }

    /**
     * Запуск миграции
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
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
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
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
     *
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
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
     * Создание модели
     *
     * @param ApiRequest $request
     * @param $tableId
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\CommandFailedException
     * @throws \App\Exceptions\ModelNotWrittenException
     * @throws \App\Exceptions\PermissionNotWrittenException
     * @throws \App\Exceptions\RelationshipNotInsertedException
     * @throws \App\Exceptions\TableNotFoundException
     */
    function saveModel(ApiRequest $request, $tableId)
    {
        $table = Table::find($tableId);

        if (! $table)
            return response()->json('Table not found', 404, [], JSON_UNESCAPED_UNICODE);

        $generator = new ModelGenerator(
            array_merge($request->all(), ['table_id' => $tableId])
        );

        $result = $generator->generate();

        if ($result) {
            return response()->json('Successfully generated!', 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Error', 500, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение модели
     *
     * @param ApiRequest $request
     * @param $tableId
     * @param $modelId
     * @return \Illuminate\Http\JsonResponse
     */
    function getModel(ApiRequest $request, $tableId) {

        $model = Model::where("table_id", $tableId)->with('table.relationships')->first();

        if(! $model) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json($model, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получить список аксессоров
     *
     * @param ApiRequest $request
     * @param $tableId
     * @param $modelId
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function getAccessors(ApiRequest $request, $tableId, $modelId)
    {
        $model = Model::find($modelId);

        if (! $model) {
            return response()->json('Модель не найдена!', 404, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json($model->altrp_accessors, 200, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Добавить аксессор
     *
     * @param ApiRequest $request
     * @param $tableId
     * @param $modelId
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function saveAccessor(ApiRequest $request, $tableId, $modelId)
    {
        $model = Model::find($modelId);

        if (! $model) {
            return response()->json('Модель не найдена!', 404, [], JSON_UNESCAPED_UNICODE);
        }

        $accessor = new Accessor();

        $accessorBuilder = new AccessorBuilder(
            $model,
            $accessor,
            $request->all()
        );

        if ($accessorBuilder->build()) {
            return response()->json($accessor, 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Failed to add accessor!', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\AccessorNotFoundException
     * @throws \App\Exceptions\ModelNotWrittenException
     */
    public function deleteAccessor(ApiRequest $request)
    {
        $table = Table::find($request->table);
        if(! $table) {
            return response()->json('Table not found!', 404, [],JSON_UNESCAPED_UNICODE);
        }
        $model = Model::find($request->model);
        if(! $model) {
            return response()->json('Model not found!', 404, [],JSON_UNESCAPED_UNICODE);
        }
        $accessor = Accessor::find($request->accessor);
        if(! $accessor) {
            return response()->json('Accessor not found!', 404, [],JSON_UNESCAPED_UNICODE);
        }

        $accessorBuilder = new AccessorBuilder(
            $model,
            $accessor
        );

        if ($accessorBuilder->delete()) {
            return response()->json('Successfully deleted!', 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Failed to delete accessor!', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @param ApiRequest $request
     * @param $tableId
     * @param $modelId
     * @param $accessorId
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\AccessorNotWrittenException
     * @throws \App\Exceptions\ModelNotWrittenException
     * @throws \App\Exceptions\ParseFormulaException
     */
    public function updateAccessor(ApiRequest $request, $tableId, $modelId, $accessorId)
    {
        $table = Table::find($tableId);
        if(! $table) {
            return response()->json('Table not found!', 404, [],JSON_UNESCAPED_UNICODE);
        }
        $model = Model::find($modelId);
        if(! $model) {
            return response()->json('Model not found!', 404, [],JSON_UNESCAPED_UNICODE);
        }
        $accessor = Accessor::find($accessorId);
        if(! $accessor) {
            return response()->json('Accessor not found!', 404, [],JSON_UNESCAPED_UNICODE);
        }

        $accessorBuilder = new AccessorBuilder(
            $model,
            $accessor,
            $request->all()
        );

        if ($accessorBuilder->update()) {
            return response()->json($accessor, 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Error!', 404, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение контроллера
     *
     * @param ApiRequest $request
     * @param $tableId
     * @param $controllerId
     * @return \Illuminate\Http\JsonResponse
     */
    function getController(ApiRequest $request, $tableId) {

        $controller = AltrpController::where("table_id", $tableId)->first();

        if(!$controller) {
            return response()->json(trans("responses.not_found.table"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json($controller, 200, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Создать контроллер
     *
     * @param ApiRequest $request
     * @param $tableId
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\CommandFailedException
     * @throws \App\Exceptions\ControllerNotWrittenException
     * @throws \App\Exceptions\RouteGenerateFailedException
     * @throws \App\Exceptions\ModelNotWrittenException
     */
    function saveController(ApiRequest $request, $tableId) {

        $table = Table::find($tableId);

        if (! $table)
            return response()->json('Table not found', 404, [], JSON_UNESCAPED_UNICODE);

        if (! $table->models()->first())
            return response()->json('Model not found', 404, [], JSON_UNESCAPED_UNICODE);

        $generator = new ControllerGenerator(
            array_merge($request->all(), ['table_id' => $tableId])
        );

        $result = $generator->generate();

        if ($result) {
            return response()->json('Успешно сгенерировано', 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Ошибка генерации', 404, [], JSON_UNESCAPED_UNICODE);
    }

}
