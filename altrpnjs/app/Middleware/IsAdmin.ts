import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
export default class IsAdmin {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    let user = auth.user;

    if (!user) {
      return response.redirect('/altrp-login');
    }

    if (!(await user.isAdmin())) {
      return response.redirect('/altrp-login');
    }

    await next();
  }
}
