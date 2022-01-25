import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import SQLEditor from "App/Models/SQLEditor"
import Database from "@ioc:Adonis/Lucid/Database";
import { schema} from "@ioc:Adonis/Core/Validator";
import Source from "App/Models/Source";
import Model from "App/Models/Model";
import {string} from "@ioc:Adonis/Core/Helpers";
import Event from "@ioc:Adonis/Core/Event";

export default class SQLEditorController {
  public async index({request, response}: HttpContextContract) {
    let search = request.qs().s
    let orderColumn = request.qs().order_by || 'title'
    let orderType = request.qs().order ? request.qs().order : 'Asc'
    // @ts-ignore
    let sortType: 'asc' | 'desc' = 'sortBy' + (orderType == 'Asc' ? '' : orderType)
    let page_count = 1
    let sQLEditors
    if (!request.qs().page) {
      sQLEditors = search
        ? await SQLEditor.query().where('title', 'like', `%${search}%`)
          .orderBy(orderColumn, sortType).select('*')
        : await SQLEditor.query().orderBy(orderColumn, sortType).select('*')
    } else {
      let page_size = request.qs().pageSize || 10
      sQLEditors = SQLEditor.query()
        .orderBy(orderColumn, sortType)
        .offset(page_size * (request.qs().page - 1))
        .limit(page_size)
      sQLEditors = sQLEditors.select('*').values()

      page_count = Math.ceil(page_count / page_size)
    }
    return response.json({
      'sql_editors': sQLEditors,
      'pageCount': page_count,
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
