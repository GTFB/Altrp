import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Customizer from './Customizer'
import { nextInvocation } from '../../helpers/schedule'

export default class Cron extends BaseModel {
  public  static table = 'altrp_crons'

  LOG_DELIMITER = '--------------------------------------'

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

  static async createByCustomizer(customizer: Customizer) {
    if (customizer.type === 'schedule') {
      const { period, period_unit, start_at, repeat_count, infinity } = customizer.settings
      let recurrence = `Every ${period} ${period_unit}s`

      if (period === 1) {
        recurrence = `Every ${period_unit}`
      }

      const startAt = start_at ? DateTime.fromISO(start_at) : DateTime.now()
      const nextRun = DateTime.fromJSDate(nextInvocation(customizer.id)?.toDate())

      return await Cron.create({
        customizer_id: customizer.id,
        startAt,
        log: '',
        remainCount: infinity ? undefined : repeat_count,
        nextRun,
        recurrence,
      })
    }

    return null
  }

  public async saveLog(log) {
    this.lastRun = DateTime.now()
    const now = this.lastRun.toISO()

    if (this.log) {
      this.log += '\n'
    } else {
      this.log = ''
    }

    this.log += `${this.LOG_DELIMITER} ${now}\n${log}`
    const nextCronTime = nextInvocation(this.customizer_id)
    if (nextCronTime) {
      this.nextRun = DateTime.fromJSDate(nextInvocation(this.customizer_id)?.toDate())
    }

    return await this.save()
  }
}
