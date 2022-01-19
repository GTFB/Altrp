import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {

  Route.group(() => {
    Route.get("/areas", "admin/AreasController.index")

    Route.get("/global_template_styles", "TemplatesController.globalTemplateStyles")

    Route.post("/templates", "TemplatesController.create").middleware("auth")
    Route.get("/templates", "TemplatesController.index")
    Route.get("/templates/options", "TemplatesController.options")
    Route.get("/templates/:id", "TemplatesController.get")
    Route.put("/templates/:id", "TemplatesController.update")
    Route.get("/templates/:id/conditions", "TemplatesController.conditions")
    Route.put("/templates/:id/conditions", "TemplatesController.conditionsSet")

    Route.post("/pages", "admin/PagesController.create")
    Route.get("/pages", "admin/PagesController.index")
    Route.get("/pages/routes", "admin/PagesController.getRoutes")
    Route.get("/pages/routes/add", "admin/PagesController.addRoute")

    Route.get("/pages/:id", "admin/PagesController.show")
    Route.put("/pages/:id", "admin/PagesController.update")

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

    Route.get("/page_data_sources/pages/:id", () => {
      return []
    })

    Route.get("/reports_options", () => {
      return []
    })

    Route.get("/role_options", "OptionsController.roles")
    Route.get("/permissions_options", "OptionsController.permissions")
    Route.get("/pages_options", "OptionsController.pages")

    Route.get("/model_options", () => {
      return {
        options: [],
        pageCount: 0
      }
    })
    Route.get("/models_options", () => {
      return []
    })

    Route.group(() => {
      Route.get("/altrp_models_disabled", () => {
        return {
          altrp_models_disabled: ""
        }
      })
      Route.get("/pusher_app_key", () => {
        return {
          pusher_app_key: ""
        }
      })
    }).prefix("/settings")

  }).prefix("/ajax")

  Route.get("/editor-content", "IndicesController.editorContent")
  Route.get("/editor", "IndicesController.editor")

  Route.get('/', "IndicesController.admin")
  Route.get('/*', "IndicesController.admin")
}).prefix("/admin").middleware('admin').middleware('admin')
