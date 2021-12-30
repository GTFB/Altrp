import { DateTime } from 'luxon'
import {BaseModel, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import Area from "App/Models/Area";

export default class Template extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public title: string

  @column()
  public data: string

  @column()
  public type: string

  @column()
  public guid: string

  @column()
  public styles: string

  @column()
  public html_content: string

  @hasOne(() => User, {
    localKey: "user_id",
    foreignKey: "id"
  })
  public user: HasOne<typeof User>

  @hasOne(() => Area, {
    localKey: "area",
    foreignKey: "id"
  })
  public currentArea: HasOne<typeof Area>

  @column()
  public area: number

  @column()
  public user_id: number

  public getGuid() {
    return this.guid
  }

  public getAuthor() {
    return this.user.email
  }

  public getArea() {
    return this.currentArea.name
  }

  public static getDefaultData() {
    return {
      name: "root-element",
      type: "root-element",
      children: [],
      settings: []
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
