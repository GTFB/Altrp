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

    Route.post("/pages", "admin/PagesController.create")
    Route.get("/pages", "admin/PagesController.index")
    Route.get("/pages/routes", "admin/PagesController.getRoutes")
    Route.get("/pages/routes/add", "admin/PagesController.addRoute")

    Route.get("/pages/:id", "admin/PagesController.show")
    Route.put("/pages/:id", "admin/PagesController.update")


    Route.get("/page_data_sources/pages/:id", () => {
      return []
    })

    Route.get("/role_options", () => {
    return []
    })

    Route.get("/pages_options", () => {
      return []
    })

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
})
  .prefix("/admin")
  .middleware('admin')
  .middleware('installChecker')
