<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */
// Routes for the points resource
Route::get('/points', ['uses' =>'AltrpControllers\PointController@index']);
Route::post('/points', ['middleware' => ['ability:admin|testrole1,update-okrug'], 'uses' =>'AltrpControllers\PointController@store']);
Route::get('/points/{point}', ['uses' =>'AltrpControllers\PointController@show']);
Route::put('/points/{point}', ['middleware' => ['ability:admin'], 'uses' =>'AltrpControllers\PointController@update']);
Route::delete('/points/{point}', ['uses' =>'AltrpControllers\PointController@destroy']);
Route::put('/points/{point}/{column}', ['uses' =>'AltrpControllers\PointController@updateColumn']);