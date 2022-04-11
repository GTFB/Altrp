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

export default class AdminController {

  // async setSettings({params, response, request, }:HttpContextContract){
  //
  // }
  public async upgradeAllResources({response}:HttpContextContract){
    const models = await Model.query().preload('altrp_controller').select('*')
    // const step = 10
    const modelGenerator = new ModelGenerator()
    const controllerGenerator = new ControllerGenerator()
    const templateGenerator = new TemplateGenerator()
    const pageGenerator = new PageGenerator()
    const listenerGenerator = new ListenerGenerator()

    const listeners = await Customizer.query().where('type', 'listener').select('*')

    for(const _l of listeners){
      await listenerGenerator.run(_l)
    }

    for (let model of models){
      if(model.name.toLowerCase() === 'user' || model.name.toLowerCase() === 'media'){
        continue
      }
      await modelGenerator.run(model)
      let controller:any = model.altrp_controller
      if(! controller){
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
      return response.json({success: true,})
  }


  public async updateFavicon({request}) {
    const favicon = request.file("favicon", {
      size: "2mb",
      extnames: ['jpg', 'png'],
    });

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
}
