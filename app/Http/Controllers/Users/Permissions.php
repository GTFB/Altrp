<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;

use App\Permission;
use App\Error;

class Permissions extends ApiController
{
    protected function getPermissionsAndPageCount(ApiRequest $request)
    {
        $search = $request->get('s');
        $page = $request->get('page');
        $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
        $orderColumn = $request->order_by ? $request->order_by : 'id';
        $sortType = 'sortBy' . ($orderType == 'Asc' ? '' : $orderType);
        $count = $search
            ? Permission::getCountWithSearch($search, 'name')
            : Permission::getCount();
        if (! $page) {
            $pageCount = 0;
            $permissions = $search
                ? Permission::getBySearch($search, 'name', [], $orderColumn, $orderType)
                : Permission::with([])->get()->$sortType($orderColumn)->values();
        } else {
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($count / $limit);
            $offset = $limit * ($page - 1);
            $permissions = $search
                ? Permission::getBySearchWithPaginate($search,  $offset, $limit, 'name', $orderColumn, $orderType)
                : Permission::getWithPaginate($offset, $limit, $orderColumn, $orderType);
        }
        return compact('pageCount', 'count', 'permissions');
    }

    /**
     * Получение списка прав действия
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function getPermissions(ApiRequest $request) {
        $permissions = $this->getPermissionsAndPageCount($request);
        return response()->json($permissions, 200, [],JSON_UNESCAPED_UNICODE);
    }

  /**
   * Получение опций прав действия
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
    function getPermissionsOptions( Request $request ) {
        if( $request->get( 's' ) ){
          $permissions = Permission::where('display_name', 'like', '%' . $request->get( 's' ) . '%')
            ->orWhere('name', 'like', '%' . $request->get( 's' ) . '%')
            ->select(['*'])->get();
        } else {
          $permissions = Permission::select(['*'])->get();
        }
        $permissions = $permissions->map( function ( $permission ) use ( $request ){
          $value = data_get( $permission, $request->get( 'value', 'id' ) );

          return [
            'value' => $value,
            'label' => $permission->display_name,
          ];
        } );
        return response()->json($permissions, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение права доступа по идентификатору
     * @param Request $request
     * @return type
     */
    function getPermission(Request $request) {

        $id = $request->permission;
        $permission = Permission::find($id);

        if(!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json($permission, 200, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Добавление права действия
     * @param Request $request
     * @return type
     */
    function insert(ApiRequest $request) {

        $request->validate([
            "name" => ["string", "required", "unique:permissions,name"],
            "display_name" => ["string", "required"],
        ]);

        $permission = new Permission();
        $permission->name = $request->name;
        $permission->display_name = $request->display_name;
        $permission->description = $request->description;

        if($permission->save()){
            return response()->json($permission, 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Обновление права действия
     * @param ApiRequest $request
     * @return type
     */
    function update(ApiRequest $request) {

        $request->validate([
            "name" => ["string","unique:permissions,name", ],
            "display_name" => ["string"],
            "description" => ["string"],
        ]);

        $permission = Permission::find($request->permission);

        if(!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        if($request->name) $permission->name = $request->name;
        if($request->display_name) $permission->display_name = $request->display_name;
        if($request->description) $permission->description = $request->description;

        if($permission->save()){
            return response()->json($permission, 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Удаление права действеия
     * @param ApiRequest $request
     * @return type
     */
    function delete(ApiRequest $request) {

        $permission = Permission::find($request->permission);

        if(!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        if($permission->delete()) {
            return response()->json(trans("responses.delete.permission"), 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("deleteerror"), 400, [],JSON_UNESCAPED_UNICODE);
    }

}
