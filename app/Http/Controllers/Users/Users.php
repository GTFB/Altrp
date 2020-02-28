<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;
use Illuminate\Support\Facades\Hash;

use App\User;
use App\Permission;
use App\Role;

class Users extends Controller
{
    
    /**
     * Получение списка пользователей
     * @return type
     */
    function getUsers() {
        $users = User::all();
        return response()->json($users, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Получение пользователя по идентификатору
     * @param Request $request
     * @return type
     */
    function getUser(ApiRequest $request) {
        
        $id = $request->user;
        $user = User::find($id);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($user, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Добавление пользователя
     * @param Request $request
     * @return type
     */
    function insert(ApiRequest $request) {
        
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        
        if($user->save()){
            return response()->json($user, 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Обновление пользователя
     * @param ApiRequest $request
     * @return type
     */
    function update(ApiRequest $request) {
        
        $request->validate([
            'name' => ['string', 'max:255'],
            'email' => ['string', 'email', 'max:255', 'unique:users'],
            'password' => ['string', 'min:8', 'confirmed'],
        ]);
        
        $user = User::find($request->user);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        if($request->name) $user->name = $request->name;
        if($request->email) $user->email = $request->email;
        if($request->passsword) $user->password = Hash::make($request->password);
        
        if($user->save()){
            return response()->json($user, 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Удаление пользователя
     * @param ApiRequest $request
     * @return type
     */
    function delete(ApiRequest $request) {
        
        $user = User::find($request->user);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        if($user->delete()) {
            return response()->json(trans("responses.delete.user"), 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("deleteerror"), 400, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Получение прав доступа для конкретного пользователя
     * @return type
     */
    function getPermissions(ApiRequest $request) {
        
        $user = User::find($request->user);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $permissions = $user->permissions;
        return response()->json($permissions, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Добавление прав доступа для конкретного пользователя
     * @return type
     */
    function attachPermission(ApiRequest $request) {
        
        $user = User::find($request->user);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $permission = Permission::find($request->permission);
        
        if(!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $result = $user->attachPermission($permission);
        
        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Удаление прав доступа для конкретного пользователя
     * @return type
     */
    function detachPermission(ApiRequest $request) {
        
        $user = User::find($request->user);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $permission = Permission::find($request->permission);
        
        if(!$permission) {
            return response()->json(trans("responses.not_found.permission"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $result = $user->detachPermission($permission);
        
        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Получение ролей для конкретного пользователя
     * @return type
     */
    function getRoles(ApiRequest $request) {
        
        $user = User::find($request->user);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $roles = $user->roles;
        return response()->json($roles, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Добавление роли для конкретного пользователя
     * @return type
     */
    function attachRole(ApiRequest $request) {
        
        $user = User::find($request->user);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $role = Role::find($request->role);
        
        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $result = $user->attachRole($role);
        
        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Удаление роли для конкретного пользователя
     * @return type
     */
    function detachRole(ApiRequest $request) {
        
        $user = User::find($request->user);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $role = Role::find($request->role);
        
        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $result = $user->detachRole($role);
        
        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
}
