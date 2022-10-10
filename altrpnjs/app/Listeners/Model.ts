import { EventsList } from '@ioc:Adonis/Core/Event'
import { exec } from 'child_process'
import { promisify } from 'util'
import base_path from '../../helpers/base_path'

export default class Model {
  public async updating(model: EventsList['model:updating']){
    model.id
  }
  public async updated(model: EventsList['model:updated']){
    await model.load('altrp_controller')
    const controller = model.altrp_controller
    await promisify(exec)(`node ${base_path('ace')} generator:model ${model.id}`)
    await promisify(exec)(`node ${base_path('ace')} generator:controller ${controller.id}`)
    // Promise.all([controllerGenerator.run(controller), modelGenerator.run(model)])
  }
}
