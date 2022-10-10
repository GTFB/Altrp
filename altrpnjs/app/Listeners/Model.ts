import { EventsList } from '@ioc:Adonis/Core/Event'
import { exec } from 'child_process'
import { promisify } from 'util'

export default class Model {
  public async updating(model: EventsList['model:updating']){
    model.id
  }
  public async updated(model: EventsList['model:updated']){
    await model.load('altrp_controller')
    const controller = model.altrp_controller
    await promisify(exec)(`node ace generator:model ${model.id}`)
    await promisify(exec)(`node ace generator:controller ${controller.id}`)
    // Promise.all([controllerGenerator.run(controller), modelGenerator.run(model)])
  }
}
