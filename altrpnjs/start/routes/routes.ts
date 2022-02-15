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

Route.get("/modules/*", async ({request, response}) => {
  const url = request.url()

  const pathToModules = path.join(__dirname, "../", "../", "../", "public");

  const file = await Drive.get(pathToModules + url)

  switch (url.split(".")[1]) {
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
  await user.load('roles')
  await user.load('permissions')
  return response.send(`
window.current_user = ${JSON.stringify(user.toObject())}
  `);
})

Route.group(() => {
  Route.get("/menus/:id", "admin/MenusController.show")

  Route.get("/pages/:id", "admin/PagesController.getAreas")

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
    const segments = httpContext.request.url().split('/')
    let tableName = segments[2]
    if (['queries', 'data_sources', 'filters'].indexOf(tableName)) {
      tableName = segments[3]
    }
    const table = await Table.query().preload('altrp_model').where('name', tableName).first()
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

    const controllerName = `App/AltrpControllers/${model.name}Controller.${isProd() ? 'js' : 'ts'}`
    try {
      const ControllerClass = isProd() ? (await require(controllerName)).default
        : (await import(controllerName)).default
      const controller = new ControllerClass()
      let methodName
      if (segments[3] === 'customizers' || segments[2] === 'data_sources') {
        methodName = segments[4]
      }
      if (segments[3] === undefined && httpContext.request.method() === 'GET') {
        methodName = 'index'
      }
      if (segments[3] === undefined && httpContext.request.method() === 'POST') {
        methodName = 'store'
      }
      if (segments[4] === undefined
        && Number(segments[3])
        && httpContext.request.method() === 'GET') {
        methodName = 'show'
        httpContext.params[model.name] = Number(segments[3])
      }
      if (segments[4] === undefined
        && Number(segments[3])
        && httpContext.request.method() === 'DELETE') {
        methodName = 'destroy'
        httpContext.params[model.name] = Number(segments[3])
      }
      if (segments[4] === undefined
        && Number(segments[3])
        && httpContext.request.method() === 'PUT') {
        methodName = 'update'
        httpContext.params[model.name] = Number(segments[3])
      }
      if (segments[5] === undefined
        && Number(segments[3])
        && segments[4]
      ) {
        methodName = 'updateColumn'
        httpContext.params[model.name] = Number(segments[3])
        httpContext.params.column = Number(segments[4])
      }
      if(! methodName){
        return httpContext.response.status(404).json({
          success: false,
          message: 'Method Not Found'
        })
      }
      return await controller[methodName](httpContext)
    } catch (e) {
      return httpContext.response.status(500).json({
        success: false,
        message: e.message,
        trace: e.stack.split('\n'),
      })
    }
  })
})
  .prefix("/ajax")

