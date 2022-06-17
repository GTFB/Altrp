// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AltrpSocket from "App/Services/AltrpSocket";

export default class SocketsController {
  public async handle({ request }) {
    const value = request.body();

    if(value.name && value.data) {
      AltrpSocket.io.emit(value.name, {
        value: value.data
      })
    }
  }
}
