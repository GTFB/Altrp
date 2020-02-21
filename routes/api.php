<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group(['prefix' => 'users'], function () {
    
    Route::get('/permissions', "Users\Permissions@getPermissions");
    Route::get('/permissions/{permission}', "Users\Permissions@getPermission");
    Route::post('/permissions', "Users\Permissions@insert");
    Route::put('/permissions/{permission}', "Users\Permissions@update");
    Route::delete('/permissions/{permission}', "Users\Permissions@delete");
    
    Route::get('/roles', "Users\Roles@getRoles");
    Route::get('/roles/{role}', "Users\Roles@getRole");
    Route::post('/roles', "Users\Roles@insert");
    Route::put('/roles/{role}', "Users\Roles@update");
    Route::delete('/roles/{role}', "Users\Roles@delete");
    
    //Route::get('/permissions/{permission}', "Users\Permissions@getPermission");
    
    /*
    Route::get('/permissions/permission', "Users\Permissions@save");
    Route::get('/permissions/permission/{permission}', "Users\Permissions@save");
    Route::delete('permissions/permission/{permission}', "Users\Permissions@delete");*/
    
    
    /*
    Route::group(['prefix' => 'permissions'], function () {
        
        Route::get('getPermissions', "Users\Permissions@getPermissions");
        Route::get('getPermissions', "Users\Permissions@getPermissions");
        
        
        Route::patch('/users/edit/{user}', 'UsersController@update')->name('user_update');
    });*/
    
});


