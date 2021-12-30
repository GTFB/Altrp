// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async getCurrentUser({auth}) {
    await auth.use("web").authenticate()

    return {
      data: auth.user
    }
  }
}
