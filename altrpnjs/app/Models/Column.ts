import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column,} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Model from "App/Models/Model";
import Table from "App/Models/Table";


export default class Column extends BaseModel {
  public static table = 'altrp_columns'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public type: string

  @column()
  public size: number

  @column()
  public user_id: number

  @column()
  public model_id: number

  @column()
  public table_id: number

  @column()
  public null: boolean

  @column()
  public primary: boolean

  @column()
  public unique: boolean

  @column()
  public is_label: boolean

  @column()
  public is_title: boolean

  @column()
  public is_auth: boolean

  @column()
  public preset: boolean

  @column()
  public indexed: boolean

  @column()
  public editable: boolean

  @column()
  public hidden: boolean

  @column()
  public default: string

  @column()
  public calculation: string

  @column()
  public calculation_logic: string

  @column()
  public attribute: string

  @column()
  public input_type: string

  @column()
  public options: string


  @belongsTo(() => User, {
    foreignKey: "author"
  })
  public user: BelongsTo<typeof User>


  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public altrp_model: BelongsTo<typeof Model>

  @belongsTo(() => Table, {
    foreignKey: 'table_id'
  })
  public altrp_table: BelongsTo<typeof Table>



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public last_upgrade: DateTime

}
