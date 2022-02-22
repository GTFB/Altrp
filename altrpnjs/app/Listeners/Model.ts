import { EventsList } from '@ioc:Adonis/Core/Event'
import ModelGenerator from "App/Generators/ModelGenerator";
import ControllerGenerator from "App/Generators/ControllerGenerator";
import ListenerGenerator from "App/Generators/ListenerGenerator";

export default class Model {
  public async updating(model: EventsList['model:updating']){
    model.id
  }
  public async updated(model: EventsList['model:updated']){
    const modelGenerator = new ModelGenerator()
    const controllerGenerator = new ControllerGenerator()
    const listenerGenerator = new ListenerGenerator()
    await model.load('altrp_controller')
    const controller = model.altrp_controller
    await modelGenerator.run(model)
    await listenerGenerator.runAll(model)
    await controllerGenerator.run(controller)
    // Promise.all([controllerGenerator.run(controller), modelGenerator.run(model)])
  }
}
