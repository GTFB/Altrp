// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { v4 as uuid } from "uuid";
import Template from "App/Models/Template";
import TemplateSetting from "App/Models/TemplateSetting";
import Page from "App/Models/Page";
import PagesTemplate from "App/Models/PagesTemplate";
import Category from "App/Models/Category";
import CategoryObject from "App/Models/CategoryObject";

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
      .preload("categories")
      .where("type", "template")
      .paginate(page, pageSize)

    const modTemplates = templates.all().map( template => {
      return {
        categories: template.categories.map(category => {
          return {
            category: category
          }
        }),
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

  public async create({ auth, request, response }) {
    await auth.use('web').authenticate()

    const guid = uuid();
    const data = {
      area: parseInt(request.input("area")),
      data: JSON.stringify(request.input("data")),
      name: request.input("name"),
      title: request.input("title"),
      type: "template",
      guid,
      user_id: auth.user.id,
    }

    const template = await Template.create(data);

    if(request.input("categories")) {
      for (const option of request.input("categories")) {
        const category = await Category.find(option.value);

        if (!category) {
          response.status(404)
          return {
            message: "Category not Found"
          }
        } else {
          await CategoryObject.create({
            category_guid: category.guid,
            object_type: "Template",
            object_guid: template.guid
          })
        }
      }
    }

    // await TemplateFactory.createMany(100)
    return {
      message: "Success",
      redirect: true,
      data: JSON.parse(template.data),
      url: `/admin/editor?template_id=${template.id}`
    }
  }

  public async options() {
    const templates = await Template.all();

    const options = templates.map((template) => ({
      value: template.id,
      label: template.title
    }))
    return options
  }

  public async get({ params }) {
    const template = await Template.find(parseInt(params.id));

    return template
  }

  public async update({ params, request }) {
    const template = await Template.find(parseInt(params.id));

    if(template) {
      const prevVersions = await Template.query().where("guid", template.getGuid())
      const data = template.serialize();

      delete data.created_at
      delete data.updated_at
      delete data.id

      const prevTemplates = await Template.query().where("guid", data.guid).andWhere("type", "review").orderBy("created_at", "desc")

      if(prevTemplates.length === 5) {
        await prevTemplates[4].delete()
      }

      const prevVersion = await Template.create({
        ...data,
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

  /**
   * Получение условий текущего шаблона
   * @param $template_id
   * @param Request $request
   * @return JsonResponse
   */
  public async conditions({params}) {
    const id = parseInt(params.id);
    let res = {
      data: [],
      success: true
    }
    const setting = await TemplateSetting.query().where("template_id", id).andWhere("setting_name", "conditions").first();

    if(setting) {
      res.data = JSON.parse(setting.data)
    }

    return res
  }

  /**
   * Сохранение условий текущего шаблона
   * @param $template_id
   * @param Request $request
   * @return JsonResponse
   */
  public async conditionsSet({params, response, request}) {

    const id = parseInt(params.id);
    const data = JSON.stringify(request.input("data"));

    const template = await Template.find(id);

    if(!template) {
      response.status(404)
      return {
        message: "Template not Found"
      }
    }

    let setting = await TemplateSetting.query().where("template_id", id).first()

    if(!setting) {
      setting = await TemplateSetting.create({
        template_id: id,
        setting_name: "conditions",
        template_guid: template.getGuid(),
        data
      })
    } else {
      setting.data = data

      if(!setting.save()) {
        response.status(500);

        return {
          message: "Conditions not Saved"
        }
      }
    }

    if(template) {
      template.all_site = false

      if(!template.save()) {
        response.status(500)
        return {
          message: "Conditions all_site not Saved"
        }
      }

      await template.related("pages").detach()

      request.input("data").forEach(condition => {
        switch (condition.object_type) {
          case "all_site":
            template.all_site = condition.condition_type === "include";

            if(!template.save()) {
              response.status(500)
              return {
                message: "Conditions all_site not Saved"
              }
            }
            break
          case "report":
          case "page":
            condition.object_ids.forEach(async objectId => {
              const page = await Page.find(objectId)

              if(!page) {
                response.status(500)
                return {
                  message: "Page not found and pages template not saved"
                }
              }

              const pages_template = await PagesTemplate.create({
                page_id: objectId,
                page_guid: page.getGuid(),
                template_id: template.id,
                template_guid: template.getGuid(),
                condition_type: condition.condition_type,
                template_type: template.type
              })

              if(!pages_template) {
                response.status(500)
                return {
                  message: "Conditions page not Saved"
                }
              }
            })
            break
        }
      })
    }

    return {
      success: true
    }
  }

  public async globalTemplateStyles() {
    return []
  }
}
