// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuid } from "uuid";
import Page from "App/Models/Page";
import Template from "App/Models/Template";
import PagesTemplate from "App/Models/PagesTemplate";

export default class PagesController {
  public async create({auth, request, response}) {
    await auth.use("web").authenticate();

    let res: {
      success: boolean
      pages_templates?: PagesTemplate
      page?: Page
      message?: string
    } = {
      success: false,
    }

    const data = {
      ...request.body(),
      content: request.input("content") || "",
      model_id: request.input("model_id"),
      author: auth.user.id,
      guid: uuid(),
      parent_page_id: request.input("parent_page_id"),
      path: request.input("path"),
      redirect: request.input("redirect"),
      is_cached: request.input("is_cached"),
      sections_count: request.input("sections_count"),
      title: request.input("title")
    }

    delete data.roles;
    delete data.rolesOptions;

    const page = await Page.create(data)

    if(page) {
      const template_id = request.input("template_id")
      if(template_id) {
        const template = await Template.find(template_id);

        if(template) {
          const pages_templates = await PagesTemplate.create({
            page_id: page.id,
            page_guid: page.guid,
            template_id: template_id,
            template_guid: template.guid,
            template_type: "content"
          })

          res.pages_templates = pages_templates
        }
      }
      res.success = true
      res.page = page
      page.parseRoles(request.input('roles'));
      await page.save()
      return res
    }

    res.message = 'Page not Saved';
    return response.status(500).send(res)
  }

  public async index({ request }) {
    const params = request.qs();
    const page = parseInt(params.page) || 1

    const pages = await Page.query()
      .preload("user")
      .paginate(page, 500)

    const modPages = pages.all().map( page => {
      return {
        author: page.user.email,
        id: page.id,
        title: page.title,
        path: page.path,
        url: request.url,
        parent_page_id: page.parent_page_id,
        editUrl: `/admin/pages/edit/${page.id}`,
      }
    })

    return modPages
  }

  public async show({ params }) {
    const page = await Page.query().preload("roles").where("id", parseInt(params.id)).firstOrFail();



    return {
      model: null,
      model_name: "",
      ...page.serialize()
    }
  }

  public async getAreas({  }) {

    return {
      "areas": [
        {
          "area_name": "header",
          "id": "header",
          "settings": [],
          "template": {
            "data": {
              "name": "root-element",
              "type": "root-element",
              "children": [],
              "settings": []
            }
          }
        },
        {
          "area_name": "content",
          "id": "content",
          "settings": [],
          "template": {
            "data": {
              "name": "root-element",
              "type": "root-element",
              "children": [],
              "settings": []
            }
          }
        },
        {
          "area_name": "footer",
          "id": "footer",
          "settings": [],
          "template": {
            "data": {
              "name": "root-element",
              "type": "root-element",
              "children": [],
              "settings": []
            }
          }
        },
        {
          "area_name": "popups",
          "id": "popups",
          "settings": [],
          "templates": []
        }
      ]
    }
  }

  public async update({ params, request }) {
    const page = await Page.find(parseInt(params.id))

    if(page) {
      const body = request.body();

      Object.keys(body).forEach(input => {
        console.log(body[input])
        if(body[input] && input !== "rolesOptions" && input !== "roles") {
          page[input] = body[input]
        }
      })

      await page.save()

      return {
        success: true
      }
    }

    return {
      success: false
    }
  }
}
