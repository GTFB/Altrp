<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
/**
 * File for user routes
 */



//Route::get('regions', 'AltrpControllers\RegionController@index_with_opcompany');

Route::resource('okrugs', 'AltrpControllers\OkrugController');
Route::resource('regions', 'AltrpControllers\RegionController');

//Route::get('regions?a=getallregions', 'AltrpControllers\RegionController@index_with_opcompany');




Route::resource('companies', 'AltrpControllers\CompanyController');
Route::resource('admin2/cars', 'AltrpControllers\Admin23\CarController');
