import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Model from "App/Models/Model";
import Source from "App/Models/Source";
import Accessors from "App/Models/Accessor";
import empty from "../../../../helpers/empty";
import CategoryObject from "App/Models/CategoryObject";
import uuid from "../../../../helpers/uuid";
import {schema} from "@ioc:Adonis/Core/Validator";
import Event from '@ioc:Adonis/Core/Event'
import Column from "App/Models/Column";
import Relationship from "App/Models/Relationship";
import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";
import { string } from '@ioc:Adonis/Core/Helpers'
import Table from "App/Models/Table";
import Controller from "App/Models/Controller";
import ModelGenerator from "App/Generators/ModelGenerator";
import Role from "App/Models/Role";
import SourceRole from "App/Models/SourceRole";

export default class ModelsController {
  async index({response, request}: HttpContextContract) {
    let query = Model.query()
    if (request.qs().categories) {
      let categoriesQuery = request.qs().categories.split(",")
      query = query.leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_models.guid')
        .whereIn('altrp_category_objects.category_guid', categoriesQuery)
    }

    if (request.qs().s) {
      let searches = request.qs().s.split(' ')
      query = query.where(subQuery => {
        for (let s of searches) {
          if (!s.trim()) {
            continue
          }
          subQuery.where(subSubQuery => {
            return subSubQuery.orWhere('title', 'like', `%${s}%`)
              .orWhere('name', 'like', `%${s}%`)
              .orWhere('description', 'like', `%${s}%`)
          })
        }
        return subQuery
      })
    }
    let sql = query.toSQL().sql
    let models: any[] = await query
      .orderBy('title',)
      .select('altrp_models.*')
      .preload('categories')
    models = models.map(model => {
      return model.serialize()
    })
    return response.json({
      models,
      pageCount: 0,
      sql
    })
  }

  static modelSchema = schema.create({
    title: schema.string({trim: true},),
  })

  async updateModel({response, params, request}: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    let modelData = request.all()
    model.merge({
      description: modelData.description || '',
      title: modelData.title || '',
      soft_deletes: modelData.soft_deletes,
      time_stamps: modelData.time_stamps,
      parent_model_id: modelData.parent_model_id || null,
    })
    Event.emit('model:updating', model)
    await model.save()
    Event.emit('model:updated', model)
    modelData = await model.serialize()
    await CategoryObject.query().where('object_guid', modelData.guid).delete()

    if (!empty(request.all().categories)) {
      await Promise.all(request.all().categories.map(async c => {
        let newCatObj = new CategoryObject()
        // @ts-ignore
        newCatObj.fill(
          {
            category_guid: c.value,
            // @ts-ignore
            object_guid: model.guid,
            object_type: 'Model'
          }
        )
        return await newCatObj.save()
      }))
    }
    return response.json({success: true, data: modelData})
  }

  async getModel({response, params}: HttpContextContract) {

    let model = await Model.find(params.id)

    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    await model.load('categories')

    let m = model.serialize()
    m.categories = m.categories.map(c => {
      return {
        value: c.guid,
        label: c.title,
      }
    })
    return response.json(m)
  }

  async getModelFields({response, params}: HttpContextContract) {

    const model = await Model.query().where('id', params.id)
      .preload('table', query => {
        // @ts-ignore
        query.preload('columns')
      })
      .first()
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }

    return response.json(model?.table?.columns || [])
  }

  async getModelRelations({response, params}: HttpContextContract) {

    const model = await Model.query().where('id', params.id)
      .preload('altrp_relationships')
      .first()
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }

    return response.json(model?.altrp_relationships || [])
  }

  async options({response,}) {
    let models = await Model.query().orderBy('title').select('*')

    return response.json({options: models.map(model => ({label: model.title, value: model.id}))})
  }

  async checkRelationName({response, request, params}: HttpContextContract) {

    let model = await Model.find(params.id)

    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    return response.json(
      {
        taken: ! await Relationship.query().where({
          model_id: model.id,
          name: request.qs().name || ''
        }).first()
      })
  }

  async modelNameIsFree({response, request}: HttpContextContract){

    return response.json(
      {
        taken: ! await Model.query().where({
          name: request.qs().name || ''
        }).first()
      })
  }

  async getDataSourcesOptionsByModel({response, params}: HttpContextContract) {

    let model = await Model.find(params.id)

    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    const sources = await Source.query().where('model_id', params.id)
      .preload('altrp_model', modelsQuery => {
        modelsQuery.preload('table')
      })
    return response.json(sources.map(source => {
      return {
        value: source.id,
        label: source.title,
        web_url: source.web_url,

      }
    }))
  }

  async getAccessors({params, response}: HttpContextContract) {
    let accessors = await Accessors.query().where('model_id', params.id).select()
    return response.json(accessors)
  }

  async storeModel({request, response, auth}: HttpContextContract) {
    let modelData = request.all()
    let model = new Model()
    const table = new Table()
    table.fill({
      name: string.pluralize(modelData.name),
      title: modelData.title,
      description: modelData.description,
      user_id: auth?.user?.id,
    })
    await table.save()
    model.fill({
      description: modelData.description || '',
      title: modelData.title || '',
      name: modelData.name || '',
      soft_deletes: modelData.soft_deletes,
      guid: uuid(),
      time_stamps: modelData.time_stamps,
      parent_model_id: modelData.parent_model_id || null,
      table_id: table.id,
    })
    await model.save()
    if(modelData.time_stamps){
      const created_at_column = new Column()
      created_at_column.fill({
        name: 'created_at',
        title: 'created_at',
        description: 'created_at',
        type : 'timestamp',
        table_id : table.id,
        user_id: auth?.user?.id,
      })
      await created_at_column.save()
      const updated_at_column = new Column()
      updated_at_column.fill({
        name: 'updated_at',
        title: 'updated_at',
        description: 'updated_at',
        type : 'timestamp',
        table_id : table.id,
        user_id: auth?.user?.id,
      })
      await updated_at_column.save()
    }
    if(modelData.soft_deletes){
      const deleted_at_column = new Column()
      deleted_at_column.fill({
        name: 'deleted_at',
        title: 'deleted_at',
        description: 'deleted_at',
        type : 'timestamp',
        table_id : table.id,
        user_id: auth?.user?.id,
      })
      await deleted_at_column.save()
    }
    const controller = new Controller()
    controller.fill({
      model_id:model.id,
      description:model.description,
    })

    await controller.save()

    let sources = [
      (new Source()).fill({
        url: `/filters/${table.name}/{column}`,
        api_url: `/filters/${table.name}/{column}`,
        type: `filters`,
        request_type: `get`,
        name: `Filters ${model.name}`,
        title: `Filters ${model.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: model.id,
      }),
      (new Source()).fill({
        url: `/${table.name}/{${model.name}}/{column}`,
        api_url: `/${table.name}/{${model.name}}/{column}`,
        type: `update_column`,
        request_type: `put`,
        name: `Update column ${model.name}`,
        title: `Update column ${model.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: model.id,
      }),
      (new Source()).fill({
        url: `/${table.name}/{${model.name}}`,
        api_url: `/${table.name}/{${model.name}}`,
        type: `delete`,
        request_type: `delete`,
        name: `Delete ${model.name}`,
        title: `Delete ${model.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: model.id,
      }),
      (new Source()).fill({
        url: `/${table.name}/{${model.name}}`,
        api_url: `/${table.name}/{${model.name}}`,
        type: `update`,
        request_type: `put`,
        name: `Update ${model.name}`,
        title: `Update ${model.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: model.id,
      }),
      (new Source()).fill({
        url: `/${table.name}`,
        api_url: `/${table.name}`,
        type: `add`,
        request_type: `post`,
        name: `Add ${model.name}`,
        title: `Add ${model.name}`,
        auth: true,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: model.id,
      }),
      (new Source()).fill({
        url: `/${table.name}`,
        api_url: `/${table.name}`,
        type: `get`,
        request_type: `get`,
        name: `Get  ${model.name}`,
        title: `Get  ${model.name}`,
        auth: false,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: model.id,
      }),
      (new Source()).fill({
        url: `/${table.name}/{${model.name}}`,
        api_url: `/${table.name}/{${model.name}}`,
        type: `show`,
        request_type: `get`,
        name: `Show  ${model.name}`,
        title: `Show ${model.name}`,
        auth: false,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: model.id,
      }),
      (new Source()).fill({
        url: `/{${model.name}}_options`,
        api_url: `/{${model.name}}_options`,
        type: `options`,
        request_type: `get`,
        name: `Get options ${model.name}`,
        title: `Get options ${model.name}`,
        auth: false,
        need_all_roles: false,
        controller_id: controller.id,
        model_id: model.id,
      }),
    ];

    await Promise.all(sources.map(s=>s.save()))

    const adminRole = await Role.query().where('name', 'admin').first()

    if(adminRole){
      await Promise.all(sources.map(s=> {
        return (new SourceRole()).fill({
          role_id: adminRole.id,
          source_id: s.id,
        }).save()
      }))
    }

    Event.emit('model:updated', model)
    const client = Database.connection(Env.get('DB_CONNECTION'))
    try {

      await client.schema.createTableIfNotExists(table.name, table=>{
        table.bigIncrements('id')
        if(modelData.soft_deletes) {
          table.timestamp('deleted_at')
        }
        if(modelData.time_stamps) {
          table.timestamp('updated_at')
          table.timestamp('created_at')
        }
      })
    }catch (e){
      await (new ModelGenerator).deleteFiles(model)
      await model.delete()
      await Promise.all(sources.map(s=>s.delete()))
      await controller.delete()
      await Column.query().where('table_id', table.id).delete()
      await table.delete()
      await client.schema.dropTableIfExists(table.name)
      response.status(500)
      return response.json({success:false, trace: e?.stack.split('\n')})
    }

    if (!empty(modelData.categories)) {
      await Promise.all(modelData.categories.map(async c => {
        let newCatObj = new CategoryObject()
        newCatObj.fill(
          {
            category_guid: c.value,
            object_guid: model.guid,
            object_type: 'Model'
          }
        )
        return await newCatObj.save()
      }))
    }
    await model.load('categories')


    return response.json(model)

  }

  async deleteModel({params, response}: HttpContextContract) {

    let model = await Model.find(params.id)

    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })
    }
    const table = await Table.find(model.table_id)
    const controller = await Controller.query().where('model_id', model.id).first()
    if(controller){
      const sources = await Source.query().where('controller_id', controller?.id).select('*')
      if(
        sources[0]      ){
        await sources[0].load('roles');

      }
      await Promise.all(sources.map(s=>{
        return s.related('roles').detach()
      }))
      await Promise.all(sources.map(s=>{
        return s.related('permissions').detach()
      }))
      await Promise.all(sources.map(s=>{
        return s.delete()
      }))

      await controller.delete()
    }
    await (new ModelGenerator).deleteFiles(model)


    if(table){
      await Column.query().where('table_id', table.id).delete()
      await model.delete()
      await table.delete()
    } else {
      await model.delete()
    }

    return response.json({success: true})
  }

  async getModelFieldOptions({params, response}) {
    let model = await Model.find(params.id)

    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })
    }

    await model.load('table', table => {
      table.preload('columns')
    })
    return response.json({options: model?.table.columns.map(c => ({value: c.id, label: c.title})) || []})
  }
}
