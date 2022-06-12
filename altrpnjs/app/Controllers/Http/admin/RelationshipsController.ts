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

    try {

        if (relationshipData.type === 'belongsTo') {
          const sourceRealtion = await Relationship.query()
              .where('model_id', relationshipData.target_model_id)
              .where('local_key', relationshipData.foreign_key)
              .where('foreign_key', relationshipData.local_key)
              .first()
          if(!sourceRealtion){
            response.status(404)
            return response.json({success:false, message: 'Not found reverse relation'})
          }
        }

        let targetModel = await Model.find(relationshipData.target_model_id)

        if (relationshipData.type == "belongsTo" && targetModel) {
          await targetModel.load('table')
          try {
            let query = `ALTER TABLE ${model.table.name} ADD CONSTRAINT
              ${model.table.name}_${relationshipData.local_key}_foreign
              FOREIGN KEY (${relationshipData.local_key})
              REFERENCES ${targetModel.table.name}(${relationshipData.foreign_key})
              ON DELETE ${relationshipData.onDelete}
              ON UPDATE ${relationshipData.onUpdate}`
            await Database.rawQuery(query)
          } catch (e) {
            console.error(e)
          }
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
        Event.emit('model:updated', model)


        if (relationshipData.type != "belongsTo" && targetModel && relationshipData.add_belong_to) {

          await targetModel.load('table')
          try {
            let query = `ALTER TABLE ${targetModel.table.name} ADD CONSTRAINT
              ${targetModel.table.name}_${relationshipData.foreign_key}_foreign
              FOREIGN KEY (${relationshipData.foreign_key})
              REFERENCES ${model.table.name}(${relationshipData.local_key})
              ON DELETE restrict
              ON UPDATE restrict`
            await Database.rawQuery(query)
          } catch (e) {
            console.error(e)
          }

          const belongsToRelationship = new Relationship()
          belongsToRelationship.fill({
            title: model.title,
            description: relationshipData.description,
            type: 'belongsTo',
            add_belong_to: false,
            editable: false,
            always_with: false,
            local_key: relationshipData.foreign_key,
            foreign_key: relationshipData.local_key,
            onDelete: 'restrict',
            onUpdate: 'restrict',
            target_model_id: model.id,
            model_class: '\\App\\AltrpModels\\' + targetModel.name,
            model_id: relationshipData.target_model_id,
            name: model.name,
          })
          await belongsToRelationship.save()
          Event.emit('model:updated', targetModel)

        }

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
      let targetModel = await Model.find(relationship.target_model_id)
      if(relationship.type != "belongsTo" && targetModel && relationship.add_belong_to){

          await targetModel.load('table')

          try {
            let deleteQuery = `ALTER TABLE ${targetModel.table.name} DROP FOREIGN KEY ${targetModel.table.name}_${relationship.foreign_key}_foreign`
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

      if (relationship.type === "belongsTo") {
        try {
          let deleteQuery = `ALTER TABLE ${model.table.name} DROP FOREIGN KEY ${model.table.name}_${relationship.local_key}_foreign`
          await Database.rawQuery(deleteQuery)
        } catch (e) {
        }
      }

      let newTargetModel = await Model.find(relationshipData.target_model_id)

      if (relationshipData.type === "belongsTo" && newTargetModel) {
        await newTargetModel.load('table')

        try {
          let query = `ALTER TABLE ${model.table.name} ADD CONSTRAINT
            ${model.table.name}_${relationshipData.local_key}_foreign
            FOREIGN KEY (${relationshipData.local_key})
            REFERENCES ${newTargetModel.table.name}(${relationshipData.foreign_key})
            ON DELETE ${relationshipData.onDelete}
            ON UPDATE ${relationshipData.onUpdate}`
          await Database.rawQuery(query)
        } catch (e) {
        }
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

      if (relationshipData.type != "belongsTo" && newTargetModel && relationshipData.add_belong_to) {

        try {
          await newTargetModel.load('table')
          let query = `ALTER TABLE ${newTargetModel.table.name} ADD CONSTRAINT
            ${newTargetModel.table.name}_${relationshipData.foreign_key}_foreign
            FOREIGN KEY (${relationshipData.foreign_key})
            REFERENCES ${model.table.name}(${relationshipData.local_key})
            ON DELETE restrict
            ON UPDATE restrict`
          await Database.rawQuery(query)
        } catch (e) {
        }

        const belongsToRelationship = new Relationship()
        belongsToRelationship.fill({
          title: model.title,
          description: relationshipData.description,
          type: 'belongsTo',
          add_belong_to: false,
          editable: false,
          always_with: false,
          local_key: relationshipData.foreign_key,
          foreign_key: relationshipData.local_key,
          onDelete: 'restrict',
          onUpdate: 'restrict',
          target_model_id: model.id,
          model_class: '\\App\\AltrpModels\\' + newTargetModel.name,
          model_id: relationshipData.target_model_id,
          name: model.name,
        })
        await belongsToRelationship.save()
        Event.emit('model:updated', newTargetModel)

      }

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

}
