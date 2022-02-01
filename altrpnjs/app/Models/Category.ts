import {BaseModel, column, computed} from "@ioc:Adonis/Lucid/Orm"
import { DateTime } from 'luxon'


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

  @computed()
  public get category(){
    return {
      title: this.title,
      name: this.name,
      description: this.description,
      guid: this.guid,
    }
  }
  public getGuid() {
    return this.guid
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
