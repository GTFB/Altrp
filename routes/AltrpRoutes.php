<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */
Route::resource('products', 'AltrpControllers\ProductController');
Route::put('products/{product}/{column}', 'AltrpControllers\ProductController@updateColumn');



Route::middleware("auth:api")->resource('userstesttables', 'AltrpControllers\UserTestTableController');
Route::put('userstesttables/{userstesttable}/{column}', 'AltrpControllers\UserTestTableController@updateColumn');