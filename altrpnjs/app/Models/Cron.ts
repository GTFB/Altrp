import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Customizer from './Customizer'

export default class Cron extends BaseModel {
  public  static table = 'altrp_crons'

  @column({ isPrimary: true })
  public id: number

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

  static async createByCustomizer(customizer: Customizer, log: string) {
    if (customizer.type === 'schedule') {
      const { period, period_unit, repeat_count, infinity } = customizer.settings
      let recurrence = `Every ${period} ${period_unit}s`

      if (period === 1) {
        recurrence = `Every ${period_unit}`
      }

      return await Cron.create({
        customizer_id: customizer.id,
        log,
        remainCount: infinity ? undefined : repeat_count,
        recurrence,
      })
    }

    return null
  }
}
