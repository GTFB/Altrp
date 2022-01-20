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
  public namespace: string

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


  @belongsTo(() => User, {
    foreignKey: "author"
  })
  public user: BelongsTo<typeof User>


  @hasMany(() => Source, {
    foreignKey: 'controller_id'
  })
  public sources: HasMany<typeof Source>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
