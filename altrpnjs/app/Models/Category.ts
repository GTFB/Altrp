import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  public static table = 'altrp_categories'

  @column({ isPrimary: true })
  public id: number

  @column()
  public guid: string

  @column()
  public title: string

  @column()
  public name: string

  @column()
  public description: string

  public getGuid() {
    return this.guid
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
