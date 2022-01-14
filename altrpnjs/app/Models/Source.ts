import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, computed,} from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Models/Model';
import Controller from 'App/Models/Controller';
import config from "../../helpers/config";
import { string } from '@ioc:Adonis/Core/Helpers'
import data_get from "../../helpers/data_get";

export default class Source extends BaseModel {
  public static table = 'altrp_sources'

  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public api_url: string

  @column()
  public type: string

  @column()
  public request_type: string

  @column()
  public name : string

  @column()
  public title: string

  @column()
  public auth: boolean

  @column()
  public model_id: number

  @column()
  public sourceable_id: number

  @column()
  public controller_id: number

  @column()
  public headers: string

  @column()
  public description: string

  @column()
  public sourceable_type: string

  @column()
  public bodies: string

  @column()
  public need_all_roles: boolean


  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public model: BelongsTo<typeof Model>

  @computed()
  public get web_url(){
    // console.log(data_get( this, 'url' ), this.url);
    switch ( this.sourceable_type ){
      case 'App\\SQLEditor':
      case 'App\\Altrp\\Query':
        return config('app.url') + '/ajax/models/queries' + data_get( this, 'url' );
      case 'App\\Altrp\\Customizer':
        return config('app.url') + '/ajax/models/' + string.pluralize(this.model.name) + '/customizers' + data_get( this, 'url' );
      default:
        return this.type != 'remote'
          ? config('app.url') + '/ajax/models' + data_get( this, 'url' )
      : config('app.url') + '/ajax/models/data_sources/' + this.model.table.name + '/' + data_get( this, 'name' );
    }
  }

  @belongsTo(() => Controller, {
    foreignKey: 'controller_id'
  })
  public controller: BelongsTo<typeof Controller>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public last_upgrade: DateTime

}
