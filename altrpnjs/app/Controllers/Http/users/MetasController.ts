// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserMeta from "App/Models/UserMeta";

export default class MetasController {
  public async update({params, request, response}) {
    const userMeta = await UserMeta.query()
      .where("user_id", parseInt(params.id))
      .firstOrFail();

    const data = request.body();

    data.first_name = data.first_name || null;
    data.second_name = data.second_name || null
    data.patronymic = data.patronymic || null

    if(userMeta) {
      if(
        userMeta.first_name !== data.first_name ||
        userMeta.second_name !== data.second_name ||
        userMeta.patronymic !== data.patronymic
      ) {
        userMeta.first_name = data.first_name;
        userMeta.second_name = data.second_name;
        userMeta.patronymic = data.patronymic;
        if(!await userMeta.save()) {
          response.status(500)
          return {
            message: "userMeta not updated"
          }
        }
      } else {
        return false
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
    let userMeta = await UserMeta.query()
      .where("user_id", parseInt(params.id))
      .first();
    if(! userMeta){
      userMeta = await UserMeta.create({
        user_id: params.id,
        first_name: '',
        second_name: '',
        patronymic: '',
      })

    }
    return userMeta
  }
}
