/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import './admin'
import Route from '@ioc:Adonis/Core/Route'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Table from "App/Models/Table";
import isProd from "../../helpers/isProd";
import Drive from '@ioc:Adonis/Core/Drive'
import path from "path";
import app_path from "../../helpers/path/app_path";
import Customizer from "App/Models/Customizer";
import fs from 'fs'
import Model from "App/Models/Model";
import Plugin from "App/Plugin"
import _ from "lodash";
import get_altrp_setting from "../../helpers/get_altrp_setting";


const methods = [
  'get', 'post', 'put', 'delete'
]

Route.get('/altrp-redirect', async ({response, request}:HttpContextContract)=>{
  const url = request.cookie('__altrp_redirect_from', '/')
  response.clearCookie('__altrp_redirect_from')
  return response.redirect(url)
})

// import {UserFactory} from "Database/factories";
Route.get("/altrp-login", "IndicesController.loginView")
Route.post("/login", "IndicesController.login").name = 'post.login'
Route.post("/logout", "IndicesController.logout").name = 'logout'

Route.post("/sockets", "SocketsController.handle")

// Route.get("/userr", async () => {
//   const user = await User.query().where("id", 1).firstOrFail();
//   const permission = await Permission.query().where("id", 1).firstOrFail();
//   return user.can([1, 2]);
// })

const fromBuildDir = isProd() ? "../" : ""

Route.get("sw.js", "IndicesController.serviceWorker")

Route.get("/modules/*", async ({request, response}) => {
  const url = request.url()

  const pathToModules = path.join(__dirname, "../", "../", "../", fromBuildDir, "public");

  const file = await Drive.get(pathToModules + url)

  const splitUrl = url.split(".");

  switch (splitUrl[splitUrl.length - 1]) {
    case "js":
      response.header("Content-Type", "text/javascript")
      break
    case "css":
      response.header("Content-Type", "text/css")
      break
  }

  return file
})

Route.get("/service-worker-files", async ({}) => {

  const pathToFrontApp = path.join(__dirname, "../", "../", "../", fromBuildDir, "public", "modules", "front-app");

  let files = fs.readdirSync(pathToFrontApp)

  const variants = [
    ".js.map",
    ".txt"
  ]

  files = files.filter(file => {

    if("node_modules" === file) return false

    for(const variant of variants) {
      if(file.split(variant).length > 1) {
        return false
      }
    }

    return true
  })
  return files
})

Route.get("/serviceWorker.js", async ({request, response}) => {
  const url = request.url()

  const pathToModules = path.join(__dirname, "../", "../", "../", fromBuildDir, "public");

  const file = await Drive.get(pathToModules + url)

  response.header("Content-Type", "text/javascript")

  return file
})

Route.get("/sw/*", async ({request, response}) => {
  const url = request.url()

  const pathToModules = path.join(__dirname, "../", "../", "../", fromBuildDir, "public");

  const file = await Drive.get(pathToModules + url)

  const splitUrl = url.split(".");

  switch (splitUrl[splitUrl.length - 1]) {
    case "js":
      response.header("Content-Type", "text/javascript")
      break
    case "css":
      response.header("Content-Type", "text/css")
      break
  }

  return file
})


Route.get('/data/current-user', async ({response, auth}: HttpContextContract) => {
  response.header('Content-Type', 'application/javascript')
  let user = auth.user
  if (!user) {
    return response.send(`
window.current_user = ${JSON.stringify({is_guest: true})}
  `);
  }
  // @ts-ignore
  await user.load('roles')
  // @ts-ignore
  await user.load('permissions')
  // @ts-ignore
  return response.send(`window.current_user = ${JSON.stringify(user.toObject())}`);
})

Route.group(() => {
  Route.get("/menus/:id", "admin/MenusController.show")

  Route.get("/pages/:id", "admin/PagesController.getAreas")
  Route.get("/get-page-content",  "admin/PagesController.getPageContent")

  Route.get("/current-user", "users/UsersController.getCurrentUser")

  Route.get("favicon/:path", "IndicesController.favicons")

  Route.get("/_token", ({request}) => {
    return {
      success: true,
      _token: request.csrfToken
    }
  })

  Route.get("/models/queries/galleries/get_galley", () => {
    return {
      data: []
    }
  })
  /**
   * роут для обработка кастомных ajax запросов
   */
  Route.any('models/*', async (httpContext: HttpContextContract) => {
    const segments = httpContext.request.url().split('/').filter(segment => segment)

    if (httpContext.request.method() === 'OPTIONS' && segments[3] === 'customizers') {
      httpContext.response.header( 'Access-Control-Allow-Origin', '*' )
      httpContext.response.header( 'Access-Control-Allow-Methods', 'GET, OPTIONS' )
      httpContext.response.header( 'Access-Control-Allow-Credentials', 'true' )
      httpContext.response.header( 'Access-Control-Allow-Headers', 'Content-Type, Authorization' )
      return httpContext.response.json({ success: true });
    }
    if (httpContext.request.method() === 'GET' && segments[3] === 'customizers') {
      httpContext.response.header( 'Access-Control-Allow-Origin', '*' )
    }
    /**
     * delete `altrp_ajax` from request body
     */
    let methodName
    if(httpContext.request.input('altrp_ajax') !== undefined){
      const body = httpContext.request.all();
      delete body['altrp_ajax']
      httpContext.request.updateBody(body)
    }
    let tableName = segments[2]
    if (['queries', 'data_sources', 'filters'].indexOf(tableName) !== -1) {
      tableName = segments[3]
      methodName = segments[4]
    }
    let table = await Table.query().preload('altrp_model').where('name', tableName).first()
    /**
     * In get options case
     */
    if(! table && segments[2].indexOf('_options') !== -1){
      let model = await Model.query().preload('table').where('name', segments[2].replace('_options','')).first()
      if(model){
        table = model.table
        await table.load('altrp_model')
      }
    }
    if (!table) {
      return httpContext.response.status(404).json({
        success: false,
        message: 'Table Not Found'
      })
    }
    if (['users', 'media'].indexOf(tableName) !== -1) {

      return httpContext.response.status(403).json({
        success: false,
        message: 'Access Denied'
      })
    }
    const model = table.altrp_model
    if (!model) {
      return httpContext.response.status(404).json({
        success: false,
        message: 'Model Not Found'
      })
    }

    const controllerName = app_path(`AltrpControllers/${model.name}Controller`)
    try {
      if(isProd()){
        Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
      }
      const ControllerClass = isProd() ? (await require(controllerName)).default
        // @ts-ignore
        : (await import(controllerName)).default
      const controller = new ControllerClass()

      if (segments[3] === 'customizers' || segments[2] === 'data_sources') {
        methodName = segments[4]
        const customizer = await Customizer.query().where('name', methodName).first()
        if( !customizer ){
          return httpContext.response.status(404).json({
            success: false,
            message: 'Customizer Not Found'
          })
        }

        if(! customizer.allowMethod(httpContext.request.method())){
          return httpContext.response.status(405).json({
            success: false,
            message: 'Method not Allowed'
          })
        }
      }else if (segments[3] === undefined && httpContext.request.method() === 'GET') {
        methodName = segments[2].indexOf('_options') === -1 ? 'index'  : 'options'

      }else if (segments[3] === undefined && httpContext.request.method() === 'POST') {
        methodName = 'add'
      }else if  (segments[4] === undefined
        && Number(segments[3])
        && httpContext.request.method() === 'GET') {
        methodName = 'show'
        httpContext.params[model.name] = Number(segments[3])
      }else if  (segments[4] === undefined
        && Number(segments[3])
        && httpContext.request.method() === 'DELETE') {
        methodName = 'destroy'
        httpContext.params[model.name] = Number(segments[3])
      }else if  (segments[4] === undefined
        && Number(segments[3])
        && httpContext.request.method() === 'PUT') {
        methodName = 'update'
        httpContext.params[model.name] = Number(segments[3])
      }else if  (segments[5] === undefined
        && Number(segments[3])
        && segments[4]
      ) {
        methodName = 'update_column'
        httpContext.params[model.name] = Number(segments[3])
        httpContext.params.column = Number(segments[4])
      }
      if(! methodName){
        return httpContext.response.status(404).json({
          success: false,
          message: `Controller ${controllerName}; Method: ${methodName}
  Method Not Found`
        })
      }
      return await controller[methodName](httpContext)
    } catch (e) {
      return httpContext.response.status(500).json({
        success: false,

        message: methodName ? `Controller ${controllerName}; Method: ${methodName}
${e.message}` : `Controller ${controllerName} require error:`,
        trace: e.stack.split('\n'),
      })
    }
  })
  /**
   * plugins ajax requests START
   */
  for(const method of methods) {
    /**
     * handle all 4 HTTP methods
     */
    Route[method]('plugins-handlers/*', async (httpContext: HttpContextContract) => {
      const plugins = await Plugin.getEnabledPlugins()
      const segments = httpContext.request.url().split('/').filter(segment => segment)
      const plugin = plugins.find(plugin => {
        return plugin.name === segments[2]
      })
      if(! plugin){
        httpContext.response.status(404)
        return httpContext.response.json({success: false, message: `Plugin \`${segments[2]}\` Not Found`})
      }
      const fileName = app_path(`AltrpPlugins/${plugin.name}/request-handlers/${method}/${segments[3]}.${isProd() ? 'js' : 'ts'}`)

      if(fs.existsSync(fileName)){
        try{
          if(isProd()){
            Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
          }
          const module = isProd() ? await require(fileName).default : (await import(fileName)).default
          if(_.isFunction(module)){
            return await module(httpContext)
          }
        }catch (e) {
          httpContext.response.status(500)
          return httpContext.response.json({
            success: false,
            message: e.message,
            trace: e.stack.split('\n'),
          })
        }
      }
      httpContext.response.status(404)
      return httpContext.response.json({success: false, message: 'Not Found'})
    })
  }
  /**
   * plugins ajax requests END
   */

  /**
   * Templates for front
   */
  Route.get('/templates/:template_id', 'TemplatesController.getTemplate')
  /**
   * media for front
   */
  Route.post('media', 'admin/MediaController.store_from_frontend').name= 'front.media.store'
  Route.delete('media/:id', 'admin/MediaController.destroy_from_frontend').name= 'front.media.delete'

  Route.get("storage/media/:year/:month/:name", "admin/MediaController.show")

  Route.post("cookie", "IndicesController.setCookie")

  Route.get('routes', async ({response}:HttpContextContract)=>{
    return response.json({success: true, pages: []})
  })

  Route.get('get-custom-js', async ({response}:HttpContextContract)=>{
    return response.json({success: true, data: get_altrp_setting('ALL_SITE_JS', '', true)})
  })
}).middleware('catch_unhandled_json')
  .prefix("/ajax")

Route.group( ()=>{
    Route.any('*',async httpContext=>{
      const segments = httpContext.request.url().split('/').filter(segment => segment)
      // console.log(segments);

      const customizer:Customizer | null = await Customizer.query().where('name', segments[2]).preload('altrp_model').first()

      if(! customizer){

        return httpContext.response.status(405).json({
          success: false,
          message: 'API URL is not an API'
        })
      }
      if(! customizer.allowApi()){
        return httpContext.response.status(405).json({
          success: false,
          message: 'API for This URL is not Allowed'
        })
      }

      if(! customizer.allowMethod(httpContext.request.method())){
        return httpContext.response.status(405).json({
          success: false,
          message: 'API Method not Allowed'
        })
      }
      const controllerName = app_path(`AltrpControllers/${customizer.altrp_model?.name}Controller`)
      const methodName = customizer.name

      const ControllerClass = isProd() ? (await require(controllerName)).default
        // @ts-ignore
        : (await import(controllerName)).default
      const controller = new ControllerClass()
      return await controller[methodName](httpContext)
    })
}).prefix('api/v1').middleware('catch_unhandled_json')
