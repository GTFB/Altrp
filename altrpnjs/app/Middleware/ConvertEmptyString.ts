import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Convert empty string to `null` value
 */
export default class ConvertEmptyString {
  public async handle (
    { request }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    const start = performance.now();
    // console.log(request.url());
    // console.log(`START: ${performance.now() - start}`);

    const data = request.all()
    if(['post', 'put', 'patch'].indexOf(request.method().toLowerCase()) !== -1) {
      for(const key in data){
        if(data.hasOwnProperty(key) && data[key] === ''){
          data[key] = null
        }
      }
    }
    await next()
    console.log(`END:   ${((performance.now() - start) + '').substring(0, 8)} ${
      (request.method() + '    ').substring(0, 7)
    } ${
      request.url(true)
    }, ${
      request.header('X-Real-IP') || ''}`);
  }
}
