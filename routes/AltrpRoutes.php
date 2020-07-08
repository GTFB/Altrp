<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */
Route::middleware('auth:api','auth')->resource('contacts', 'AltrpControllers\ContactController');
Route::put('contacts/{contact}/{column}', 'AltrpControllers\ContactController@updateColumn');