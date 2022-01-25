import Model from "App/Models/Model";
import ModelGenerator from "App/Generators/ModelGenerator";
import ControllerGenerator from "App/Generators/ControllerGenerator";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";


export default class AdminController {

  // async setSettings({params, response, request, }:HttpContextContract){
  //
  // }
  public async upgradeAllResources({response}:HttpContextContract){
    const models = await Model.all()
    // const step = 10
    const modelGenerator = new ModelGenerator()
    const controllerGenerator = new ControllerGenerator()
    await Promise.all(models.map(async model=>{
      await model.load('altrp_controller')
      const controller = model.altrp_controller
      await modelGenerator.run(model)
      await controllerGenerator.run(controller)
    }))
    return response.json({success: true,})
  }
}
