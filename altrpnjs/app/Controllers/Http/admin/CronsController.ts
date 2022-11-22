import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cron from 'App/Models/Cron'
import Customizer from 'App/Models/Customizer'
import LIKE from '../../../../helpers/const/LIKE'

export default class CronsController {
  public async getCronEvents({ request, response }: HttpContextContract) {
    const params = request.qs()
    const page = parseInt(params.page) || 1
    const pageSize = parseInt(params.pageSize) || 20
    const orderColumn = params.order_by || 'title'
    const orderBy = params.order ? params.order.toLowerCase() : 'asc'
    const searchWord = params.s

    let cronEvents = Customizer.query().where('type', 'schedule')

    if (searchWord) {
      cronEvents.where((query) => {
        query.orWhere('title', LIKE, `%${searchWord}%`)

        if (Number(searchWord)) {
          query.orWhere('id', LIKE, `%${searchWord}%`)
        }
      })
    }

    const result = await cronEvents
      .orderBy(orderColumn, orderBy)
      .paginate(page, pageSize)
    
    const data = result.all()
    const count = result.getMeta().total
    const pageCount = result.getMeta().last_page
    
    return response.json({
      data,
      count,
      pageCount,
    })
  }

  public async runCronEvent({ params, response }: HttpContextContract) {
    const customizer = await Customizer.find(params.id)
    await customizer?.invoke()

    return response.json({})
  }

  public async index({ request, response }: HttpContextContract) {
    const { customizer: customizerId } = request.qs()
    let res: Cron[] = []

    if (customizerId) {
      res = await Cron.query().where('customizer_id', customizerId)
    } else {
      res = await Cron.all()
    }

    return response.json(res)
  }

  public async delete({ params, response }: HttpContextContract) {
    let res = await Cron.find(params.id)

    if (res) {
      await res.delete()
    }

    return response.json(res)
  }
}
