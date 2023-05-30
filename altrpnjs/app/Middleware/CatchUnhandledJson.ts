import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {ValidationException} from "@ioc:Adonis/Core/Validator";
import {inspect} from "util";

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
      if(e instanceof ValidationException){
        // @ts-ignore
        let errors: any[] = e.messages?.errors || []
        let textErrors:string[] = []
        let mergedErrors = {}
        errors.forEach(e=>{
          mergedErrors[e.field] = mergedErrors[e.field] || []
          mergedErrors[e.field].push(e.message)
          textErrors.push( e.message)
        })

        console.error( `Validation error:
====== ERRORS "${textErrors.join('\n')}"
====== METHOD ${request.method()}
====== URL ${request.url()}
====== USER_ID: ${auth.user?.id}
`) ;
        return response.json({
          // @ts-ignore
          messages: e.messages,
          // @ts-ignore
          thrownMessage: e.message,
          mergedErrors,
          textErrors: textErrors.join('\n'),
          success: false,
          // @ts-ignore
          message: e.message,
          // @ts-ignore
          trace: e?.stack?.split('\n'),
        })
      }

      console.error(e?.request || e, e?.response?.data || '', `
====== METHOD ${request.method()}
====== URL ${request.url()}
====== DATA: ${inspect(all)}
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
