<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Altrp\Facades\CacheService;


use App\User;
use App\Permission;
use App\Role;

class Users extends Controller
{

    /**
     * Получение списка пользователей
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function getUsers(ApiRequest $request)
    {
        $search = $request->get('s');
        $orderColumn = $request->get('order_by') ?? 'id';
        $orderType = $request->get('order') ? ucfirst(strtolower($request->get('order'))) : 'Desc';
        $sortType = 'orderBy' . ($orderType == 'Asc' ? '' : $orderType);
        $users = $search
            ? User::getBySearch($search, 'email', ["roles", "usermeta"], $orderColumn, $orderType)
            : User::with(["roles", "usermeta"])->$sortType($orderColumn)->get();
        return response()->json($users, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение пользователя по идентификатору
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function getUser(ApiRequest $request)
    {

        $id = $request->user;
        $user = User::find($id);
        $user->_roles = $user->roles->map(function ($role) {
            return $role->id;
        })->toArray();
        $user->_permissions = $user->permissions->map(function ($permission) {
            return $permission->id;
        })->toArray();

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json($user, 200, [], JSON_UNESCAPED_UNICODE);
    }
    // /**
    //  * Получение хранилища пользователя
    //  * @param Request $request
    //  * @return \Illuminate\Http\JsonResponse
    //  */
    // public function getUserStorage(ApiRequest $request)
    // {
    //     $id = $request->user;
    //     $user = User::find($id);
    //     if ($user === null) {
    //         return response()->json([], 404, [], JSON_UNESCAPED_UNICODE);
    //     }
    //     $localStorage = $user->local_storage;
    //     return response()->json($localStorage, 200, [], JSON_UNESCAPED_UNICODE);
    // }

    /**
     * Добавление пользователя
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    function insert(ApiRequest $request)
    {
        //dd(123);
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->telegram_user_id = $request->telegram_user_id;
        $user->password = Hash::make($request->password);

        if($user->save()){
          $permissions = $request->get( '_permissions' );
          if( $permissions ){
            $permissions = Permission::find( $permissions );
            $user->attachPermissions( $permissions );
          }
          $roles = $request->get( '_roles' );
          if( $roles ){
            $roles = Role::find( $roles );
            $user->attachRoles( $roles );
          }

          CacheService::saveUserJson($user->id);

          return response()->json($user, 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("responses.dberror"), 400, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обновление пользователя
     * @param ApiRequest $request
     * @return type
     */
    function update(ApiRequest $request)
    {
        $request->validate([
            'password' => ['string', 'min:8', 'confirmed'],
        ]);

        $user = User::find($request->user);

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        if ($request->name) $user->name = $request->name;
        if ($request->email) $user->email = $request->email;
        if ($request->telegram_user_id) $user->telegram_user_id = $request->telegram_user_id;
        if ($request->password) $user->password = Hash::make($request->password);

        if ($user->save()) {
            $permissions = $request->get('_permissions');
            $user->detachPermissions();
            if ($permissions) {
                $permissions = Permission::find($permissions);
                $user->attachPermissions($permissions);
            }
            $roles = $request->get('_roles');
            $user->detachRoles();
            if ($roles) {
                $roles = Role::find($roles);
                $user->attachRoles($roles);
            }

            CacheService::saveUserJson($user->id);

            return response()->json($user, 200, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json(trans("responses.dberror"), 400, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удаление пользователя
     * @param ApiRequest $request
     * @return type
     */
    function delete(ApiRequest $request)
    {

        $user = User::find($request->user);

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        if ($user->delete()) {
            return response()->json(trans("responses.delete.user"), 200, [], JSON_UNESCAPED_UNICODE);
        }

        CacheService::removeUserJson( $user->id );

        return response()->json(trans("deleteerror"), 400, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение прав доступа для конкретного пользователя
     * @return type
     */
    function getPermissions(ApiRequest $request)
    {

        $user = User::find($request->user);

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $permissions = $user->permissions;
        return response()->json($permissions, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Добавление прав доступа для конкретного пользователя
     * @return type
     */
    function attachPermission(ApiRequest $request)
    {

        $user = User::find($request->user);

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $permission = Permission::find($request->permission);

        if (!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $result = $user->attachPermission($permission);

        return response()->json($result, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удаление прав доступа для конкретного пользователя
     * @return type
     */
    function detachPermission(ApiRequest $request)
    {

        $user = User::find($request->user);

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $permission = Permission::find($request->permission);

        if (!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $result = $user->detachPermission($permission);

        return response()->json($result, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Получение ролей для конкретного пользователя
     * @return type
     */
    function getRoles(ApiRequest $request)
    {

        $user = User::find($request->user);

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $roles = $user->roles;
        return response()->json($roles, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Добавление роли для конкретного пользователя
     * @return type
     */
    function attachRole(ApiRequest $request)
    {

        $user = User::find($request->user);

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $role = Role::find($request->role);

        if (!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $result = $user->attachRole($role);

        CacheService::saveUserJson($user->id);

        return response()->json($result, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удаление роли для конкретного пользователя
     * @return type
     */
    function detachRole(ApiRequest $request)
    {

        $user = User::find($request->user);

        if (!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $role = Role::find($request->role);

        if (!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [], JSON_UNESCAPED_UNICODE);
        }

        $result = $user->detachRole($role);

        CacheService::saveUserJson($user->id);

        return response()->json($result, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Обработка запроса на получение данных текущего пользователя
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCurrentUser(ApiRequest $request)
    {
       return response()->json( ['data' => getCurrentUser()], 200, [], JSON_UNESCAPED_UNICODE );
    }
    /**
     * Обработка запроса на получение данных текущего пользователя
     * @param ApiRequest $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function getCurrentUserData(ApiRequest $request)
    {
      $user = json_encode( getCurrentUser() );
      $res = "window.current_user = $user ;";

      return response( $res, 200, [
        'Content-Type'=> 'application/javascript'

      ] );
    }
    /**
     * Обновление данных в local_storage текущего пользователя
     * @param ApiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeUserStorage(ApiRequest $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(
                ['data' => ['is_guest' => true]],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
        $user->local_storage = json_encode($request->local_storage);
        if ($user->save()) {
            $user->local_storage = json_decode($user->local_storage, 255);
            return response()->json(
                ['data' => $user],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
        return response()->json(
            ['message' => 'error'],
            422,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Получить записи для списка опций: id, name
     * @return mixed
     */
    public function getUsersOptions()
    {
        $users = User::all();
        $options = [];
        foreach ($users as $user) {
            $options[] = [
                'value' => $user->id,
                'label' => $user->name,
            ];
        }
        return $options;
    }
}
