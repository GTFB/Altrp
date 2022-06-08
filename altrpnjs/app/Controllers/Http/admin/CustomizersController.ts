import Customizer from 'App/Models/Customizer';
import Model from 'App/Models/Model';
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';
import validGuid from '../../../../helpers/validGuid';
import * as _ from 'lodash'
import guid from "../../../../helpers/guid";
import Source from "App/Models/Source";
import Event from "@ioc:Adonis/Core/Event";
import ListenerGenerator from "App/Generators/ListenerGenerator";
// import timers from "App/Services/Timers";
import Timer from "App/Models/Timer";

export default class CustomizersController {


  public async store({request, response}: HttpContextContract) {

    let customizer = new Customizer()
    customizer.fill(request.all())

    customizer.guid = guid()
    try {
      const model = customizer.model_id ? await Model.find(customizer.model_id) : null
      if (customizer.model_id && model) {
        customizer.model_guid = model.guid
      }
      if (!customizer.settings) {
        customizer.settings = []
      }
      await customizer.save()

      if (customizer.type === 'api' && model) {
        let source = new Source();
        await model.load('altrp_controller')
        source.fill({
          'sourceable_type': Customizer.sourceable_type,
          'sourceable_id': customizer.id,
          'model_id': customizer.model_id,
          'controller_id': model.altrp_controller.id,
          'url': "/" + customizer.name,
          'api_url': "/" + customizer.name,
          'title': customizer.title,
          'name': customizer.name,
          'type': 'customizer',
          'request_type': customizer.getRequestType(),
        })

        customizer = await Customizer.query().preload("altrp_model").firstOrFail()

        if(customizer?.settings?.time && customizer?.settings?.time_type) {
          await Timer.createWithCheck({
            type: "customizer",
            value: customizer.guid,
            time: customizer.settings.time,
            time_type: customizer.settings.time_type
          })
        }
        await source.save()
      }
      if(customizer.type === "listener" && model) {
        const generator = new ListenerGenerator()
        await generator.run(customizer)
      }
      //@ts-ignore
      if(model){
        await Event.emit('model:updated', model)
      }
    } catch (e) {
      console.error(e);
      return response.json({
          'success':
            false,
          'message':
            'Customizer don\'t saved',
          'throw message': e.message,
          'trace': e.stack.split('\n'),
        },
      )
    }
    return response.json({
        'success':
          true,
        'data':
        customizer,
        'redirect_route':
          '/admin/customizers-editor?customizer_id=' + customizer.id
      },
    )
  }

  public async show({params, response}: HttpContextContract) {
    let customizer
    if (validGuid(params.id)) {
      customizer = await Customizer.query().where('guid', params.id).first()
    } else {
      customizer = await Customizer.find(params.id)
    }
    if (!customizer) {
      response.status(404)
      return response.json({
          'success':
            false, 'message':
            'Customizer not found'
        },
      )
    }
    /**
     * @var customizer Customizer
     */
    await customizer.load('source', query => {
      query.preload('model',model => {
        model.preload('table')
      })
    })
    return response.json({
      'success':
        true,
      'data':
      customizer
    },)
  }

  public async update({params, request, response}: HttpContextContract) {
    let customizer = await Customizer.find(params.id)
    const oldSource = await Source.query().where('sourceable_id', params.id)
      .where('sourceable_type', Customizer.sourceable_type)
      .first()
    if (!customizer) {
      response.status(404)
      return response.json({
          'success':
            false, 'message':
            'Customizer not found'
        },
      )
    }

    // if(customizer.type === "listener") {
    //   // @ts-ignore
    //   const generator = new ListenerGenerator()
    //
    //   await generator.delete(customizer)
    //
    // }
    const oldType = customizer.type
    const oldSettings = customizer.settings
    const all = request.all()
    delete all.created_at
    delete all.updated_at

    customizer.merge(all)
    customizer.merge({
      name: request.all().name,
      title: request.all().title,
      type: request.all().type,
      data: request.all().data,
      model_id: request.all().model_id,
    })

    /**
     * Delete source if type `api` changed
     */

    if(oldType === 'api' && customizer.$dirty.type && oldSource){
      await oldSource.delete()
    }
    let model
    try {
      model = await Model.find(customizer.model_id)
      if (customizer.model_id && model) {
        customizer.model_guid = model.guid
      }
      await customizer.save()

      if(customizer.$dirty?.model_id && customizer.$original.model_id) {
        const oldModel = await Model.find(customizer.$original.model_id)

        if(oldModel) {
          //@ts-ignore
          await Event.emit('model:updated', oldModel)
        }

      }
      if (customizer.type === 'api' && model) {
        await model.load('altrp_controller')

        let source = oldSource ? oldSource : new Source
        source.merge({
          'sourceable_type': Customizer.sourceable_type,
          'sourceable_id': customizer.id,
          'model_id': customizer.model_id,
          'controller_id': model.altrp_controller.id,
          'url': "/" + customizer.name,
          'api_url': "/" + customizer.name,
          'title': customizer.title,
          'name': customizer.name,
          'type': 'customizer',
          'request_type': customizer.getRequestType(),
        })
        await source.save()
      }
      if(customizer.type === "listener" && model) {
        const generator = new ListenerGenerator()

        await generator.run(customizer)
      }
      if(model) {
        Event.emit('model:updated', model)
      }


      if(customizer?.settings?.time && customizer.settings?.time_type) {
        await Timer.createWithCheck({
          type: "customizer",
          value: customizer.guid,
          time: customizer.settings.time,
          time_type: customizer.settings.time_type
        })
      } else if(oldSettings?.time_type !== customizer?.settings?.time_type || oldSettings?.time !== customizer?.settings?.time) {
        // await timers.remove(customizer.guid)
      }

    } catch
      (e) {
      console.trace(e);
      if(model){
        Event.emit('model:updated', model)
      }
      response.status(500)
      return response.json({
          'success':
            false,
          'message':
            'Customizer could not be saved',
          'throw message':
          e.message,
          'trace':
            e.stack.split('\n'),
        },
      )
    }
    await customizer.load('source', query => {
      query.preload('model',model => {
        model.preload('table')
      })
    })
    return response.json({
      'success':
        true, 'data':
        customizer.serialize()
    },)
  }

  public async index({request, response}: HttpContextContract) {

    let search = request.qs().s || ''
    let categories = request.qs() || ''
    let page = request.qs().page || 1
    let pageSize = request.qs().pageSize || 20
    let orderColumn = request.qs().order_by || 'title'
    // let limit = request.qs().pageSize || 10
    // let offset = limit * (page - 1)
    let orderType: 'asc' | 'desc' = request.qs()?.order ? request.qs().order.toLowerCase() : 'asc'

    let customizers = Customizer.query().preload('categories')
    if (categories && _.isString(categories)) {
      categories = categories.split(',')
      customizers.leftJoin('altrp_category_objects',
        'altrp_category_objects.object_guid',
        '=',
        'altrp_customizers.guid')
      // @ts-ignore
      customizers.whereIn('altrp_category_objects.category_guid', categories)
    }

    if (search) {
      customizers.where(function (query) {
        query.where('altrp_customizers.title', 'like', '%' + search + '%')
          .orWhere('altrp_customizers.id', 'like', '%' + search + '%')
      })
    }
    customizers.orderBy(orderColumn, orderType)
    const result = await customizers.select('altrp_customizers.*').paginate(page, pageSize)
    return response.json({
      'success': true,
      count: result.getMeta().total,
      pageCount: result.getMeta().last_page,
      'data': result.all(),
    })
  }

  public async destroy({params, response}: HttpContextContract) {
    let customizer
    if (validGuid(params.id)) {
      customizer = await Customizer.query().where('guid', params.id).first()
    } else {
      customizer = await Customizer.find(params.id)
    }
    if (!customizer) {
      response.status(404)
      return response.json({
        'success':
          false, 'message':
          'Customizer not found'
      },)
    }
    try {
      if(customizer.type === "listener") {
        const generator = new ListenerGenerator()

        await generator.delete(customizer)

      }

      if(customizer?.settings?.time && customizer?.settings?.time_type) {
        // await timers.remove(customizer.guid)
      }

      await customizer.delete()

    } catch (e) {
      return response.json({
          'success':
            false,
          'throw message':
          e.message,
          'trace':
            e.stack.split('\n'),
          'message':
            'Customizer could not be deleted'
        },
      )
    }
    return response.json({'success': true,},)
  }


  public async exportCustomizer( {params, response}: HttpContextContract )
  {
    let _customizer
    if (validGuid(params.id)) {
      _customizer = await Customizer.query().where('guid', params.id).first()
    } else {
      _customizer = await Customizer.find(params.id)
    }
    if (!_customizer) {
      response.status(404)
      return response.json({
          'success':
            false, 'message':
            'Customizer not found'
        },
      )
    }
    let customizer = _customizer.serialize()
    return response.json(customizer)
  }

  async content({params, response}:HttpContextContract){

    let customizer
    if (validGuid(params.id)) {
      customizer = await Customizer.query().where('guid', params.id).first()
    } else {
      customizer = await Customizer.find(params.id)
    }
    if (!customizer) {
      response.status(404)
      return response.json({
          'success':
            false, 'message':
            'Customizer not found'
        },
      )
    }
    const content = customizer.getMethodContent()
    return response.json({
      success: true,
      data:content
    })
  }
}
