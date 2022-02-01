import Model from "App/Models/Model";
import ModelGenerator from "App/Generators/ModelGenerator";
import ControllerGenerator from "App/Generators/ControllerGenerator";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Controller from "App/Models/Controller";


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
}
