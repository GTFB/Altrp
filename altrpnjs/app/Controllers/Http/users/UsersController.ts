// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async getCurrentUser({auth}) {
    await auth.use("web").check()

    if(auth.use("web").isLoggedIn) {
      return {
        data: auth.user
      }
    } else {
     return {
       data: {
         is_guest: true
       }
     }
    }
  }
}
