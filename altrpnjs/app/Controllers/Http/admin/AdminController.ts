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
import base_path from "../../../../helpers/path/base_path";
import Logger from "@ioc:Adonis/Core/Logger";

export default class AdminController {

  // async setSettings({params, response, request, }:HttpContextContract){
  //
  // }
  public async upgradeAllResources({response}:HttpContextContract){
    try {
      if(fs.existsSync(resource_path('views/altrp'))){
        fs.rmSync(resource_path('views/altrp'), { recursive: true, })
      }
      const models = await Model.query().preload('altrp_controller').select('*')
      // const step = 10
      const modelGenerator = new ModelGenerator()
      const controllerGenerator = new ControllerGenerator()
      const templateGenerator = new TemplateGenerator()
      const pageGenerator = new PageGenerator()
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

      for (let model of models) {
        if (model.name.toLowerCase() === 'user' || model.name.toLowerCase() === 'media') {
          continue
        }
        await modelGenerator.run(model)
        let controller: any = model.altrp_controller
        if (!controller) {
          controller = new Controller();
          controller.fill({
            model_id: model.id,
            description: model.description,
          })
          await controller.save()
        }
        await controllerGenerator.run(controller)
      }
      const templates = await Template.query().where('type', 'template').whereNull('deleted_at').select('*')
      for (let template of templates) {
        await templateGenerator.run(template)
      }
      const pages = await Page.query().whereNull('deleted_at').select('*')
      for (let page of pages) {
        await pageGenerator.run(page)
      }
      try {
        if(isProd()){
          await promisify(exec)(`npm --prefix ${base_path()} ci --production` )
          await promisify(exec)('pm2 restart all' )
        }

      }catch (e) {
        Logger.error(e.message, e.stack.split('\n'))
      }
      return response.json({success: true,})
    }catch (e) {
      response.status(500);
      return response.json({success: false,message: 'Generate Error', trace: e.stack.split('\n')});
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
    }catch (e) {
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
    }catch (e) {
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
}
