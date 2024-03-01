import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {DateTime} from "luxon";

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class SilentAuthMiddleware {
  /**
   * Handle request
   */
  public async handle({ auth, response, session }: HttpContextContract, next: () => Promise<void>) {
    /**
     * Check if user is logged-in or not. If yes, then `ctx.auth.user` will be
     * set to the instance of the currently logged in user.
     */
    await auth.check()
    if(auth.user && ! session.get('last_login_at')){
      auth.user.last_login_at = DateTime.now()
      await auth.user.save()
      session.put('last_login_at', DateTime.now())
    }
    if(! auth.user && session.get('last_login_at')){
      session.forget('last_login_at')
    }
    await next()
    response.header('X-server', 'altrp')
  }
}
