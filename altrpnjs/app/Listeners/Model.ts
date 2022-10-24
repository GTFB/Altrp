import { EventsList } from '@ioc:Adonis/Core/Event'
import base_path from '../../helpers/base_path'
import exec from '../../helpers/exec'

export default class Model {
  public async updating(model: EventsList['model:updating']){
    model.id
  }
  public async updated(model: EventsList['model:updated']){
    await model.load('altrp_controller')
    const controller = model.altrp_controller
    await exec(`node ${base_path('ace')} generator:model --id=${model.id}`)
    await exec(`node ${base_path('ace')} generator:controller --id=${controller.id}`)
    // Promise.all([controllerGenerator.run(controller), modelGenerator.run(model)])
  }
}
