import Env from '@ioc:Adonis/Core/Env'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Model from "App/Models/Model";
import Event from '@ioc:Adonis/Core/Event'
import Column from "App/Models/Column";
import Database from "@ioc:Adonis/Lucid/Database";
import * as _ from "lodash"
import {DateTime} from "luxon";

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
    let columnData = request.all()
    const column = await Column.create({
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


    return response.json({success:true, data:column})
  }

  async indexCreator(indexed, columnData, model, newColumn = false) {
    const indexName = Column.createIndexName(columnData.name, model.table.name)
    if(indexed) {
      let indexQuery = `CREATE INDEX ${indexName} ON ${model.table.name}(${columnData.name})`
      await Database.rawQuery(indexQuery)
    } else if(! newColumn){
      try {
      let indexQuery = `ALTER TABLE ${model.table.name} DROP INDEX ${indexName}`
      await Database.rawQuery(indexQuery)
      }catch (e) {

      }
    }
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

    await model.load('table')

    const column = await Column.find(params.field_id)
    if (!column) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Field not found'
      })

    }

    let columnData = request.all()

    // проверяем меняется ли тип колонки
    // если меняется, то сначала дропаем и создаем колонку
    // если ошибка, то возвращаем success = false и сообщение ошибки
    // если не было ошибки, мы обновляем тип колонки и сохраняем данные колонки в бд

    if (column.type !== columnData.type) {

      // изменение типа происходит.
      // дропнуть и создать колонку

      // drop column
      try {
        if(column.type !== 'calculated'){
          const client = Database.connection(Env.get('DB_CONNECTION'))
          await client.schema.table(model.table.name,table=>{
            table.dropColumn(column.name)
          })
        }
      } catch (e) {
        response.status(500)
        return response.json({success:false, message: 'DB Error delete', trace: e?.stack.split('\n')})
      }
      await column.delete()

      // create column
      const columnNew = new Column()
      columnNew.fill({
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
        unique: columnData.unique,
        type: columnData.type
      })

      await this.indexCreator(columnData.indexed, columnData, model)

      try{
        if(columnData.type !== 'calculated'){
          const client = Database.connection(Env.get('DB_CONNECTION'))

          await client.schema.table(model.table.name,table=>{
            let query = table[columnNew.type](columnNew.name, columnNew.size)
            if(columnNew.type === 'bigInteger' && columnNew.attribute === 'unsigned'){
              query = query.unsigned()
            }
            if(columnNew.indexed ){
              query = query.index()
            }
          })
        }
      } catch (e) {
        response.status(500)
        return response.json({success:false, message: 'DB Error create', trace: e?.stack.split('\n')})
      }
      await columnNew.save()

      model.updatedAt = DateTime.now()
      await model.save()

      Event.emit('model:updated', model)

      return response.json({success:true, data:columnNew})

    } else {
       // изменение типа не происходит, выполняем обычный код
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
        unique: columnData.unique,
        type: columnData.type
      })

      await this.indexCreator(columnData.indexed, columnData, model)

      await column.save()

      model.updatedAt = DateTime.now()
      await model.save()

      Event.emit('model:updated', model)
      return response.json({success:true, data:column})
    }


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

    await model.load('table')

    const column = await Column.find(params.field_id)
    if (!column) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Field not found'
      })

    }

    //удаление индекса перед удалением поля
    try {
      await this.indexCreator(false, column, model)
    } catch (e) {
      console.error(e)
    }


    await column.delete()

    model.updatedAt = DateTime.now()
    await model.save()

    Event.emit('model:updated', model)


    try{
      if(column.type !== 'calculated'){
        const client = Database.connection(Env.get('DB_CONNECTION'))
        await client.schema.table(model.table.name,table=>{
          table.dropColumn(column.name)
        })
      }
    } catch (e) {
      response.status(500)
      return response.json({success:false, message: 'DB Error delete', trace: e?.stack.split('\n')})
    }
    return response.json({success:true, })
  }
  async options(
    {
      request
    }:HttpContextContract){

    const {
      model_id,
      value,
    } = request.qs()

    const query = Column.query()

    query.orderBy('name')

    if(model_id){
      query.where('model_id', model_id)
    }
    query.select('name', 'id')

    let data: any[] = await query
    data = data.map(item =>{
      return {
        value: value ? item[value] : item.id,
        label: item.name
      }
    })
    data = _.uniqBy(data, 'label')
    return {
      success: true,
      data,
    }

  }
}
