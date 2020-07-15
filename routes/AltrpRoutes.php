<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */
Route::middleware('auth:api','auth')->resource('inner', 'AltrpControllers\InnerController');
Route::put('inner/{inner}/{column}', 'AltrpControllers\InnerController@updateColumn');