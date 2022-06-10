import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import SQLEditor from "App/Models/SQLEditor"
import Database from "@ioc:Adonis/Lucid/Database";
import { schema} from "@ioc:Adonis/Core/Validator";
import Source from "App/Models/Source";
import Model from "App/Models/Model";
import {string} from "@ioc:Adonis/Core/Helpers";
import Event from "@ioc:Adonis/Core/Event";
import {parseInt} from "lodash"

export default class SQLEditorController {
  public async index({request, response}: HttpContextContract) {
     const params = request.qs()
     const page = parseInt(params.page) || 1
     const pageSize = parseInt(params.pageSize) || 20
     const searchWord = params.s
     let sQLEditors

     const orderColumn = params.order_by || 'title'
     const orderType = params.order ? params.order : 'Asc'
    //@ts-ignore
     const sortType: 'asc' | 'desc' = orderType === 'Asc' ? 'Asc' : orderType
     if (searchWord) {
       sQLEditors =  await SQLEditor.query()
         .orWhere('title', 'like', `%${searchWord}%`)
         .orWhere('name', 'like', `%${searchWord}%`)
         .orWhere('description', 'like', `%${searchWord}%`)
         .orderBy(orderColumn, sortType).paginate(page, pageSize)
     } else {
        sQLEditors = await SQLEditor.query().orderBy(orderColumn, sortType).paginate(page, pageSize)
     }

    return response.json({
      sql_editors: sQLEditors.all(),
      count: sQLEditors.getMeta().total,
      pageCount: sQLEditors.getMeta().last_page,
    })
  }


  public async listByName({response}: HttpContextContract) {
    let res = await Database.connection().from('s_q_l_editors')
      .join('altrp_models', 'altrp_models.id', 's_q_l_editors.model_id')
      .join('tables', 'tables.id', 'altrp_models.table_id')
      .select(
        's_q_l_editors.id', 's_q_l_editors.name', 's_q_l_editors.title',
        's_q_l_editors.description', 'tables.name as model')
    return response.json(res)
  }

  /**
   * Store a newly created resource in storage.
   */
  public async store({request, response}: HttpContextContract) {

    const storeSchema = schema.create({
      sql: schema.string({trim: true}, []),
      title: schema.string({trim: true}, []),
      name: schema.string({trim: true}, []),
    })
    await request.validate({schema: storeSchema})
    let sQLEditor = new SQLEditor()
    let sQLEditorData = request.all()
    delete sQLEditorData.auth
    delete sQLEditorData.roles
    delete sQLEditorData.permissions
    delete sQLEditorData.test
    delete sQLEditorData.id;
    sQLEditor.fill(sQLEditorData)
    await sQLEditor.save()
    let model = await Model.find(sQLEditor.model_id)
    if (model) {
      let source = new Source()
      await model.load('altrp_controller')
      source.fill(
        {
          'sourceable_type': SQLEditor.sourceable_type,
          'sourceable_id': sQLEditor.id,
          'model_id': sQLEditor.model_id,
          'controller_id': model.altrp_controller.id,
          'url': "/" + string.pluralize(sQLEditor.name),
          'api_url': "/" + string.pluralize(sQLEditor.name),
          'title': 'SQL Editor ' + string.pascalCase(sQLEditor.name),
          'name': 'SQL Editor ' + string.pascalCase(sQLEditor.name),
          'type': string.snakeCase(sQLEditor.name),
          'request_type': 'get',
        }
      )
      await source.save()
      Event.emit('model:updated', model)
    }
    return response.json({'success': true})
  }

  /**
   * Display the specified resource.
   */
  public async show({params, response}: HttpContextContract) {
    let res = await SQLEditor.find(params.id)
    return response.json(res)
  }


  /**
   * Update the specified resource in storage.
   */
  public async update({params, response, request}: HttpContextContract) {

    const storeSchema = schema.create({
      sql: schema.string({trim: true}, []),
      title: schema.string({trim: true}, []),
      name: schema.string({trim: true}, []),
    })

    await request.validate({schema: storeSchema})

    let sQLEditor = await SQLEditor.find(params.id)
    if (!sQLEditor) {
      return response.json({
        success: false,
        message: 'SQLEditor not found'
      })
    }
    await sQLEditor.load('source', source => {
      source.preload('source_permissions')
    })

    let sQLEditorData = request.all()
    delete sQLEditorData.auth
    delete sQLEditorData.roles
    delete sQLEditorData.permissions
    delete sQLEditorData.test
    sQLEditor.merge(sQLEditorData)
    await sQLEditor.save()

    let model = await Model.find(sQLEditor.model_id)
    if (model) {
      await model.load('altrp_controller')
      let source = await Source.query()
        .where('sourceable_type', SQLEditor.sourceable_type)
        .where('sourceable_id', sQLEditor.id)
        .first()
      if (!source) {
        source = new Source()
        source.fill(
          {
            'sourceable_type': SQLEditor.sourceable_type,
            'sourceable_id': sQLEditor.id,
            'model_id': sQLEditor.model_id,
            'controller_id': model.altrp_controller.id,
            'url': "/" + string.pluralize(sQLEditor.name),
            'api_url': "/" + string.pluralize(sQLEditor.name),
            'title': 'SQL Editor ' + string.pascalCase(sQLEditor.name),
            'name': 'SQL Editor ' + string.pascalCase(sQLEditor.name),
            'type': string.snakeCase(sQLEditor.name),
            'request_type': 'get',
          }
        )
      } else {
        source.merge(
          {
            'sourceable_type': SQLEditor.sourceable_type,
            'sourceable_id': sQLEditor.id,
            'model_id': sQLEditor.model_id,
            'controller_id': model.altrp_controller.id,
            'url': "/" + string.pluralize(sQLEditor.name),
            'api_url': "/" + string.pluralize(sQLEditor.name),
            'title': 'SQL Editor ' + string.pascalCase(sQLEditor.name),
            'name': 'SQL Editor ' + string.pascalCase(sQLEditor.name),
            'type': string.snakeCase(sQLEditor.name),
            'request_type': 'get',
          }
        )

      }
      await source.save()
      Event.emit('model:updated', model)
    }
    return response.json({'success': sQLEditor})
  }

  /**
   * Remove the specified resource from storage.
   */
  public async destroy({params, response}: HttpContextContract) {
    //
    let sQLEditor = await SQLEditor.find(params.id)

    if (sQLEditor) {
      let source = await Source.query()
        .where('sourceable_type', SQLEditor.sourceable_type)
        .where('sourceable_id', sQLEditor.id)
        .first()
      let model = await Model.find(sQLEditor.model_id)
      if(source){
        await source.delete()
      }
      await sQLEditor.delete()
      if(model){
        Event.emit('model:updated', model)
      }
      return response.json({'success': true},)
    }
    return response.json({'success'  : false, message: 'SQLEditor not found'})
  }

  // public async  test({params, response, request}:HttpContextContract) {
  //   let sql = request.input('sql')
  // }
}
