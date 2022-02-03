import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import keys from "lodash/keys"

export default class UsersController {
  public async getCurrentUser({auth}:HttpContextContract) {
    await auth.use("web").check()


    if(auth.use("web").isLoggedIn) {
      let user = auth.user
      if(user){
        await user.load('usermeta')
        await user.load('roles')
        await user.load('permissions')
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

  public async create({request, response}) {
    const body = request.body()

    if(body.password !== body.password_confirmation) {
      response.status(500)
      return {
        message: "User not created"
      }
    }

    body.roles = body._roles;
    delete body._roles;
    body.permissions = body._permissions;
    delete body._permissions

    delete body.password_confirmation

    const user = await User.create(body)

    return user
  }

  public async index() {
    const users = await User.query().preload("roles");

    return users
  }

  public async show({ params }) {
    const user = await User.query()
      .preload("permissions")
      .preload("roles")
      .where("id", parseInt(params.id))
      .firstOrFail();

    const serialized = user.serialize();

    serialized._permissions = serialized.permissions.map((permission) => permission.id)
    serialized._roles = serialized.roles.map((role) => role.id)

    return serialized
  }

  public async delete({params}) {
    const user = await User.query().where("id", parseInt(params.id)).firstOrFail();

    if(user) {
      await user.delete()

      return {
        success: true
      }
    }
  }

  public async update({ params, request, response}) {
    const user = await User.find(parseInt(params.id));

    const data = request.body();

    if(user) {
      keys(data).forEach((input) => {
        if(input === "_permissions") {
          const permissions = user.related("permissions");
          if(data._permissions) {
            permissions.detach()
            if(data._permissions.length > 0) {
              permissions.sync(data._permissions, false)
            }

          }
        }
        if(input === "_roles") {
          const roles = user.related("roles");
          if(data._roles) {
            roles.detach()
            if(data._roles.length > 0) {
              roles.sync(data._roles, false)
            }
          }
        }
        if(user[input]) {
          user[input] = data[input];
        }
      })

      if(!await user.save()) {
        response.status(500)
        return {
          message: "User not updated"
        }
      }

      return user.serialize()
    } else {
      response.status(404)
      return {
        message: "User not Found"
      }
    }
  }
}
