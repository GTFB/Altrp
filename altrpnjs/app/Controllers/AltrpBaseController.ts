import * as _ from 'lodash'
import Env from "@ioc:Adonis/Core/Env";

export default class AltrpBaseController {
  protected customizerData = {
    env: Env,

  }
  protected setCustomizerData(path:string, data:any){
    _.set(this.customizerData, path, data)
  }
  protected getCustomizerData(path:string, _default:any = null):any{
    return _.get(this.customizerData, path, _default)
  }
}
