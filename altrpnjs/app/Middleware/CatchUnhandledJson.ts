import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class CatchUnhandledJson {


  /**
   * Handle request
   */
  public async handle (
    { response, request, auth }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    response.header('Content-Type', 'application/json')
    try {
      await next()
    }catch (e) {
      response.status(500)
      const all = request.all()
      if(all.password){
        delete all.password
      }
      console.error(e?.request || e, e?.response?.data || '', `
====== METHOD ${request.method()}
====== URL ${request.url()}
====== DATA: ${JSON.stringify(all, null, 2)}
====== USER_ID: ${auth.user?.id}
`) ;
      return response.json({
        // ...e,
        axios_response: e.response,
        messages: e.messages,
        thrownMessage: e.message,
        success: false,
        message: e.response?.data?.message || 'Unhandled Exception: ' + e.message,
        trace: e?.stack?.split('\n'),
      })
    }
  }
}
