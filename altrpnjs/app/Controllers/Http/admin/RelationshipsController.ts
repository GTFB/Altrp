import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Model from "App/Models/Model";
import Event from '@ioc:Adonis/Core/Event'
import Relationship from "App/Models/Relationship";
import Database from '@ioc:Adonis/Lucid/Database';

export default class RelationshipsController {

  async addRelationship({response, params, request}: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    await model.load('table')
    const relationship = new Relationship()
    let relationshipData = request.all()
    if(! relationshipData.target_model_id &&! relationshipData.settings?.core_relation?.model){
      response.status(400)
      return response.json({success:false, message: 'select target model'})
    }
    if((!relationshipData.foreign_key &&! relationshipData.settings?.core_relation?.model) || ! relationshipData.local_key){
      response.status(400)
      return response.json({success:false, message: 'select keys'})

    }

    try {

        relationship.fill({
          title: relationshipData.title,
          description: relationshipData.description,
          type: relationshipData.type,
          add_belong_to: relationshipData.add_belong_to,
          editable: relationshipData.editable,
          always_with: relationshipData.always_with,
          local_key: relationshipData.local_key,
          foreign_key: relationshipData.foreign_key,
          onDelete: relationshipData.onDelete,
          onUpdate: relationshipData.onUpdate,
          target_model_id: relationshipData.target_model_id,
          model_class: '\\App\\AltrpModels\\' + model.name,
          model_id: model.id,
          name: relationshipData.name,
          settings: relationshipData.settings || {},
        })
        await relationship.save()
        Event.emit('model:updated', model)



    } catch (e) {
      console.error(e)
      return response.json({
          'success':
            false,
          'message':
            'Relationship don\'t saved',
          'throw message': e.message,
          'trace': e.stack.split('\n'),
        },
      )
    }

    return response.json({success: true, data: relationship})
  }

  async updateRelationship({response, params, request}: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })
    }
    await model.load('table')

    let relationshipData = request.all()

    //const relationship = await Relationship.find(params.field_id)
    const relationship = await Relationship.find(relationshipData.id)
    if (!relationship) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Field not found'
      })
    }

    try {



      relationship.merge({
        title: relationshipData.title,
        description: relationshipData.description,
        type: relationshipData.type,
        add_belong_to: relationshipData.add_belong_to,
        editable: relationshipData.editable,
        always_with: relationshipData.always_with,
        local_key: relationshipData.local_key,
        foreign_key: relationshipData.foreign_key,
        onDelete: relationshipData.onDelete,
        onUpdate: relationshipData.onUpdate,
        target_model_id: relationshipData.target_model_id,
        model_class: '\\App\\AltrpModels\\' + model.name,
        model_id: model.id,
        name: relationshipData.name,
        settings: relationshipData.settings|| {},
      })
      await relationship.save()
      Event.emit('model:updated', model)

    } catch (e) {
      return response.json({
          'success':
            false,
          'message':
            'Relationship don\'t saved',
          'throw message': e.message,
          'trace': e.stack.split('\n'),
        },
      )
    }

    return response.json({success: true, data: relationship})
  }

  async getRelationship({response, params,}: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })

    }
    const relationship = await Relationship.find(params.relationship_id)
    if (!relationship) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Relationship not found'
      })

    }

    return response.json(relationship)
  }

  async deleteRelationship({response, params,}: HttpContextContract) {

    let model = await Model.find(params.id)
    if (!model) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Model not found'
      })
    }

    const relationship = await Relationship.find(params.relationship_id)
    if (!relationship) {
      response.status(404)
      return response.json({
        success: false,
        message: 'Field not found'
      })
    }

    try {

      await model.load('table')

      let targetModel = await Model.find(relationship.target_model_id)

      if(relationship.type != "belongsTo" && targetModel && relationship.add_belong_to){

          try {
            await targetModel.load('table')
            let deleteQuery = `ALTER TABLE ${targetModel.table.name} DROP FOREIGN KEY ${targetModel.table.name}_${relationship.foreign_key}_foreign`
            await Database.rawQuery(deleteQuery)
            deleteQuery = `ALTER TABLE ${targetModel.table.name} DROP INDEX ${targetModel.table.name}_${relationship.foreign_key}_foreign`
            await Database.rawQuery(deleteQuery)
          } catch (e) {

          }
          await Relationship.query()
            .where('model_id', relationship.target_model_id)
            .where('target_model_id', relationship.model_id)
            .where('foreign_key', relationship.local_key)
            .where('local_key', relationship.foreign_key)
            .where('type', 'belongsTo')
            .delete()
          Event.emit('model:updated', targetModel)

      }

      try {
        if (relationship.type === "belongsTo") {
          let deleteQuery = `ALTER TABLE ${model.table.name} DROP FOREIGN KEY ${model.table.name}_${relationship.local_key}_foreign`
          await Database.rawQuery(deleteQuery)
          deleteQuery = `ALTER TABLE ${model.table.name} DROP INDEX ${model.table.name}_${relationship.foreign_key}_foreign`
          await Database.rawQuery(deleteQuery)
        }
      } catch (e) {

      }

      await relationship.delete()
      Event.emit('model:updated', model)

    } catch (e) {
      return response.json({
          'success':
            false,
          'message':
            'Relationship don\'t saved',
          'throw message': e.message,
          'trace': e.stack.split('\n'),
        },
      )
    }

    return response.json({success: true,})
  }


  async options({request, response}:HttpContextContract){

    const query = Relationship.query()
    const qs = request.qs()

    if(qs.model_id){
      //query.whereHas('altrp_model', query)
      query.where('model_id', qs.model_id)
    }

    query.orderBy('name')


    let data: any[] = await query

    data = data.map((r:any)=>{
      r = r.toJSON()
      return {
        label: r.title,
        value: r[qs.valueColumn] || r.id
      }

    })
    return response.json({
      success: true,
      data
    })
  }
}
