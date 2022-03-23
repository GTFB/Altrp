import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Font extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public font_family: string

  @column()
  public description: string

  @column()
  public guid: string

}
