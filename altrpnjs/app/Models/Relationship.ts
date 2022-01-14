import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany,} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Source from 'App/Models/Source';
import Model from "App/Models/Model";


export default class Relationship extends BaseModel {
  public static table = 'altrp_relationships'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public title: string

  @column()
  public model_class: string

  @column()
  public foreign_key: string

  @column()
  public local_key: string

  @column()
  public description: string

  @column()
  public path: boolean

  @column()
  public model_id: number

  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public altrp_model: BelongsTo<typeof Model>

  @column()
  public target_model_i: number

  @belongsTo(() => Model, {
    foreignKey: 'target_model_i'
  })
  public altrp_target_model: BelongsTo<typeof Model>

  @column()
  public add_belong_to: boolean

  @column()
  public always_with: boolean

  @column()
  public editable: boolean

  @column()
  public  	onDelete: string

  @column()
  public  	onUpdate: string

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
