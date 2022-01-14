import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany,} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Source from 'App/Models/Source';
import Model from "App/Models/Model";


export default class Controller extends BaseModel {
  public static table = 'altrp_controllers'

  @column({ isPrimary: true })
  public id: number

  @column()
  public soft_deletes: boolean

  @column()
  public time_stamps: boolean

  @column()
  public namespace: string

  @column()
  public fillable_cols: string

  @column()
  public user_cols: string

  @column()
  public prefix: string

  @column()
  public model_id: number

  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public altrp_model: BelongsTo<typeof Model>

  @column()
  public description: string

  @column()
  public bounded_model: string

  @column()
  public preset: boolean

  @column()
  public guid: string

  @column()
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: "author"
  })
  public user: BelongsTo<typeof User>

  @column()
  public parent_model_id: number


  @hasMany(() => Source, {
    foreignKey: 'id'
  })
  public altrp_table: HasMany<typeof Source>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public last_upgrade: DateTime

}
