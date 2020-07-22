<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */
// Routes for the contacts resource
Route::get('/contacts/get-all-records2', ['middleware' => ['auth:api','auth','ability:admin,update-contacts|all-contacts'], 'uses' => 'AltrpControllers\ContactController@getAllRecords2']);
Route::get('/contacts/get-all-records', ['middleware' => ['auth:api','auth','ability:admin,all-contacts'], 'uses' => 'AltrpControllers\ContactController@getAllRecords']);
Route::get('/contacts', ['middleware' => ['auth:api','auth',], 'uses' =>'AltrpControllers\ContactController@index']);
Route::post('/contacts', ['middleware' => ['auth:api','auth',], 'uses' =>'AltrpControllers\ContactController@store']);
Route::get('/contacts/{contact}', ['middleware' => ['auth:api','auth',], 'uses' =>'AltrpControllers\ContactController@show']);
Route::put('/contacts/{contact}', ['middleware' => ['auth:api','auth',], 'uses' =>'AltrpControllers\ContactController@update']);
Route::delete('/contacts/{contact}', ['middleware' => ['auth:api','auth',], 'uses' =>'AltrpControllers\ContactController@destroy']);
Route::put('/contacts/{contact}/{column}', ['middleware' => ['auth:api','auth'], 'uses' =>'AltrpControllers\ContactController@updateColumn']);