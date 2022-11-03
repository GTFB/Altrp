import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Application from '@ioc:Adonis/Core/Application';
import jimp from "jimp";
import FAVICONS_SIZES from "../../../../helpers/const/FAVICONS_SIZES";
import Drive from '@ioc:Adonis/Core/Drive'
import ListenerGenerator from "App/Generators/ListenerGenerator";
import isProd from "../../../../helpers/isProd";
import UpdateService from "App/Services/UpdateService";
import Env from "@ioc:Adonis/Core/Env";
import fs from "fs";
import resource_path from "../../../../helpers/path/resource_path";
import View from "@ioc:Adonis/Core/View";
import {CacheManager} from "edge.js/build/src/CacheManager";
import env from "../../../../helpers/env";
import clearRequireCache from "../../../../helpers/node-js/clearRequireCache";
import {RequestContract} from "@ioc:Adonis/Core/Request";
import base_path from '../../../../helpers/base_path'
import exec from '../../../../helpers/exec'

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
        await exec('pm2 restart all --update-env')
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
    // try {
    //   if(isProd()){
    //     await exec('pm2 restart all --update-env')
    //   }
    //
    // }catch (e) {
    //   res.message = 'Error server restarting: \n' + e.message
    //   e.message = 'Error server restarting: \n' + e.message
    //   console.error(e);
    // }


    return response.json(res)
  }


  private static async upgradeTemplates(request: RequestContract){
    console.info('Upgrading Templates')

    const id = request.input('id')

    console.log(await exec(`node ${base_path('ace')} generator:template ${id ? `--id=${id}` : ''}`))

    console.info('Templates Upgraded')
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
        trace: e?.stack?.split('\n'),
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
        trace: e?.stack?.split('\n'),
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
    console.info('Upgrading Pages')
    const id = request.input('id')

    console.log(await exec(`node ${base_path('ace')} generator:page ${id ? `--id=${id}` : ''}`))

    console.info('Pages Upgraded')
  }

  private static async upgradeModels() {
    console.info('Upgrading Models')

    console.log(await exec(`node ${base_path('ace')} generator:model`))
    console.log(await exec(`node ${base_path('ace')} generator:router`))

    console.info('Models Upgraded')
  }

  private static async upgradeListeners() {
    console.info('Upgrading Listeners')

    const listenerGenerator = new ListenerGenerator()

    await listenerGenerator.hookTemplates()
    await listenerGenerator.hookControllers()
    await listenerGenerator.hookModels()
    await listenerGenerator.hookPages()
    await listenerGenerator.hookListeners()

    console.log(await exec(`node ${base_path('ace')} generator:listener`))

    console.info('Listeners Upgraded')
  }

  private static async upgradeCRUDs() {
    console.info('Upgrading CRUDs')

    console.log(await exec(`node ${base_path('ace')} generator:crud`))

    console.info('CRUDs Upgraded')
  }

  private static async upgradeSchedules() {
    console.info('Upgrading Schedules')

    console.log(await exec(`node ${base_path('ace')} generator:schedule`))

    console.info('Schedules Upgraded')
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
