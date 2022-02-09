import Customizer from 'App/Models/Customizer';
import Model from 'App/Models/Model';
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';
import validGuid from '../../../../helpers/validGuid';
import * as _ from 'lodash'
import guid from "../../../../helpers/guid";
import Source from "App/Models/Source";
import Event from "@ioc:Adonis/Core/Event";

export default class CustomizersController {


  public async store({request, response}: HttpContextContract) {

    let customizer = new Customizer()
    customizer.fill(request.all())
    customizer.guid = guid()
    try {
      const model = await Model.find(customizer.model_id)
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
        await source.save()
      }
      //@ts-ignore
      await Event.emit('model:updated', model)
    } catch (e) {
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
      query.preload('model')
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
    if (oldSource) {
      await oldSource.delete()
    }
    if (!customizer) {
      return response.json({
          'success':
            false, 'message':
            'Customizer not found'
        },
      )
    }

    customizer.merge(request.all())
    let model
    try {
      model = await Model.find(customizer.model_id)
      if (customizer.model_id && model) {
        customizer.model_guid = model.guid
      }
      await customizer.save()


      if(customizer.$dirty?.model_id && customizer.$original.model_id) {
        const oldModel = await Model.find(customizer.$original.model_id)
        //@ts-ignore
        await Event.emit('model:updated', oldModel)
      }
      if (customizer.type === 'api' && model) {
        await model.load('altrp_controller')

        let source = new Source();
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
        await source.save()
      }
      Event.emit('model:updated', model)
    } catch
      (e) {
      console.trace(e);
      if(model){
        Event.emit('model:updated', model)
      }
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
      query.preload('model')
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
    // let page = request.qs().page || 1
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
    const result = await customizers.select('altrp_customizers.*')

    return response.json({
      'success':
        true,
      'data':
      result,
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
      return response.json({
        'success':
          false, 'message':
          'Customizer not found'
      },)
    }
    try {
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
}
