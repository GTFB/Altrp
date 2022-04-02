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
    if(! relationshipData.target_model_id){
      response.status(400)
      return response.json({success:false, message: 'select target model'})
    }
    if(!relationshipData.foreign_key || ! relationshipData.local_key){
      response.status(400)
      return response.json({success:false, message: 'select keys'})

    }
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
    })

    await relationship.save()
    let targetModel = await Model.find(relationshipData.target_model_id)
    Event.emit('model:updated', model)
    if(targetModel){
      Event.emit('model:updated', targetModel)
    }

    if (targetModel) {
      await targetModel.load('table')

      let query

      if (relationshipData.type == "belongsTo") {
        query = `ALTER TABLE ${model.table.name} ADD CONSTRAINT
          ${model.table.name}_${relationshipData.local_key}_foreign
          FOREIGN KEY (${relationshipData.local_key})
          REFERENCES ${targetModel.table.name}(${relationshipData.foreign_key})
          ON DELETE ${relationshipData.onDelete}
          ON UPDATE ${relationshipData.onUpdate}`
      } else if(relationshipData.type == "hasMany" || relationshipData.type == "hasOne") {
        query = `ALTER TABLE ${targetModel.table.name} ADD CONSTRAINT
          ${targetModel.table.name}_${relationshipData.foreign_key}_foreign
          FOREIGN KEY (${relationshipData.foreign_key})
          REFERENCES ${model.table.name}(${relationshipData.local_key})
          ON DELETE ${relationshipData.onDelete}
          ON UPDATE ${relationshipData.onUpdate}`
      }

      await Database.rawQuery(query)
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

    let targetModel = await Model.find(relationship.target_model_id)
    if (targetModel) {
      await model.load('table')
      await targetModel.load('table')

      let deleteQuery
      if (relationship.type == "belongsTo") {
        deleteQuery = `ALTER TABLE ${model.table.name} DROP FOREIGN KEY ${model.table.name}_${relationship.local_key}_foreign`
      } else if(relationship.type == "hasMany" || relationship.type == "hasOne") {
        deleteQuery = `ALTER TABLE ${targetModel.table.name} DROP FOREIGN KEY ${targetModel.table.name}_${relationship.foreign_key}_foreign`
      }
      await Database.rawQuery(deleteQuery)
    }

    
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
    })

    await relationship.save()
    Event.emit('model:updated', model)

    let newTargetModel = await Model.find(relationshipData.target_model_id)
    if (newTargetModel) {

      await newTargetModel.load('table')

      let query
      if (relationshipData.type == "belongsTo") {

        query = `ALTER TABLE ${model.table.name} ADD CONSTRAINT
          ${model.table.name}_${relationshipData.local_key}_foreign
          FOREIGN KEY (${relationshipData.local_key})
          REFERENCES ${newTargetModel.table.name}(${relationshipData.foreign_key})
          ON DELETE ${relationshipData.onDelete}
          ON UPDATE ${relationshipData.onUpdate}`

      } else if(relationshipData.type == "hasMany" || relationshipData.type == "hasOne") {

        query = `ALTER TABLE ${newTargetModel.table.name} ADD CONSTRAINT
          ${newTargetModel.table.name}_${relationshipData.foreign_key}_foreign
          FOREIGN KEY (${relationshipData.foreign_key})
          REFERENCES ${model.table.name}(${relationshipData.local_key})
          ON DELETE ${relationshipData.onDelete}
          ON UPDATE ${relationshipData.onUpdate}`

      }
      await Database.rawQuery(query)

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

    await model.load('table')

    let targetModel = await Model.find(relationship.target_model_id)
    if(targetModel){
      Event.emit('model:updated', targetModel)

      await targetModel.load('table')

      let deleteQuery
      if (relationship.type == "belongsTo") {
        deleteQuery = `ALTER TABLE ${model.table.name} DROP FOREIGN KEY ${model.table.name}_${relationship.local_key}_foreign`
      } else if(relationship.type == "hasMany" || relationship.type == "hasOne") {
        deleteQuery = `ALTER TABLE ${targetModel.table.name} DROP FOREIGN KEY ${targetModel.table.name}_${relationship.foreign_key}_foreign`
      }
      await Database.rawQuery(deleteQuery)
    }

    await relationship.delete()
    Event.emit('model:updated', model)

    return response.json({success: true,})
  }

}
