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
  Route::post('login', 'Auth\LoginController@login')->name( 'post.login' );
  Route::post('logout', 'Auth\LoginController@logout')->name('logout');
});


Route::get( '/admin/editor', function (){
  return view( 'editor' );
} )->middleware( 'auth' )->name('editor');

Route::get( '/admin/editor-content', function (){
  return view( 'editor-content' );
} )->middleware( 'auth' )->name('editor-content');

Route::get( '/admin/editor-reports', function (){
  return view( 'editor-reports' );
} )->middleware( 'auth' )->name('editor-reports');

Route::get('/reports/html/{id}', "ReportsController@page");

/**
 * Роуты Админки
 */

Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function () {

  Route::group(['prefix' => 'ajax'], function () {

    Route::get('/analytics', 'AnalyticsController@index');
    Route::get('/analytics/none', 'AnalyticsController@none');

    Route::get('/global-elements', "Constructor\GlobalElements@getElements");
    Route::get('/global-elements/{element}', "Constructor\GlobalElements@getElement");
    Route::post('/global-elements', "Constructor\GlobalElements@insert");
    Route::put('/global-elements/{element}', "Constructor\GlobalElements@update");
    Route::delete('/global-elements/{element}', "Constructor\GlobalElements@trashed");
    Route::get( 'templates/options', 'TemplateController@options' );
    Route::get( 'popups/options', 'TemplateController@popupsOptions' );
    Route::get( '/templates/{template_id}/reviews', 'TemplateController@reviews' );
    Route::delete('/templates/{template_id}/reviews', 'TemplateController@deleteReviews');
    Route::delete('/templates/{template_id}/reviews/{review_id}', 'TemplateController@deleteReview');
    Route::get('/templates/{template_id}/reviews/{review_id}', 'TemplateController@getReview')->name( 'admin.get-review' );
    Route::delete('/reviews', 'TemplateController@deleteAllReviews')->name( 'admin.delete-all-reviews' );

    Route::resource( 'pages', 'Admin\PagesController' );
    Route::get( '/pages_options', 'Admin\PagesController@pages_options' )->name( 'admin.pages_options.all' );
    Route::get( '/pages_options/{page_id}', 'Admin\PagesController@show_pages_options' )->name( 'admin.pages_options.show' );
    Route::get('/permissions', "Users\Permissions@getPermissions");
    Route::get('/permissions_options', "Users\Permissions@getPermissionsOptions");
    Route::get('/permissions/{permission}', "Users\Permissions@getPermission");
    Route::post('/permissions', "Users\Permissions@insert");
    Route::put('/permissions/{permission}', "Users\Permissions@update");
    Route::delete('/permissions/{permission}', "Users\Permissions@delete");

    Route::get('/roles', "Users\Roles@getRoles");
    /**
     * URL: /admin/ajax/role_options?s=search_string
     * response:
     * [
     *  {
     *    value - role id
     *    label - role display_name
     *  }
     * ]
     */
    Route::get('/role_options', "Users\Roles@get_options")->name( 'admin.role_options' );
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

    //Route::resource( 'reports', 'ReportsController' );
    /**
     * Areas Routes
     */
    Route::resource( 'areas', 'Admin\AreasController' );
    /**
     * Templates Routes
     */
    Route::resource( 'templates', 'TemplateController' );
    /**
     * templates settings
     */
    Route::get( 'templates/{template_id}/settings/{setting_name}', 'TemplateController@settingGet' )
      ->name( 'get-template-setting' );
    Route::put( 'templates/{template_id}/settings/{setting_name}', 'TemplateController@settingSet' )
      ->name( 'set-template-setting' );
    /**
     * Templates Conditions
     */
    Route::get( 'templates/{template_id}/conditions', 'TemplateController@conditionsGet' )
      ->name( 'get-template-setting' );
    Route::put( 'templates/{template_id}/conditions', 'TemplateController@conditionsSet' )
      ->name( 'set-template-setting' );
    /**
     * Reports
     */
    //Route::get('reports/{id}', "TemplateController@show");
    //Route::put('reports/{id}', "TemplateController@update");
    Route::resource( 'reports', 'ReportsController' );

    Route::resource( 'media', 'Admin\MediaController' );
    Route::resource( 'settings', 'Admin\SettingsController' );
    Route::resource( 'diagrams', 'Admin\AltrpDiagramController' );
    Route::get( 'sql_editors/list', 'Admin\SQLEditorController@listByName');
    Route::resource( 'sql_editors', 'Admin\SQLEditorController' );

    /**
     * Updates Check
     */
    Route::post( 'check_update', 'Admin\UpdateController@check_update' )->name( 'admin.check_update' );
    Route::post( 'update_altrp', 'Admin\UpdateController@update_altrp' )->name( 'admin.update_altrp' );

    /**
     * Запрос на обновление всех пользовательских контроллеров
     */
    Route::post( 'update-all-controllers', 'Admin\UpdateController@updateAllControllers' )->name( 'admin.update-all-controllers' );

    /**
     * Запрос на обновление всех пользовательских ресурсов через обновление данных Models в БД
     */
    Route::post( 'update-all-resources', 'Admin\UpdateController@upgradeAllResources' )->name( 'admin.update-all-resources' );

    /**
     * Роуты для теста запросов для виджета таблицы todo: удалить, после того как модели будут готовы
     */
    Route::get( '/models_list', 'Admin\ModelsController@models_list' )->name( 'admin.models_list' );
    Route::get( '/models_list_for_query', 'Admin\ModelsController@models_list_for_query' )->name( 'admin.models_list_for_query' );
    Route::get( '/models_options', 'Admin\ModelsController@models_options' )->name( 'admin.models_options' );
    Route::get( '/models_with_fields_options', 'Admin\ModelsController@models_with_fields_options' )
      ->name( 'admin.models_with_fields_options' );

    /**
    * Маршруты для проверки на уникальность имени
    */
    Route::get('/model_name_is_free', 'Admin\ModelsController@modelNameIsFree');
    Route::get('/models/{model_id}/field_name_is_free', 'Admin\ModelsController@fieldNameIsFree');
    Route::get('/models/{model_id}/relation_name_is_free', 'Admin\ModelsController@relationNameIsFree');
    Route::get('/models/{model_id}/query_name_is_free', 'Admin\ModelsController@queryNameIsFree');

    /**
    * Модели
    */
    Route::get( '/models', 'Admin\ModelsController@getModels');
    Route::get( '/model_options', 'Admin\ModelsController@getModelOptions');
    Route::get( '/models_without_parent', 'Admin\ModelsController@getModelsWithoutParent');
    Route::post( '/models', 'Admin\ModelsController@storeModel');
    Route::put( '/models/{model_id}', 'Admin\ModelsController@updateModel');
    Route::get( '/models/{model_id}', 'Admin\ModelsController@showModel');
    Route::delete( '/models/{model_id}', 'Admin\ModelsController@destroyModel');

    // SQL Builder
    Route::get( '/models/{model_id}/queries', 'Admin\ModelsController@getAllQueries');
    Route::post( '/models/{model_id}/queries', 'Admin\ModelsController@storeQuery');
    Route::get('/models/{model_id}/queries/{query_id}', 'Admin\ModelsController@getQuery');
    Route::put( '/models/{model_id}/queries/{query_id}', 'Admin\ModelsController@updateQuery');
    Route::delete('/models/{model_id}/queries/{query_id}', 'Admin\ModelsController@destroyQuery');

    // Fields
    /**
     * Источники данных для QueryController
     */
    Route::get( '/data_sources_for_query', 'Admin\ModelsController@data_sources_for_query');

    /**
    * Поля
    */
    Route::get( '/models/{model_id}/fields', 'Admin\ModelsController@getModelFields');
    Route::get( '/models/{model_id}/field_options', 'Admin\ModelsController@getModelFieldOptions');
    Route::post( '/models/{model_id}/fields', 'Admin\ModelsController@storeModelField');
    Route::put( '/models/{model_id}/fields/{field_id}', 'Admin\ModelsController@updateModelField');
    Route::get( '/models/{model_id}/fields/{field_id}', 'Admin\ModelsController@showModelField');
    Route::delete( '/models/{model_id}/fields/{field_id}', 'Admin\ModelsController@destroyModelField');

    /**
    * Аксессоры
    */
    Route::get( '/models/{model_id}/accessors', 'Admin\ModelsController@getModelAccessors');
    Route::post( '/models/{model_id}/accessors', 'Admin\ModelsController@storeAccessor');
    Route::put( '/models/{model_id}/accessors/{accessor_id}', 'Admin\ModelsController@updateAccessor');
    Route::get( '/models/{model_id}/accessors/{accessor_id}', 'Admin\ModelsController@showAccessor');
    Route::delete( '/models/{model_id}/accessors/{accessor_id}', 'Admin\ModelsController@destroyAccessor');

    /**
    * Связи
    */
    Route::get( '/models/{model_id}/relations', 'Admin\ModelsController@getModelRelations');
    Route::get( '/models/{model_id}/relation_options', 'Admin\ModelsController@getModelRelationOptions');
    Route::post( '/models/{model_id}/relations', 'Admin\ModelsController@storeModelRelation');
    Route::put( '/models/{model_id}/relations/{field_id}', 'Admin\ModelsController@updateModelRelation');
    Route::get( '/models/{model_id}/relations/{field_id}', 'Admin\ModelsController@showModelRelation');
    Route::delete( '/models/{model_id}/relations/{field_id}', 'Admin\ModelsController@destroyModelRelation');

    /**
    * Источники данных
    */
    Route::get( '/data_sources', 'Admin\ModelsController@getDataSources');
    Route::get( '/data_source_options', 'Admin\ModelsController@getDataSourceOptions');
    Route::post( '/data_sources', 'Admin\ModelsController@storeDataSource');
    Route::put( '/data_sources/{field_id}', 'Admin\ModelsController@updateDataSource');
    Route::get( '/data_sources/{field_id}', 'Admin\ModelsController@showDataSource');
    Route::delete( '/data_sources/{field_id}', 'Admin\ModelsController@destroyDataSource');

    Route::get('/tables', "Admin\TableController@getTables");
    Route::get('/tables/options', "Admin\TableController@getTablesForOptions");
    Route::get('/tables_options', "Admin\TableController@getTablesForOptions");
    Route::get('/tables/{table}', "Admin\TableController@getTable");
    Route::post('/tables', "Admin\TableController@insert");
    Route::put('/tables/{table}', "Admin\TableController@update");
    Route::delete('/tables/{table}', "Admin\TableController@delete");

    Route::get('/tables/{table}/migrations', "Admin\TableController@getMigrations");
    Route::post('/tables/{table}/migrations', "Admin\TableController@insertMigration");
    Route::post('/tables/{table}/migrations/{migration}/run', "Admin\TableController@runMigration");

    Route::get('/tables/{table}/columns', "Admin\TableController@getColumns");
    Route::get('/tables/{table}/keys', "Admin\TableController@getKeys");

    Route::post('/tables/{table}/models', 'Admin\TableController@saveModel');
    Route::get('/tables/{table}/models/{model}', 'Admin\TableController@getModel');
    Route::post('/tables/{table}/models/{model}/accessors', 'Admin\TableController@saveAccessor');
    Route::get('/tables/{table}/models/{model}/accessors', 'Admin\TableController@getAccessors');
    Route::delete('/tables/{table}/models/{model}/accessors/{accessor}', 'Admin\TableController@deleteAccessor');
    Route::put('/tables/{table}/models/{model}/accessors/{accessor}', 'Admin\TableController@updateAccessor');
    Route::post('/tables/{table}/controllers', 'Admin\TableController@saveController');
    Route::get('/tables/{table}/controllers/{controller}', 'Admin\TableController@getController');


    Route::post('/tables/{table}/test', "Admin\TableController@test");
    Route::get('/tables/{table}/model', "Admin\TableController@getModel");
    Route::post('/tables/{table}/model', "Admin\TableController@saveModel");

    Route::get('/tables/{table}/controller', "Admin\TableController@getController");
    Route::post('/tables/{table}/controller', "Admin\TableController@saveController");


  });
  /**
   * Роуты загрузок Админки
   */
  Route::group(['prefix' => 'downloads'], function () {
    Route::get( 'settings', 'Admin\DownloadsController@exportAltrpSettings' )->name( 'admin.download.settings' );
  } );

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

  $frontend_route = str_replace( ':id', '{id}', $frontend_route );
  Route::get($frontend_route, function () {
    return view('front-app');
  })->middleware( ['web', 'installation.checker'] );

}

/**
 * AJAX routes for frontend
*/

Route::group( ['prefix' => 'ajax'], function(){

  /**
   * Роут текущий пользователь
   */
  Route::get( 'current-user', "Users\Users@getCurrentUser" )->name( 'users.current-user' );
  
  // Отдает данные для виджета карты
  Route::get('maps/{id}', 'MapsController@index');

  // Записывает данные карты с фронта
  Route::post('maps/{id}', 'MapsController@store');

  // Отдает данные для виджета панели аналитики
  Route::get('dashboards/{id}', 'DashboardsController@index');

  // Записывает данные для виджета панели аналитики
  Route::post('dashboards/{id}', 'DashboardsController@store');

  // Обновляем виджет на панели аналитики
  Route::put('dashboards/{id}', 'DashboardsController@update');

  // Удаляем виджет из панели аналитики
  Route::delete('dashboards/{id}', 'DashboardsController@destroy');

  /**
   * Отдает данные страницы как модели для динамического контента
   */
  Route::get( 'models/page/{page_id}', 'Frontend\PageController@show' )->name( 'front.page.show' );

  /**
   * Отдает данные роутов для фронтенда
   */
  Route::resource( 'routes', 'Frontend\RouteController' );

  /**
   * Отдает данные страниц внутри роутов ( с areas и шаблонами)
   */
  Route::get( 'pages/{page_id}', 'Frontend\PageController@pageForRoutes' )->name( 'front.page-for-routes' );
  /**
   * todo: реализовать в контроллерах моделей
   */
//  Route::get( 'models/{model_name}', 'Frontend\ModelsController@models' )
//    ->name( 'front.models.all' );
//
//  Route::get( 'models/{model_name}/{model_id}', 'Frontend\ModelsController@show' )
//    ->name( 'front.models.show' );
//
//  Route::delete( 'models/{model_name}/{model_id}', 'Frontend\ModelsController@delete' )
//    ->name( 'front.models.delete' );
//
//  Route::put( 'models/{model_name}/{model_id}', 'Frontend\ModelsController@edit' )
//    ->name( 'front.models.edit' );
//
//  Route::post( 'models/{model_name}', 'Frontend\ModelsController@create' )
//    ->name( 'front.models.create' );

  /**
   * todo: для загрузчика шаблонов для виджетов
   */
  Route::get( 'templates/{template_id}', 'TemplateController@show_frontend' )->name( 'templates.show.frontend' );

} );

Route::get('reports/{id}', "ReportsController@show");
Route::post('reports/{id}', "ReportsController@update");

Route::get('/linkstorage', function () {
  return redirect('/admin');
});

/**
 * Роуты для зарегистрированных пользователей
 */
Route::group( ['prefix' => 'ajax', 'middleware' => 'auth'], function() {


} );
/**
 * Обновление всех ресурсов бэкенда
 */
Route::post( 'update-all-resources', 'Admin\UpdateController@upgradeAllResources' );