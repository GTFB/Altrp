import Env from '@ioc:Adonis/Core/Env'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Model from "App/Models/Model";
import Event from '@ioc:Adonis/Core/Event'
import Column from "App/Models/Column";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ColumnsController {

  async addColumn({response, params, request}: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    await model.load('table')
    const column = new Column()
    let columnData = request.all()
    column.fill({
      description: columnData.description || '',
      title: columnData.title || '',
      attribute: columnData.attribute,
      default: columnData.default,
      editable: columnData.editable,
      indexed: columnData.indexed,
      input_type: columnData.input_type,
      is_auth: columnData.is_auth,
      is_label: columnData.is_label,
      is_title: columnData.is_title,
      name: columnData.name,
      null: columnData.null,
      table_id: model.table_id,
      model_id: model.id,
      type: columnData.type
    })
    try{
      if(columnData.type !== 'calculated'){
        const client = Database.connection(Env.get('DB_CONNECTION'))

        await client.schema.table(model.table.name,table=>{
          let query = table[column.type](column.name, column.size)
          if(column.type === 'bigInteger' && column.attribute === 'unsigned'){
            query = query.unsigned()
          }
          if(column.indexed ){
            query = query.index()
          }
        })
      }
    } catch (e) {
      response.status(500)
      return response.json({success:false, message: 'DB Error', trace: e?.stack.split('\n')})

    }
    await column.save()
    Event.emit('model:updated', model)

    return response.json({success:true, data:column})
  }
  async updateColumn({response, params, request}: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    const column = await Column.find(params.field_id)
    if (!column) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Field not found'
      })

    }
    let columnData = request.all()
    column.merge({
      description: columnData.description || '',
      title: columnData.title || '',
      attribute: columnData.attribute,
      default: columnData.default,
      editable: columnData.editable,
      indexed: columnData.indexed,
      input_type: columnData.input_type,
      is_auth: columnData.is_auth,
      is_label: columnData.is_label,
      is_title: columnData.is_title,
      name: columnData.name,
      null: columnData.null,
      table_id: model.table_id,
      model_id: model.id,
      type: columnData.type
    })

    await column.save()
    Event.emit('model:updated', model)

    return response.json({success:true, data:column})
  }
  async getColumn({response, params, }: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    const column = await Column.find(params.field_id)
    if (!column) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Field not found'
      })

    }

    return response.json( column)
  }

  async deleteColumn({response, params, }: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    const column = await Column.find(params.field_id)
    if (!column) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Field not found'
      })

    }
    await column.delete()
    Event.emit('model:updated', model)


    try{
      if(column.type !== 'calculated'){
        const client = Database.connection(Env.get('DB_CONNECTION'))
        await client.schema.table(model.table.name,table=>{
          table.dropColumn(column.name)
        })
      }
    } catch (e) {

    }
    return response.json({success:true, })
  }

}
