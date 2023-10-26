import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import mbParseJSON from "../../helpers/mbParseJSON";
import * as _ from 'lodash'

export default class AltrpMeta extends BaseModel {

  public static altrp_themes = 'altrp_themes'

  public static table = 'altrp_meta'

  @column({ isPrimary: true })
  public meta_name: string

  @column({
    consume: value=>{
      return mbParseJSON(value)
    },
    prepare: value=>{
      if(_.isObject(value)){
        return JSON.stringify(value)
      }
      return value
    },

  })
  public meta_value: any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static async getGlobalStyles(){
    let meta = await AltrpMeta.query().where('meta_name', 'global_styles').first()
    if (!meta) {
      return {}
    }
    return meta.meta_value
  }

}
