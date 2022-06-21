import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class Diagram extends BaseModel {
  public  static table = 'altrp_diagrams'

  @column({ isPrimary: true })
  public id: number

  @column()
  public settings: string

  @column()
  public title: string

  @column()
  public guid: string

  @column()
  public author: number | null



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
