import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

/**
 * Convert empty string to `null` value
 */
export default class ConvertEmptyString {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const data = request.all();
    if (['post', 'put', 'patch'].indexOf(request.method().toLowerCase()) !== -1) {
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] === '') {
          data[key] = null;
        }
      }
    }
    await next();
  }
}
