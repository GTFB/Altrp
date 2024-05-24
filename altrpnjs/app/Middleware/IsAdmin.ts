import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
export default class IsAdmin {
  public async handle({response, auth, request}: HttpContextContract, next: () => Promise<void>) {
    let user = auth.user;
    const url = request.completeUrl(true)
    if (!user && ! url.includes('ajax')) {
      response.cookie('__altrp_admin_redirect_from', url, {
        maxAge: Date.now() + 864000000,
      })
      return response.redirect('/altrp-login');
    }

    if (user && ! await user.isAdmin() && ! url.includes('ajax')) {
      response.cookie('__altrp_admin_redirect_from', url, {
        maxAge: Date.now() + 864000000,
      })
      return response.redirect('/altrp-login');
    }

    await next();
  }
}
