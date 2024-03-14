import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  afterUpdate,
  afterCreate,
  beforeDelete,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Model from 'App/Models/Model';
import isProd from "../../helpers/isProd";
import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";
import Column from "App/Models/Column";

export default class Relationship extends BaseModel {
  public static table = 'altrp_relationships'

  @column({isPrimary: true})
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

  @beforeDelete()
  public static async beforeDelete(relationship: Relationship) {
    await relationship.dropTable()
    await relationship.dropKeys()
  }


  public async dropTable() {
    const client = Database.connection(Env.get('DB_CONNECTION'))
    try {
      if(this.type === 'manyToMany'){
        await client.schema.dropTableIfExists(await this.getManyToManyTableName())

      }
    } catch (e) {
      console.error(e)
    }

  }



  async dropKeys(){
    // @ts-ignore
    await this.load('altrp_model')
    const model = this.altrp_model
    await model.load('table')
    try{

      let deleteQuery = `ALTER TABLE ${model.table.name} DROP CONSTRAINT ${model.table.name}_${this.local_key}_foreign`
      await Database.rawQuery(deleteQuery)
      // deleteQuery = `ALTER TABLE ${targetModel.table.name} DROP INDEX ${targetModel.table.name}_${this.foreign_key}_foreign`
      // await Database.rawQuery(deleteQuery)
    }catch (e) {
      console.error(e)
    }
  }

  @afterUpdate()
  @afterCreate()
  public static async updateModel(relationship: Relationship) {
    if(! relationship?.target_model_id || ! relationship.model_id){
      return
    }
    await relationship.dropKeys()
    await relationship.load('altrp_model', query => {
      query.preload('table')
    })
    await relationship.load('altrp_target_model', query => {
      query.preload('table')
    })
    relationship.altrp_model.save().catch(e => {
      console.error(e)
    })
    relationship.altrp_target_model.save().catch(e => {
      console.error(e)
    })


    let newTargetModel = await Model.find(relationship.target_model_id)
    const model = relationship.altrp_model
    if (relationship.type === "belongsTo" && newTargetModel) {
      await newTargetModel.load('table')

      try {

        let query = `ALTER TABLE ${model.table.name} ADD CONSTRAINT
            ${model.table.name}_${relationship.local_key}_foreign
            FOREIGN KEY (${relationship.local_key})
            REFERENCES ${newTargetModel.table.name}(${relationship.foreign_key})
            ON DELETE ${relationship.onDelete}
            ON UPDATE ${relationship.onUpdate}`
        await Database.rawQuery(query)
      } catch (e) {
        console.error(e)
      }
    }

    if (this.name && relationship.altrp_target_model.table && relationship.altrp_model.table && relationship.type === 'manyToMany') {
      const client = Database.connection(Env.get('DB_CONNECTION'))
      try {
        const localColumn = await relationship.getPivotLocalColumn()
        const foreignColumn = await  relationship.getPivotForeignColumn()
        if (await client.schema.hasTable(await relationship.getManyToManyTableName())) {

          await client.schema.table(await relationship.getManyToManyTableName(), table => {
            relationship.createPivotLocalKey(table, localColumn)
            relationship.createPivotForeignKey(table, foreignColumn)
          })
        } else {

          await client.schema.createTable(await relationship.getManyToManyTableName(), table => {
            relationship.createPivotLocalKey(table, localColumn)
            relationship.createPivotForeignKey(table, foreignColumn)
          })
        }
      } catch (e) {
        await relationship.delete()
        console.error(e)
      }
    }
  }

  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public altrp_model: BelongsTo<typeof Model>

  @column()
  public target_model_id: number

  @belongsTo(() => Model, {
    localKey: 'id',
    foreignKey: 'target_model_id',
  })
  public altrp_target_model: BelongsTo<typeof Model>

  @column()
  public add_belong_to: boolean

  @column()
  public always_with: boolean

  @column()
  public editable: boolean

  @column({
    columnName: 'onDelete'
  })
  public onDelete: string

  @column({
    columnName: 'onUpdate'
  })
  public onUpdate: string

  @column()
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>


  // @hasMany(() => Source, {
  //   foreignKey: 'id'
  // })
  // public altrp_table: HasMany<typeof Source>

  async renderForModelDev():Promise <string> {
    return `
  ${this.renderDecoratorDev()}(() => ${this.renderRelatedModel()}, ${await this.renderOptions()})
  public ${this.name}: ${this.renderType()}<typeof ${this.renderRelatedModel()}>`
  }

  async renderForModelProd(): Promise<string> {
    return `
decorate([
  (0, ${this.renderType()})(() => ${this.renderRelatedModel()}.default, ${await this.renderOptions()}),
  metadata("design:type", Object)
], ${this.altrp_model?.name}.prototype, "${this.name}", void 0);`
  }

  async renderForModel():Promise <string>  {
    return isProd() ? await this.renderForModelProd() : await this.renderForModelDev()
  }

  private async renderOptions():Promise <string> {
    let options: {
      localKey?: string;
      foreignKey?: string;
      relatedKey?: string;

      pivotTable?: string;
      pivotForeignKey?:  string;
      pivotRelatedForeignKey?:  string;
    } = {}

    if(this.type === 'manyToMany'){
      options.localKey = this.local_key
      options.relatedKey = this.foreign_key
      options.pivotTable = await this.getManyToManyTableName()
      const localColumn = await this.getPivotLocalColumn()
      const foreignColumn = await this.getPivotForeignColumn()
      options.pivotForeignKey = this.getPivotLocalKeyName(localColumn)
      options.pivotRelatedForeignKey = this.getPivotForeignKeyName(foreignColumn)
    } else {

      if (this.foreign_key) {
        if (this.type !== 'belongsTo') {
          options.foreignKey = this.foreign_key
        } else {
          options.localKey = this.foreign_key
        }
      }
      if (this.local_key) {
        if (this.type !== 'belongsTo') {
          options.localKey = this.local_key
        } else {
          options.foreignKey = this.local_key
        }
      }
    }
    return JSON.stringify(options)
  }

  private renderDecoratorDev() {
    switch (this.type) {
      case 'hasOne': {
        return '@Orm.hasOne'
      }
      case 'belongsTo': {
        return '@Orm.belongsTo'
      }
      case 'hasMany': {
        return '@Orm.hasMany'
      }
      case 'manyToMany': {
        return '@Orm.manyToMany'
      }
      default: {
        return '@Orm.hasOne'
      }
    }
  }

  private renderType() {
    switch (this.type) {
      case 'hasOne': {
        return isProd() ? 'Orm.hasOne' : 'Orm.HasOne'
      }
      case 'belongsTo': {
        return isProd() ? 'Orm.belongsTo' : 'Orm.BelongsTo'
      }
      case 'hasMany': {
        return isProd() ? 'Orm.hasMany' : 'Orm.HasMany'
      }
      case 'manyToMany': {
        return isProd() ? 'Orm.manyToMany' : 'Orm.ManyToMany'
      }
      default: {
        return isProd() ? 'Orm.hasOne' : 'Orm.HasOne'
      }
    }

  }

  private renderRelatedModel(): string {
    return this?.altrp_target_model?.name || ''
  }

  async getManyToManyTableName() {

    // @ts-ignore
    await this.load('altrp_model', query => {
      // @ts-ignore
      query.preload('table')
    })
    // @ts-ignore
    await this.load('altrp_target_model', query => {
      // @ts-ignore
      query.preload('table')
    })
    return `${this.name}_${this.altrp_model.table.name}_${this.altrp_target_model.table.name}`;
  }

  createPivotLocalKey(table, column) {


    let query = table[column.type](this.getPivotLocalKeyName(column))

    if (column.name === 'id' || column.attribute === 'unsigned') {
      query = query.unsigned()
    }
    query = query.references(column.name)
    query = query.inTable(this.altrp_model.table.name)
    query = query.onDelete('cascade')
    query.onUpdate('cascade')

  }

  async getPivotLocalColumn(): Promise<Column | undefined> {
    // @ts-ignore
    await this.load('altrp_model', query => {
      // @ts-ignore
      query.preload('table', query => {
        // @ts-ignore
        query.preload('columns')
      })
    })
    const column = this.altrp_model.table.columns.find(c => c.name === this.local_key)
    return column
  }

  async getPivotForeignColumn(): Promise<Column | undefined> {

    // @ts-ignore
    await this.load('altrp_target_model', query => {
      // @ts-ignore
      query.preload('table', query => {
        // @ts-ignore
        query.preload('columns')
      })
    })
    const column = this.altrp_target_model.table.columns.find(c => c.name === this.foreign_key)
    return column
  }

  getPivotLocalKeyName(column) {
    if (!column) {
      return ''
    }
    return `${this.altrp_model.table.name}_${column.name}`
  }

  getPivotForeignKeyName(column) {
    if (!column) {
      return ''
    }
    return `${this.altrp_target_model.table.name}_${column.name}`
  }

  createPivotForeignKey(table, column) {

    let query = table[column.type](this.getPivotForeignKeyName(column))

    if (column.name === 'id' || column.attribute === 'unsigned') {
      query = query.unsigned()
    }
    query = query.references(column.name)
    query = query.inTable(this.altrp_target_model.table.name)
    query = query.onDelete('cascade')
    query.onUpdate('cascade')
  }
}
