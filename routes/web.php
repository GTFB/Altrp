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

// templates
/*Route::get('/admin/ajax/templates', 'TemplateController@templates')->name('templates');
Route::get('/admin/ajax/templates/{id}', 'TemplateController@template')->name('template');
Route::post('/admin/ajax/templates', 'TemplateController@create')->name('createTemplate');
Route::put('/admin/ajax/templates', 'TemplateController@update')->name('updateTemplate');
Route::delete('/admin/ajax/templates', 'TemplateController@delete')->name('deleteTemplate');*/

Route::get( '/admin/editor', function (){
  return view( 'editor' );
} )->name('editor');
Route::get( '/admin/editor-content', function (){
  return view( 'editor-content' );
} )->name('editor-content');


Route::group(['prefix' => 'admin'], function () {

  Route::group(['prefix' => 'ajax'], function () {
//    Route::get('/templates', "Constructor\Templates@getTemplates");
//    Route::get('/templates/{template}', "Constructor\Templates@getTemplate");
//    Route::post('/templates', "Constructor\Templates@insert");
//    Route::put('/templates/{template}', "Constructor\Templates@update");
//    Route::delete('/templates/{template}', "Constructor\Templates@delete");

    Route::get('/global-elements', "Constructor\GlobalElements@getElements");
    Route::get('/global-elements/{element}', "Constructor\GlobalElements@getElement");
    Route::post('/global-elements', "Constructor\GlobalElements@insert");
    Route::put('/global-elements/{element}', "Constructor\GlobalElements@update");
    Route::delete('/global-elements/{element}', "Constructor\GlobalElements@trashed");
    Route::get( 'templates/options', 'TemplateController@options' );
    Route::resource( 'templates', 'TemplateController' );
    Route::get( '/template/{template_id}/reviews', 'TemplateController@reviews' );
    Route::resource( 'media', 'Admin\MediaController' );
    Route::resource( 'pages', 'Admin\PagesController' );
  });

});

Route::view('/admin/{path?}', 'admin')
  ->where('path', '.*')
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

Route::group(['prefix' => 'ajax'], function(){

  Route::resource( 'routes', 'Frontend\RouteController' );

});