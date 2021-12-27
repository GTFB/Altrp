import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PagesTemplate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public page_id: number

  @column()
  public template_id: number

  @column()
  public template_type: string

  @column()
  public condition_type: string

  @column()
  public 	page_guid: string

  @column()
  public 	template_guid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
