<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Notifications routes
 */
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/notifications', 'NotificationsController@getAllNotifications');
    Route::get('/notifications/delete_all', 'NotificationsController@deleteAllNotifications');
    Route::get('/unread_notifications', 'NotificationsController@getAllUnreadNotifications');
    Route::get('/unread_notifications/mark_as_read_all', 'NotificationsController@markAsReadAll');
    Route::get('/unread_notifications/{notification_id}/mark_as_read', 'NotificationsController@markAsRead');

});

Route::group(['prefix' => 'admin', "middleware" => ["auth:api", "role:admin"]], function () {

    Route::group(['prefix' => 'ajax'], function () {
        Route::get('/users/{user}/notifications', 'Admin\NoticeSettingController@index');
        Route::post('/users/{user}/notifications', 'Admin\NoticeSettingController@store');
        Route::put('/users/{user}/notifications/{notification}', 'Admin\NoticeSettingController@update');
        Route::delete('/users/{user}/notifications/{notification}', 'Admin\NoticeSettingController@destroy');

        Route::get('/templates', "Constructor\Templates@getTemplates");
        Route::get('/templates/{template}', "Constructor\Templates@getTemplate");
        Route::post('/templates', "Constructor\Templates@insert");
        Route::put('/templates/{template}', "Constructor\Templates@update");
        Route::delete('/templates/{template}', "Constructor\Templates@delete");

        Route::get('/global-elements', "Constructor\GlobalElements@getElements");
        Route::get('/global-elements/{element}', "Constructor\GlobalElements@getElement");
        Route::post('/global-elements', "Constructor\GlobalElements@insert");
        Route::put('/global-elements/{element}', "Constructor\GlobalElements@update");
        Route::delete('/global-elements/{element}', "Constructor\GlobalElements@trashed");

        Route::get('/tables', "Admin\TableController@getTables");
        Route::get('/tables/options', "Admin\TableController@getTablesForOptions");
        Route::get('/tables/{table}', "Admin\TableController@getTable");
        Route::post('/tables', "Admin\TableController@insert");
        Route::put('/tables/{table}', "Admin\TableController@update");
        Route::delete('/tables/{table}', "Admin\TableController@delete");

        Route::post('/tables/{table}/test', "Admin\TableController@test");

        Route::get('/tables/{table}/migrations', "Admin\TableController@getMigrations");
        Route::post('/tables/{table}/migrations', "Admin\TableController@insertMigration");
        Route::post('/tables/{table}/migrations/{migration}/run', "Admin\TableController@runMigration");

        Route::get('/tables/{table}/columns', "Admin\TableController@getColumns");
        Route::get('/tables/{table}/keys', "Admin\TableController@getKeys");

        Route::get('/page_data_sources', 'Admin\PageDatasourceController@index');
        Route::get('/page_data_sources/pages/{page_id}', 'Admin\PageDatasourceController@getByPage');
        Route::get('/page_data_sources/{page_data_source_id}', "Admin\PageDatasourceController@show");
        Route::post('/page_data_sources', "Admin\PageDatasourceController@store");
        Route::put('/page_data_sources/{page_data_source_id}', "Admin\PageDatasourceController@update");
        Route::delete('/page_data_sources/{page_data_source_id}', "Admin\PageDatasourceController@destroy");

        Route::resource( 'pages', 'Admin\PagesController' );
        Route::resource( 'templates', 'TemplateController' );
        Route::resource( 'robots', 'RobotController' );
        Route::get( 'robots_options', 'RobotController@getOptions' );
        Route::resource( 'sql_editors', 'Admin\SQLEditorController' );

        /**
         * Получить записи из модели по её Id
         */
        Route::get('/models/{model_id}/records', 'Admin\ModelsController@getRecordsByModel');
        Route::get('/models/{model_id}/records_options', 'Admin\ModelsController@getRecordsByModelOptions');

        /**
         * Маршруты для проверки на уникальность имени
         */
        Route::get('/model_name_is_free', 'Admin\ModelsController@modelNameIsFree');
        Route::get('/models/{model_id}/field_name_is_free', 'Admin\ModelsController@fieldNameIsFree');
        Route::get('/models/{model_id}/relation_name_is_free', 'Admin\ModelsController@relationNameIsFree');
        Route::get('/models/{model_id}/sql_builder_name_is_free', 'Admin\ModelsController@queryNameIsFree');
        Route::get('/models_with_fields_options', 'Admin\ModelsController@models_with_fields_options')
            ->name('admin.models_with_fields_options');

        // Models
        Route::get( '/models', 'Admin\ModelsController@getModels');
        Route::get( '/model_options', 'Admin\ModelsController@getModelOptions');
        Route::get( '/models_without_parent', 'Admin\ModelsController@getModelsWithoutParent');
        Route::get( '/models_without_preset', 'Admin\ModelsController@getModelsWithoutPreset');
        Route::post( '/models', 'Admin\ModelsController@storeModel');
        Route::put( '/models/{model_id}', 'Admin\ModelsController@updateModel');
        Route::get( '/models/{model_id}', 'Admin\ModelsController@showModel');
        Route::delete( '/models/{model_id}', 'Admin\ModelsController@destroyModel');

        // SQL Builder
        Route::get( '/models/{model_id}/sql_builder', 'Admin\ModelsController@getAllQueries');
        Route::post( '/models/{model_id}/sql_builder', 'Admin\ModelsController@storeQuery');
        Route::put( '/models/{model_id}/sql_builder/{query_id}', 'Admin\ModelsController@updateQuery');
        Route::get('/models/{model_id}/sql_builder/{query_id}', 'Admin\ModelsController@getQuery');
        Route::delete('/models/{model_id}/sql_builder/{query_id}', 'Admin\ModelsController@destroyQuery');

        // Fields
        Route::get( '/models/{model_id}/fields', 'Admin\ModelsController@getModelFields');
        Route::get( '/models/{model_id}/fields_only', 'Admin\ModelsController@getOnlyModelFields');
        Route::get( '/models/{model_id}/field_options', 'Admin\ModelsController@getModelFieldOptions');
        Route::post( '/models/{model_id}/fields', 'Admin\ModelsController@storeModelField');
        Route::put( '/models/{model_id}/fields/{field_id}', 'Admin\ModelsController@updateModelField');
        Route::get( '/models/{model_id}/fields/{field_id}', 'Admin\ModelsController@showModelField');
        Route::delete( '/models/{model_id}/fields/{field_id}', 'Admin\ModelsController@destroyModelField');

        // Accessors
        Route::get( '/models/{model_id}/accessors', 'Admin\ModelsController@getModelAccessors');
        Route::post( '/models/{model_id}/accessors', 'Admin\ModelsController@storeAccessor');
        Route::put( '/models/{model_id}/accessors/{accessor_id}', 'Admin\ModelsController@updateAccessor');
        Route::get( '/models/{model_id}/accessors/{accessor_id}', 'Admin\ModelsController@showAccessor');
        Route::delete( '/models/{model_id}/accessors/{accessor_id}', 'Admin\ModelsController@destroyAccessor');

        // Relations
        Route::get( '/models/{model_id}/relations', 'Admin\ModelsController@getModelRelations');
        Route::get( '/models/{model_id}/relation_options', 'Admin\ModelsController@getModelRelationOptions');
        Route::post( '/models/{model_id}/relations', 'Admin\ModelsController@storeModelRelation');
        Route::put( '/models/{model_id}/relations/{field_id}', 'Admin\ModelsController@updateModelRelation');
        Route::get( '/models/{model_id}/relations/{field_id}', 'Admin\ModelsController@showModelRelation');
        Route::delete( '/models/{model_id}/relations/{field_id}', 'Admin\ModelsController@destroyModelRelation');

        // Validations
        Route::get( '/models/{model_id}/validations', 'Admin\ModelsController@getValidationFields');
        Route::get( '/models/{model_id}/validations/{validation_field_id}', 'Admin\ModelsController@showValidationField');
        Route::post( '/models/{model_id}/validations', 'Admin\ModelsController@storeValidationField');
        Route::put( '/models/{model_id}/validations/{validation_field_id}', 'Admin\ModelsController@updateValidationField');
        Route::delete( '/models/{model_id}/validations/{validation_field_id}', 'Admin\ModelsController@destroyValidationField');

        Route::get( '/models/{model_id}/validations/{validation_field_id}/validation_rules', 'Admin\ModelsController@getValidationRules');
        Route::get( '/models/{model_id}/validations/{validation_field_id}/validation_rules/{rule_id}', 'Admin\ModelsController@showValidationRule');
        Route::post( '/models/{model_id}/validations/{validation_field_id}/validation_rules', 'Admin\ModelsController@storeValidationRule');
        Route::put( '/models/{model_id}/validations/{validation_field_id}/validation_rules/{rule_id}', 'Admin\ModelsController@updateValidationRule');
        Route::delete( '/models/{model_id}/validations/{validation_field_id}/validation_rules/{rule_id}', 'Admin\ModelsController@destroyValidationRule');

        // Data Sources
        Route::get( '/data_sources', 'Admin\ModelsController@getDataSources');
        Route::get( '/data_source_options', 'Admin\ModelsController@getDataSourceOptions');
        Route::post( '/data_sources', 'Admin\ModelsController@storeDataSource');
        Route::put( '/data_sources/{source_id}', 'Admin\ModelsController@updateDataSource');
        Route::get( '/data_sources/{source_id}', 'Admin\ModelsController@showDataSource');
        Route::delete( '/data_sources/{source_id}', 'Admin\ModelsController@destroyDataSource');
        Route::get( '/models/{model_id}/data_source_options', 'Admin\ModelsController@getDataSourcesByModel');

        Route::post('/tables/{table}/models', 'Admin\TableController@saveModel');
        Route::get('/tables/{table}/models/{model}', 'Admin\TableController@getModel');
        Route::post('/tables/{table}/models/{model}/accessors', 'Admin\TableController@saveAccessor');
        Route::delete('/tables/{table}/models/{model}/accessors/{accessor}', 'Admin\TableController@deleteAccessor');
        Route::put('/tables/{table}/models/{model}/accessors/{accessor}', 'Admin\TableController@updateAccessor');
        Route::post('/tables/{table}/controllers', 'Admin\TableController@saveController');
        Route::get('/tables/{table}/controllers/{controller}', 'Admin\TableController@getController');
        /*Route::get('/tables', "Admin\TableController@getTables");
        Route::get('/tables/{table}', "Admin\TableController@getTable");
        Route::post('/tables', "Admin\TableController@insert");
        Route::put('/tables/{table}', "Admin\TableController@update");
        Route::delete('/tables/{table}', "Admin\TableController@delete");*/

        Route::post( 'update-all-resources', 'Admin\UpdateController@upgradeAllResources' );
        Route::resource( 'sql_editors', 'Admin\SQLEditorController' );
        Route::post( '/favicon', 'Admin\FileUploadController@loadFavicon' );

        Route::get( '/custom_models/{model_id}', 'Admin\ModelsController@getCustomModelRecords');
        Route::get( '/custom_models/{model_id}/show/{record_id}', 'Admin\ModelsController@getCustomModelRecord');
        Route::post( '/custom_models/{model_id}', 'Admin\ModelsController@storeCustomModelRecord');
        Route::put( '/custom_models/{model_id}/edit/{record_id}', 'Admin\ModelsController@editCustomModelRecord');
        Route::delete( '/custom_models/{model_id}/delete/{record_id}', 'Admin\ModelsController@destroyCustomModelRecord');

        // Remote data
        Route::get( '/remote_data/{remotable_type}/{remotable_id}', 'Admin\RemoteDataController@index');
        Route::post( '/remote_data/{remotable_type}/{remotable_id}', 'Admin\RemoteDataController@store');
        Route::put( '/remote_data/{remotable_type}/{remotable_id}/{id}', 'Admin\RemoteDataController@update');
        Route::delete( '/remote_data/{id}', 'Admin\RemoteDataController@destroy');
    });

});


Route::post('/feedback', 'MailController@sendMail');
Route::post('/write_mail_settings', 'MailController@writeSettingsToEnv');

/**
 * Robots
 */
Route::get('/altrp_run_robot/{robot_id}', 'RobotController@runRobot');

 // Export to XLS
Route::post('export-excel', 'ReportsController@exportToExcel');
Route::post('export-word', 'ReportsController@exportToWord');
Route::post('export-xml', 'ReportsController@exportToXml');
