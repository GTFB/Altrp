import Cron from 'App/Models/Cron'
import Customizer from 'App/Models/Customizer';
import Model from 'App/Models/Model';
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';
import validGuid from '../../../../helpers/validGuid';
import * as _ from 'lodash'
import exec from "../../../../helpers/exec";
import guid from "../../../../helpers/guid";
import Source from "App/Models/Source";
import Event from "@ioc:Adonis/Core/Event";
import LIKE from "../../../../helpers/const/LIKE";
import base_path from '../../../../helpers/base_path'
import Role from "App/Models/Role";
// import SourceRole from "App/Models/SourceRole";

export default class CustomizersController {


  public async store({request, response}: HttpContextContract) {

    const requestAll = request.all();

    if(requestAll.is_method !== undefined) {
      if(requestAll.is_method) {
        requestAll.type = "method"
      }

      delete requestAll.is_method
    }

    let customizer = new Customizer()
    customizer.fill(requestAll)

    customizer.guid = guid()
    try {
      const model = customizer.model_id ? await Model.find(customizer.model_id) : null
      if (customizer.model_id && model) {
        customizer.model_guid = model.guid
      }
      if (!customizer.settings) {
        customizer.settings = []
      }
      if (customizer.type === 'schedule') {
        customizer.settings.period_unit = customizer.settings.period_unit || 'day'
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
          'auth': true,
          'type': 'customizer',
          'request_type':await customizer.getRequestType(),
        })

        customizer = await Customizer.query().preload("altrp_model").firstOrFail()

        await source.save()

        const adminRole = await Role.query().where('name', 'admin').first()

        if (adminRole) {
          await source.related('roles').attach([adminRole.id])
        }
      }
      if(customizer.type === "listener" && model) {
        await exec(`node ${base_path('ace')} generator:listener --id=${customizer.id}`)
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


  public async duplicate({request, response}: HttpContextContract) {

    const body = request.body()

    const {title, name, duplicateCustomizerId} = body

    const parentCustomizer = await Customizer.query().where('id', '=', duplicateCustomizerId).first()

    if (!parentCustomizer) {
        response.status(404)
        return response.json({
            'success': false,
            'message': 'Customizer not found'
          },
      )
    }

    const customizer = await Customizer.create({
        title: title,
        name: name,
        guid: guid(),
        type: parentCustomizer?.type,
        model_guid: parentCustomizer?.model_guid,
        data: parentCustomizer?.data,
        settings: parentCustomizer?.settings,
        model_id: parentCustomizer?.model_id
    })

    return response.json({
        'success': true,
        'data': customizer,
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


    const oldType = customizer.type

    const all = request.all()
    delete all.created_at
    delete all.updated_at
    delete all.name

    if (all.type === 'schedule') {
      all.settings = all.settings || {}
      all.settings.period_unit = all.settings.period_unit || 'day'
    }

    if (oldType === 'crud' && all.type !== 'crud') {
      await exec(`node ${base_path('ace')} generator:crud --delete --id=${customizer.id}`)
    }

    if (oldType === 'schedule' && all.type !== 'schedule') {
      await exec(`node ${base_path('ace')} generator:schedule --delete --id=${customizer.id}`)
      customizer.removeSchedule()
    }

    customizer.merge(all)
    customizer.merge({
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
          'auth': true,
          'request_type':await customizer.getRequestType(),
        })
        await source.save()

        if(!oldSource){
          const adminRole = await Role.query().where('name', 'admin').first()
          if (adminRole) {
            await source.related('roles').attach([adminRole.id])
          }
        }
      }
      if(customizer.type === "listener" && model) {
        await exec(`node ${base_path('ace')} generator:listener --id=${customizer.id}`)
      }

      if (customizer.type === 'crud' && model) {
        await exec(`node ${base_path('ace')} generator:crud --id=${customizer.id}`)
      }

      if (customizer.type === 'schedule') {
        const result = await exec(`node ${base_path('ace')} generator:schedule --id=${customizer.id}`)
        if (result !== null) {
          customizer.schedule()
          Cron.createByCustomizer(customizer)
        }
      }

      if(model) {
        Event.emit('model:updated', model)
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
        query.orWhere('altrp_customizers.title', LIKE, '%' + search + '%')

        if(Number(search)){
          query.orWhere('altrp_customizers.id', LIKE, '%' + search + '%')
        }
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
        await exec(`node ${base_path('ace')} generator:listener --delete --id=${customizer.id}`)
      }

      const oldSources =  await Source.query().where('sourceable_id', customizer.id)
        .where('sourceable_type', Customizer.sourceable_type)
      await Promise.all(oldSources.map(async s =>{
        await s.related('roles').detach()
        await s.delete()
      }))
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
