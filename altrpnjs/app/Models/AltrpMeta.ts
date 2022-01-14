import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AltrpMeta extends BaseModel {
  public static table = 'altrp_meta'

  @column({ isPrimary: true })
  public meta_name: string

  @column()
  public meta_value: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
