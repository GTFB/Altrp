import {afterCreate, afterUpdate, BaseModel, BelongsTo, belongsTo, column,} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Model from "App/Models/Model";
import Table from "App/Models/Table";
import isProd from "../../helpers/isProd";
import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";
import {DateTime} from "luxon";
import Event from "@ioc:Adonis/Core/Event";


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
  public user_id: number | null

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

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

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
    (0, Orm.column)(${this.name == 'id' ? '{isPrimary: true}' : `{${this.renderProdPrepare()}}`}),
    metadata("design:type", ${this.getColumnTypeForModel()})
], ${this.altrp_model.name}.prototype, "${this.name}", void 0);
`
  }

  renderProdPrepare(){
    if(this.type === 'json'){
      return `prepare: (data) => {
            return data ? JSON.stringify(data) : null;
        },
        `
    }
    return ''
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
      'json',
    ].indexOf(this.type) !== -1){
      return 'Object'
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
    return 'String'
  }

  public static createIndexName(columnName, modelName):string {
    return `${columnName}_${modelName}`
  }

  @afterCreate()
  public static async afterCreate(columnData: Column){
    const _ignore = ['id', 'uuid', 'updated_at', 'deleted_at', 'created_at']
    if(_ignore.includes(columnData.name)){
      return
    }
    try{

      if(columnData.type !== 'calculated'){
        await columnData.load('altrp_model', query=>{
          query.preload('table')
        })
        const model = columnData.altrp_model
        const client = Database.connection(Env.get('DB_CONNECTION'))

        await client.schema.table(model.table.name,table=>{

          let type = columnData.type
          let size: string | number = columnData.size

          if(type.toLowerCase() === 'longtext'){
            type = 'text'
            size = 'longtext'
          }
          let query = table[type](columnData.name, size)
          if(columnData.type === 'bigInteger' &&  columnData.attribute === 'unsigned'){
            query.unsigned()
          }
          if(columnData.default){
            query.default(columnData.default)
          }
          if(columnData.unique){
            query.unique()
            query.notNullable()
          }
        })

        model.updatedAt = DateTime.now()
        await model.save()

        Event.emit('model:updated', model)
        await columnData.indexCreator(  model, true)

      }
    } catch (e) {
      console.error(e)
      const client = Database.connection(Env.get('DB_CONNECTION'))
      const model = columnData.altrp_model

      if(! await client.schema.hasColumn(model.table?.name, columnData.name)){
        await columnData.delete()

      }
    }
  }

  @afterUpdate()
  public static async afterUpdate(columnData: Column){
    if(columnData.type !== 'calculated') {
      await columnData.load('altrp_model', query => {
        query.preload('table')
      })
      const model = columnData.altrp_model
      await columnData.indexCreator(model)
    }
  }

  async indexCreator( model, newColumn = false) {
    const indexName = Column.createIndexName(this.name, model.table.name)
    try {

      if( this.unique ) {
        let indexQuery = `ALTER TABLE "${model.table.name}"
        ADD CONSTRAINT "${indexName}" UNIQUE ("${this.name}");`
        await Database.rawQuery(indexQuery)
      } else  if(this.indexed) {
        let indexQuery = `CREATE INDEX ${indexName} ON ${model.table.name}(${this.name})`
        await Database.rawQuery(indexQuery)
      } else if(! newColumn){
          let indexQuery = `ALTER TABLE ${model.table.name} DROP CONSTRAINT "${indexName}"`
          await Database.rawQuery(indexQuery)

      }
    }catch (e) {
      console.error(e)
    }
  }
}
