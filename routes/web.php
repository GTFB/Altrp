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


/**
 * Installation
 */

Route::group([
  'middleware' => ['web', 'installation.checker'],
  'prefix'     => 'install',
], function () {
  Route::get('/', 'InstallationController@starting')->name(  'installation.start' );
  Route::get('process', 'InstallationController@process')->name(  'installation.input' );
  Route::post('process', 'InstallationController@process')->name(  'installation.post' );
//  Route::get('migrate', 'InstallationController@migrate')->name(  'installation.migrate' );
});

Route::group([
  'middleware' => [ 'installation.checker'],
], function () {
  Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
  Route::post('login', 'Auth\LoginController@login');
  Route::post('logout', 'Auth\LoginController@logout')->name('logout');
});


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

    Route::resource( 'areas', 'Admin\AreasController' );
    Route::resource( 'templates', 'TemplateController' );
    Route::resource( 'media', 'Admin\MediaController' );
    Route::resource( 'settings', 'Admin\SettingsController' );

    /**
     * Updates Check
     */
    Route::post( 'check_update', 'Admin\UpdateController@check_update' )->name( 'admin.check_update' );
    Route::post( 'update_altrp', 'Admin\UpdateController@update_altrp' )->name( 'admin.update_altrp' );

    /**
     * Роуты для теста запросов для виджета таблицы todo: удалить, после того как модели будут готовы
     */
    Route::get( 'models_list', 'Admin\ModelsController@models_list' )->name( 'admin.models_list' );
    Route::get( 'models_list_for_query', 'Admin\ModelsController@models_list_for_query' )->name( 'admin.models_list_for_query' );
    Route::get( 'models_options', 'Admin\ModelsController@models_options' )->name( 'admin.models_options' );


    Route::get('/tables', "Admin\TableController@getTables");
    Route::get('/tables/{table}', "Admin\TableController@getTable");
    Route::post('/tables', "Admin\TableController@insert");
    Route::put('/tables/{table}', "Admin\TableController@update");
    Route::delete('/tables/{table}', "Admin\TableController@delete");

    Route::get('/tables/{table}/migrations', "Admin\TableController@getMigrations");
    Route::post('/tables/{table}/migrations', "Admin\TableController@insertMigration");
    Route::post('/tables/{table}/migrations/{migration}/run', "Admin\TableController@runMigration");

    Route::get('/tables/{table}/columns', "Admin\TableController@getColumns");
    Route::get('/tables/{table}/keys', "Admin\TableController@getKeys");
    
    Route::post('/tables/{table}/test', "Admin\TableController@test");
    
    
    Route::get('/tables/{table}/model', "Admin\TableController@getModel");
    Route::post('/tables/{table}/model', "Admin\TableController@saveModel");
    
    Route::get('/tables/{table}/controller', "Admin\TableController@getController");
    Route::post('/tables/{table}/controller', "Admin\TableController@saveController");
    
    // GeneratorController routes
    Route::post('/generators/{table}/model/create', 'Admin\GeneratorController@createModel');
    Route::post('/generators/{table}/controller/create', 'Admin\GeneratorController@createController');
    
    

    
  });

});

//Route::resource( 'admin/ajax/areas', 'Admin\AreasController' );
//Route::resource( 'admin/ajax/templates', 'TemplateController' );
//Route::resource( 'admin/ajax/media', 'Admin\MediaController' );

Route::view('/admin/{path?}', 'admin')
  ->where('path', '.*')
  ->middleware( [ 'auth','web', 'installation.checker',]  )
  ->name('admin');

/**
 * Frontend
*/

$frontend_routes = \App\Page::get_frontend_routes();

Route::get('/', function () {

  return view('front-app');
})->middleware( ['web', 'installation.checker'] );

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
  Route::get( 'models/{model_name}', 'Frontend\ModelsController@models' )->name( 'front.models.all' );
  Route::post( 'models/{model_name}', 'Frontend\ModelsController@create' )->name( 'front.models.create' );

} );

/*

    // Require users routes
    if ( file_exists( app_path( '/routes/AltrpRoutes.php' ) ) )
    {
        require_once ('AltrpRoutes.php');
    }*/