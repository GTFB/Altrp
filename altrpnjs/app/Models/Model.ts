import {DateTime} from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne, manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Source from 'App/Models/Source';
import Controller from "App/Models/Controller";
import Relationship from "App/Models/Relationship";
import Category from "App/Models/Category";
import Table from './Table';


export default class Model extends BaseModel {
  public static table = 'altrp_models'

  @column({isPrimary: true})
  public id: number

  @column()
  public soft_deletes: boolean

  @column()
  public time_stamps: boolean

  @column()
  public namespace: string

  @column()
  public name: string

  @column()
  public title: string

  @column()
  public fillable_cols: string

  @column()
  public user_cols: string

  @column()
  public path: string

  @column()
  public table_id: number

  @belongsTo(() => Table, {
    foreignKey: "table_id"
  })
  public table: BelongsTo<typeof Table>

  @column()
  public pk: string

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

  @belongsTo(() => Model, {
    foreignKey: 'parent_model_id'
  })
  public parent: BelongsTo<typeof Model>


  @hasMany(() => Source,)
  public altrp_source: HasMany<typeof Source>

  @hasOne(() => Controller,)
  public altrp_controller: HasOne<typeof Controller>

  @hasMany(() => Relationship,{
    foreignKey: 'model_id',
    localKey: 'id',
  })
  public altrp_relationships: HasMany<typeof Relationship>

  @manyToMany(() => Category, {
    pivotTable: 'altrp_category_objects',
    relatedKey: 'guid',
    localKey: 'guid',
    pivotForeignKey: 'object_guid',
    pivotRelatedForeignKey: 'category_guid',
  })
  public categories: ManyToMany<typeof Category>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public last_upgrade: DateTime


  static getModelsForEditor() {

  }
}
