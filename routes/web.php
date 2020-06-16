<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get( '/admin/editor', function (){
  return view( 'editor' );
} )->middleware( 'auth' )->name('editor');
Route::get( '/admin/editor-content', function (){
  return view( 'editor-content' );
} )->middleware( 'auth' )->name('editor-content');


Route::group(['prefix' => 'admin', 'middleware' => 'auth',], function () {

  Route::group(['prefix' => 'ajax'], function () {

    Route::get('/global-elements', "Constructor\GlobalElements@getElements");
    Route::get('/global-elements/{element}', "Constructor\GlobalElements@getElement");
    Route::post('/global-elements', "Constructor\GlobalElements@insert");
    Route::put('/global-elements/{element}', "Constructor\GlobalElements@update");
    Route::delete('/global-elements/{element}', "Constructor\GlobalElements@trashed");
    Route::get( 'templates/options', 'TemplateController@options' );
    Route::get( '/template/{template_id}/reviews', 'TemplateController@reviews' );
    Route::resource( 'pages', 'Admin\PagesController' );
    Route::resource( 'areas', 'Admin\AreasController' );
    
    
    Route::get('/tables', "Admin\TableController@getTables");
    Route::get('/tables/{table}', "Admin\TableController@getTable");
    Route::post('/tables', "Admin\TableController@insert");
    Route::put('/tables/{table}', "Admin\TableController@update");
    Route::delete('/tables/{table}', "Admin\TableController@delete");
    
    
  });

});
Route::resource( 'admin/ajax/templates', 'TemplateController' );
Route::resource( 'admin/ajax/media', 'Admin\MediaController' );

Route::view('/admin/{path?}', 'admin')
  ->where('path', '.*')
  ->middleware( 'auth' )
  ->name('admin');

/**
 * Frontend
*/

$frontend_routes = \App\Page::get_frontend_routes();

Route::get('/', function () {
  return view('front-app');
});

foreach ( $frontend_routes as $frontend_route ) {

  Route::get($frontend_route, function () {
    return view('front-app');
  });

}

/**
 * AJAX routes for frontend
*/

Route::group( ['prefix' => 'ajax'], function(){

  Route::resource( 'routes', 'Frontend\RouteController' );

} );