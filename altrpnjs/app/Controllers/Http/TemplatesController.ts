// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { v4 as uuid } from "uuid";
import Template from "App/Models/Template";

export default class TemplatesController {
  public async index({ request }) {
    const params = request.qs();
    const page = parseInt(params.page) || 1
    // const search = params.s

    // const orderType = params.order || "DESC"
    // const orderBy = params.order_by || "id"

    const pageSize = params.pageSize

    const templates = await Template.query()
      .preload("user")
      .preload("currentArea")
      .whereHas("currentArea", (builder => {
        builder.where("name", params.area)
      }))
      .paginate(page, pageSize)

    const modTemplates = templates.all().map( template => {
      return {
        author: template.getAuthor(),
        area: template.getArea(),
        id: template.id,
        name: template.name,
        title: template.title,
        url: `/admin/editor?template_id=${template.id}`
      }
    })

    return {
      pageCount: templates.lastPage,
      templates: modTemplates
    }
  }

  public async create({ auth, request }) {
    await auth.use('web').authenticate()

    const guid = uuid();
    const data = {
      area: parseInt(request.input("area")),
      data: JSON.stringify(request.input("data")),
      name: request.input("name"),
      title: request.input("title"),
      guid,
      user_id: auth.user.id,
    }

    const template = await Template.create(data);

    // await TemplateFactory.createMany(100)
    return {
      message: "Success",
      redirect: true,
      data: JSON.parse(template.data),
      url: `/admin/editor?template_id=${template.id}`
    }
  }

  public async get({ params }) {
    const template = await Template.find(parseInt(params.id));

    return template
  }

  public async update({ params, request }) {
    const template = await Template.find(parseInt(params.id));

    if(template) {
      const prevVersions = await Template.query().where("guid", template.getGuid())

      const prevVersion = await Template.create({
        ...template,
        type: "review",
      })

      template.data = JSON.stringify(request.input("data"));
      template.styles = JSON.stringify(request.input("styles"));
      template.html_content = request.input("html_content");

      await template.save()

      return {
        currentTemplate: template,
        prevVersions: prevVersions,
        prevVersion: prevVersion,
        clearData: request.input("data")
      }
    }
  }

  public async globalTemplateStyles() {
    return []
  }
}
