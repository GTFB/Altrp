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
      console.log(body)
      console.log(qs)
      body = processObject(body, (value, key)=>{
        if(typeof value === 'string'){
          return removeScriptsAttributes(removeScripts(value))
        }
        return value
      })
      qs = processObject(qs, (value, key)=>{
        if(typeof value === 'string'){
          return removeScriptsAttributes(removeScripts(value))
        }
        return value

      })
      console.log(body)
      console.log(qs)
      request.updateBody(body)
      request.updateQs(qs)
    }
    await next()

  }
}
