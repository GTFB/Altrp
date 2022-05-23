import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from "@ioc:Adonis/Core/Logger";

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
    { response }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    try {
      await next()
    }catch (e) {
      response.status(500)
      Logger.error(e)
      return response.json({
        success: false,
        message: 'Unhandled Exception: ' + e.message,
        trace: e.stack.split('\n'),
      })
    }
  }
}
