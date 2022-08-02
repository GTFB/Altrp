import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Cors {
  public async handle({ response }: HttpContextContract, next: () => Promise<void>) {
    await next();
    response
      .header('Access-Control-Allow-Origin', '*')
      .header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
      .header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
}
