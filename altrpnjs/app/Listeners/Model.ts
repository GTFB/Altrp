import base_path from '../../helpers/base_path'
import exec from '../../helpers/exec'
import  ORMModel from '../Models/Model'

export default class Model {
  // public async updating(model: EventsList['model:updating']){
  //   model.id
  // }
  public async updated(model: ORMModel){
    await exec(`node ${base_path('ace')} generator:model --id=${model.id}`)
    await exec(`node ${base_path('ace')} generator:router`)
  }
}
