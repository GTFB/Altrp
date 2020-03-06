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

Route::get('/', function () {
    return view('welcome');
});

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

Route::view('/admin/{path?}', 'admin')
  ->where('path', '.*')
  ->name('admin');
