import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
export default class IsAdmin {
  public async handle({response, auth, request}: HttpContextContract, next: () => Promise<void>) {
    let user = auth.user;
    const url = request.completeUrl(true)
    if (!user) {
      response.cookie('__altrp_admin_redirect_from', url, {
        maxAge: Date.now() + 864000000,
      })
      return response.redirect('/altrp-login');
    }

    if (! await user.isAdmin()) {
      response.cookie('__altrp_admin_redirect_from', url, {
        maxAge: Date.now() + 864000000,
      })
      return response.redirect('/altrp-login');
    }

    await next();
  }
}
