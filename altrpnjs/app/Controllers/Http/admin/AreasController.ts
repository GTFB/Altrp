// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Area from "App/Models/Area";

export default class AreasController {
  public async index() {
    return await Area.getAllWithNames()
  }
}
