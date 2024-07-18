import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {ValidationException} from "@ioc:Adonis/Core/Validator";
import {inspect} from "util";
import * as _ from "lodash";

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
        response.status(400)
        // @ts-ignore
        let errors: any[] = e.messages?.errors || []
        let textErrors:string[] = []
        let merged_errors = {}
        errors.forEach(e=>{
          merged_errors[e.field] = merged_errors[e.field] || []
          merged_errors[e.field].push(e.message)
          textErrors.push( e.message)
        })

        console.error( `Validation error:
====== ERRORS "${textErrors.join('\n')}"
====== METHOD ${request.method()}
====== URL ${request.url()}
====== USER_ID: ${auth.user?.id}
====== USER_IP: ${request.header('X-Real-IP')}
`) ;

        const error_fields = {}

        // @ts-ignore
        _.forEach(merged_errors, (errors: [], field)=>{
          error_fields[field] = errors.join('\n')
        })

        return response.json({
          // @ts-ignore
          messages: e.messages,
          error_fields,
          // @ts-ignore
          thrownMessage: e.message,
          merged_errors,
          textErrors: textErrors.join('\n'),
          success: false,
          // @ts-ignore
          message: e.message,
          // @ts-ignore
          trace: e?.stack?.split('\n'),
        })
      }

      console.error(e?.response?.data || e, `
====== METHOD ${request.method()}
====== URL ${request.url()}
====== DATA: ${inspect(all)}
====== USER_ID: ${auth.user?.id}
====== USER_IP: ${request.header('X-Real-IP')}
====== RESPONSE:

`, e.response||'') ;
      return response.json({
        // ...e,
        //axios_response: e.response,
        messages: e.messages,
        thrownMessage: e.message,
        textErrors: e.message,
        success: false,
        message: e.response?.data?.message || 'Unhandled Exception: ' + (e.message || e),
        trace: e?.stack?.split('\n'),
      })
    }
  }
}
