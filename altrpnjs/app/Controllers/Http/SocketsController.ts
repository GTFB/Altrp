// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ws from "App/Services/Ws";

export default class SocketsController {
  public async handle({ request }) {
    const value = request.body();

    if(value.name && value.data) {
      Ws.io.emit(value.name, {
        value: value.data
      })
    }
  }
}
