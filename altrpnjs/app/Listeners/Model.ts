import { EventsList } from '@ioc:Adonis/Core/Event'
import ModelGenerator from "App/Generators/ModelGenerator";
import Application from '@ioc:Adonis/Core/Application'

export default class Model {
  // public async updating(model: EventsList['model:updating']){
  //
  // }
  public async updated(model: EventsList['model:updated']){
    const generator = new ModelGenerator(Application, kernel)
  }
}
