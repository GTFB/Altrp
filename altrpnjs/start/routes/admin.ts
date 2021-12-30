import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {

  Route.group(() => {
    Route.get("/areas", "admin/AreasController.index")

    Route.get("/global_template_styles", "TemplatesController.globalTemplateStyles")

    Route.post("/templates", "TemplatesController.create").middleware("auth")
    Route.get("/templates", "TemplatesController.index")
    Route.get("/templates/:id", "TemplatesController.get")
    Route.put("/templates/:id", "TemplatesController.update")

    Route.post("/pages", "admin/PagesController.create")

  }).prefix("/ajax")

  Route.get("/editor-content", "IndicesController.editorContent")
  Route.get("/editor", "IndicesController.editor")

  Route.get('/', "IndicesController.admin")
  Route.get('/*', "IndicesController.admin")
}).prefix("/admin").middleware('admin')
