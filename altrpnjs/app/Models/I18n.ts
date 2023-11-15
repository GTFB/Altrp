import {BaseModel, beforeCreate,  column} from '@ioc:Adonis/Lucid/Orm'
import guid from '../../helpers/guid';

export default class I18n extends BaseModel {
  public static table = 'altrp_i18n'
  public static selfAssignPrimaryKey = true

  @column({
    isPrimary: true,
  })
  public guid;

  @column()
  public text: string

  @column()
  public iso_lang: string

  @column()
  public category_guid: string

  @column()
  public translated_text: string

  @column()
  public domain: string


  @beforeCreate()
  public static assignGuid(i18n: I18n) {
    if(!i18n.guid){
      i18n.guid = guid()
    }
  }

  // @beforeFetch()
  // public static fetchAssignGuid(query) {
  //   if(i18n.guid){
  //     return
  //   }
  //   i18n.guid = guid()
  // }


}
