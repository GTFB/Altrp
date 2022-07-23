import Model from "App/Models/Model";
import ModelGenerator from "App/Generators/ModelGenerator";
import ControllerGenerator from "App/Generators/ControllerGenerator";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Controller from "App/Models/Controller";
import Application from '@ioc:Adonis/Core/Application';
import jimp from "jimp";
import FAVICONS_SIZES from "../../../../helpers/const/FAVICONS_SIZES";
import Drive from '@ioc:Adonis/Core/Drive'
import Template from "App/Models/Template";
import TemplateGenerator from "App/Generators/TemplateGenerator";
import PageGenerator from "App/Generators/PageGenerator";
import Page from "App/Models/Page";
import ListenerGenerator from "App/Generators/ListenerGenerator";
import Customizer from "App/Models/Customizer";
import isProd from "../../../../helpers/isProd";
import UpdateService from "App/Services/UpdateService";
import Env from "@ioc:Adonis/Core/Env";
import {exec} from "child_process";
import fs from "fs";
import {promisify} from "util";
import resource_path from "../../../../helpers/path/resource_path";
import Logger from "@ioc:Adonis/Core/Logger";
import View from "@ioc:Adonis/Core/View";
import {CacheManager} from "edge.js/build/src/CacheManager";
import env from "../../../../helpers/env";
import clearRequireCache from "../../../../helpers/node-js/clearRequireCache";
import {RequestContract} from "@ioc:Adonis/Core/Request";
import delay from "../../../../helpers/delay";

export default class AdminController {

  // async setSettings({params, response, request, }:HttpContextContract){
  //
  // }
  public async restartAltrp({response,}: HttpContextContract){
    const res : {
      success:boolean,
      message?:string,
      trace?:[],
    } = {success: true,
    }
    try {
      if(isProd()){
        await promisify(exec)('pm2 restart all --update-env')
      }

    }catch (e) {
      res.message = 'Error server restarting: \n' + e.message
      e.message = 'Error server restarting: \n' + e.message
      console.error(e);
    }
    return response.json(res)

  }
  public async upgradeAllResources({response,request}: HttpContextContract) {
    const res : {
      success:boolean,
      message?:string,
      trace?:[],
    } = {success: true,
    }
    const type = request.input('type')
    View.asyncCompiler.cacheManager = new CacheManager(env('CACHE_VIEWS'))
    clearRequireCache()
    switch (type) {
      case 'listeners':{
        await AdminController.upgradeListeners()
      }
        break;
      case 'templates':{
        await AdminController.upgradeTemplates(request)
      }
        break;
      case 'models':{
        await AdminController.upgradeModels()
        }
        break;
      case 'pages':{
        await AdminController.upgradePages(request)
      }
        break;
      default:{

        if (fs.existsSync(resource_path('views/altrp'))) {
          fs.rmSync(resource_path('views/altrp'), {recursive: true,})
        }
        await AdminController.upgradeListeners()
        await AdminController.upgradeModels()
        await AdminController.upgradePages(request)
        await AdminController.upgradeTemplates(request)

      }
    }


    return response.json(res)
  }


  private static async upgradeTemplates(request: RequestContract){
    Logger.info('Upgrading templates')
    const templateGenerator = new TemplateGenerator()


    let templates
    let id = request.input('id')
    if(id){
      if(id.indexOf(',')){
        id = id.split(',')
        templates = await Template.query()
          .whereIn('id', id)
          .select('*')
      } else {
        templates = await Template.query()
          .where('id', id)
          .select('*')
      }
    } else {
      templates = await Template.query().whereNull('deleted_at').select('*')
    }
    for (let template of templates) {
      try{
        await templateGenerator.run(template)

      }catch (e) {
        console.error(`Error while Template ${template.guid} generate: ${e.message}`);
      }
    }
  }

  public async updateFavicon({request}) {
    const favicon = request.allFiles().favicon || null

    if(favicon) {
      await favicon.move(Application.tmpPath("favicon"), {
        name: `basic.${favicon.extname}`
      })
    }

    for (const variant of FAVICONS_SIZES) {
      jimp.read(Application.tmpPath("favicon") + `/basic.${favicon.extname}`, (err, lenna) => {
        if(err) throw err;
        lenna
          .resize(variant.size, variant.size)
          .write(Application.tmpPath("favicon") + `/favicon_${variant.size}.png`)
      })
    }

    await Drive.delete(Application.tmpPath("favicon") + `/basic.${favicon.extname}`)

    return {
      success: true
    }
  }

  public async update_altrp(httpContext: HttpContextContract){
    if(! isProd()){
      return httpContext.response.json({
        result: true,
        success: true,
      })
    }
    const updateService = new UpdateService()
    try {
      await updateService.update()
    } catch (e) {
      console.error(e);
      httpContext.response.status(500);
      return httpContext.response.json({
        success: false,
        message: e.message,
        trace: e.stack.split('\n'),
      })
    }

    return httpContext.response.json({
      success: true,
      result: true,
    })
  }

  public async install_test_altrp(httpContext: HttpContextContract){
    if(! isProd()){
      return httpContext.response.json({
        result: true,
        success: true,
      })
    }
    const updateService = new UpdateService()
    try {
      await updateService.update('test')
    } catch (e) {
      console.error(e);
      httpContext.response.status(500);
      return httpContext.response.json({
        success: false,
        message: e.message,
        trace: e.stack.split('\n'),
      })
    }

    return httpContext.response.json({
      success: true,
      result: true,
    })
  }

  async getPackageKey(){
    return{success:true, package_key: Env.get('PACKAGE_KEY')}
  }

  private static async upgradePages(request: RequestContract) {
    console.log('Upgrading pages')

    let pages

    let id = request.input('id')
    if(id){
      if(id.indexOf(',')){
        id = id.split(',')
        pages = await Page.query().whereNull('deleted_at')
          .whereIn('id', id)
          .select('*')
      } else {
        pages = await Page.query()
          .where('id', id)
          .select('*')
      }
    } else {
      pages = await Page.query().whereNull('deleted_at').select('*')
    }

    for (let page of pages) {
      const pageGenerator = new PageGenerator()
      try{
        await pageGenerator.run(page)
        await delay(100);
      }catch (e) {

        console.error(`Error while Page ${page.id} generate: ${e.message}`,
          e.stack.split('\n'),
          );
      }
    }
  }

  private static async upgradeModels() {
    console.log('Upgrading models')

    const models = await Model.query().select('*')

    const controllerGenerator = new ControllerGenerator()
    const modelGenerator = new ModelGenerator()

    for (let model of models) {
      if (model.name.toLowerCase() === 'user' || model.name.toLowerCase() === 'media') {
        continue
      }
      try{
        await modelGenerator.run(model)
      }catch (e) {
        console.error(`Error while Model generate: ${e.message}`);
      }
      let controller: any = await Controller.query().where('model_id', model.id).first()
      if (!controller) {
        controller = new Controller();
        controller.fill({
          model_id: model.id,
          description: model.description,
        })
        await controller.save()
      }
      try{
        await controllerGenerator.run(controller)
      }catch (e) {
        console.error(e);
      }
    }
  }

  private static async upgradeListeners() {
    Logger.info('Upgrading Listeners')

    const listenerGenerator = new ListenerGenerator()

    await listenerGenerator.hookTemplates()
    await listenerGenerator.hookControllers()
    await listenerGenerator.hookModels()
    await listenerGenerator.hookPages()
    await listenerGenerator.hookListeners()
    const listeners = await Customizer.query().where('type', 'listener').select('*')

    for (const _l of listeners) {
      await listenerGenerator.run(_l)
    }
  }
  async getHealthCheck({response}:HttpContextContract){

    let used = process.memoryUsage().heapUsed / 1024 / 1024;
    used = Math.round(used * 100) / 100
    return response.json({
      success:true,
      data:{
        used
      }
    })
  }
}
