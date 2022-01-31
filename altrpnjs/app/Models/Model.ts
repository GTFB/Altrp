import * as _ from 'lodash'
import {string} from '@ioc:Adonis/Core/Helpers'
import {DateTime} from 'luxon'
import {

  afterFind,
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
import User from 'App/Models/User'
import Source from 'App/Models/Source'
import Controller from "App/Models/Controller"
import Relationship from "App/Models/Relationship"
import Category from "App/Models/Category"
import Table from './Table'
import Column from "App/Models/Column"


export default class Model extends BaseModel {
  public static table = 'altrp_models'

  @afterFind()
  public static async createController(model:Model) {
    await model.load('altrp_controller')
    if(! model.altrp_controller){
      const controller = new Controller()
      controller.fill({
        model_id: model.id,
        description: model.description,
      })
      await controller.save()
    }
  }

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

  @belongsTo(() => Table, {
    foreignKey: "table_id"
  })
  public altrp_table: BelongsTo<typeof Table>

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

  @hasOne(() => Controller, {
    foreignKey: 'model_id',

  })
  public altrp_controller: HasOne<typeof Controller>

  @hasMany(() => Relationship, {
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

  getLabelColumnName() {
    let label = this?.table?.columns.find(c => c.is_label)?.name
    if (!label) {
      label = this?.table?.columns.find(c => c.is_title)?.name
    }
    return label || 'id'
  }

  getTitleColumnName() {
    let title = this?.table?.columns.find(c => c.is_title)?.name
    if (!title) {
      title = this?.table?.columns.find(c => c.is_label)?.name
    }
    return title || 'id'
  }

  getIndexedColumns(): Column[] {
    return this?.table?.columns.filter(c => c.indexed) || []
  }

  public static async getModelsOptions(with_names = false, not_plural = false, search = false) {
    let models: any[] = []
    let _models = search ? await Model.getBySearch(search) : await Model.all()
    for (let model of _models) {
      /**
       * @var {Model} model
       */
      if (with_names) {
        models.push({
          'label': model.title,
          'value': not_plural ? model.name : string.pluralize(model.name),
        })
      } else {
        models.push({
          'label': model.title,
          'value': model.id,
        })
      }
    }
    return models
  }

  public static async getBySearch(search, orderColumn = 'title', orderType = 'desc', categories = null) {
    // @ts-ignore
    let sortType:'asc' | 'desc' = 'orderBy' + (orderType == 'asc' ? '' : orderType)
    let models = Model.query()
    if (categories && _.isString(categories)) {
      // @ts-ignore
      categories = categories.split(',')
      models.leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
      // @ts-ignore
      models.whereIn('altrp_category_objects.category_guid', categories)
    }

    models.where(function (query) {
      query.where('altrp_models.title', 'like', `%${search}%`)
        .orWhere('altrp_models.id', 'like', `%${search}%`)
    }).orderBy(orderColumn, sortType)

    await models.preload('categories').select('altrp_models.*')
    return models
  }
}
