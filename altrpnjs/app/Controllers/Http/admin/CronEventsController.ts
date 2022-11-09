import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cron from 'App/Models/Cron'
import LIKE from '../../../../helpers/const/LIKE'

export default class CronEventsController {
    public async index({request, response}: HttpContextContract) {
        const params = request.qs()
        const page = parseInt(params.page) || 1
        const pageSize = parseInt(params.pageSize) || 20
        const searchWord = params.s
        let cronEvents

        const orderColumn = params.order_by || 'recurrence'
        const orderType = params.order ? params.order : 'Asc'
       //@ts-ignore
        const sortType: 'asc' | 'desc' = orderType === 'Asc' ? 'Asc' : orderType
        if (searchWord) {
            cronEvents =  await Cron.query()
            .preload('customizer')
            .orWhere('recurrence', LIKE, `%${searchWord}%`)
            .orderBy(orderColumn, sortType).paginate(page, pageSize)
        } else {
            cronEvents = await Cron.query()
            .preload('customizer', (loader) => {loader.select('title')}).orderBy(orderColumn, sortType).paginate(page, pageSize)
        }

       return response.json({
            cron_events: cronEvents.all(),
            count: cronEvents.getMeta().total,
            pageCount: cronEvents.getMeta().last_page,
       })
    }

    public async show({params, response}: HttpContextContract) {
        let res = await Cron.find(params.id)
        return response.json(res)
    }

     public async deleteLog({params, response}: HttpContextContract) {
        let res = await Cron.find(params.id)

        if (res) {
            res.log =  ''
            await res.save()
        }

        return response.json(res)
    }
}
