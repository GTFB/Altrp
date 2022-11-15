import Route from '@ioc:Adonis/Core/Route';
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import env from "../../helpers/env";
import Plugin from "App/Plugin";
import app_path from "../../helpers/path/app_path";
import fs from "fs";
import isProd from "../../helpers/isProd";
import _ from "lodash"

Route.group(() => {


  Route.group(() => {
    Route.get("/get_health_check", "admin/AdminController.getHealthCheck")


    Route.get("/areas", "admin/AreasController.index")
    Route.post("/areas", "admin/AreasController.create")
    Route.get("/areas/:id", "admin/AreasController.show")
    Route.put("/areas/:id", "admin/AreasController.update")
    Route.delete("/areas/:id", "admin/AreasController.delete")

    Route.get("/custom_models/:id", "admin/ModelsController.showModel")
    Route.delete("/custom_models/:id/delete/:row", "admin/ModelsController.deleteModelRow")
    Route.put("/custom_models/:id/edit/:row", "admin/ModelsController.updateModelRow")
    Route.post("/custom_models/:id", "admin/ModelsController.addModelRow")

    Route.post("/favicon", "admin/AdminController.updateFavicon")

    Route.post('/templates', 'TemplatesController.create').middleware('auth')
    Route.post('/templates/duplicate', 'TemplatesController.duplicate').middleware('auth')
    Route.get('/templates', 'TemplatesController.index')
    Route.get('/templates/getAllIds', 'TemplatesController.getAllIds')
    Route.get('/templates/options', 'TemplatesController.options')
    Route.get('/templates/:id', 'TemplatesController.get')
    Route.put('/templates/:id', 'TemplatesController.update')
    Route.post('/templates/:id/publish', 'TemplatesController.publish')
    Route.delete('/templates/:id/reviews', 'TemplatesController.deleteReviews')
    Route.get('/templates/:id/reviews/', 'TemplatesController.getReviews')
    Route.get('/templates/:id/reviews/:review_id', 'TemplatesController.getReview')
    Route.delete('/templates/:id', 'TemplatesController.delete')
    Route.get('/templates/:id/conditions', 'TemplatesController.conditions')
    Route.put('/templates/:id/conditions', 'TemplatesController.conditionsSet')
    Route.get('/exports/templates/:id', 'TemplatesController.exportCustomizer');
    Route.delete('/reviews', 'TemplatesController.deleteAllReviews')
    Route.get('/templates/:id/settings', 'TemplatesController.settingsGet')
    Route.put('/templates/:id/settings', 'TemplatesController.settingsSet')


    Route.get("/role_options", "OptionsController.roles")
    Route.get("/users_options", "OptionsController.users")
    Route.get("/customizers_options", "OptionsController.customizers")
    Route.get("/permissions_options", "OptionsController.permissions")
    Route.get("/menus/options", "OptionsController.menus")

    Route.post('/pages', 'admin/PagesController.create')
    Route.get('/pages', 'admin/PagesController.index')
    Route.get('/get-template-pages-ids/:template_id', 'admin/PagesController.getTemplatePagesIds')
    Route.get('/pages/routes', 'admin/PagesController.getRoutes')
    Route.get('/pages/routes/add', 'admin/PagesController.addRoute')

    Route.delete('/pages/:id', 'admin/PagesController.delete')
    Route.get('/pages/:id', 'admin/PagesController.show')
    Route.put('/pages/:id', 'admin/PagesController.update')
    Route.post('/pages/:id/publish', 'admin/PagesController.publish')

    Route.get("/users", "users/UsersController.index")
    Route.post("/users", "users/UsersController.create")
    Route.get("/users/:id", "users/UsersController.show")
    Route.put("/users/:id", "users/UsersController.update")
    Route.delete("/users/:id", "users/UsersController.delete")

    Route.post("/users/:id/usermeta", "users/MetasController.update")
    Route.get("/users/:id/usermeta", "users/MetasController.show")

    Route.get("/roles", "users/RolesController.index")
    Route.post("/roles", "users/RolesController.create")
    Route.get("/roles/:id", "users/RolesController.show")
    Route.put("/roles/:id", "users/RolesController.update")
    Route.delete("/roles/:id", "users/RolesController.delete")

    Route.get("/permissions", "users/PermissionsController.index")
    Route.post("/permissions", "users/PermissionsController.create")
    Route.get("/permissions/:id", "users/PermissionsController.show")
    Route.put("/permissions/:id", "users/PermissionsController.update")
    Route.delete("/permissions/:id", "users/PermissionsController.delete")

    Route.get("/robots", "RobotsController.index")
    Route.post("/robots", "RobotsController.create")
    Route.delete("/robots/:id", "RobotsController.delete")
    Route.put("/robots/:id", "RobotsController.update")

    Route.get("/categories", "admin/CategoriesController.index")
    Route.post("/categories", "admin/CategoriesController.create")
    Route.delete("/categories/:id", "admin/CategoriesController.delete")
    Route.get("/categories/:id", "admin/CategoriesController.show")
    Route.put("/categories/:id", "admin/CategoriesController.update")

    Route.get("/menus", "admin/MenusController.index")
    Route.post("/menus", "admin/MenusController.create")
    Route.delete("/menus/:id", "admin/MenusController.delete")
    Route.put("/menus/:id", "admin/MenusController.update")
    Route.get("/menus/:id", "admin/MenusController.show")

    Route.get("/data_sources", "admin/ModelsController.getDataSources")
    Route.get('/data_source_options', 'admin/ModelsController.getDataSourceOptions');
    Route.post('/data_sources', 'admin/ModelsController.storeDataSource');
    Route.put('/data_sources/:id', 'admin/ModelsController.updateDataSource');
    Route.get('/data_sources/:id', 'admin/ModelsController.showDataSource');
    Route.delete('/data_sources/:id', 'admin/ModelsController.destroyDataSource');
    Route.get('/models/:model_id/data_source_options', 'admin/ModelsController.getDataSourcesByModel');

    Route.resource('global_template_styles', 'GlobalTemplateStylesController')

    Route.get('/reports_options', () => {
      return []
    })


    Route.get("/changelog", "IndicesController.changelog")

    Route.get('/pages_options', 'OptionsController.pages')

    /**
     * Модели
     */

    Route.get('/model_options', 'admin/ModelsController.options')
    Route.get('/models', 'admin/ModelsController.index')
    Route.post('/models', 'admin/ModelsController.storeModel')
    Route.get('/models/:id', 'admin/ModelsController.getModel')
    Route.get('/models/:id/relation_name_is_free', 'admin/ModelsController.checkRelationName')
    Route.get('/model_name_is_free', 'admin/ModelsController.modelNameIsFree')
    Route.put('/models/:id', 'admin/ModelsController.updateModel')
    Route.delete('/models/:id', 'admin/ModelsController.deleteModel')
    Route.get('/models/:id/fields', 'admin/ModelsController.getModelFields')
    Route.get('/models/:id/field_options', 'admin/ModelsController.getModelFieldOptions')
    Route.post('/models/:id/fields', 'admin/ColumnsController.addColumn')
    Route.get('/models/:id/fields/:field_id', 'admin/ColumnsController.getColumn')
    Route.delete('/models/:id/fields/:field_id', 'admin/ColumnsController.deleteColumn')
    Route.put('/models/:id/fields/:field_id', 'admin/ColumnsController.updateColumn')
    Route.get('/models/:id/relations', 'admin/ModelsController.getModelRelations')
    Route.post('/models/:id/relations', 'admin/RelationshipsController.addRelationship')
    Route.get('/models/:id/relations/:relationship_id', 'admin/RelationshipsController.getRelationship')
    Route.put('/models/:id/relations/:relationship_id', 'admin/RelationshipsController.updateRelationship')
    Route.delete('/models/:id/relations/:relationship_id', 'admin/RelationshipsController.deleteRelationship')
    Route.get('/models/:id/data_source_options', 'admin/ModelsController.getDataSourcesOptionsByModel')
    Route.get('/models/:id/queries', 'admin/ModelsController.getQueries')
    Route.get('/models/:id/accessors', 'admin/ModelsController.getAccessors')
    Route.get('/models_options', 'admin/ModelsController.models_options').name = 'admin.models_options'

    /**
     * Customizers
     */
    Route.get('/customizers', 'admin/CustomizersController.index')
    Route.post('/customizers', 'admin/CustomizersController.store')
    Route.post('/customizers/duplicate', 'admin/CustomizersController.duplicate')
    Route.get('/customizers/:id', 'admin/CustomizersController.show')
    Route.get('/customizers-content/:id', 'admin/CustomizersController.content')
    Route.put('/customizers/:id', 'admin/CustomizersController.update')
    Route.delete('/customizers/:id', 'admin/CustomizersController.destroy')
    Route.get('/exports/customizers/:id', 'admin/CustomizersController.exportCustomizer');
    /**
     *
     * sql_editors
     */
    Route.get('/sql_editors', 'admin/SQLEditorController.index')
    Route.post('/sql_editors', 'admin/SQLEditorController.store')
    Route.get('/sql_editors/:id', 'admin/SQLEditorController.show')
    Route.put('/sql_editors/:id', 'admin/SQLEditorController.update')
    Route.delete('/sql_editors/:id', 'admin/SQLEditorController.destroy')
    Route.get('/sql_editors/list', 'admin/SQLEditorController.listByName');

    /**
     * Категории
     */
    Route.get('/category/options', 'admin/CategoriesController.options')
    /**
     * Assets
     */
    Route.get('/media', 'admin/MediaController.index')
    Route.put('/media/:id', 'admin/MediaController.updateMedia')
    Route.post('/media', 'admin/MediaController.store')
    Route.get('/media/:id', 'admin/MediaController.showFull')
    Route.delete('/media/:id', 'admin/MediaController.destroy')
    Route.get('media_settings', async ({response}) => {
      return response.json([])
    });
    /**
     * Settings
     */

    Route.get('/settings/:setting_name', 'admin/SettingsController.getSettings').name = 'admin.settings.get'
    Route.put('/settings/:setting_name', 'admin/SettingsController.saveSettings').name = 'admin.settings.save'

    //@todo: move this method to another place?
    Route.post('/settings/reset', 'admin/SettingsController.resetSettings').name = 'admin.settings.reset'


    Route.post('/update_altrp', 'admin/AdminController.update_altrp').name = 'admin.update_altrp'
    Route.post('/install_test_altrp', 'admin/AdminController.install_test_altrp').name = 'admin.install_test_altrp'

    /**
     * Altrp Meta
     */
    Route.get('/altrp_meta/:meta_name', 'admin/AltrpMetaController.getMetaByName')
    Route.put('/altrp_meta/:meta_name', 'admin/AltrpMetaController.saveMeta')

    /**
     * Плагины
     */

    Route.get('/plugins', "admin/PluginController.plugins");
    Route.post('/plugins/switch', "admin/PluginController.switch");
    Route.post('/plugins/install', "admin/PluginController.install");
    Route.post('/plugins/update_plugin_files', "admin/PluginController.update_plugin_files");
    Route.delete('/plugins/:name', "admin/PluginController.delete_plugin");

    /**
     * Запрос на обновление всех пользовательских ресурсов через обновление данных Models в БД
     */
    Route.post('update-all-resources', 'admin/AdminController.upgradeAllResources').name = 'admin.update-all-resources'
    Route.post('restart-altrp', 'admin/AdminController.restartAltrp').name = 'admin.restart-altrp'

    Route.post('check_update', async (httpContext: HttpContextContract) => {
      if (env('APP_ENV') !== 'production') {
        return httpContext.response.json({result: false})
      }
      return httpContext.response.json({result: false})
    }).name = 'admin.check_update'


    Route.post("/page_data_sources", "admin/PageDatasourcesController.store")
    Route.put("/page_data_sources/:id", "admin/PageDatasourcesController.update")
    Route.delete("/page_data_sources/:id", "admin/PageDatasourcesController.destroy")
    Route.get("/page_data_sources/pages/:id", "admin/PageDatasourcesController.getByPage")
    Route.get("/page_data_sources/:id", "admin/PageDatasourcesController.show")
    Route.get("/page_data_sources", "admin/PageDatasourcesController.index")

    /**
     * Email settings
     */
    Route.post('/write_mail_settings', 'admin/MailController.writeSettingsToEnv');
    Route.get('/get_mail_settings', 'admin/MailController.getSettings');

    Route.get('/downloads/settings', 'admin/MailController.getSettings');
    Route.get('/package_key', 'admin/AdminController.getPackageKey');


    /**
     * for installed plugins ajax requests START
     */
    const methods = [
      'get', 'post', 'put', 'delete'
    ]
    for (const method of methods) {
      /**
       * handle all 4 HTTP methods
       */
      Route[method]('plugins-handlers/*', async (httpContext: HttpContextContract) => {
        const plugins = Plugin.getEnabledPlugins()
        const segments = httpContext.request.url().split('/').filter(segment => segment)
        const plugin = plugins.find(plugin => {
          return plugin.name === segments[3]
        })
        if (!plugin) {
          httpContext.response.status(404)
          return httpContext.response.json({success: false, message: 'Plugin Not Found'})
        }
        const fileName = app_path(`AltrpPlugins/${plugin.name}/request-handlers/admin/${method}/${segments[4]}.${isProd() ? 'js' : 'ts'}`)
        if (fs.existsSync(fileName)) {
          if (isProd()) {
            Object.keys(require.cache).forEach(function (key) {
              delete require.cache[key]
            })
          }
          const module = isProd() ? await require(fileName).default : (await import(fileName)).default
          if (_.isFunction(module)) {
            return await module(httpContext)
          }
        }
        httpContext.response.status(404)
        return httpContext.response.json({success: false, message: 'Not Found'})
      })
    }
    /**
     * plugins ajax requests END
     */
  }).middleware('catch_unhandled_json').prefix('/ajax')


  Route.get('/customizers-editor', 'IndicesController.customizer')

  Route.get("/robots-editor", "IndicesController.robot")

  Route.get('/editor-content', 'IndicesController.editorContent')
  Route.get('/editor', 'IndicesController.editor')

  Route.get('/altrp-template-preview/:id', 'TemplatesController.preview')

  Route.get('/', 'IndicesController.admin')
  Route.get('*', 'IndicesController.admin')
})
  .prefix('/admin')
  .middleware('admin')

