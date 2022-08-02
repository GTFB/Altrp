import { EventsList } from '@ioc:Adonis/Core/Event';
import ModelGenerator from 'App/Generators/ModelGenerator';
import ControllerGenerator from 'App/Generators/ControllerGenerator';

export default class Model {
  public async updating(model: EventsList['model:updating']) {
    model.id;
  }
  public async updated(model: EventsList['model:updated']) {
    const modelGenerator = new ModelGenerator();
    const controllerGenerator = new ControllerGenerator();
    await model.load('altrp_controller');
    const controller = model.altrp_controller;
    await modelGenerator.run(model);
    await controllerGenerator.run(controller);
    // Promise.all([controllerGenerator.run(controller), modelGenerator.run(model)])
  }
}
