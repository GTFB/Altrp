<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;


use App\Role;
use App\Permission;

class Roles extends ApiController
{
    protected function getRolesAndPageCount(ApiRequest $request)
    {
        $search = $request->get('s');
        $page = $request->get('page');
        $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
        $orderColumn = $request->order_by ? $request->order_by : 'id';
        $sortType = 'sortBy' . ($orderType == 'Asc' ? '' : $orderType);
        $count = $search
            ? Role::getCountWithSearch($search, 'name')
            : Role::getCount();
        if (! $page) {
            $pageCount = 0;
            $roles = $search
                ? Role::getBySearch($search, 'name', [], $orderColumn, $orderType)
                : Role::with([])->get()->$sortType($orderColumn)->values();
        } else {
            $limit = $request->get('pageSize', 10);
            $pageCount = ceil($count / $limit);
            $offset = $limit * ($page - 1);
            $roles = $search
                ? Role::getBySearchWithPaginate($search,  $offset, $limit, 'name', $orderColumn, $orderType)
                : Role::getWithPaginate($offset, $limit, $orderColumn, $orderType);
        }
        return compact('pageCount', 'count', 'roles');
    }

    /**
     * Получение списка ролей
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function getRoles(ApiRequest $request) {
        $roles = $this->getRolesAndPageCount($request);
        return response()->json($roles, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение роли по идентификатору
     * @param Request $request
     * @return type
     */
    function getRole(ApiRequest $request) {

        $id = $request->role;
        $role = Role::find($id);

        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json($role, 200, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Добавление роли
     * @param Request $request
     * @return type
     */
    function insert(ApiRequest $request) {

        $request->validate([
            "name" => ["string", "required", "unique:roles,name"],
            "display_name" => ["string", "required"],
        ]);

        $role = new Role();
        $role->name = $request->name;
        $role->display_name = $request->display_name;
        $role->description = $request->description;

        if($role->save()){
            return response()->json($role, 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Обновление роли
     * @param ApiRequest $request
     * @return type
     */
    function update(ApiRequest $request) {

        $request->validate([
            "name" => ["string","unique:roles,name", ],
            "display_name" => ["string"],
            "description" => ["string"],
        ]);

        $role = Role::find($request->role);

        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        if($request->name) $role->name = $request->name;
        if($request->display_name) $role->display_name = $request->display_name;
        if($request->description) $role->description = $request->description;

        if($role->save()){
            return response()->json($role, 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);

    }

    /**
     * Удаление роли
     * @param ApiRequest $request
     * @return type
     */
    function delete(ApiRequest $request) {

        $role = Role::find($request->role);

        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        if($role->delete()) {
            return response()->json(trans("responses.delete.role"), 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("deleteerror"), 400, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение прав доступа для конкретной роли
     * @return type
     */
    function getPermissions(ApiRequest $request) {

        $role = Role::find($request->role);

        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        $permissions = $role->permissions;
        return response()->json($permissions, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение прав доступа для конкретной роли
     * @return type
     */
    function attachPermission(ApiRequest $request) {

        $role = Role::find($request->role);

        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        $permission = Permission::find($request->permission);

        if(!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        $result = $role->attachPermission($permission);

        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удаление прав доступа для конкретной роли
     * @return type
     */
    function detachPermission(ApiRequest $request) {

        $role = Role::find($request->role);

        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        $permission = Permission::find($request->permission);

        if(!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [],JSON_UNESCAPED_UNICODE);
        }

        $result = $role->detachPermission($permission);

        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
    }

  /**
   * Получение опций select
   * @param Request $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function get_options( Request $request ){

    $_roles = Role::all();
    if( $request->get( 's' ) ){
      $searchRequest = $request->get( 's' );

      $_roles= Role::where('display_name', 'like', "%{$searchRequest}%")
        ->orWhere('name', 'like', "%{$searchRequest}%")
        ->orWhere('id','like', "%{$searchRequest}%")->get();
    }
    $roles = [];
    foreach ( $_roles as $role ) {
      $value = data_get( $role, $request->get( 'value', 'id' ) );
      $roles[] = [
        'value' => $value,
        'label' => $role->display_name,
      ];
    }
    return response()->json( $roles, 200, [],JSON_UNESCAPED_UNICODE );
  }
}
