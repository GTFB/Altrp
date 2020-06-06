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


    Route::get('/permissions', "Users\Permissions@getPermissions");
    Route::get('/permissions/{permission}', "Users\Permissions@getPermission");
    Route::post('/permissions', "Users\Permissions@insert");
    Route::put('/permissions/{permission}', "Users\Permissions@update");
    Route::delete('/permissions/{permission}', "Users\Permissions@delete");

    Route::get('/roles', "Users\Roles@getRoles");
    Route::get('/roles/{role}', "Users\Roles@getRole");
    Route::post('/roles', "Users\Roles@insert");
    Route::put('/roles/{role}', "Users\Roles@update");
    Route::delete('/roles/{role}', "Users\Roles@delete");

    Route::get('/roles/{role}/permissions', "Users\Roles@getPermissions");
    Route::post('/roles/{role}/permissions', "Users\Roles@attachPermission");
    Route::delete('/roles/{role}/permissions', "Users\Roles@detachPermission");

    Route::get('/users', "Users\Users@getUsers");
    Route::get('/users/{user}', "Users\Users@getUser");
    Route::post('/users', "Users\Users@insert");
    Route::put('/users/{user}', "Users\Users@update");
    Route::delete('/users/{user}', "Users\Users@delete");

    Route::get('/users/{user}/permissions', "Users\Users@getPermissions");
    Route::post('/users/{user}/permissions', "Users\Users@attachPermission");
    Route::delete('/users/{user}/permissions', "Users\Users@detachPermission");

    Route::get('/users/{user}/roles', "Users\Users@getRoles");
    Route::post('/users/{user}/roles', "Users\Users@attachRole");
    Route::delete('/users/{user}/roles', "Users\Users@detachRole");

    Route::get('/users/{user}/usermeta', "Users\UsersMeta@getUserMeta");
    Route::post('/users/{user}/usermeta', "Users\UsersMeta@saveUserMeta");
    Route::delete('/users/{user}/roles', "Users\Users@detachRole");

  });

});
Route::resource( 'admin/ajax/templates', 'TemplateController' );
Route::resource( 'admin/ajax/media', 'Admin\MediaController' );

Route::view('/admin/{path?}', 'admin')
  ->where('path', '.*')
  ->middleware( 'auth' )
  ->name('admin');

/**
 * Installation
*/

Route::group([
  'middleware' => ['web', 'installation.checker'],
  'prefix'     => 'install',
], function () {
  Route::get('/', 'InstallationController@starting');
  Route::get('site_info', 'InstallationController@siteInfo');
  Route::post('site_info', 'InstallationController@siteInfo');
  Route::get('system_compatibility', 'InstallationController@systemCompatibility');
  Route::get('database', 'InstallationController@database');
  Route::post('database', 'InstallationController@database');
  Route::get('database_import', 'InstallationController@databaseImport');
  Route::get('cron_jobs', 'InstallationController@cronJobs');
  Route::get('finish', 'InstallationController@finish');
});

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
  })->middleware( ['web', 'installation.checker'] );

}

/**
 * AJAX routes for frontend
*/

Route::group( ['prefix' => 'ajax'], function(){

  Route::resource( 'routes', 'Frontend\RouteController' );

} );