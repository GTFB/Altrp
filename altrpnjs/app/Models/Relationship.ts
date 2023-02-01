import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany,} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Source from 'App/Models/Source';
import Model from 'App/Models/Model';
import isProd from "../../helpers/isProd";


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
  public  	onDelete: string

  @column({
    columnName: 'onUpdate'
  })
  public  	onUpdate: string

  @column()
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>


  @hasMany(() => Source, {
    foreignKey: 'id'
  })
  public altrp_table: HasMany<typeof Source>

  renderForModelDev():string {
    return `
  ${this.renderDecoratorDev()}(() => ${this.renderRelatedModel()}, ${this.renderOptions()})
  public ${this.name}: ${this.renderType()}<typeof ${this.renderRelatedModel()}>`
  }

  renderForModelProd():string {
    return `
decorate([
  (0, ${this.renderType()})(() => ${this.renderRelatedModel()}.default, ${this.renderOptions()}),
  metadata("design:type", Object)
], ${this.altrp_model?.name}.prototype, "${this.name}", void 0);`
  }

  renderForModel():string {
    return isProd() ? this.renderForModelProd() : this.renderForModelDev()
  }

  private renderOptions():string {
    let options:{
      localKey?: string;
      foreignKey?: string;
    } = {

    }

    if(this.foreign_key){
      if(this.type !== 'belongsTo'){
        options.foreignKey = this.foreign_key
      } else {
        options.localKey = this.foreign_key
      }
    }
    if(this.local_key){
      if(this.type !== 'belongsTo'){
        options.localKey = this.local_key
      } else {
        options.foreignKey = this.local_key
      }
    }
    return JSON.stringify(options)
  }

  private renderDecoratorDev() {
    switch (this.type){
      case 'hasOne':{
        return '@Orm.hasOne'
      }
      case 'belongsTo':{
        return '@Orm.belongsTo'
      }
      case 'hasMany':{
        return '@Orm.hasMany'
      }
      default:{
        return '@Orm.hasOne'
      }
    }
  }

  private renderType() {
    switch (this.type){
      case 'hasOne':{
        return isProd() ? 'Orm.hasOne':'Orm.HasOne'
      }
      case 'belongsTo':{
        return isProd() ? 'Orm.belongsTo':'Orm.BelongsTo'
      }
      case 'hasMany':{
        return isProd() ? 'Orm.hasMany':'Orm.HasMany'
      }
      default:{
        return isProd() ? 'Orm.hasOne':'Orm.HasOne'
      }
    }

  }

  private renderRelatedModel():string {
    return this?.altrp_target_model?.name || ''
  }
}
