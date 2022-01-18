import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public guid: string

  @column({
    consume: value=>JSON.parse(value),
    prepare: value=>JSON.stringify(value),
  })
  public children: string

  @column()
  public name: string

  @column()
  public settings: string

}
