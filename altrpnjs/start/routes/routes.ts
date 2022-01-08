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

import Route from '@ioc:Adonis/Core/Route'
// import {UserFactory} from "Database/factories";

Route.get("/login", "IndicesController.loginView")
Route.post("/login", "IndicesController.login")

Route.get("/altrp-install", "InstallationController.altrpInstall").name = "altrp-install"
Route.post("/altrp-install", "InstallationController.altrpInstallPost").name = "altrp-install.post"


Route.group(() => {

  Route.get("/pages/:id", "admin/PagesController.getAreas")

  Route.get("/current-user", "users/UsersController.getCurrentUser")

  Route.get("/_token", () => {
    return {
      success: true,
      _token: "token"
    }
  })

  Route.get("/models/queries/galleries/get_galley", () => {
    return {
      data: []
    }
  })
})
.prefix("/ajax")
