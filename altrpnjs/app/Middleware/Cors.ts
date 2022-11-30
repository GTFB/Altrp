import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class Cors {
  public async handle({response, request}: HttpContextContract, next: () => Promise<void>) {
    if(request.method().toLowerCase() === 'options'){
      response.header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        .header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, upgrade-insecure-requests')
      return response.send('')
    }
    await next();
    response.header('Access-Control-Allow-Origin', '*')
      .header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
      .header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  }
}
