<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */
Route::middleware('auth:api','auth')->resource('points', 'AltrpControllers\PointController');
Route::put('points/{point}/{column}', 'AltrpControllers\PointController@updateColumn');