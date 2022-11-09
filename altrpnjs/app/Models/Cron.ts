import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Customizer from './Customizer'

export default class Cron extends BaseModel {
  public  static table = 'altrp_crons'

  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public startAt: DateTime

  @column.dateTime()
  public lastRun: DateTime

  @column.dateTime()
  public nextRun: DateTime

  @column()
  public recurrence: string

  @column()
  public log: string

  @column()
  public remainCount: number

  @column()
  public customizer_id: number

  @belongsTo(() => Customizer, {
    foreignKey: 'customizer_id'
  })
  public customizer: BelongsTo<typeof Customizer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
