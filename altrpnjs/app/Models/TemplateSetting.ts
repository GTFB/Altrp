import { DateTime } from 'luxon'
import { BaseModel, beforeDelete, column } from '@ioc:Adonis/Lucid/Orm'

export default class TemplateSetting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public template_id: number

  @column()
  public setting_name: string

  @column()
  public guid: string

  @column()
  public data: string

  @column()
  public template_guid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeDelete()
  public static async beforeDelete(ts): Promise<void> {
    console.trace('PageDatasource deleting', ts.toJSON())
  }
}
