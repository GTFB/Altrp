import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { exec } from 'child_process'
import { promisify } from 'util'
import { v4 as uuid } from "uuid";
import Page from "App/Models/Page";
import Template from "App/Models/Template";
import PagesTemplate from "App/Models/PagesTemplate";
import Category from "App/Models/Category";
import CategoryObject from "App/Models/CategoryObject";
import validGuid from "../../../../helpers/validGuid";
import LIKE from "../../../../helpers/const/LIKE";
import AltrpRouting from "App/Controllers/Http/AltrpRouting";
import base_path from '../../../../helpers/base_path'

export default class PagesController {
  public async getTemplatePagesIds({ request, response}:HttpContextContract){
    const template_id = request.params().template_id
    let template
    let pagesTemplates
    if(validGuid(template_id)){
      pagesTemplates = await PagesTemplate.query().where('template_guid', template_id)
      template = await Template.query().where('guid', template_id)
    } else {
      pagesTemplates = await PagesTemplate.query().where('template_id', template_id)
      template = await Template.find(template_id)
    }
    const excludePages = pagesTemplates.filter(pt=>pt.condition_type === 'exclude').map(pt=>pt.page_guid)
    const includePages = pagesTemplates.filter(pt=>pt.condition_type === 'include').map(pt=>pt.page_guid)

    let pages
    if(template.all_site){
      pages = await Page.query().whereNotIn('guid', excludePages)
    } else {
      pages = await Page.query().whereIn('guid', includePages)
    }


    pages = pages.map(p=>p.id)
    return response.json({data:pages, success:true})
  }
  public async create({auth, request, response}:HttpContextContract) {
    await auth.use("web").authenticate();

    let res: {
      success: boolean
      pages_templates?: PagesTemplate
      page?: Page
      message?: string
    } = {
      success: false,
    }

    const data: any = {
      ...request.body(),
      content: request.input("content") || "",
      model_id: request.input("model_id"),
      author: auth.user?.id,
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
    delete data.categories;
    delete data._categories;

    let page = await Page.create(data)

    if(page) {
      page = await Page.query().where("id", page.id).firstOrFail()

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
            object_type: "Page",
            object_guid: page.guid
          })
        }
      }

      const template_id = request.input("template_id")
      if(template_id) {
        const template = await Template.find(template_id);

        if(template) {
          const pages_templates = await PagesTemplate.create({
            page_id: page.id,
            page_guid: page.guid,
            template_id: template_id,
            //@ts-ignore
            template_guid: template.guid,
            template_type: "content"
          })

          res.pages_templates = pages_templates
        }
      }

      res.success = true
      res.page = page
      await page.parseRoles(request.input('roles'));
      await promisify(exec)(`node ${base_path('ace')} generator:page ${page.id}`)
      await page.save()

      return res
    }

    res.message = 'Page not Saved';
    return response.status(500).send(res)
  }

  public async index({ request }) {
    const params = request.qs()
    const page = parseInt(params.page)
    const pageSize = parseInt(params.pageSize)
    const searchWord = params.s
    let pages

    let pagesAll
    let pagination: any = {}

    if (page && pageSize) {
      if (searchWord) {
        pages = await Page.query().orWhere('title', LIKE, `%${searchWord}%`)
          .preload("user").preload("categories").paginate(page, pageSize)
        pagesAll = pages.all()
        pagination = {
          count: pages.getMeta().total,
          pageCount: pages.getMeta().last_page,
        }
      } else {
        pages = await Page.query().preload("user").preload("categories").paginate(page, pageSize)
        pagesAll = pages.all()
        pagination = {
          count: pages.getMeta().total,
          pageCount: pages.getMeta().last_page,
        }
      }
    } else {
      const query =  Page.query()
      if(searchWord){
        query.orWhere('title', LIKE, `%${searchWord}%`)
      }
      pagesAll = await query.preload("user").preload("categories")
    }

    const modPages = pagesAll.map( page => {
      return {
        author: page.user?.email || '',
        id: page.id,
        title: page.title,
        path: page.path,
        url: request.url,
        categories: page.categories.map(category => {
          return {
            category: category
          }
        }),
        parent_page_id: page.parent_page_id,
        editUrl: `/admin/pages/edit/${page.id}`,
        ...pagination
      }
    })
    return modPages
  }

  public async show({ params }) {
    const page = await Page.query()
      .where("id", parseInt(params.id)).firstOrFail();
    await page.load('roles')
    await page.load('categories')
    let data = page.serialize()
    const roles = data.roles.map(role => {
      return ({value:role.id, label:role.display_name})
    })

    data.roles = roles;

    if(data.for_guest){
      data.roles.unshift({value:'guest', label: 'Guest'})
    }
    return {
      model: null,
      model_name: "",
      ...data
    }
  }

  public async delete({params}) {
    const page = await Page.query().preload('roles').where("id", parseInt(params.id)).firstOrFail();
    await page.related('roles').detach()
    await page.delete()
    return {
      success: true
    }
  }

  public async getPageContent(httpContext:HttpContextContract){
    const {url} = httpContext.request.all()

    if(! url){
      return
    }
    const altrpRouting = new AltrpRouting

    return await altrpRouting.getContentByUrl(url, httpContext);
  }

  public async getAreas() {

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

  public async update({ params, request, response }) {
    const page = await Page.find(parseInt(params.id))

    if(page) {
      const body = request.body();

      Object.keys(body).forEach(input => {
        if(body[input] && input !== "rolesOptions" && input !== "roles") {
          page[input] = body[input]
        }
      })

      page.model_id = body.model_id || null
      page.parent_page_id = body.parent_page_id || null

      await page.related('roles').detach()
      await page.parseRoles(request.input('roles'));
      await page.save()

      if(request.input("categories").length > 0) {

        await page.related("categories").detach()
        for (const option of request.input("categories")) {

          const category = await Category.query().where('guid', option.value).firstOrFail();

          if (!category) {
            response.status(404)
            return {
              message: "Category not Found"
            }
          } else {
            await CategoryObject.create({
              category_guid: category.guid,
              object_type: "Pages",
              object_guid: page.guid
            })
          }
        }
      }

      return {
        success: true
      }
    }

    return {
      success: false
    }
  }

  public async publish({ params, request, response }) {
    const page = await Page.find(parseInt(params.id))

    if(page) {
      const body = request.body();

      Object.keys(body).forEach(input => {
        if(body[input] && input !== "rolesOptions" && input !== "roles") {
          page[input] = body[input]
        }
      })

      page.model_id = body.model_id || null
      page.parent_page_id = body.parent_page_id || null

      await page.related('roles').detach()
      await page.parseRoles(request.input('roles'));
      await page.save()
      await promisify(exec)(`node ${base_path('ace')} generator:page ${page.id}`)

      if(request.input("categories").length > 0) {

        await page.related("categories").detach()
        for (const option of request.input("categories")) {

          const category = await Category.query().where('guid', option.value).firstOrFail();

          if (!category) {
            response.status(404)
            return {
              message: "Category not Found"
            }
          } else {
            await CategoryObject.create({
              category_guid: category.guid,
              object_type: "Pages",
              object_guid: page.guid
            })
          }
        }
      }

      return {
        success: true
      }
    }

    return {
      success: false
    }
  }
}
