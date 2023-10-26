import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class I18n extends BaseModel {
  public static table = 'altrp_i18n'

  @column()
  public text: string

  @column()
  public translated_text: string

  @column()
  public domain: string

}
