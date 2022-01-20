// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserMeta from "App/Models/UserMeta";

export default class MetasController {
  public async update({params, request, response}) {
    const userMeta = await UserMeta.query()
      .where("user_id", parseInt(params.id))
      .firstOrFail();

    const data = request.body();

    if(userMeta) {
      userMeta.first_name = data.first_name;
      userMeta.second_name = data.second_name;
      userMeta.patronymic = data.patronymic;

      if(!await userMeta.save()) {
        response.status(500)
        return {
          message: "userMeta not updated"
        }
      }

      return true
    } else {
      response.status(404)
      return {
        message: "userMeta not Found"
      }
    }
  }

  public async show({params}) {
    const userMeta = await UserMeta.query()
      .where("user_id", parseInt(params.id))
      .firstOrFail();

    return userMeta
  }
}
