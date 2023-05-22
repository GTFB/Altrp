import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import processObject from "../../helpers/object/processObject";
import removeScripts from "../../helpers/string/removeScripts";
import removeScriptsAttributes from "../../helpers/string/removeScriptsAttributes";

/**
 * Convert empty string to `null` value
 */
export default class StripTags {
  public async handle (
    { request }: HttpContextContract,
    next: () => Promise<void>,
  ) {

    if(['post', 'put', 'patch'].indexOf(request.method().toLowerCase()) !== -1) {
      let qs = request.qs()
      let body = request.body()

      body = processObject(body, (value, )=>{
        if(typeof value === 'string'){
          return removeScriptsAttributes(removeScripts(value))
        }
        return value
      })
      qs = processObject(qs, (value, )=>{
        if(typeof value === 'string'){
          return removeScriptsAttributes(removeScripts(value))
        }
        return value

      })

    }
    await next()

  }
}
