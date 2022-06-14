import { DateTime } from 'luxon'
import {BaseModel, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Page from "App/Models/Page";
import Source from "App/Models/Source";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Customizer from "App/Models/Customizer";
import mbParseJSON from "../../helpers/mbParseJSON";
import _ from 'lodash';
import replaceContentWithData from "../../helpers/string/replaceContentWithData";


export default class PageDatasource extends BaseModel {
  public static table = "page_data_sources";

  @column({ isPrimary: true })
  public id: number

  @column()
  public source_id: number;

  @column({serializeAs: null})
  public page_id: number;

  @column()
  public alias: string;

  @column()
  public parameters: string;

  @column()
  public priority: number;

  @column()
  public page_guid: string;

  @column()
  public autoload: boolean;

  @column()
  public server_side: boolean;

  @hasOne(() => Page, {
    localKey: "page_id",
    foreignKey: "id"
  })
  public pages: HasOne<typeof Page>

  @hasOne(() => Source, {
    localKey: "source_id",
    foreignKey: "id"
  })
  public source: HasOne<typeof Source>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  getParsedParameters(altrpContext:any){
    if(! this.parameters){
      return{}
    }
    let parameters = mbParseJSON(this.parameters)
    if(! parameters){
      return{}
    }
    if(_.isArray(parameters)) {
      const _params:any = {}
      _.forEach(parameters,(value) =>{
        _params[value.paramName] = replaceContentWithData(value.paramValue, altrpContext)
      })
      return _params
    }
    const _params:any = {}
    parameters = parameters.split('\n').map(v=>v.split('|').map(p=>p.trim()))
    parameters.forEach(value=>{
      _params[value[0]] = replaceContentWithData(value[1], altrpContext)
    })
    return  _params
  }
  // @ts-ignore
  async fetchControllerMethod(httpContext:HttpContextContract, altrpContext){

    // @ts-ignore
    if(!this.source){
      return null
    }
    await this.source.preloadSourceable()
    await this.source.load('model')
    const controller = await this.source.getControllerInstance()
    if(! controller){
      console.error(`Error in source with name ${this.source.name}:
       Controller error!`);
      return null
    }
    try{
      switch (this.source.sourceable_type) {
        case Customizer.sourceable_type:{
          this.source.customizer = await Customizer.find(this.source.sourceable_id)
          if(this.source.customizer){
            await this.source.customizer.load('source')
          }
        }
      }
      httpContext.request.updateQs(this.getParsedParameters(altrpContext))

      await controller[this.source.getMethodName()](httpContext)
      return httpContext.response.getBody();
    } catch (e){
      console.error(`Error in source with name ${this.source.name}:
       ${e.stack}`);
    }
  }
}
