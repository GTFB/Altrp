import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import exec from '../../../helpers/exec'
import validGuid from '../../../helpers/validGuid';

import { v4 as uuid } from "uuid";
import Template from "App/Models/Template";
import TemplateSetting from "App/Models/TemplateSetting";
import Page from "App/Models/Page";
import PagesTemplate from "App/Models/PagesTemplate";
import Category from "App/Models/Category";
import CategoryObject from "App/Models/CategoryObject";
import AltrpMeta from "App/Models/AltrpMeta";
import GlobalStyle from "App/Models/GlobalStyle";
import filtration from "../../../helpers/filtration";
import Area from "App/Models/Area";
import mbParseJSON from "../../../helpers/mbParseJSON";
import applyPluginsFiltersAsync from "../../../helpers/plugins/applyPluginsFiltersAsync";
import base_path from '../../../helpers/base_path'

export default class TemplatesController {
  public async getAllIds({ response }) {
    let templates =await Template.query().where('type', 'template').select('id')
    return response.json({data: templates, success: true})
  }
  public async index({ request }) {
    const params = request.qs();
     const page = parseInt(params.page) || 1
    // const search = params.s
    // const orderType = params.order || "DESC"
    // const orderBy = params.order_by || "id"

     const pageSize = params.pageSize || 20

    const templatesQuery = Template.query()

    filtration(templatesQuery, request, [
      "title",
    ])

    const templates = await templatesQuery
      .preload("user")
      .preload("currentArea")
      .whereNotNull('guid')
      .whereNull('deleted_at')
      .where("type", "template")
      .preload("categories")
      .whereHas("currentArea", (query) => {
        if(params.area) {
          query.where("name", params.area)
        }
      })
      .orderBy('title')
      .paginate(page, pageSize)

    const modTemplates = templates.all().map( template => {
      return {
        categories: template.categories.map(category => {
          return category
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
      count: templates.getMeta().total,
      pageCount: templates.getMeta().last_page,
      templates: modTemplates
    }
  }

  public async settingsGet({ request, params }) {
    const setting = await TemplateSetting.query()
      .where("template_id", parseInt(params.id))
      .andWhere("setting_name", request.input("setting_name"))
      .firstOrFail()
    return setting
  }

  public async settingsSet({ params, request, }) {
    const templateQuery = Template.query();

    if(isNaN(params.id)) {
      templateQuery.where("guid", params.id)
    } else {
      templateQuery.where("id", parseInt(params.id))
    }

    const template = await templateQuery.firstOrFail()


    const settingName = request.input("setting_name");

    let setting = await TemplateSetting.query()
      .where("template_id", template.id)
      .andWhere("setting_name", settingName)
      .first()

    if(!setting) {
      setting = new TemplateSetting()

      setting.fill({
        template_id: template.id,
        //@ts-ignore
        template_guid: template.guid,
        setting_name: settingName,
        data: request.input("data")
      })
    } else {
      setting.data = request.input("data")
    }

    await setting.save()

    return {
      success: true
    }
  }

  public async create({ auth, request, response }) {

    const guid = uuid();

    const body = request.body()
    let template

    if (body.type === "review") {


      const {name, title, type, data, styles} = body
      let {parent_template} =  body
      if(validGuid(parent_template)){
        parent_template = await Template.query().where('guid', parent_template).first()
        if(! parent_template){
          response.status(404)
          return response.json({success:false, message: `Template ${parent_template} not found!`})
        }
        parent_template = parent_template.id
      }

      const stringyfiedData = JSON.stringify(data)
      const stringyfiedStyles = JSON.stringify(styles)

      template = await Template.create({
        area: 1,
        data: stringyfiedData,
        name: name,
        title: title,
        type: type,
        styles: stringyfiedStyles,
        parent_template: Number(parent_template),
        guid,
        user_id: auth.user?.id,
      })
      let q = await Template.query().where('parent_template', parent_template)
        .where('type', "review").select('id').orderBy('updated_at', 'desc')
        .offset(Template.historyLimit)

      for(const t of q){
        await t.delete()
      }
       } else {
      let data = {
      area: parseInt(request.input("area")),
      data: JSON.stringify(request.input("data")),
      name: request.input("name"),
      title: request.input("title"),
      type: "template",
      guid,
      user_id: auth.user?.id,
    }

       template = await Template.create(data);
    }


    if(request.input("categories")) {
      for (const option of request.input("categories")) {
        const category = await Category.query().where("guid", option.value).first();

        if (!category) {
          response.status(404)
          return {
            message: "Category not Found"
          }
        } else {
          await CategoryObject.create({
            category_guid: category.guid,
            object_type: "Template",
            //@ts-ignore
            object_guid: template.guid
          })
        }
      }
    }
    await exec(`node ${base_path('ace')} generator:template --id=${template.id}`)
    applyPluginsFiltersAsync('template_updated', template)
    return {
      message: "Success",
      redirect: true,
      data: JSON.parse(template.data),
      url: `/admin/editor?template_id=${template.id}`
    }
  }


  public async duplicate({ auth, request, response }) {

    const guid = uuid()

    const body = request.body()
    const {title, name, duplicateTemplateId} = body

    const parentTemplate = await Template.query().where('id', '=', duplicateTemplateId).first()

    if (!parentTemplate) {
      response.status(404)
      return response.json({
          'success': false,
          'message': 'Template not found'
        },
      )
    }

     const template = await Template.create({
        area: parentTemplate?.area,
        data: parentTemplate?.data,
        name: name,
        title: title,
        type: parentTemplate?.type,
        styles: parentTemplate?.styles,
        parent_template: Number(parentTemplate?.parent_template),
        guid,
        user_id: auth.user?.id,
        html_content: '',
        all_site: parentTemplate?.all_site ? 1 : 0
      })

    await exec(`node ${base_path('ace')} generator:template --id=${template.id}`)
    applyPluginsFiltersAsync('template_updated', template)

    return {
      message: "Success",
      redirect: true,
      data: JSON.parse(template.data),
      url: `/admin/editor?template_id=${template.id}`
    }
  }

  public async options({ request}:HttpContextContract) {
    const query = Template.query().whereNull('deleted_at')
    query.where('type', 'template')
    const qs = request.qs()
    if(qs.template_type){
      let area = await Area.query().where('name', qs.template_type).first()
      if(area){
        query.where('area', area.id)
      }
    }
    const key = request.qs().value || 'id'
    const templates = await query.select('*')
    return templates.map((template) => ({
      value: template[key] || template.id,
      label: template.title
    }))
  }

  public async get({ params }) {
    const templateQuery = Template.query();

    if(isNaN(params.id)) {
      templateQuery.where("guid", params.id)
    } else {
      templateQuery.where("id", parseInt(params.id))
    }

    const template = await templateQuery.firstOrFail()
    await template.load('currentArea')
    return template
  }

  public async getTemplate({ params, response, request }) {
    const templateQuery = Template.query()

    if(validGuid(params.template_id)) {
      templateQuery.where("guid", params.template_id)
    } else {
      templateQuery.where("id", parseInt(params.template_id))
    }

    let template = await templateQuery.first()

    if (!template) {
      response.status(404)
      return {
        success: false
      }
    }

    // @ts-ignore
    template = template.serialize()
    // @ts-ignore
    delete template.html_content
    if(request.qs()?.withStyles && template?.styles){
      let styles = mbParseJSON(template.styles, template.styles)

      if(styles.all_styles){
        styles = styles.all_styles.join('')
      }
      template.styles = styles
    } else {
      // @ts-ignore
      delete template.styles
    }

    // @ts-ignore
    template.data = mbParseJSON(template.data, template.data)
    // @ts-ignore
    Page.getDataDependencies(template.data)
    // @ts-ignore
    template.data = JSON.stringify(template.data)
    return template
  }

  public async delete({ params }) {
    const templateQuery = Template.query();

    if(isNaN(params.id)) {
      templateQuery.where("guid", params.id)
    } else {
      templateQuery.where("id", parseInt(params.id))
    }

    const template = await templateQuery.firstOrFail()

    await exec(`node ${base_path('ace')} generator:template --delete --id=${template.id}`)
    applyPluginsFiltersAsync('template_before_delete', template)

    await TemplateSetting.query().where("template_id", template.id).delete()

    await template.delete()
    return {
      success: true
    }
  }

  public async update({ params, request }) {
    const templateQuery = Template.query()

    if (isNaN(params.id)) {
      templateQuery.where('guid', params.id)
    } else {
      templateQuery.where('id', parseInt(params.id))
    }

    const template = await templateQuery.firstOrFail()

    if (template) {
      //@ts-ignore
      const data = template.serialize()

      delete data.created_at
      delete data.updated_at
      delete data.id

      template.data = JSON.stringify(request.input('data'))
      template.styles = JSON.stringify(request.input('styles'))
      template.html_content = ''
      await template.save()
      await applyPluginsFiltersAsync('template_updated', template)

      return {
        success: true
      }
    }
  }

  public async publish({ params, request }) {
    const templateQuery = Template.query();

    if(isNaN(params.id)) {
      templateQuery.where("guid", params.id)
    } else {
      templateQuery.where("id", parseInt(params.id))
    }

    const template = await templateQuery.firstOrFail()

    if(template) {
      //@ts-ignore
      const data = template.serialize();

      delete data.created_at
      delete data.updated_at
      delete data.id


      template.data = JSON.stringify(request.input("data"));
      template.styles = JSON.stringify(request.input("styles"));

      template.title = request.input("title")

      template.html_content = '';
      await template.save()

      await exec(`node ${base_path('ace')} generator:template --id=${params.id}`)
      applyPluginsFiltersAsync('template_updated', template)


      return {
        success: true
      }
    }
  }

  public async deleteReviews({ params, }) {
     Template.query().where("type", "review").andWhere("parent_template", parseInt(params.id)).delete();

    return {
      success: true,
    }
  }

  public async deleteAllReviews({  }) {
    if((await Template.query().where("type", "review").limit(20).select("id")).length){
      await Template.query().where("type", "review").limit(20).delete();
    }

    return {
      success: true,
    }
  }

  public async getAllReviews({  }) {
    return await Template.query().where("type", "review");
  }

  public async getReviews({ params, response }) {
    const templates = await Template.query().where("type", "review").andWhere("parent_template", parseInt(params.id))

    if(templates.length > 0) {
      return templates
    } else {
      response.status(404)
      return templates
    }
  }

  public async getReview({ params, response }) {
    const templates = await Template.query().where("type", "review").andWhere("parent_template", parseInt(params.id)).andWhere("id", parseInt(params.review_id));

    if(templates.length > 0) {
      return templates
    } else {
      response.status(404)
      return templates
    }
  }

  /**
   * Получение условий текущего шаблона
   * @param template_id
   * @param Request $request
   * @return JsonResponse
   */
  public async conditions({params,response}) {
    let id = parseInt(params.id);

    if(validGuid(params.id)){
      let template = await Template.query().where('guid', params.id).first()
      if(template){
        id=template.id
      } else {
        response.status(404)
        return response.json({success:false, message: 'Template not found'})
      }
    }
    let res = {
      data: [],
      success: true
    }
    const setting = await TemplateSetting.query().where("template_id", id).andWhere("setting_name", "conditions").first();

    if(setting) {
      if(typeof setting.data === 'string'){
      res.data = JSON.parse(setting.data)
      } else {
        res.data = setting.data
      }
    }



    return res
  }

  /**
   * Сохранение условий текущего шаблона
   * @param template_id
   * @param template_id
   * @param Request $request
   * @return JsonResponse
   */
  public async conditionsSet({params, response, request}) {

    let id = parseInt(params.id);
    const data = JSON.stringify(request.input("data"));

    let template

    if(validGuid(params.id)){
      template = await Template.query().where('guid', params.id).preload("currentArea").first()
      if(template){
        id=template.id
      } else {
        response.status(404)
        return response.json({success:false, message: 'Template not found'})
      }
    } else {
      template = await Template.query().where("id", id).preload("currentArea").first();
    }
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
        //@ts-ignore
        template_guid: template.getGuid(),
        data
      })
    } else {
      setting.data = data
      await setting.save()
    }

    if(template) {
      template.all_site = 0

      await template.save()
      await template.load('pages')

      await template.related("pages").detach()

      await template.load('pages')
      await Promise.all(request.input("data").map(async condition => {
        switch (condition.object_type) {
          case "all_site":
            template.all_site = condition.condition_type === "include" ? 1 : 0;
            await template.save()

            break
          case "page":
            await Promise.all(condition.object_ids.map(async objectId => {
              const page = await Page.find(objectId)
              if(!page) {
                return
              }
              const pages_template = await PagesTemplate.create({
                page_id: objectId,
                page_guid: page.getGuid(),
                template_id: template.id,
                //@ts-ignore
                template_guid: template.getGuid(),
                condition_type: condition.condition_type,
                template_type: template.currentArea.name
              })

              if(!pages_template) {
                return {
                  message: "Conditions page not Saved"
                }
              }
            }))
            break
        }
      }))
    }
    return {
      success: true
    }
  }


  public async exportCustomizer( {params, response}: HttpContextContract )
  {

    let template
    if (validGuid(params.id)) {
      template = await Template.query().where('guid', params.id).first()
    } else {
      template = await Template.find(params.id)
    }
    if (!template) {
      response.status(404)
      return response.json({
          'success':
            false, 'message':
            'Template not found'
        },
      )
    }

    template.__exported_metas__ = {}
    template.__exported_metas__.styles_presets = AltrpMeta.getGlobalStyles()
    template.__exported_metas__ = {}
    template.__exported_metas__.global_styles = GlobalStyle.all();

    let res = template.serialize()

    return response.json(res)
  }
}
