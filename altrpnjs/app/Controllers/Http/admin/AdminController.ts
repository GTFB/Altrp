import Model from "App/Models/Model";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Controller from "App/Models/Controller";
import Application from '@ioc:Adonis/Core/Application';
import jimp from "jimp";
import FAVICONS_SIZES from "../../../../helpers/const/FAVICONS_SIZES";
import Drive from '@ioc:Adonis/Core/Drive'
import Template from "App/Models/Template";
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
import View from "@ioc:Adonis/Core/View";
import {CacheManager} from "edge.js/build/src/CacheManager";
import env from "../../../../helpers/env";
import clearRequireCache from "../../../../helpers/node-js/clearRequireCache";
import {RequestContract} from "@ioc:Adonis/Core/Request";
<<<<<<< HEAD
import delay from "../../../../helpers/delay";
import base_path from '../../../../helpers/base_path'
=======

>>>>>>> optimizing-generated-styles

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
      case 'cruds':
        await AdminController.upgradeCRUDs()
        break
      case 'schedules':
        await AdminController.upgradeSchedules()
        break
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


  private static async upgradeTemplates(request: RequestContract){
    console.info('Upgrading templates')


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
        await promisify(exec)(`node ${base_path('ace')} generator:template ${template.id}`)

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
      try{
<<<<<<< HEAD
        await promisify(exec)(`node ${base_path('ace')} generator:page ${page.id}`)
        await delay(100);
=======
        await pageGenerator.run(page)

>>>>>>> optimizing-generated-styles
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

    for (let model of models) {
      if (model.name.toLowerCase() === 'user' || model.name.toLowerCase() === 'media') {
        continue
      }
      try{
        await promisify(exec)(`node ${base_path('ace')} generator:model ${model.id}`)
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
        await promisify(exec)(`node ${base_path('ace')} generator:controller ${controller.id}`)
      }catch (e) {
        console.error(e);
      }
    }
  }

  private static async upgradeListeners() {
    console.info('Upgrading Listeners')

    const listenerGenerator = new ListenerGenerator()

    await listenerGenerator.hookTemplates()
    await listenerGenerator.hookControllers()
    await listenerGenerator.hookModels()
    await listenerGenerator.hookPages()
    await listenerGenerator.hookListeners()
    const listeners = await Customizer.query().where('type', 'listener').select('*')

    for (const _l of listeners) {
      await promisify(exec)(`node ${base_path('ace')} generator:listener ${_l.id}`)
    }
  }

  private static async upgradeCRUDs() {
    console.info('Upgrading CRUDs')

    const cruds = await Customizer.query().where('type', 'crud')

    for (const crud of cruds) {
      try {
        await promisify(exec)(`node ${base_path('ace')} generator:crud ${crud.id}`)
      } catch(e) {
        console.error(`Error while CRUD generate: ${e.message}`)
      }
    }
  }

  private static async upgradeSchedules() {
    console.log('Upgrading Schedules')

    const schedules = await Customizer.query().where('type', 'schedule')

    for (const schedule of schedules) {
      try {
        await promisify(exec)(`node ${base_path('ace')} generator:schedule ${schedule.id}`)
      } catch(e) {
        console.error(`Error while schedule generate: ${e.message}`)
      }
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
