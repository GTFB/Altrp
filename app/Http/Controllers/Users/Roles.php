<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

use App\Role;

class Roles extends ApiController
{
    function getRoles() {
        $roles = Role::all();
        return response()->json($roles, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    function getRole(Request $request) {
        
        $id = $request->role;
        $role = Role::find($id);
        
        $response = response()->json($role, 200, [],JSON_UNESCAPED_UNICODE);
        
        if(!$role) {
            $response = response()->json($role, 204, [],JSON_UNESCAPED_UNICODE);
        }
        
        return $response;
    }
    
    function save(Request $request) {
        
        
        /*$request->validate([
            "name" => ["string", "required", "size:191"],
            "display_name" => ["string", "required", "size:191"],
            "description" => ["string", "required", "size:191"],
        ]);*/
        
       
        
        if($request->role) {
            $role = Permission::find($request->role);
        }
        else {
            $role = new Role();
        }
        
        $role->name = $request->name;
        $role->display_name = $request->display_name;
        $role->description = $request->description;
        
        $state = $role->save();
        
        if($state) {
            $response = response()->json($role, 200, [],JSON_UNESCAPED_UNICODE);
        }
        else {
            $response = response()->json($role, 401, [],JSON_UNESCAPED_UNICODE);
        }
        
        return $response;
        
    }
    
    function delete(Request $request) {
        
        $id = $request->permission;
        $permission = Permission::find($id);
        
        if(!$permission) {
            $response = response()->json(false, 204, [],JSON_UNESCAPED_UNICODE);
        }
        
        $state = $permission->delete();
        
        if($state) {
            $response = response()->json(true, 200, [],JSON_UNESCAPED_UNICODE);
        }
        else {
            $response = response()->json(false, 400, [],JSON_UNESCAPED_UNICODE);
        }
        
        return $response;
        
    }
}
