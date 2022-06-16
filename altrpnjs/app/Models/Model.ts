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
import SourceRole from 'App/Models/SourceRole'
import Role from 'App/Models/Role'
import Customizer from "App/Models/Customizer";
import guid from "../../helpers/guid";
// import Timer from "App/Services/Timers";
import * as mustache from 'mustache'
import base_path from "../../helpers/path/base_path";
import fs from "fs";

export default class Model extends BaseModel {
  public static table = 'altrp_models'
  private static defaultCustomizersName: string = 'default';

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
    foreignKey: "user_id"
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
    let label = this?.table?.columns?.find(c => {
      return c.is_label
    })?.name
    if (!label) {
      label = this?.table?.columns?.find(c => c.is_title)?.name
    }
    return label || 'id'
  }

  getTitleColumnName() {
    let title = this?.table?.columns?.find(c => c.is_title)?.name
    if (!title) {
      title = this?.table?.columns?.find(c => c.is_label)?.name
    }
    return title || 'id'
  }

  getIndexedColumns(): Column[] {
    return this?.table?.columns?.filter(c => c.indexed) || []
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
    }).orderBy(orderColumn, sortType)

    await models.preload('categories').select('altrp_models.*')
    return models
  }

  public async createController() {
    const controller = new Controller()
    controller.fill({
      model_id: this.id,
      description: this.description,
    })
    return await controller.save()
  }

  public async createStandartSources() {

    const table = await Table.find(this.table_id)
    const controller = await this.createController()

    if (table && controller) {
      let sources = [
        (new Source()).fill({
          url: `/filters/${table.name}/{column}`,
          api_url: `/filters/${table.name}/{column}`,
          type: `filters`,
          request_type: `get`,
          name: `Filters ${this.name}`,
          title: `Filters ${this.name}`,
          auth: true,
          need_all_roles: false,
          controller_id: controller.id,
          model_id: this.id,
        }),
        (new Source()).fill({
          url: `/${table.name}/{${this.name}}/{column}`,
          api_url: `/${table.name}/{${this.name}}/{column}`,
          type: `update_column`,
          request_type: `put`,
          name: `Update column ${this.name}`,
          title: `Update column ${this.name}`,
          auth: true,
          need_all_roles: false,
          controller_id: controller.id,
          model_id: this.id,
        }),
        (new Source()).fill({
          url: `/${table.name}/{${this.name}}`,
          api_url: `/${table.name}/{${this.name}}`,
          type: `delete`,
          request_type: `delete`,
          name: `Delete ${this.name}`,
          title: `Delete ${this.name}`,
          auth: true,
          need_all_roles: false,
          controller_id: controller.id,
          model_id: this.id,
        }),
        (new Source()).fill({
          url: `/${table.name}/{${this.name}}`,
          api_url: `/${table.name}/{${this.name}}`,
          type: `update`,
          request_type: `put`,
          name: `Update ${this.name}`,
          title: `Update ${this.name}`,
          auth: true,
          need_all_roles: false,
          controller_id: controller.id,
          model_id: this.id,
        }),
        (new Source()).fill({
          url: `/${table.name}`,
          api_url: `/${table.name}`,
          type: `add`,
          request_type: `post`,
          name: `Add ${this.name}`,
          title: `Add ${this.name}`,
          auth: true,
          need_all_roles: false,
          controller_id: controller.id,
          model_id: this.id,
        }),
        (new Source()).fill({
          url: `/${table.name}`,
          api_url: `/${table.name}`,
          type: `get`,
          request_type: `get`,
          name: `Get  ${this.name}`,
          title: `Get  ${this.name}`,
          auth: false,
          need_all_roles: false,
          controller_id: controller.id,
          model_id: this.id,
        }),
        (new Source()).fill({
          url: `/${table.name}/{${this.name}}`,
          api_url: `/${table.name}/{${this.name}}`,
          type: `show`,
          request_type: `get`,
          name: `Show  ${this.name}`,
          title: `Show ${this.name}`,
          auth: false,
          need_all_roles: false,
          controller_id: controller.id,
          model_id: this.id,
        }),
        (new Source()).fill({
          url: `/{${this.name}}_options`,
          api_url: `/{${this.name}}_options`,
          type: `options`,
          request_type: `get`,
          name: `Get options ${this.name}`,
          title: `Get options ${this.name}`,
          auth: false,
          need_all_roles: false,
          controller_id: controller.id,
          model_id: this.id,
        }),
      ]

      await Promise.all(sources.map(s => s.save()))

      const adminRole = await Role.query().where('name', 'admin').first()

      if (adminRole) {
        await Promise.all(sources.map(s => {
          return (new SourceRole()).fill({
            role_id: adminRole.id,
            source_id: s.id,
          }).save()
        }))
      }
    }
  }

  public static async createDefaultCustomizers( modelData, model) {
    const pathToFiles = 'resources/customizers/'

    let getContent = fs.readFileSync(base_path(`${pathToFiles}get.json`), 'utf8')
    getContent = mustache.render(getContent, {model_name: model.name, context_data: '{{context.data}}'})

    let getByIdContent = fs.readFileSync(base_path(`${pathToFiles}getById.json`), 'utf8')
    getByIdContent = mustache.render(getByIdContent, {model_name: model.name, context_data: '{{context.data}}'})

    let postContent = fs.readFileSync(base_path(`${pathToFiles}post.json`), 'utf8')
    postContent = mustache.render(postContent, {model_name: model.name, context_data: '{{context.data}}', context_order: '{{context.order}}'})

    let putContent = fs.readFileSync(base_path(`${pathToFiles}put.json`), 'utf8')
    putContent = mustache.render(putContent, {model_name: model.name, context_data_data: '{{context.data.data}}', context_order: '{{context.order}}', context_data: '{{context.data}}'})

    let deleteContent = fs.readFileSync(base_path(`${pathToFiles}delete.json`), 'utf8')
    deleteContent = mustache.render(deleteContent, {model_name: model.name, context_data: '{{context.data}}'})

    const defaultCustomizersData = [
      {
        prefix: 'get_',
        defaultData: JSON.parse(getContent),
        customizerRequestType: 'get'
      },
      {
        prefix: 'get_by_id_',
        defaultData: JSON.parse(getByIdContent),
        customizerRequestType: 'get'
      },
      {
        prefix: 'post_',
        defaultData: JSON.parse(postContent),
        customizerRequestType: 'post'
      },
      {
        prefix: 'put_',
        defaultData: JSON.parse(putContent),
        customizerRequestType: 'put'
      },
      {
        prefix: 'delete_',
        defaultData: JSON.parse(deleteContent),
        customizerRequestType: 'delete'
      },
    ]

    for (let customizerData of defaultCustomizersData) {

      let customizer = new Customizer()
      customizer.fill({
        title: customizerData.prefix + modelData.name,
        name: customizerData.prefix + Model.defaultCustomizersName,
        type: 'api',
        model_guid: model.guid,
        model_id: model.id,
        guid: guid(),
        data: customizerData.defaultData
      })

      try {
        if (!customizer.settings) {
          customizer.settings = []
        }
        await customizer.save()

        if (model) {
          let source = new Source();
          await model.load('altrp_controller')

          source.fill({
            'sourceable_type': Customizer.sourceable_type,
            'sourceable_id': customizer.id,
            'model_id': customizer.model_id,
            'controller_id': model.altrp_controller.id,
            'url': "/" + customizer.name,
            'api_url': "/" + customizer.name,
            'title': customizer.title,
            'name': customizer.name,
            'type': 'customizer',
            'request_type': customizerData.customizerRequestType
          })

          customizer = await Customizer.query().preload("altrp_model").firstOrFail()

          if (customizer?.settings?.time && customizer?.settings?.time_type) {
            // new Timer(customizer.name, {
            //   time: customizer.settings.time,
            //   type: customizer.settings.time_type
            // }, customizer)
          }
          await source.save()
        }
      } catch (e) {
        console.error(e);
      }


    }
  }

}
