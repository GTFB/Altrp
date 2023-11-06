import * as _ from 'lodash'
import Env from "@ioc:Adonis/Core/Env";
import {BaseModel} from "@ioc:Adonis/Lucid/Orm";
import replaceContentWithData from "../../helpers/string/replaceContentWithData";


export default class AltrpBaseModel extends BaseModel {
  protected customizerData = {
    env: Env,

  }
  protected setCustomizerData(path:string, data:any){
    _.set(this.customizerData, path, data)
  }
  protected setRobotizerData(path:string, data:any){
    _.set(this.customizerData, path, data)
  }
  protected unsetRobotizerData(path:string){
    _.unset(this.customizerData, path)
  }
  protected unsetCustomizerData(path:string){
    _.unset(this.customizerData, path)
  }
  protected getCustomizerData(path:string, _default:any = null):any{
    return _.get(this.customizerData, path, _default)
  }
  protected getRobotizerData(path:string, _default:any = null):any{
    return _.get(this.customizerData, path, _default)
  }

  protected replaceContentWithData(content: string):string{

    return replaceContentWithData(content, this.customizerData)
  }

}
