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
      response.status(400)
      return {
        message: "Passwords mismatch, user not created."
      }
    }

    delete body.password_confirmation

    const user = await User.create({
      email: body.email,
      password: body.password,
      name: body.name,
      telegram_user_id: body.telegram_user_id,
    })

    await user.related("roles").attach(body._roles)
    await user.related("permissions").attach(body._permissions)

    return user
  }

  public async index({request}) {
    const params = request.qs()
    const page = parseInt(params.page) || 1
    const pageSize = params.pageSize || 20
    const searchWord = params.s
    let users

    if (searchWord) {
      users = await User.query()
        .orWhere('email', 'LIKE', `%${searchWord}%`)
        .orWhere('name', 'LIKE', `%${searchWord}%`)
        .orWhere('last_name', 'LIKE', `%${searchWord}%`)
        .preload('roles')
        .paginate(page, pageSize)
    } else {
       users = await User.query().preload("roles").paginate(page, pageSize)
    }

    return {
      count: users.getMeta().total,
      pageCount: users.getMeta().last_page,
      users: users.all(),
    }
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
      await Promise.all(keys(data).map(async (input) => {
        if(input === "_permissions") {
          const permissions = user.related("permissions");
          permissions.detach()
          if(data._permissions ) {
            for(const permission of data._permissions)
              await permissions.attach({
                [permission]: {
                  user_type: 'App\\User'
                }
              })
          }
        }
        if(input === "_roles") {
          const roles = user.related("roles");
          roles.detach()

          if(data._roles ) {
            for(const role of data._roles)
              await roles.attach({
                [role]: {
                  user_type: 'App\\User'
                }
              })
          }
        }

        if([
          "email_verified",
          "last_name",
          "telegram_user_id",
          "local_storage",
          "updated_at",
        ].find(i => i === input)) {

          user[input] = data[input];
        }
      }))

      if(data.password && data.password_confirmation && (data.password_confirmation === data.password)){
        user.password = data.password
      }
      await user.save()
      return user.serialize()
    } else {
      response.status(404)
      return {
        message: "User not Found"
      }
    }
  }
}
