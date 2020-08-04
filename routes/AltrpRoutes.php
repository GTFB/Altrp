<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */
// Routes for the news resource
Route::get('/news', ['uses' =>'AltrpControllers\new2Controller@index']);
Route::get('/news_options', ['uses' =>'AltrpControllers\new2Controller@options']);
Route::post('/news', ['uses' =>'AltrpControllers\new2Controller@store']);
Route::get('/news/{news}', ['uses' =>'AltrpControllers\new2Controller@show']);
Route::put('/news/{news}', ['uses' =>'AltrpControllers\new2Controller@update']);
Route::delete('/news/{news}', ['uses' =>'AltrpControllers\new2Controller@destroy']);
Route::put('/news/{news}/{column}', ['uses' =>'AltrpControllers\new2Controller@updateColumn']);