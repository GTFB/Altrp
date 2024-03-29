import base_path from '../../helpers/base_path'
import exec from '../../helpers/exec'
import  ORMModel from '../Models/Model'

export default class Model {
  // public async updating(model: EventsList['model:updating']){
  //   model.id
  // }
  public async updated(model: ORMModel){
    await model.load('altrp_controller')
    const controller = model.altrp_controller
    console.log(await exec(`node ${base_path('ace')} generator:model --id=${model.id}`))
    await exec(`node ${base_path('ace')} generator:controller --id=${controller.id}`)
    await exec(`node ${base_path('ace')} generator:router`)
    // Promise.all([controllerGenerator.run(controller), modelGenerator.run(model)])
  }
}
