import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import Model from "App/Models/Model";
import Category from "App/Models/Category";

export default class Robot extends BaseModel {
  public static table = 'altrp_robots'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public chart: string

  @column()
  public enabled: boolean

  @column()
  public guid: string

  public getGuid() {
    return this.guid
  }

  @column({serializeAs: null})
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Category, {
    pivotTable: "altrp_category_objects",
    pivotForeignKey: "object_guid",
    pivotRelatedForeignKey: "category_guid",
    relatedKey: "guid",
    localKey: "guid",
  })
  public categories: ManyToMany<typeof Category>

  @column()
  public start_condition: string

  @column()
  public start_config: string

  @column({serializeAs: null})
  public model_id: number

  @belongsTo(() => Model, {
    foreignKey: "model_id"
  })
  public model: BelongsTo<typeof Model>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
