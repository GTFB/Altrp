import {BaseModel, BelongsTo, belongsTo, column,} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Model from "App/Models/Model";
import Table from "App/Models/Table";
import isProd from "../../helpers/isProd";


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

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
  public altrp_user: BelongsTo<typeof User>

  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public altrp_model: BelongsTo<typeof Model>

  @belongsTo(() => Table, {
    foreignKey: 'table_id'
  })
  public altrp_table: BelongsTo<typeof Table>

  renderProdForModel():string{
    if(!this.altrp_model){
      return ''
    }
    if(this.type === 'calculated'){
      return ``
    }

    if(
      [
        'date',
        'time',
        'year',
        'dateTime',
        'timestamp',
      ].indexOf(this.type) !== -1){
      return `
decorate([
  Orm.column.dateTime(${this.name === 'updated_at' ?
        '{autoCreate: true, autoUpdate: true}' : ''}${
        this.name === 'created_at' ?
          '{autoCreate: true}' : ''}),
  metadata("design:type", ${this.getColumnTypeForModel()})
], ${this.altrp_model.name}.prototype, "${this.name}", void 0);
`
    }

    return `

decorate([
    (0, Orm.column)(${this.name == 'id' ? '{isPrimary: true}' : ''}),
    metadata("design:type", ${this.getColumnTypeForModel()})
], ${this.altrp_model.name}.prototype, "${this.name}", void 0);
`
  }

  renderForModel():string {
    if(this.type === 'calculated'){
      return `
  //@Orm.computed()
  //public get ${this.name}(): any{
  //  return ''
  //}
`
    }

    if(
      [
        'date',
        'time',
        'year',
        'dateTime',
        'timestamp',
      ].indexOf(this.type) !== -1){
      return `
  @Orm.column.dateTime(${this.name === 'updated_at' ?
        '{autoCreate: true, autoUpdate: true}' : ''}${
        this.name === 'created_at' ?
        '{autoCreate: true}' : ''})
  public ${this.name}: ${this.getColumnTypeForModel()}
`
    }

    return `
  @Orm.column(${this.name == 'id' ? '{isPrimary: true}' : ''})
  public ${this.name}: ${this.getColumnTypeForModel()}
`;
  }

  getColumnTypeForModel():string {
    if(['bigInteger', 'id', 'integer', 'float', ].indexOf(this.type) !== -1){
      return isProd() ? 'Number' : 'number'
    }
    if(
      [
      'json',
      'binary',
      'text',
      'geometry',
      'longText',
      'string'
    ].indexOf(this.type) !== -1){
      return isProd() ? 'String' :'string'
    }
    if(
      [
      'date',
      'time',
      'year',
      'dateTime',
      'timestamp',
    ].indexOf(this.type) !== -1){
      return 'luxon.DateTime'
    }
    if(
      [
      'boolean',
      'tinyint',
    ].indexOf(this.type) !== -1){
      return isProd() ? 'Boolean' : 'boolean'
    }
    return 'any'
  }

  public static createIndexName(columnName, modelName):string {
    return `${columnName}_${modelName}`
  }
}
