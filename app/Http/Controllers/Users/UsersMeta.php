<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;

use App\User;
use App\UserMeta;

//use Illuminate\Database\Schema;

use Illuminate\Support\Facades\Schema;

class UsersMeta extends ApiController{
    
    /**
     * Получение доп информации о пользователе по идентификатору
     * @param Request $request
     * @return type
     */
    function getUserMeta(ApiRequest $request) {
        
        $id = $request->user;
        $user = User::find($id);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($user->usermeta, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    function saveUserMeta(ApiRequest $request) {
        
        $id = $request->user;
        $user = User::find($id);
        
        if(!$user) {
            return response()->json(trans("responses.not_found.user"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        $meta = $user->usermeta;
        
        if(!$meta) {
            $meta = new UserMeta();
            $meta->user_id = $user->id;
        }
        
        $schema = Schema::getColumnListing($meta->getTable());
        
        foreach($schema as $value) {
            if($request->input($value)) {
                $meta[$value] = $request[$value];
            }
        }
        
        $result = $meta->save();
        
        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
}
