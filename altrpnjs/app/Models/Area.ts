import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Area extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public settings: string

  @column()
  public title: string

  static async getAllWithNames() {
    const areas = await Area.all()

    return areas.map(area => {
      return {
        ...area.$attributes,
        title: area.name.charAt(0).toUpperCase() + area.name.slice(1)
      }
    })
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
