import Model from "App/Models/Model";
import ModelGenerator from "App/Generators/ModelGenerator";
import ControllerGenerator from "App/Generators/ControllerGenerator";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Controller from "App/Models/Controller";
import Application from '@ioc:Adonis/Core/Application'
import sharp from "sharp";
import FAVICONS_SIZES from "../../../../helpers/const/FAVICONS_SIZES";
import Drive from '@ioc:Adonis/Core/Drive'

export default class AdminController {

  // async setSettings({params, response, request, }:HttpContextContract){
  //
  // }
  public async upgradeAllResources({response}:HttpContextContract){
    const models = await Model.query().preload('altrp_controller').select('*')
    // const step = 10
    const modelGenerator = new ModelGenerator()
    const controllerGenerator = new ControllerGenerator()

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
    await Promise.all(models.map(async model=>{
      if(! model.altrp_controller){
        console.log(model.name);
      }
    }))
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
      await sharp(Application.tmpPath("favicon") + `/basic.${favicon.extname}`)
        .png()
        .resize(variant.size, variant.size)
        .toFile(Application.tmpPath("favicon") + `/favicon_${variant.size}.png`)
    }

    await Drive.delete(Application.tmpPath("favicon") + `/basic.${favicon.extname}`)

    return {
      success: true
    }
  }
}
