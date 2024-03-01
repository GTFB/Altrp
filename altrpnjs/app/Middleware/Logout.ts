import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import env from "../../helpers/env";
import {DateTime} from "luxon";

/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class LogoutMiddleware {

  /**
   * Handle request
   */
  public async handle(
    {auth,  session}: HttpContextContract,
    next: () => Promise<void>,
  ) {

    let logoutDate: any = env('ALL_LOGOUT_DATE')
    if (!auth.user || !logoutDate) {
      await next()
      return
    }
    if (session.get('last_login_at')) {
      const lastLogin = DateTime.fromISO(session.get('last_login_at'))
      logoutDate = DateTime.fromISO(logoutDate)
      if(logoutDate > lastLogin){

        await auth.logout()
        return
      }
    } else {
      await auth.logout()
    }
    await next()
  }
}
