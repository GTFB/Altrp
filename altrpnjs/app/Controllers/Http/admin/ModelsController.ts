import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Model from "App/Models/Model";
import Source from "App/Models/Source";
import Accessors from "App/Models/Accessor";
import empty from "../../../../helpers/empty";
import CategoryObject from "App/Models/CategoryObject";
import uuid from "../../../../helpers/uuid";
import { schema} from "@ioc:Adonis/Core/Validator";


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
    title: schema.string({trim: true}, ),
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
    await model.save()
    modelData = await model.serialize()
    await CategoryObject.query().where('object_guid', modelData.guid).delete()

    if(! empty(request.all().categories)){
      await Promise.all(request.all().categories.map(async c=>{
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
    return response.json({success:true, data:modelData})
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
    m.categories = m.categories.map(c=>{
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
      .preload('model', modelsQuery => {
        modelsQuery.preload('table')
      })
    return response.json(sources.map(source=>{
      return {
        value: source.id,
        label: source.title,
        web_url: source.web_url,

      }
    }))
  }

  async getAccessors({params, response}: HttpContextContract){
    let accessors = await Accessors.query().where('model_id', params.id).select()
    return response.json(accessors)
  }
  async storeModel({request, response}: HttpContextContract){
    let modelData = request.all()
    let model = new Model()
    model.fill(modelData)
    model.guid = uuid()
    await model.save()
    if(! empty(modelData.categories)){
      await Promise.all(modelData.categories.map(async c=>{
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
  async deleteModel({params, response}: HttpContextContract){

    let model = await Model.find(params.id)

    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })
    }
    await model.delete()
    return response.json({success:true})
  }

}
