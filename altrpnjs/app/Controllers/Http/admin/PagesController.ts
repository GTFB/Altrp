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
      model_id: request.input("model_id"),
      author: auth.user.id,
      guid: uuid(),
      parent_page_id: request.input("parent_page_id"),
      path: request.input("path"),
      redirect: request.input("redirect"),
      is_cached: request.input("is_cached"),
      sections_count: request.input("sections_count")
    }

    const page = await Page.create(data)

    if(page) {
      const template_id = request.input("template_id")
      if(template_id) {
        console.log(template_id)
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
}
