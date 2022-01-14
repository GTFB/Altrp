import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from "App/Models/Category";


export default class CategoriesController {
  async index({response, request}: HttpContextContract){
    let query =  Category.query()
    if(request.qs().categories){

    }
    let categories = await query
      .orderBy('title', )
    return response.json({
      categories,
      pageCount: 0,
    })
  }

  async  options({response}:HttpContextContract){
    let query = Category.query()
    let categories:any[] = await query.select( { 'label':'title',  'value': 'guid' })
    categories = categories.map(category=>{
      return category.$extras
    })
    return  response.json({
      data: categories,
      success: true,
      message: 'success'
    })
  }
}
