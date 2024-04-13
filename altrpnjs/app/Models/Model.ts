import * as _ from 'lodash'
import {string} from '@ioc:Adonis/Core/Helpers'
import {DateTime} from 'luxon'
import {
  afterCreate,
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
  beforeDelete,
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
import LIKE from "../../helpers/const/LIKE";
import mbParseJSON from "../../helpers/mbParseJSON";
import Event from "@ioc:Adonis/Core/Event";
import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";
import exec from "../../helpers/exec";

export default class Model extends BaseModel {
  public static table = 'altrp_models'
  private static defaultCustomizersName: string = 'default';

  @afterFind()
  public static async createController(model: Model) {
    await model.load('altrp_controller')
    if (!model.altrp_controller) {
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

  @column({
    consume: (data) => {
      if (typeof data === 'string') {
        return mbParseJSON(data, {})
      }
      return data || {}
    },
    prepare: (data) => {

      // @ts-ignore
      if (Model.query().client.connection.name === 'mysql') {
        data = JSON.stringify(data)
      }
      return data
    }
  })
  public settings: { static_props?: {}[] }

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
  public user_id: number | null

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
    if (!label) {
      label = this?.table?.columns?.find(c => c.name === 'label')?.name
    }
    if (!label) {
      label = this?.table?.columns?.find(c => c.name === 'title')?.name
    }
    return label || 'id'
  }

  getTitleColumnName() {
    let title = this?.table?.columns?.find(c => c.is_title)?.name
    if (!title) {
      title = this?.table?.columns?.find(c => c.is_label)?.name
    }
    if (!title) {
      title = this?.table?.columns?.find(c => c.name === 'title')?.name
    }
    if (!title) {
      title = this?.table?.columns?.find(c => c.name === 'label')?.name
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
    let sortType: 'asc' | 'desc' = 'orderBy' + (orderType == 'asc' ? '' : orderType)
    let models = Model.query()
    if (categories && _.isString(categories)) {
      // @ts-ignore
      categories = categories.split(',')
      models.leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
      // @ts-ignore
      models.whereIn('altrp_category_objects.category_guid', categories)
    }

    models.where(function (query) {
      query.where('altrp_models.title', LIKE, `%${search}%`)
    }).orderBy(orderColumn, sortType)

    await models.preload('categories').select('altrp_models.*')
    return models
  }

  public async createController() {
    let controller = await Controller.query().where('model_id', this.id).first()
    if (!controller) {
      controller = new Controller()
      controller.fill({
        model_id: this.id,
        description: this.description,
      })
      await controller.save()
    }
    return controller
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

  public static async createDefaultCustomizers(modelData, model) {
    const pathToFiles = 'resources/customizers/'

    let getContent = fs.readFileSync(base_path(`${pathToFiles}get.json`), 'utf8')
    getContent = mustache.render(getContent, {model_name: model.name, context_data: '{{context.data}}'})

    let getByIdContent = fs.readFileSync(base_path(`${pathToFiles}getById.json`), 'utf8')
    getByIdContent = mustache.render(getByIdContent, {model_name: model.name, context_data: '{{context.data}}'})

    let postContent = fs.readFileSync(base_path(`${pathToFiles}post.json`), 'utf8')
    postContent = mustache.render(postContent, {
      model_name: model.name,
      context_data: '{{context.data}}',
      context_order: '{{context.order}}'
    })

    let putContent = fs.readFileSync(base_path(`${pathToFiles}put.json`), 'utf8')
    putContent = mustache.render(putContent, {
      model_name: model.name,
      context_data_data: '{{context.data.data}}',
      context_order: '{{context.order}}',
      context_data: '{{context.data}}'
    })

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
      const newCustomizerName = customizerData.prefix + modelData.name + '_' + Model.defaultCustomizersName
      if (await Customizer.query()
        .where('name', newCustomizerName)
        .first()) {
        continue
      }
      let customizer = new Customizer()
      customizer.fill({
        title: customizerData.prefix + modelData.name,
        name: newCustomizerName,
        type: 'api',
        model_guid: model.guid,
        model_id: model.id,
        guid: guid(),
        data: customizerData.defaultData
      })

      const sources: Source[] = []
      try {
        if (!customizer.settings) {
          // @ts-ignore
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
            'title': customizer.title + ' Robotizer',
            'name': customizer.name,
            'type': 'customizer',
            'auth': true,
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
          sources.push(source)
        }
      } catch (e) {
        console.error(e);
      }

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


  @afterCreate()
  public static async afterCreate(modelData: Model) {

    const table = await Table.firstOrCreate({
      name: string.pluralize(modelData.name),
    })
    table.merge({
      title: modelData.title,
      description: modelData.description,
      user_id: modelData?.user_id,
    })
    await table.save()

    modelData.table_id = table.id
    await modelData.save()

    const id_column = new Column()
    id_column.fill({
      name: 'id',
      title: 'ID',
      description: 'ID',
      null: true,
      type: 'bigInteger',
      table_id: table.id,
      model_id: modelData.id,
      user_id: modelData?.user_id,
    })
    await id_column.save()
    if (modelData.time_stamps) {
      const created_at_column = new Column()
      created_at_column.fill({
        name: 'created_at',
        title: 'created_at',
        description: 'created_at',
        null: true,
        type: 'timestamp',
        table_id: table.id,
        model_id: modelData.id,
        user_id: modelData?.user_id,
      })
      await created_at_column.save()
      const updated_at_column = new Column()
      updated_at_column.fill({
        name: 'updated_at',
        title: 'updated_at',
        description: 'updated_at',
        null: true,
        type: 'timestamp',
        model_id: modelData.id,
        table_id: table.id,
        user_id: modelData?.user_id,
      })
      await updated_at_column.save()
    }
    if (modelData.soft_deletes) {
      const deleted_at_column = new Column()
      deleted_at_column.fill({
        name: 'deleted_at',
        title: 'deleted_at',
        description: 'deleted_at',
        type: 'timestamp',
        null: true,
        model_id: modelData.id,
        table_id: table.id,
        user_id: modelData?.user_id,
      })
      await deleted_at_column.save()
    }
    const controller = new Controller()
    controller.fill({
      model_id: modelData.id,
      description: modelData.description,
    })

    await controller.save()
    await Model.createDefaultCustomizers(modelData, modelData)

    let sources = [
      (new Source()).fill({
        url: `/filters/${table.name}/{column}`,
        api_url: `/filters/${table.name}/{column}`,
        type: `filters`,
        request_type: `get`,
        name: `Filters ${modelData.name}`,
        title: `Filters ${modelData.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: modelData.id,
      }),
      (new Source()).fill({
        url: `/${table.name}/{${modelData.name}}/{column}`,
        api_url: `/${table.name}/{${modelData.name}}/{column}`,
        type: `update_column`,
        request_type: `put`,
        name: `Update column ${modelData.name}`,
        title: `Update column ${modelData.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: modelData.id,
      }),
      (new Source()).fill({
        url: `/${table.name}/{${modelData.name}}`,
        api_url: `/${table.name}/{${modelData.name}}`,
        type: `delete`,
        request_type: `delete`,
        name: `Delete ${modelData.name}`,
        title: `Delete ${modelData.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: modelData.id,
      }),
      (new Source()).fill({
        url: `/${table.name}/{${modelData.name}}`,
        api_url: `/${table.name}/{${modelData.name}}`,
        type: `update`,
        request_type: `put`,
        name: `Update ${modelData.name}`,
        title: `Update ${modelData.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: modelData.id,
      }),
      (new Source()).fill({
        url: `/${table.name}`,
        api_url: `/${table.name}`,
        type: `add`,
        request_type: `post`,
        name: `Add ${modelData.name}`,
        title: `Add ${modelData.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: modelData.id,
      }),
      (new Source()).fill({
        url: `/${table.name}`,
        api_url: `/${table.name}`,
        type: `get`,
        request_type: `get`,
        name: `Get  ${modelData.name}`,
        title: `Get  ${modelData.name}`,
        auth: false,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: modelData.id,
      }),
      (new Source()).fill({
        url: `/${table.name}/{${modelData.name}}`,
        api_url: `/${table.name}/{${modelData.name}}`,
        type: `show`,
        request_type: `get`,
        name: `Show  ${modelData.name}`,
        title: `Show ${modelData.name}`,
        auth: false,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: modelData.id,
      }),
      (new Source()).fill({
        url: `/{${modelData.name}}_options`,
        api_url: `/{${modelData.name}}_options`,
        type: `options`,
        request_type: `get`,
        name: `Get options ${modelData.name}`,
        title: `Get options ${modelData.name}`,
        auth: false,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: modelData.id,
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

    const client = Database.connection(Env.get('DB_CONNECTION'))
    try {

      await client.schema.createTableIfNotExists(table.name, table => {
        table.bigIncrements('id')
        if (modelData.soft_deletes) {
          table.timestamp('deleted_at').nullable().defaultTo(null)
        }
        if (modelData.time_stamps) {
          table.timestamp('updated_at')
          table.timestamp('created_at')
        }
      })
      Event.emit('model:updated', modelData)
      await modelData.generateUUID()
    } catch (e) {
      console.error(e)
      await exec(`node ${base_path('ace')} generator:model --delete --id=${modelData.id}`)
      await modelData.delete()
      await exec(`node ${base_path('ace')} generator:router`)
      await Promise.all(sources.map(s => s.delete()))
      await controller.delete()
      await Column.query().where('table_id', table.id).delete()
      await table.delete()
      await client.schema.dropTableIfExists(table.name)
    }

  }

  @beforeDelete()
  public static async beforeDelete(model: Model) {
    await model.load('table')
    await model.load('altrp_controller')
    const table = model.table
    const controller = model.altrp_controller


    if (controller) {
      const sources = await Source.query().where('controller_id', controller?.id).select('*')
      if (sources[0]) {
        await sources[0].load('roles')

      }
      await Promise.all(sources.map(s => {
        return s.related('roles').detach()
      }))
      await Promise.all(sources.map(s => {
        return s.related('permissions').detach()
      }))
      await Promise.all(sources.map(s => {
        return s.delete()
      }))

    }

    await Customizer.query().where('model_id', model.id).update({
      model_id: null
    })

    // delete relations when dropping table
    const relationship = await Relationship.query().where('model_id', model.id)
    if (relationship) {
      const relations = []

      for (let i in relationship) {
        // @ts-ignore
        relations.push(await Model.find(relationship[i].target_model_id))

        for (let j in relations) {
          if (relationship[i].type != "belongsTo" && relations[j] && relationship[i].add_belong_to) {

            try {
              //@ts-ignore
              await relations[j].load('table')
              //@ts-ignore
              let deleteQuery = `ALTER TABLE ${relations[j].table.name} DROP FOREIGN KEY ${relations[j].table.name}_${relationship[i].foreign_key}_ foreign`
              await Database.rawQuery(deleteQuery)
              //@ts-ignore
              deleteQuery = `ALTER TABLE ${relations[j].table.name} DROP INDEX ${relations[j].table.name}_${relationship[i].foreign_key}_ foreign`
              await Database.rawQuery(deleteQuery)
            } catch (e) {
              console.error(e)
            }
            await Relationship.query()
              .where('model_id', relationship[i].target_model_id)
              .where('target_model_id', relationship[i].model_id)
              .where('foreign_key', relationship[i].local_key)
              .where('local_key', relationship[i].foreign_key)
              .where('type', 'belongsTo')
              .delete()
          }
          try {
            if (relationship[i].type === "belongsTo") {
              let deleteQuery = `ALTER TABLE ${model.table.name}
              DROP
              FOREIGN KEY
              ${model.table.name}
              _
              ${relationship[i].local_key}
              _
              foreign`
              await Database.rawQuery(deleteQuery)
              deleteQuery = `ALTER TABLE ${model.table.name}
              DROP
              INDEX
              ${model.table.name}
              _
              ${relationship[i].foreign_key}
              _
              foreign`
              await Database.rawQuery(deleteQuery)
            }
          } catch (e) {
            console.error(e)
          }

          try {
            await relationship[i].delete()
          } catch (e) {
            console.error(e)

            try {
              await relationship[i].delete()
            } catch (e) {
              console.error(e)
            }
          }

        }

      }
    }

    if (table?.name) {

      const client = Database.connection(Env.get('DB_CONNECTION'))
      await client.schema.dropTable(table.name)
    }
    if (table) {
      await Column.query().where('table_id', table.id).delete()
      await table.delete()
    }
    try {

      await exec(`node ${base_path('ace')} generator:model --delete --id=${model.id}`)
      await exec(`node ${base_path('ace')} generator:router`)
    } catch (e) {
      console.error(e)
    }

    if (controller) {
      await controller.delete()
    }

  }

  static async updateCustomModels() {
    const allModels = await Model.query().preload('table')
    for (const m of allModels) {
      await m.generateUUID()
    }
  }

  async generateUUID() {
    const connection = Env.get('DB_CONNECTION')
    // @ts-ignore
    await this.load('table')
    if(! this.table?.name){
      return
    }
    try {
      let schema = Database.connection().schema
      if (!await schema.hasColumn(this.table.name, 'uuid')) {
        let schema = Database.connection().schema
        if (connection === 'pg'){

          await schema.raw(`ALTER TABLE "${this.table.name}"
            ADD "uuid" uuid NOT NULL DEFAULT gen_random_uuid();
          COMMENT ON TABLE "${this.table.name}" IS '';
          ALTER TABLE "${this.table.name}" ADD CONSTRAINT "${this.table.name}_uuid" UNIQUE ("uuid");
          `)
        } else {
          await schema.raw(`
            ALTER TABLE \`${this.table.name}\` ADD \`uuid\` VARCHAR(36) NOT NULL AFTER \`id\`;
            ALTER TABLE \`${this.table.name}\` ADD UNIQUE(\`uuid\`);
            CREATE TRIGGER before_insert_${this.table.name}
              BEFORE INSERT ON ${this.table.name}
              FOR EACH ROW
              SET new.uuid = uuid();

          `)
        }

        await Column.create({
          description: 'uuid',
          title: 'UUID',
          default: 'uuid',
          name: 'uuid',
          table_id: this.table_id,
          model_id: this.id,
          type: 'uuid',
          unique: true,
          indexed: true,
        })
      }
    } catch (e) {
      console.error(e)
    }
    // @ts-ignore
    await this.load('table', query=>{
      // @ts-ignore
      query.preload('columns')
    })

    if(! this.table.columns.find(c=>c.name === 'uuid')){

      await Column.create({
        description: 'uuid',
        title: 'UUID',
        default: 'uuid',
        name: 'uuid',
        table_id: this.table_id,
        model_id: this.id,
        type: 'uuid',
        unique: true,
        indexed: true,
      })
    }
  }

}
