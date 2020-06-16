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

Route::group(['prefix' => 'admin', "middleware" => ["auth:api", "role:admin"]], function () {
    
    Route::group(['prefix' => 'ajax'], function () {
        Route::get('/templates', "Constructor\Templates@getTemplates");
        Route::get('/templates/{template}', "Constructor\Templates@getTemplate");
        Route::post('/templates', "Constructor\Templates@insert");
        Route::put('/templates/{template}', "Constructor\Templates@update");
        Route::delete('/templates/{template}', "Constructor\Templates@delete");
        
        Route::get('/global-elements', "Constructor\GlobalElements@getElements");
        Route::get('/global-elements/{element}', "Constructor\GlobalElements@getElement");
        Route::post('/global-elements', "Constructor\GlobalElements@insert");
        Route::put('/global-elements/{element}', "Constructor\GlobalElements@update");
        Route::delete('/global-elements/{element}', "Constructor\GlobalElements@trashed");
        
        Route::get('/tables', "Admin\TableController@getTables");
        Route::get('/tables/{table}', "Admin\TableController@getTable");
        Route::post('/tables', "Admin\TableController@insert");
        Route::put('/tables/{table}', "Admin\TableController@update");
        Route::delete('/tables/{table}', "Admin\TableController@delete");
        
        Route::get('/tables/{table}/migrations', "Admin\TableController@getMigrations");
        Route::post('/tables/{table}/migrations', "Admin\TableController@insertMigration");
        Route::post('/tables/{table}/migrations/{migration}/run', "Admin\TableController@runMigration");
        
        Route::get('/tables/{table}/columns', "Admin\TableController@getColumns");
        Route::get('/tables/{table}/keys', "Admin\TableController@getKeys");
        /*Route::get('/tables', "Admin\TableController@getTables");
        Route::get('/tables/{table}', "Admin\TableController@getTable");
        Route::post('/tables', "Admin\TableController@insert");
        Route::put('/tables/{table}', "Admin\TableController@update");
        Route::delete('/tables/{table}', "Admin\TableController@delete");*/
        
        
    });
    
});

Route::group(['prefix' => 'users'], function () {

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


