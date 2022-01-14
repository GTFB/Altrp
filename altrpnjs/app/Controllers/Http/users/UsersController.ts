import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async getCurrentUser({auth}:HttpContextContract) {
    await auth.use("web").check()


    if(auth.use("web").isLoggedIn) {
      let user = auth.user
      if(user){
        await user.load('usermeta');
        await user.load('roles');
        await user.load('permissions');
      }
      return {
        data: user
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
