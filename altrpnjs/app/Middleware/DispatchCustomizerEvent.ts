import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customizer from "App/Models/Customizer";

/**
 * Convert empty string to `null` value
 */
export default  class DispatchCustomizerEvent {
  public async handle (
    httpContext: HttpContextContract,
    next: () => Promise<void>,
  ) {

    Customizer.callCustomEvents('altrp_request', {
      httpContext
    }).catch(e=>{
      console.error(e)
    })

    await next()

  }
}

