import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Media from "App/Models/Media";
import empty from "../../../../helpers/empty";


export default class MediaController {
  async index({response, request}: HttpContextContract) {
    let query = Media.query().whereNull('deleted_at')
    let categories = request.qs().categories;
    let type = request.qs().type;

    if (!categories) {
      categories = []
    } else {
      categories = categories.split(',')
    }

    if (type) {
      if (type === 'other') {
        query.where(query => {
          query.where('type', type).orWhereNull('type')
        })
      } else {
        query.where('type', type)
      }
    }

    if( ! empty(categories)){
      query.leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_media.guid')
        .whereIn('altrp_category_objects.category_guid', categories)
    }

    let media:any[] = await (query.orderBy('id').select('altrp_media.*').preload('categories'))


    media = media.map(model => {
      return model.serialize()
    })

    return response.json(media)
  }

}
