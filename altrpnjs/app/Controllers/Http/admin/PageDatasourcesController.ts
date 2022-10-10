// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { exec } from 'child_process'
import { promisify } from 'util'

import PageDatasource from "App/Models/PageDatasource";
import Page from "App/Models/Page";

export default class PageDatasourcesController {
  public async store({ request, response }) {

    const body = request.body();

    const page = await Page.query().where("id", body.page_id).firstOrFail()

    if(!body.source_id || !body.alias) {
      response.status(500)
      return {
        message: "fill all fields"
      }
    }

    const data = {
      alias: body.alias,
      autoload: body.autoload,
      parameters: body.parameters || null,
      priority: body.priority,
      source_id: body.source_id,
      page_guid: page.guid,
      page_id: page.id,
      server_side: body.server_side || false,
    }

    const pageDatasource = await PageDatasource.create(data)
    await promisify(exec)(`node ace generator:page ${page.id}`)
    return pageDatasource
  }

  public async update({request, params, response}) {
    const pageDatasource = await PageDatasource.query().where("id", parseInt(params.id)).firstOrFail();

    const body = request.body();

    if(!body.source_id || !body.alias) {
      response.status(500)
      return {
        message: "fill all fields"
      }
    }

    pageDatasource.alias = body.alias;
    pageDatasource.autoload = body.autoload || false;
    pageDatasource.parameters = body.parameters || null;
    pageDatasource.priority = body.priority;
    pageDatasource.source_id = body.source_id;
    pageDatasource.server_side = body.server_side || false;
    pageDatasource.page_guid = body.page_guid

    if(await pageDatasource.save()) {
      const page = await Page.query().where("guid", body.page_guid).firstOrFail()

      await promisify(exec)(`node ace generator:page ${page.id}`)
      return {
        success: true
      }
    } else {
      response.status(500)
      return {
        message: "pageDatasource not saved"
      }
    }
  }

  public async getByPage({params}) {
    const pageQuery = Page.query().preload("pageDatasources", (pageDatasources) => {
      pageDatasources.preload("source")
    })

    if(isNaN(params.id)) {
      pageQuery.where("guid", params.id)
    } else {
      pageQuery.where("id", parseInt(params.id))
    }

    const page = await pageQuery.firstOrFail();

    const sources = page.pageDatasources;

    return sources
  }

  public async destroy({params}) {
    const pageDatasource = await PageDatasource.query().where("id", parseInt(params.id)).firstOrFail();

    pageDatasource.delete()
    return {
      success: true
    }
  }

  public async show({params}) {
    const pageDatasource = await PageDatasource.query().where("id", parseInt(params.id)).preload("source").firstOrFail();

    return pageDatasource
  }

  public async index() {
    const pageDatasource = await PageDatasource.all()

    return pageDatasource
  }
}
